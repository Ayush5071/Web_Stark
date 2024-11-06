import express from 'express';
import { isAuthenticated } from '../middlewares/isAuth.js';
import { addAdToStore, createStore, deleteStore, getAllStores, getMyStore, removeAdFromStore } from '../controllers/store.controller.js';

const router = express.Router();


router.post('/create', isAuthenticated, createStore);

router.get('/mystore', isAuthenticated, getMyStore);

router.get('/allstores', getAllStores);

router.post('/add-ad', isAuthenticated, addAdToStore);

router.delete('/remove-ad/:adId', isAuthenticated, removeAdFromStore);

router.delete('/delete-store', isAuthenticated, deleteStore);

export default router;
