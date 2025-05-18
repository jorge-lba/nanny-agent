import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server as IOServer } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';
import { FunctionCallingConfigMode, GoogleGenAI } from '@google/genai';
import { RegisterParentProfileFunction, } from './tools/register-parent-profile.tool';
import { ParentProfileRepository } from './repository/parent-profile.repository';
import { ParentProfile } from './entity/parent-profile.entity';
import { RegisterBabyProfileFunction } from './tools/register-baby-profile.tool';
import { BabyProfile } from './entity/baby-profile.entity';
import { config } from 'dotenv';
import { SearchRecipesFunction } from './tools/search-recipes.tool';
import { RecipeAgent } from './agent/recipe-agent';

config({ path: '.env' });

const port = parseInt(process.env.PORT || '3333', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const parentProfileRepository = new ParentProfileRepository();
const registerParentProfile = new RegisterParentProfileFunction();
const registerBabyProfile = new RegisterBabyProfileFunction();
const searchRecipes = new SearchRecipesFunction();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req as NextApiRequest, res as NextApiResponse, parsedUrl);
  });

  let parentProfile: ParentProfile | null = null;

  const io = new IOServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    },
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    allowEIO3: true
  });

  io.on('connection', (socket) => {
    const chat = genAI.chats.create({
      model: 'gemini-2.5-flash-preview-04-17',
      config: {
        systemInstruction: `
          Você é a Nanny, uma assistente virtual (babá) que ajuda os pais a cuidarem de seus filhos.
          Você deve responder de forma amigável e educada, sempre com um tom de voz jovem e alegre, com markdown bem estruturado.
          Deve iniciar perguntando os dados do usuário para que possa se cadastrar o perfil do pai ou da mãe.
          Após o cadastro do pai/mãe, deve perguntar os dados do bebê para que possa se cadastrar o perfil do bebê.
          Data atual: ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        `,
        toolConfig: {
          functionCallingConfig: {
            mode: FunctionCallingConfigMode.AUTO,
          },
        },
        tools: [
          {
            functionDeclarations: [
              registerBabyProfile,
              registerParentProfile,
              searchRecipes,
            ]
          },
        ],
      },
    });

    socket.emit('mensagem', 'Olá! Sou a Nanny, sua assistente virtual para cuidados com bebês. Como posso te ajudar?');

    console.log(`[WS] Cliente conectado: ${socket.id}`);

    socket.on('search_parent_profile', async (uuid: string) => {
      parentProfile = parentProfileRepository.findByUuid(uuid) || null;

      if (parentProfile) {
        chat.sendMessage({
          message: `O perfil do pai/mãe é: ${JSON.stringify({
            uuid: parentProfile.uuid,
            name: parentProfile.name,
            birthDate: parentProfile.birthDate,
            aboutMe: parentProfile.aboutMe,
            babies: parentProfile.babies.map((baby) => ({
              uuid: baby.uuid,
              name: baby.name,
              birthDate: baby.birthDate,
            })),
          })}`,
        });
      }
    });

    socket.on('mensagem', async (msg: string) => {
      console.log(`[WS] Mensagem recebida: ${msg}`);
      const message = await chat.sendMessage({
        message: msg,
      });

      socket.emit('mensagem', message.text);

      const parts = message.candidates?.[0]?.content?.parts?.filter((part) => !!part.functionCall);

      if (parts) {
        for (const part of parts) {
          if (part.functionCall?.name === 'register_parent_profile') {
            const parentProfile = new ParentProfile({
              name: part.functionCall?.args?.name as string,
              birthDate: part.functionCall?.args?.birthDate as string,
              aboutMe: part.functionCall?.args?.aboutMe as string
            });

            parentProfileRepository.save(parentProfile);

            socket.emit('mensagem', 'Perfil registrado com sucesso!');
            socket.emit('parent_profile', JSON.stringify({
              uuid: parentProfile.uuid,
              name: parentProfile.name,
              birthDate: parentProfile.birthDate,
              aboutMe: parentProfile.aboutMe,
              babies: parentProfile.babies.map((baby) => ({
                uuid: baby.uuid,
                name: baby.name,
                birthDate: baby.birthDate,
              })),
            }));
          }
          if (part.functionCall?.name === 'register_baby_profile') {
            const babyProfile = new BabyProfile({
              name: part.functionCall?.args?.name as string,
              birthDate: part.functionCall?.args?.birthDate as string,
            });

            const profile = parentProfileRepository.findByUuid(parentProfile?.uuid as string);

            if (profile) {
              profile.addBabyProfile(babyProfile);
              parentProfileRepository.save(profile);
              socket.emit('mensagem', 'Perfil do bebê registrado com sucesso!');
            }
          }
          if (part.functionCall?.name === 'search_recipes') {
            const recipeAgent = new RecipeAgent();
            const recipes = await recipeAgent.getRecipesForParent(parentProfile!, part.functionCall?.args?.message as string);
            socket.emit('mensagem', recipes);
          }
        }

      }
    });

    socket.on('disconnect', () => {
      console.log(`[WS] Cliente desconectado: ${socket.id}`);
    });
  });

  server.listen(port, () => {
    console.log(`> Servidor rodando em http://localhost:${port}`);
  });
});
