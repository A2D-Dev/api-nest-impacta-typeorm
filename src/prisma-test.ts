import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧠 Testando campos do modelo User...\n');

  // Conecta ao banco
  await prisma.$connect();

  // Mostra os campos do modelo "user"
  console.log(Object.keys((prisma as any).user.fields));

  // Desconecta
  await prisma.$disconnect();

  console.log('\n✅ Teste finalizado!');
}

main().catch((e) => console.error(e));
