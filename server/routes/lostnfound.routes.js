import express from 'express';
import { isAuthenticated } from '../middlewares/isAuth.js';
import { claimItem, createLostAndFoundItem, getClaimedItems, getMyClaimedItems, getMyUploadedItems, getUnclaimedItems, unclaimItem } from '../controllers/lostnfound.controller.js';

const router = express.Router();

router.post('/create', isAuthenticated,createLostAndFoundItem);

router.post('/claim/:id',isAuthenticated, claimItem);

router.post('/unclaim/:id',isAuthenticated, unclaimItem);

router.get('/claimed', getClaimedItems);

router.get('/unclaimed', getUnclaimedItems);

router.get('/my-claimed', isAuthenticated,getMyClaimedItems);

router.get('/my-uploaded', isAuthenticated,getMyUploadedItems);    

export default router;
