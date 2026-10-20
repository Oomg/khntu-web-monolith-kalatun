import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateProductSchema } from '../dto/product.dto';

const router = Router();

// GET-запит віддає список з пагінацією
router.get('/', ProductController.getAll);

// POST-запит спочатку проходить перевірку (validateBody), і тільки якщо все ок — йде в контролер
router.post('/', validateBody(CreateProductSchema), ProductController.create);

export default router;