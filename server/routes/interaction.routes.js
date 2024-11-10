
import { Router } from 'express';
import { capture, prodectdataofuser } from '../controllers/interaction.controller.js';
import { isAuthenticated } from '../middlewares/isAuth.js';
const router = Router();


router.post('/capture-interaction',isAuthenticated,capture );
router.get('/interactions',isAuthenticated, prodectdataofuser);
export default router;