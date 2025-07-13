# 🛡️ JWT Auth API - Node.js + MySQL

API de autenticação com **JWT**, feita com **Node.js** e **MySQL**. Permite o cadastro, login de usuários e operações com produtos — com proteção de rotas por nível de permissão (usuário comum ou admin).

---

## 🚀 Tecnologias

- Node.js  
- Express.js  
- MySQL (`mysql2`)  
- JWT (`jsonwebtoken`)  
- Joi (validação de dados)  
- dotenv  
- bcrypt

### 📦 Explicação rápida dos pacotes usados

- **express**: framework web para criar a API.  
- **mysql2**: driver para conectar ao banco MySQL.  
- **dotenv**: para carregar variáveis de ambiente do arquivo `.env`.  
- **jsonwebtoken**: para criar e validar tokens JWT.  
- **bcrypt**: para hash de senhas.  
- **joi**: para validação de dados (schemas).

---

## 📁 Estrutura de Pastas

```bash
logs/
project/
│
├── controllers/       # Lógica de usuários e produtos
├── db/                # Conexão e criação de tabelas
├── middleware/        # Middleware de autenticação e permissão
├── routes/            # Rotas de usuários e produtos
├── secret_key/        # Chave secreta para JWT
├── services/          # Regras de negócio e funções principais da aplicação
├── utils/             # Funções utilitárias genéricas e reutilizáveis
├── validations/       # Schemas Joi de validação
├── index.js           # Arquivo principal
```

---

## ⚙️ Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=jwt_auth_node

SECRET_KEY=sua_chave_secreta_segura
```

---

## 📌 Funcionalidades

- ✅ Cadastro de usuário (`/registration`)  
- ✅ Login de usuário (`/login`) com geração de token JWT  
- ✅ Listagem de produtos (`/products`)  
- ✅ Cadastro, edição e remoção de produtos (admin only)  
- ✅ Middleware de proteção com token  
- ✅ Validação de dados com Joi

---

## 🛡️ Permissões

- **Usuário comum:** pode visualizar produtos  
- **Admin:** pode cadastrar, editar e deletar produtos

---

## ▶️ Rodando o projeto

```bash
# Instalar dependências
npm install express mysql2 dotenv jsonwebtoken bcrypt joi

# Rodar a aplicação
node project/index.js
```

---

## 📮 Rotas principais

| Método | Rota              | Acesso      | Descrição                     |
|--------|-------------------|-------------|-------------------------------|
| POST   | `/register`       | Público     | Cadastrar usuário             |
| POST   | `/login`          | Público     | Login com JWT                 |
| GET    | `/products`       | Autenticado | Listar produtos               |
| POST   | `/products`       | Admin       | Cadastrar novo produto        |
| PUT    | `/products/:id`   | Admin       | Atualizar produto por ID      |
| DELETE | `/products/:id`   | Admin       | Deletar produto por ID        |

---

## 🙋‍♂️ Autor

**José Satiro**  
Estudante do IFCE - Campus Maranguape  
GitHub: [SatiroDev](https://github.com/SatiroDev)
