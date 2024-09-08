## Projeto Integrado: Educação Financeira para o Futuro

Este repositório contém o código-fonte e os recursos relacionados ao projeto **"Educação Financeira para o Futuro: Plataforma Interativa de Investimentos para Jovens"**. Este projeto faz parte de uma iniciativa da Pró-reitoria de Extensão do UniFOA, no âmbito do Projeto de Extensão Integrado.

### Descrição do Projeto

O projeto visa criar uma plataforma digital que simule ambientes de investimento, permitindo que jovens apliquem conhecimentos de educação financeira de forma prática e interativa. A iniciativa busca capacitar os estudantes com habilidades financeiras fundamentais, preparando-os para tomar decisões econômicas informadas no futuro.

### Cursos Envolvidos

- **Sistemas de Informação**
- **Engenharia de Produção**

### Objetivos para os Estudantes

- Contribuir para a formação de jovens conscientes e preparados para gerir suas finanças pessoais.
- Desenvolver competências financeiras por meio de uma plataforma interativa que simula investimentos.

### Objetivos para os Docentes

- Atualizar as práticas pedagógicas em educação financeira.
- Capacitar os docentes para lidar com as necessidades educacionais diversas, promovendo uma educação mais inclusiva.

### Justificativa

Este projeto busca preencher a lacuna na educação financeira entre jovens, fornecendo uma ferramenta prática e educativa. Ao desenvolver essa plataforma, espera-se contribuir para a formação de uma geração mais preparada e consciente financeiramente.

## Ferramentas e Bibliotecas Utilizadas:

- **Tailwind**: Biblioteca para simplificar a escrita de CSS, proporcionando maior agilidade na criação de interfaces.
- **ShadcnUI**: Biblioteca de UI altamente compatível com Tailwind, facilitando a estilização dos componentes.

## Iniciar Ambiente de Desenvolvimento

Siga as etapas abaixo para configurar e executar o projeto localmente para desenvolvimento.

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 16 ou superior)
- npm (gerenciadores de pacotes)

### Passos de Instalação

1. Clone este repositório em sua máquina local:

   ```bash
   git clone https://github.com/Arthu-RL/SimuladorInvestimentoWeb.git
   ```

2. navegue até o diretório do projeto

   ```bash
   cd SimuladorInvestimentoWeb
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

Agora a aplicação estará rodando localmente em `http://localhost:5173`.

## Extensões Recomendadas para VS Code

### 1. ESLint

- O ESLint ajuda a identificar e corrigir problemas no código JavaScript e TypeScript, promovendo práticas de codificação consistentes e evitando erros comuns.
- **Instalação:** [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### 2. Prettier

- O Prettier formata automaticamente o código para garantir um estilo consistente e limpo, aplicando regras de formatação ao salvar arquivos.
- **Instalação:** [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 3. Tailwind CSS IntelliSense

- Oferece suporte para desenvolvimento com Tailwind CSS, com autocompletar e sugestões de classe diretamente no editor.
- **Instalação:** [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Boas Práticas

Para garantir a qualidade e a consistência do código no projeto, siga as boas práticas abaixo durante o desenvolvimento:

### 1. Componentização

- **Divida o código em componentes reutilizáveis**: Mantenha seus componentes React pequenos e focados em uma única responsabilidade.
- **Nomeie componentes de forma clara**: Utilize nomes que descrevam de maneira objetiva a funcionalidade do componente.
- **Evite duplicação de código**: Se um padrão se repete em várias partes do projeto, transforme-o em um componente reutilizável.

### 2. Estado e Propriedades

- **Use hooks com parcimônia**: Centralize o estado global em `providers` sempre que possível, minimizando a duplicação de estados locais.
- **Evite lifting state desnecessário**: Prefira contextos de estado para compartilhar dados entre componentes em diferentes níveis.
- **Propriedades claras e tipadas**: Defina e documente bem as `props` usando TypeScript, para garantir segurança e clareza no uso.

### 3. Estilização

- **Utilize classes do Tailwind CSS**: Evite a criação excessiva de arquivos CSS e prefira o uso de utilitários de estilo do Tailwind para estilização rápida e consistente.
- **Manter classes organizadas**: Agrupe classes semelhantes para manter legibilidade no JSX.

### 4. Organização de Pastas e Arquivos

- **Agrupe por funcionalidade**: Organize componentes, hooks e rotas em pastas que sigam uma estrutura lógica, facilitando a manutenção e escalabilidade.
- **Evite diretórios com muitos arquivos**: Sempre que o número de arquivos crescer significativamente, reavalie a estrutura do projeto e considere a criação de subdiretórios.

### 5. Limpeza de Código

- **Use ESLint e Prettier**: Mantenha o código limpo, padronizado e livre de erros comuns, utilizando as extensões recomendadas para linting e formatação automática.
- **Remova código morto**: Evite manter código comentado ou funções que não estão mais sendo utilizadas.

## Estrutura de Arquivos

Visão geral da estrutura de arquivos do projeto:

```
SimuladorInvestimentoWeb/
├── public/             # Arquivos públicos (ex: robots.txt, favicon)
├── src/                # Código-fonte do projeto
│   ├── assets/         # Arquivos estáticos (imagens, fontes, etc.)
│   ├── components/     # Componentes React
│   │   └── ui/         # Componentes do shadcnUI
│   ├── lib/            # Funções e recursos relacionados a bibliotecas instaladas
│   ├── pages/          # Páginas da aplicação
│   ├── providers/      # Providers de estado do React
│   ├── routes/         # Rotas da aplicação
│   ├── stylesheets/    # Arquivos de estilo (CSS, reset, variáveis)
│   ├── hooks/          # Custom hooks
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Ponto de entrada da aplicação
│   └── vite-env.d.ts   # Arquivo de `type declarations` do Vite
├── .gitignore          # Arquivos ignorados pelo Git
├── .prettierrc         # Configurações do Prettier
├── components.json     # Configurações do shadcnUI
├── CONTRIBUTING.md     # Como contribuir com o projeto
├── index.html          # Arquivo HTML principal
├── package.json        # Dependências e scripts do projeto
├── README.md           # Documentação do projeto
├── tailwind.config.js  # Configurações do Tailwind CSS
└── TODO.md             # Lista de tarefas pendentes
```

## Planejamento de Desenvolvimento

Para ver a lista completa de tarefas e pendências do projeto, consulte o [TODO.md](./TODO.md) Este arquivo contém todas as atividades e melhorias planejadas para o desenvolvimento do projeto.

## Como Contribuir

Se você deseja contribuir com este projeto, por favor, consulte o [CONTRIBUTING.md](./CONTRIBUTING.md) para obter diretrizes detalhadas sobre como proceder.
