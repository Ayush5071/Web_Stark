
import { Router } from 'express';
import { capture, prodectdataofuser } from '../controllers/interaction.controller.js';
const router = Router();


router.post('/capture-interaction',capture );
router.get('/interactions', prodectdataofuser);
export default router;