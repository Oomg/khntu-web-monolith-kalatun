import { z } from 'zod';

export const CreateProductSchema = z.object({
  title: z.string().min(3, 'Назва товару має містити не менше 3 символів'),
  price: z.number().positive('Ціна має бути більшою за 0'),
  categoryId: z.number().int().positive()
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;