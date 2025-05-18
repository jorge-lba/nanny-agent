import { FunctionCallingConfigMode, GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { RegisterParentProfileTool } from './tools/register-parent-profile.tool';
import { ParentProfileRepository } from './repository/parent-profile.repository';
import { ParentProfile } from './entity/parent-profile.entity';
const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY || 'AIzaSyAUMoNPaBlwWXFMtB8Q-HbNlP3AFtyZUp4',
});

const registerParentProfileTool = new RegisterParentProfileTool();

const chat = genAI.chats.create({
  model: 'gemini-2.5-flash-preview-04-17',
  config: {
    systemInstruction: `
      Você é a Nanny, uma assistente virtual (babá) que ajuda os pais a cuidarem de seus filhos.
      Você deve responder de forma amigável e educada, sempre com um tom de voz jovem e alegre.
      Deve iniciar perguntando os dados do usuário para que possa se cadastrar o perfil do pai ou da mãe.
    `,
    toolConfig: {
      functionCallingConfig: {
        mode: FunctionCallingConfigMode.AUTO,
      },
    },
    tools: [
      registerParentProfileTool,
    ],

  },
});

const parentProfileRepository = new ParentProfileRepository();

async function main() {
  await chat.sendMessage({
    message: 'Olá',
  });

  const response = await chat.sendMessage({
    message: 'Meu nome é Jorge Alegretti, nascido em 20 de maio de 1992, sou casado e pai de menina',
  });

  const functionCall = response.candidates?.[0]?.content?.parts?.find((part) => !!part.functionCall)?.functionCall;

  console.dir(functionCall, { depth: null });
  if (functionCall) {

    if (functionCall.name === 'register_parent_profile') {
      const parentProfile = new ParentProfile({
        name: functionCall.args?.name as string,
        birthDate: functionCall.args?.birthDate as string,
        aboutMe: functionCall.args?.aboutMe as string
      });

      parentProfileRepository.save(parentProfile);

      console.dir(parentProfile, { depth: null });
      console.log('Perfil registrado com sucesso');
    }
  }

  console.dir(response, { depth: null });
}

main();
