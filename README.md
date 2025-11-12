# 🧩 API Nest Impacta – TypeORM Version

> Projeto desenvolvido durante o **Milestone 6 – Faculdade Impacta**, com foco na migração do ORM **Prisma** para **TypeORM**, utilizando **NestJS**, **MySQL** e **JWT**.  
> Versão aprimorada com boas práticas, autenticação, envio de e-mails e controle de acesso baseado em papéis (RBAC).

---

## 🚀 **Tecnologias Utilizadas**

| Categoria | Tecnologia |
|------------|-------------|
| 🧱 Backend Framework | [NestJS](https://nestjs.com/) |
| 🗄️ ORM | [TypeORM](https://typeorm.io/) |
| 🐬 Banco de Dados | [MySQL](https://www.mysql.com/) |
| 🔑 Autenticação | JWT (JSON Web Token) |
| 📩 Envio de E-mails | Nodemailer + Ethereal |
| 🔐 Segurança | Guards, Interceptors e Decorators |
| 🧰 Utilitários | bcrypt, dotenv, class-validator |

---

## 🧠 **Objetivo do Projeto**

- Demonstrar a **migração prática do Prisma para o TypeORM**.  
- Aplicar conceitos de **injeção de dependência**, **entidades e repositórios**.  
- Implementar **autenticação e autorização** usando **Guards e Roles**.  
- Integrar o **envio de e-mails** com templates Pug.  
- Testar rotas com **Insomnia** para validar respostas da API.

---

## 📂 **Estrutura do Projeto**

src/
├── auth/ # Módulo de autenticação (login, reset, guards)
├── user/ # CRUD de usuários e roles
├── mailer/ # Envio de e-mails com TypeORM
├── database/ # Configuração do TypeORM
├── common/ # Decorators e interceptors
├── main.ts # Ponto de entrada da aplicação
└── app.module.ts # Módulo principal


---

## ⚙️ **Como Executar Localmente**

```bash
# 1️⃣ Clonar o repositório
git clone https://github.com/A2D-Dev/api-nest-impacta-typeorm.git

# 2️⃣ Instalar as dependências
npm install

# 3️⃣ Configurar o arquivo .env
# (crie com base no .env.example)
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASS=senha
DATABASE_NAME=impacta_typeorm_db
JWT_SECRET=seu_token_aqui

# 4️⃣ Executar o servidor
npm run dev


## 🧪 Testes
```bash
npm run test
```

## 🧾 Licença
Projeto sob [MIT](./LICENSE).

## 👨‍💻 Autor
**A2D-Dev (Anderson Dantas Dias)**  
GitHub: https://github.com/A2D-Dev
