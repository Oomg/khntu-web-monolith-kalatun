import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Починаємо заповнення бази даних...');

  const category = await prisma.category.create({
    data: { name: 'Електроніка' }
  });

  await prisma.product.createMany({
    data: [
      { title: 'Ноутбук Dell', price: 30000, categoryId: category.id },
      { title: 'Монітор LG 27"', price: 9000, categoryId: category.id }
    ]
  });

  console.log('✅ Базу успішно заповнено тестовими даними!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });