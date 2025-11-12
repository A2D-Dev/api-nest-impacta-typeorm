<p align="center">
  <img src="./banner.png" alt="Banner - API NestJS + TypeORM + MySQL - Impacta" width="100%">
</p>

# 🧠 API NestJS + TypeORM + MySQL - Impacta

API desenvolvida com **NestJS**, **TypeORM** e **MySQL**, aplicando boas práticas de arquitetura, autenticação e segurança.  
Projeto acadêmico da **Faculdade Impacta** — autoria **A2D-Dev (Anderson Dantas Dias)**.

---

## 🚀 Tecnologias e Ferramentas

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-ffb400?style=for-the-badge&logo=typeorm&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![Nodemailer](https://img.shields.io/badge/Nodemailer-007C89?style=for-the-badge&logo=maildotru&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)

---

## 📂 Estrutura de Pastas (sugerida)

📦 api-nest-impacta-typeorm
┣ 📂 src
┃ ┣ 📂 user
┃ ┣ 📂 auth
┃ ┣ 📂 database
┃ ┣ 📂 mailer
┃ ┣ 📂 common
┃ ┗ main.ts
┣ 📂 test
┣ .env.example
┣ package.json
┣ README.md
┗ tsconfig.json


---

## 📦 Instalação

```bash
git clone https://github.com/A2D-Dev/api-nest-impacta-typeorm.git
cd api-nest-impacta-typeorm
npm install

⚙️ Executando
# Desenvolvimento (hot-reload)
npm run start:dev


Aplicação em:
👉 http://localhost:3000

🌱 Variáveis de Ambiente

Crie um arquivo .env com base no .env.example:

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASS=123456
DATABASE_NAME=impacta_typeorm
JWT_SECRET=impacta2025
EMAIL_USER=seu_email@ethereal.email
EMAIL_PASS=sua_senha

🔐 Funcionalidades Implementadas

Autenticação com JWT (login, recuperação e redefinição de senha)

Controle de acesso (RBAC) com RoleGuard

Envio de e-mails (Nodemailer + Ethereal)

Uploads de arquivos (Multer)

Limite de requisições (Throttler) para segurança

Validação de dados com class-validator

Banco de dados relacional com TypeORM

🧩 Principais Scripts
Comando	Descrição
npm run start:dev	Inicia o servidor em modo desenvolvimento
npm run typeorm migration:run	Executa as migrations pendentes
npm run typeorm migration:generate -- name	Cria uma nova migration
npm run test	Executa os testes automatizados
🧠 Projeto Anterior (Base Prisma)

🔗 A2D-Dev/api-nest-impacta

Este projeto é a evolução direta do Milestone 5, agora migrando de Prisma para TypeORM.

🧾 Licença

Projeto sob MIT
.

👨‍💻 Autor

A2D-Dev (Anderson Dantas Dias)
GitHub: https://github.com/A2D-Dev