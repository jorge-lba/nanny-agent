import { FunctionDeclaration, Schema, Tool, ToolCodeExecution, Type } from '@google/genai';

class Parameters implements Schema {
  type: Type = Type.OBJECT;
  properties: Record<string, Schema> = {
    name: { type: Type.STRING },
    birthDate: { type: Type.STRING },
    aboutMe: { type: Type.STRING },
    memories: {
      type: Type.ARRAY, items: {
        type: Type.OBJECT, properties: {
          name: { type: Type.STRING },
          birthDate: { type: Type.STRING },
          aboutMe: { type: Type.STRING },
        }
      }
    },
  };
  required: string[] = ['name', 'birthDate', 'aboutMe'];
}

class Response implements Schema {
  type: Type = Type.OBJECT;
  properties: Record<string, Schema> = {
    uuid: { type: Type.STRING },
    name: { type: Type.STRING },
  };
}

export class RegisterParentProfileFunction implements FunctionDeclaration {
  name = 'register_parent_profile';
  description = 'Tool responsável por registrar um novo perfil de pais';
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

class RegisterParentProfileTool implements Tool {
  functionDeclarations?: FunctionDeclaration[] | undefined;

  constructor() {
    this.functionDeclarations = [new RegisterParentProfileFunction()];
  }
}

export { RegisterParentProfileTool };