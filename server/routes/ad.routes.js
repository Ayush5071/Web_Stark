import express from 'express';
import { isAuthenticated } from '../middlewares/isAuth.js';
import { addReviewToAd, deleteAd, getActiveAds, getAd, getAdById, getMyAd, getMyPurchasedAds, likeAd, markAsSold, postAd } from '../controllers/ad.controller.js';
import { upload } from '../helper/upload.js';

const router = express.Router();

router.get('/', getAd);

router.post('/', isAuthenticated,upload.single('image'), postAd);

router.get('/myAd', isAuthenticated, getMyAd);

router.get('/unique/:adId',isAuthenticated, getAdById);

router.post('/sold/:adId', isAuthenticated, markAsSold);

router.get('/mypurchases', isAuthenticated, getMyPurchasedAds);

router.get('/active',getActiveAds);

router.post('/:adId', isAuthenticated, deleteAd);

router.post('/review/:adId',isAuthenticated, addReviewToAd);

router.post('/like/:adId',isAuthenticated, likeAd);





export default router;
