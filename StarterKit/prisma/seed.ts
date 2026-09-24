import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Починаємо заповнення бази даних...');

  // Створюємо кілька жанрів
  const actionGenre = await prisma.genre.create({
    data: { name: 'Бойовик' }
  });

  const comedyGenre = await prisma.genre.create({
    data: { name: 'Комедія' }
  });

  // Створюємо кілька фільмів, прив'язуючи їх до жанрів
  await prisma.movie.createMany({
    data: [
      { title: 'Дедпул і Росомаха', durationMin: 128, genreId: actionGenre.id },
      { title: 'Джентльмени', durationMin: 113, genreId: actionGenre.id },
      { title: 'Сам удома', durationMin: 103, genreId: comedyGenre.id }
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