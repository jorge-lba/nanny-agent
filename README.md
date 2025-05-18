![Nanny - Assistente Virtual para Cuidados com Bebês](@header.png)
# Nanny

Você já sentiu insegurança ou sobrecarga ao cuidar de um bebê? Já ficou em dúvida sobre horários de alimentação, vacinas ou como oferecer a melhor introdução alimentar? A rotina dos pais é cheia de desafios, dúvidas e decisões importantes — e é aí que a Nanny entra para transformar essa experiência!

A Nanny é uma assistente virtual inteligente, criada para ser a parceira ideal de mães e pais modernos. Utilizando o poder da IA generativa do Google Gemini, ela oferece suporte personalizado, lembretes automáticos, dicas práticas e recomendações seguras para o cuidado diário dos bebês. Tudo isso com uma comunicação leve, jovem e acolhedora.

Se você busca tecnologia aplicada ao bem-estar familiar, praticidade e informação confiável, a Nanny é a solução que vai revolucionar a forma como cuidamos das próximas gerações. Venha experimentar o futuro do cuidado infantil com IA!

### Principais Funcionalidades:
- Cadastro e gerenciamento de perfis de pais e bebês
- Recomendação de receitas personalizadas baseadas na idade do bebê
- Assistência em tempo real via chat
- Sugestões personalizadas de cuidados infantis
- Interface amigável e intuitiva

## 🛠️ Ferramentas e Agentes

### Ferramentas Disponíveis:
1. **RegisterParentProfile**
   - Cadastro de perfil dos pais
   - Armazena informações como nome, data de nascimento e informações pessoais

2. **RegisterBabyProfile**
   - Cadastro de perfil dos bebês
   - Vincula bebês aos perfis dos pais
   - Registra nome e data de nascimento

3. **GetParentProfile**
   - Consulta de perfis de pais
   - Recupera informações completas do perfil

4. **SearchRecipes**
   - Busca receitas personalizadas
   - Recomendações baseadas na idade do bebê
   - Informações nutricionais e tempo de preparo

### Agentes Especializados:
1. **RecipeAgent**
   - Especialista em culinária infantil
   - Gera receitas seguras e nutritivas
   - Personaliza recomendações por idade
   - Formata receitas em markdown para fácil leitura

## 🚀 Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Socket.IO](https://socket.io/)
- [Google Gemini AI](https://ai.google.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- PNPM como gerenciador de pacotes
- Chave de API do Google Gemini

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd nanny
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto e adicione:
```env
GOOGLE_API_KEY=sua_chave_api_aqui
```

## 🏃‍♂️ Como Executar

O projeto possui diferentes modos de execução:

### Desenvolvimento
Para executar apenas o frontend:
```bash
pnpm dev
```

Para executar apenas o servidor WebSocket:
```bash
pnpm dev:ws
```

Para executar ambos simultaneamente:
```bash
pnpm dev:all
```

### Produção
```bash
pnpm build
pnpm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/          # Rotas e páginas da aplicação
├── components/   # Componentes React reutilizáveis
├── lib/          # Utilitários e configurações
└── server/       # Servidor WebSocket e lógica do backend
```

## 🔍 Linting

Para verificar o código:
```bash
pnpm lint
```

## 📄 Licença

Este projeto está sob a licença MIT.

## 💡 Ideias de Funcionalidades Futuras

Abaixo estão ideias para futuras funcionalidades da Nanny, baseadas no planejamento do projeto:

### Lembretes
- **Hora do mama:** Cria lembretes da hora de dar o mama para o bebê, levando em consideração o perfil dos pais, marcos do bebê e idade para calcular o intervalo ideal de alimentação.
- **Hora da fralda:** Lembretes para troca de fralda.
- **Hora da soneca:** Lembretes para o horário de dormir do bebê.
- **Vacina chegando:** Avisos antecipados sobre vacinas próximas.
- **Dia da vacina:** Lembrete no dia da vacinação.

### Assistência na Vacinação
- Quais vacinas serão dadas no mês.
- Verificação se as vacinas estão em dia.

### Introdução Alimentar
- Dicas e cuidados sobre alimentação.
- Receitas personalizadas.
- Cardápios sugeridos para cada fase do bebê.
