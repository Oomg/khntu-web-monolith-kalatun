import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email('Некоректний email'),
  password: z.string().min(6, 'Пароль має бути мінімум 6 символів'),
});

export const LoginSchema = z.object({
  email: z.string().email('Некоректний email'),
  password: z.string().min(1, 'Пароль обовʼязковий'),
});