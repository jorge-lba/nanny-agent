import { FunctionDeclaration, Schema, Tool, Type } from '@google/genai';

class Parameters implements Schema {
  type: Type = Type.OBJECT;
  properties: Record<string, Schema> = {
    parentUuid: { type: Type.STRING },
    name: { type: Type.STRING },
    birthDate: { type: Type.STRING },
  };
  required: string[] = ['parentUuid', 'name', 'birthDate'];
}

class Response implements Schema {
  type: Type = Type.OBJECT;
  properties: Record<string, Schema> = {
    parentUuid: { type: Type.STRING },
    babyUuid: { type: Type.STRING },
    message: { type: Type.STRING },
  };
}

export class RegisterBabyProfileFunction implements FunctionDeclaration {
  name = 'register_baby_profile';
  description = 'Tool responsável por registrar um novo perfil de bebê em um parent profile existente';
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

class RegisterBabyProfileTool implements Tool {
  functionDeclarations?: FunctionDeclaration[] | undefined;

  constructor() {
    this.functionDeclarations = [new RegisterBabyProfileFunction()];
  }
}

export { RegisterBabyProfileTool }; 