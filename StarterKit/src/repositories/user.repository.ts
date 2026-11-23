import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: { email: string; password: string; role?: string }) {
    return prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        role: data.role ?? 'USER',
      },
    });
  }
}