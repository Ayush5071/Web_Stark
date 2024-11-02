import express from 'express'
import { getad, postad } from '../controllers/ad.controller.js'
import { upload } from '../helper/upload.js'
import { isAuthenticated } from '../middlewares/isAuth.js'
const router = express.Router()

router.get('/getad',isAuthenticated, getad)

// for creating ad
router.post('/postad', isAuthenticated, upload.single('image'), postad);

export default router;