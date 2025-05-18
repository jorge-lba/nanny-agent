import { ParentProfile } from '../entity/parent-profile.entity';
import { GoogleGenAI } from '@google/genai';

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  ageRange: string;
  preparationTime: string;
  nutritionalInfo: string;
}

export class RecipeAgent {
  private genAI: GoogleGenAI;

  constructor() {
    this.genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
  }

  private calculateBabyAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth());
    return ageInMonths;
  }

  private async searchRecipes(ageInMonths: number, message: string): Promise<string> {
    const response = await this.genAI.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: [
        {
          role: "user",
          parts: [{
            text: `Busque uma receita nutritiva e segura para um bebê de ${ageInMonths} meses. 
            Caso seja relevante, use a mensagem ${message} para buscar receitas.
            ` }]
        }
      ],
      config: {
        tools: [
          {
            googleSearch: {}
          }
        ],
        systemInstruction: `
          Você é um especialista em culinária infantil.
          Sua função é buscar receitas seguras e nutritivas para bebês de ${ageInMonths} meses.
          As receitas devem incluir ingredientes que o bebê já pode consumir.
          Retorne apenas o texto da receita em formato markdown.
        `
      }
    });

    return response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  private async formatRecipe(recipeText: string, babyName: string): Promise<string> {
    const response = await this.genAI.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: [{ role: "user", parts: [{ text: recipeText }] }],
      config: {
        systemInstruction: `
          Você é em editor de receitas.
          Sua função é formatar a receita em markdown para que seja mais fácil de ser lida pelo usuário.
          A receita deve ser formatada para que seja fácil de ser lida pelo usuário.
          Retorne apenas o texto da receita em formato markdown.
          A dicione o nome do bebê na receita para indicar para quem é a receita, o nome do bebê deve ser ${babyName}.	
        `
      }
    });

    return response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  async getRecipesForParent(parentProfile: ParentProfile, message: string): Promise<string> {
    const recipes = new Map<string, string>();

    for (const baby of parentProfile.babies) {
      const ageInMonths = this.calculateBabyAge(baby.birthDate);
      const recipeText = await this.searchRecipes(ageInMonths, message);
      const formattedRecipe = await this.formatRecipe(recipeText, baby.name);
      recipes.set(baby.name, formattedRecipe);
    }

    return Array.from(recipes.values()).join('\n\n');
  }
} 