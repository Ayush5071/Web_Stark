import express from 'express';
import { followUser, unfollowUser, updatePassword, updateUserProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuth.js';
import { upload } from '../helper/upload.js';

const router = express.Router();

router.put('/profile', isAuthenticated,upload.single('image'), updateUserProfile); 
router.put('/password', isAuthenticated, updatePassword);  
router.put('/follow/:userId', isAuthenticated, followUser); 
router.put('/unfollow/:userId', isAuthenticated, unfollowUser);

export default router;
