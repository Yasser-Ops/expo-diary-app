import { Router } from 'express';
import {
  create,
  detail,
  list,
  remove,
  update,
} from '../controllers/entryController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createEntrySchema, updateEntrySchema } from '../schemas/entrySchemas.js';

const router = Router();

router.use(requireAuth);

router.get('/', list);
router.post('/', validate(createEntrySchema), create);
router.get('/:id', detail);
router.put('/:id', validate(updateEntrySchema), update);
router.delete('/:id', remove);

export default router;
