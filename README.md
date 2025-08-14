# 📦 Sistema de Controle de Estoque: Só Bujiganga 

Este projeto é um sistema de controle de estoque criado para facilitar a gestão de produtos e movimentações da loja fictícia "Só Bujiganga". A aplicação permite o cadastro detalhado de produtos, clientes, fornecedores, entradas e saídas de produtos, garantindo maior organização e rastreabilidade das operações. 

## 📑 Sumário

| Seção | Descrição |
|-------|-----------|
| [📋 Funcionalidades](#-funcionalidades) | Lista de recursos e funções do sistema |
| [⚙️ Como funciona](#️-como-funciona) | Explicação do fluxo e uso do sistema |
| [🛠️ Tecnologias utilizadas](#️-tecnologias-utilizadas) | Frameworks, bibliotecas e ferramentas usadas |
| [🗂️ Estrutura do Projeto](#️-estrutura-do-projeto) | Organização de pastas e arquivos |
| [💻 Como rodar o projeto localmente](#-como-rodar-o-projeto-localmente) | Passos para instalação e execução |
| [📡 Exemplos de Uso da API](#-exemplos-de-uso-da-api) | Exemplos de requisições e respostas |
| [📄 Documentação da API](#-documentação-da-api) | Link para o Swagger com a documentação interativa |
| [👥 Autores](#-autores) | Lista dos desenvolvedores do projeto |

## 📋 Funcionalidades

- Cadastro de produtos com informações detalhadas
- Registro de entradas e saídas de estoque
- Visualização dos produtos em estoque
- Cadastro de clientes e fornecedores
- Autenticação de usuários com login e senha
- Organização visual com Bootstrap
- Integração front-end e back-end via Axios
  
## ⚙️ Como funciona

- O administrador cria uma conta com seu nome, e-mail e senha;  
- Dentro do site, ele cadastra produtos preenchendo nome, preço unitário, quantidade, estoque mínimo, categoria e descrição;  
- Quando há entrada de produtos, o usuário as registra com informações como quantidade, valor unitário (opcional), cliente (opcional), fornecedor (opcional) e observação (opcional);  
- Para registrar saídas de produtos, o processo é basicamente o mesmo das entradas, sendo registrada a data e hora em que ocorrem;  
- O usuário pode visualizar, na seção de estoque, todos os produtos disponíveis;  
- Também é possível adicionar fornecedores, preenchendo dados como nome, CNPJ, e-mail, telefone e endereço. O mesmo vale para clientes, que são registrados com nome, e-mail, telefone e endereço.

O objetivo de todas essas funcionalidades é organizar o estoque da loja **Só Bujiganga**, facilitando o fluxo de trabalho e a gestão diária do negócio.

## 🛠️ Tecnologias utilizadas

### </> Front-End
<p>
  <img alt="React" title="React" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"/>
  <img alt="JavaScript" title="JavaScript" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/>
  <img alt="HTML5" title="HTML5" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"/>
  <img alt="CSS3" title="CSS3" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"/>
  <img alt="Bootstrap" title="Bootstrap" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"/>
  <img alt="React Router" title="React Router" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"/>
  <img alt="Axios" title="Axios" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg"/>
</p>

### 🤖 Back-end
<p>
  <img alt="Node.js" title="Node.js" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"/>
  <img alt="Express" title="Express" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"/>
</p>

### 🗄️ Banco de Dados
<p>
  <img alt="MongoDB" title="MongoDB" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"/>
  <img alt="Mongoose" title="Mongoose" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg"/>
</p>

### 🧩 Outras Ferramentas
<p>
  <img alt="Git" title="Git" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"/>
  <img alt="VS Code" title="VS Code" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"/>
  <img alt="Trello" title="Trello" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg"/>
  <img alt="Postman" title="Postman" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg"/>
  <img alt="GitHub" title="GitHub" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"/>
</p>

## 🗂️ Estrutura do Projeto
```text
controle-de-estoque/
├── backend/
│   ├── controllers/          # Controladores das rotas
│   ├── middlewares/          # Middlewares de autenticação, validação etc.
│   ├── models/               # Schemas do Mongoose
│   ├── routes/               # Arquivos de rotas da API
│   ├── services/             # Lógica de negócio e integração
│   ├── .env                  # Variáveis de ambiente (não versionado)
│   ├── app.js                # Arquivo principal do servidor
│   ├── database.js           # Conexão com MongoDB
│   ├── mailer.js             # Envio de e-mails (se aplicável)
│   ├── swagger.js            # Configuração da documentação Swagger
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── build/                # Build final do React para produção
│   ├── node_modules/
│   ├── public/               # Arquivos públicos do front
│   ├── src/                  # Código-fonte React (componentes, páginas)
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## 💻 Como rodar o projeto localmente

1. Clone o repositório:
```bash
https://github.com/brunowasch/controle-de-estoque.git
```
2. Instale as dependências:
```bash
cd frontend
npm install

cd ../backend
npm install
```
3. Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuário>:<senha>@<cluster>.mongodb.net/sistema?retryWrites=true&w=majority
```
4. Gere o build do front-end:
```bash
cd frontend
npm run build
```
5. Volte para o back-end e inicie o servidor:
```bash
cd ../backend
node app.js
```
6. Acesse o sistema em: <http://localhost:3000>

## 📡 Exemplos de Uso da API

> ⚠️ Todas as rotas protegidas exigem autenticação via token JWT. Você deve incluir o token no header da requisição:
---

#### 📥 Registrar usuário
```http
POST /register
```
Body:
```json
{
  "nome": "Usuário",
  "email": "usuario@example.com",
  "senha": "123456"
}
```
#### 🔑 Login
```http
POST /login
```
Body:
```json
{
  "email": "usuario@example.com",
  "senha": "123456"
}
```
Resposta:
```json
{
  "token": "jwt_token_aqui",
  "usuario": {
    "id": "abc123",
    "nome": "Usuário",
    "email": "usuario@example.com"
  }
}
```

#### 📦 Produtos
Registrar produto:
```http
POST /produtos
```
Body:
```json
{
  "nome": "Chave de fenda",
  "descricao": "Ferramenta manual",
  "precoUnitario": 15.90,
  "estoqueMinimo": 5,
  "quantidade": 10,
  "categoria": "Ferramentas"
}

```
Listar todos os produtos:
```http
GET /produtos
```
Obter produto por ID:
```http
GET /produtos/:id
```
Atualizar produto:
```http
PUT /produtos/:id
```
Deletar produto:
```http
DELETE /produtos/:id
```

#### ➕ Entradas de Estoque
Registrar entrada:
```http
POST /stock/entries
```
Body:
```json
{
  "produtoId": "id_produto",
  "quantidade": 20,
  "valorUnitario": 14.50,
  "fornecedorId": "id_fornecedor",
  "clienteId": "id_cliente",
  "observacao": "Entrada por reposição"
}
```
Listar todas as entradas:
```http
GET /stock/entries
```
Atualizar entrada:
```http
PUT /stock/entries/:id
```
Deletar entrada:
```http
DELETE /stock/entries/:id
```

#### ➖ Saídas de Estoque
Registrar saída:
```http
POST /stock/outflows
```
Body:
```json
{
  "produtoId": "id_produto",
  "quantidade": 5,
  "observacao": "Venda no balcão"
}
```
Listar saídas:
```http
GET /stock/outflows
```
Atualizar saída:
```http
PUT /stock/outflows/:id
```
Deletar saída:
```http
DELETE /stock/outflows/:id
```

#### 👤 Clientes
Registrar cliente:
```http
POST /clientes
```
Body:
```json
{
  "nome": "João",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "endereco": "Rua X, 123"
}
```
Listar todos os clientes:
```http
GET /clientes
```
Obter cliente por ID:
```http
GET /clientes/:id
```
Atualizar cliente:
```http
PUT /clientes/:id
```
Deletar cliente:
```http
DELETE /clientes/:id
```
### 🚚 Fornecedores
Registrar fornecedor:
```http
POST /fornecedores
```
Body:
```json
{
  "nome": "Fornecedor X",
  "cnpj": "00.000.000/0001-00",
  "email": "contato@fornecedorx.com",
  "telefone": "1133334444",
  "endereco": "Av. Industrial, 500"
}
```
Listar todos os fornecedores:
```http
GET /fornecedores
```
Obter fornecedor por ID:
```http
GET /fornecedores/:id
```
Atualizar fornecedor:
```http
PUT /fornecedores/:id
```
Deletar fornecedor:
```http
DELETE /fornecedores/:id
```
## 📄 Documentação da API

A documentação completa da API está disponível via Swagger:

🔗 [Acesse a documentação Swagger](http://localhost:3000/api-docs)


## 👥 Autores
- **André Gabriel Schuh** - [https://github.com/AndreSchuh](https://github.com/AndreSchuh)
- **Bruno Waschburger Silva** - [https://github.com/brunowasch](https://github.com/brunowasch)
- **Diogo Lorenzo Machado Motz** - [https://github.com/Diogo-Motz](https://github.com/Diogo-Motz)
- **Valentina Gaspar Magri** - [https://github.com/ValGaspar](https://github.com/ValGaspar)

---
Este projeto, intitulado **"Projeto Prático Integrador II"**, foi desenvolvido como parte da disciplina **Criação de Sites**.  
Todos os direitos reservados aos autores.
