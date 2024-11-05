import express from 'express';
import { followUser, unfollowUser, updatePassword, updateUserProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuth.js';

const router = express.Router();

router.put('/profile', isAuthenticated, updateUserProfile); 
router.put('/password', isAuthenticated, updatePassword);  
router.put('/follow/:userId', isAuthenticated, followUser); 
router.put('/unfollow/:userId', isAuthenticated, unfollowUser);

export default router;
