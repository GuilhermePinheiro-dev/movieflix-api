# Movie API

Uma API REST moderna e profissional para gerenciar filmes com suporte para operações CRUD e recursos de filtro.

## 📋 Índice

- [Características](#características)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Documentação da API](#documentação-da-api)
- [Uso da API](#uso-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licença)

## ✨ Características

- ✅ **Listar Todos os Filmes** - Recupere uma lista completa de todos os filmes disponíveis
- ✅ **Criar Filmes** - Adicione novos filmes ao banco de dados
- ✅ **Atualizar Filmes** - Modifique as informações de filmes existentes
- ✅ **Deletar Filmes** - Remova filmes do banco de dados
- ✅ **Filtrar por Gênero** - Pesquise e filtre filmes por gênero
- ✅ **Documentação Interativa da API** - Interface Swagger integrada para exploração fácil
- ✅ **Type-Safe** - Suporte completo a TypeScript para desenvolvimento robusto

## 🛠 Tecnologias

- **Runtime:** Node.js
- **Framework:** Express.js
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Documentação da API:** Swagger (OpenAPI)

## 📦 Instalação

### Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- **Node.js** (v16 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (instância local ou conexão em nuvem)

### Passos

1. **Clone o repositório**

    ```bash
    git clone https://github.com/GuilhermePinheiro-dev/movieflix-api.git
    cd movieFlix-api
    ```

2. **Instale as dependências**

    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente**

    ```bash
    cp .env.example .env
    ```

    Atualize o arquivo `.env` com sua configuração (veja [Variáveis de Ambiente](#variáveis-de-ambiente))

4. **Inicialize o banco de dados**

    ```bash
    npx prisma migrate dev
    ```

5. **Gere o cliente Prisma**
    ```bash
    npx prisma generate
    ```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` no diretório raiz com as seguintes variáveis:

```env
# Configuração do Banco de Dados
DATABASE_URL=postgresql://usuario:senha@localhost:5432/movieFlix
```

### Explicação das Variáveis de Ambiente

| Variável          | Descrição                       | Exemplo                                               |
| ----------------- | ------------------------------- | ----------------------------------------------------- |
| `DATABASE_URL`    | String de conexão do PostgreSQL | `postgresql://usuario:senha@localhost:5432/movieFlix` |
| `PORT`            | Porta do servidor               | `3000`                                                |
| `NODE_ENV`        | Modo de ambiente                | `development` ou `production`                         |
| `SWAGGER_ENABLED` | Habilitar Swagger UI            | `true` ou `false`                                     |

## 🚀 Executando o Projeto

### Modo de Desenvolvimento

Execute o servidor de desenvolvimento com hot reload:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

### Modo de Produção

Construa e execute para produção:

```bash
npm run build
npm start
```

## 📚 Documentação da API

### Interface Swagger Interativa

A documentação completa da API está disponível através de uma interface Swagger interativa, que permite explorar e testar todos os endpoints diretamente do seu navegador.

**Acesse Swagger UI:** [http://localhost:3000/docs](http://localhost:3000/docs)

### O que Você Pode Fazer no Swagger UI

- Visualizar todos os endpoints disponíveis
- Ler descrições detalhadas de parâmetros
- Ver esquemas de requisição/resposta
- Testar endpoints diretamente com valores personalizados
- Baixar especificações da API

---

## 🔌 Uso da API

### URL Base

```
http://localhost:3000/movies
```

### Exemplos de Endpoints

> **Nota:** Para documentação completa de endpoints com exemplos de requisição/resposta, esquemas e testes interativos, visite a [Interface Swagger](/docs).

#### 1. Listar Todos os Filmes

```http
GET /movies
```

#### 2. Obter Filme por ID

```http
GET /movies/:id
```

#### 3. Criar um Novo Filme

```http
POST /movies
Content-Type: application/json

{
  "title": "Inception",
  "genre_id": 2,
  "language: 4,
  "oscar_count: 0,
  "release_date": "2020-02-10",
}
```

#### 4. Atualizar um Filme

```http
PUT /movies/:id
Content-Type: application/json

{
  "title": "Inception",
  "oscar_count: 1
}
```

#### 5. Deletar um Filme

```http
DELETE movies/:id
```

#### 6. Filtrar Filmes por Gênero

```http
GET /movies/Ação
```

---

## 📁 Estrutura do Projeto

```
movieFlix-api/
├── src/
│   ├── server.ts              # Ponto de entrada principal do servidor
│   └── ...                     # Arquivos de código adicionais
├── prisma/
│   ├── schema.prisma          # Definição do esquema do banco de dados
│   └── migrations/            # Migrações do banco de dados
├── generated/
│   └── prisma/                # Tipos e código cliente auto-gerados
├── lib/
│   ├── prisma.ts              # Instância do cliente Prisma
│   └── ...                     # Bibliotecas utilitárias
├── package.json               # Dependências do projeto
├── tsconfig.json              # Configuração do TypeScript
├── swagger.json               # Especificação Swagger/OpenAPI
└── README.md                  # Este arquivo
```

### Diretórios Principais

- **`src/`** - Código fonte da aplicação
- **`prisma/`** - Schema do banco de dados e migrações
- **`generated/`** - Tipos e código cliente auto-gerados
- **`lib/`** - Utilitários compartilhados e configurações

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para detalhes.

---

## 📞 Suporte

Para questões, solicitações de recursos ou dúvidas, abra uma issue no repositório.

---

**Bom código! 🎬**
