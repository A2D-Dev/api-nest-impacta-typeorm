// src/prisma-diagnostic.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Iniciando diagnóstico do Prisma...\n");

  // 1️⃣ Testar conexão
  try {
    await prisma.$connect();
    console.log("✅ Conectado com sucesso ao banco de dados!\n");
  } catch (err) {
    console.error("❌ Erro ao conectar no banco:", err);
    process.exit(1);
  }

  // 2️⃣ Verificar modelo User
  try {
    const userFields = Object.keys((prisma as any).user.fields);
    console.log("📋 Campos encontrados no modelo User:");
    console.table(userFields);
  } catch (err) {
    console.error("⚠️ Não foi possível ler os campos do modelo User:", err);
  }

  // 3️⃣ Testar se consegue listar usuários
  try {
    const users = await prisma.user.findMany({ take: 3 });
    console.log("\n👀 Amostra de registros (até 3):");
    console.log(users);
  } catch (err) {
    console.error("⚠️ Erro ao tentar ler usuários:", err);
  }

  // 4️⃣ Finalizar conexão
  await prisma.$disconnect();
  console.log("\n🏁 Diagnóstico concluído!");
}

main();
