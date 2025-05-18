import { FunctionDeclaration, Schema, Tool, Type } from '@google/genai';

class Parameters implements Schema {
  type: Type = Type.OBJECT;
  properties: Record<string, Schema> = {
    uuid: { type: Type.STRING },
  };
  required: string[] = ['uuid'];
}

class Response implements Schema {
  type: Type = Type.OBJECT;
  properties: Record<string, Schema> = {
    uuid: { type: Type.STRING },
    name: { type: Type.STRING },
    birthDate: { type: Type.STRING },
    aboutMe: { type: Type.STRING },
    memories: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          timestamp: { type: Type.STRING },
          data: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              summary: { type: Type.STRING }
            }
          }
        }
      }
    }
  };
}

class GetParentProfileFunction implements FunctionDeclaration {
  name = 'get_parent_profile';
  description = 'Tool responsável por buscar o perfil de um pai/mãe pelo UUID';
  parameters: Parameters = new Parameters();
  response: Response = new Response();

  get tool(): FunctionDeclaration {
    return {
      name: this.name,
      description: this.description,
      parameters: this.parameters,
      response: this.response,
    };
  }
}

class GetParentProfileTool implements Tool {
  functionDeclarations?: FunctionDeclaration[] | undefined;

  constructor() {
    this.functionDeclarations = [new GetParentProfileFunction()];
  }
}

export { GetParentProfileTool }; 