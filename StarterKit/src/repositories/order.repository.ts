import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderRepository {
  async createOrderTx(userId: number, items: Array<{ productId: number, quantity: number }>) {
    return await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        
        if (!product) throw new Error(`Товар з ID ${item.productId} не знайдено`);

        totalAmount += product.price * item.quantity;

        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: product.price // Фіксація історичної ціни!
        });
      }

      return await tx.order.create({
        data: {
          userId,
          totalAmount,
          items: { create: orderItemsData }
        },
        include: { items: true }
      });
    });
  }
}