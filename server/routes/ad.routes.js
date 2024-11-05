import express from 'express';
import { isAuthenticated } from '../middlewares/isAuth.js';
import { deleteAd, getAd, getMyAd, getMyPurchasedAds, markAsSold, postAd } from '../controllers/ad.controller.js';

const router = express.Router();

router.get('/', getAd);

router.post('/', isAuthenticated, postAd);

router.get('/myAd', isAuthenticated, getMyAd);
router.patch('/sold/:adId', isAuthenticated, markAsSold);

router.get('/mypurchases', isAuthenticated, getMyPurchasedAds);
router.delete('/:adId', isAuthenticated, deleteAd);



export default router;
