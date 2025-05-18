import { FunctionDeclaration, Schema, Tool, Type } from '@google/genai';

class Parameters implements Schema {
  type: Type = Type.OBJECT;
  properties: Record<string, Schema> = {
    parentUuid: { type: Type.STRING }
  };
  required: string[] = ['parentUuid'];
}

class Response implements Schema {
  type: Type = Type.OBJECT;
  properties: Record<string, Schema> = {
    recipes: {
      type: Type.OBJECT,
      properties: {
        babyName: { type: Type.STRING }
      }
    }
  };
}

class SearchRecipesFunction implements FunctionDeclaration {
  name = 'search_recipes';
  description = 'Tool responsável por buscar receitas personalizadas para os bebês do perfil dos pais';
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

class SearchRecipesTool implements Tool {
  functionDeclarations?: FunctionDeclaration[] | undefined;

  constructor() {
    this.functionDeclarations = [new SearchRecipesFunction()];
  }
}

export { SearchRecipesFunction }; 