import express from 'express'
import { getad, postad } from '../controllers/ad.controller.js'
import { upload } from '../helper/upload.js'
const router = express.Router()
// for getting all ads

router.get('/getad', getad)

// for creating ad
router.post('/postad', upload.single('image'), postad);
export default router;