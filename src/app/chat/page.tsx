"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { io, Socket } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { MessageContent } from "../../components/mdx/MessageContent";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ParentProfile {
  uuid: string;
  name: string;
  birthDate: string;
  aboutMe: string;
  memories: Array<{
    timestamp: string;
    data: {
      type: string;
      summary: string;
    };
  }>;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [parentProfile, setParentProfile] = useState<ParentProfile | null>(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Carrega o perfil do localStorage ao iniciar
    const savedProfile = localStorage.getItem('parentProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setParentProfile(parsedProfile);
      setUserId(parsedProfile.uuid);
    }
  }, []);

  useEffect(() => {
    const socketInstance = io('http://localhost:3333', {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Erro na conexão:', error);
    });

    socketInstance.on('parent_profile', (profile: string) => {
      const parsedProfile = JSON.parse(profile);
      setParentProfile(parsedProfile);
      setUserId(parsedProfile.uuid);
      localStorage.setItem('parentProfile', profile);
    });

    setSocket(socketInstance);

    socketInstance.on('mensagem', (message: string) => {
      const assistantMessage: Message = {
        role: "assistant",
        content: message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      socket?.emit('search_parent_profile', userId);
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;

    // Adiciona a mensagem do usuário
    const userMessage: Message = {
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Envia a mensagem para o servidor WebSocket
    socket.emit('mensagem', input);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleUserIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId.trim() || !socket) return;
    socket.emit('get_parent_profile', userId);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Card className="flex-1 flex flex-col m-4 border-border max-w-3xl mx-auto w-full">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground">Assistente Virtual para Cuidados com Bebês</CardTitle>
          {parentProfile && (
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Seu ID de usuário: <span className="font-mono bg-muted p-1 rounded">{parentProfile.uuid}</span></p>
              <p className="mt-1">Copie este ID para usar em uma nova sessão</p>
            </div>
          )}
          {!parentProfile && (
            <form onSubmit={handleUserIdSubmit} className="mt-2 flex gap-2">
              <Input
                value={userId}
                onChange={handleUserIdChange}
                placeholder="Digite seu ID de usuário"
                className="flex-1"
              />
              <Button type="submit">Conectar</Button>
            </form>
          )}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col pt-6">
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex-1 overflow-y-auto border rounded-lg p-4 space-y-4 bg-card">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                      }`}
                  >
                    <MessageContent content={message.content} />
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua pergunta sobre cuidados com bebês..."
                className="flex-1 bg-card"
              />
              <Button type="submit">Enviar</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 