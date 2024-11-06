import express from 'express';
import { isAuthenticated } from '../middlewares/isAuth.js';
import { deleteAd, getAd, getMyAd, getMyPurchasedAds, markAsSold, postAd } from '../controllers/ad.controller.js';
import { upload } from '../helper/upload.js';

const router = express.Router();

router.get('/', getAd);

router.post('/', isAuthenticated,upload.single('image'), postAd);

router.get('/myAd', isAuthenticated, getMyAd);

router.patch('/sold/:adId', isAuthenticated, markAsSold);

router.get('/mypurchases', isAuthenticated, getMyPurchasedAds);
router.delete('/:adId', isAuthenticated, deleteAd);



export default router;
