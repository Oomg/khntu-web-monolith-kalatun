import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductRepository {
  async findPaginated(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { id: 'desc' }
      }),
      prisma.product.count()
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
}