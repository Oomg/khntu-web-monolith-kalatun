import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateProductSchema } from '../dto/product.dto';
import { authGuard } from '../middlewares/auth.middleware';
import { roleGuard } from '../middlewares/role.middleware';

const router = Router();

// Публічний ендпоінт
router.get('/', ProductController.getAll);

// Захищений ендпоінт тільки для ADMIN
router.post(
  '/',
  authGuard,
  roleGuard(['ADMIN']),
  validateBody(CreateProductSchema),
  ProductController.create
);

export default router;