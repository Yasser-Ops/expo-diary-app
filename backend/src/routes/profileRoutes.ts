import { Router } from 'express';
import { me, update } from '../controllers/profileController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema } from '../schemas/profileSchemas.js';

const router = Router();

router.use(requireAuth);

router.get('/me', me);
router.put('/me', validate(updateProfileSchema), update);

export default router;
