# Nanny

## 📝 Sobre o Projeto

Nanny é uma assistente virtual inteligente (babá) que ajuda os pais a cuidarem de seus filhos. Utilizando a tecnologia avançada do Google Gemini AI, a Nanny oferece suporte personalizado para cada família, mantendo um tom amigável e jovem em suas interações.

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
