import express from "express";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { createAuction, getActiveAuctions, getMyAuction, placeBid, wonAuction } from "../controllers/auction.controller.js";
const router = express.Router();

router.post('/create',isAuthenticated,createAuction);

router.get('/active',isAuthenticated,getActiveAuctions);

router.post('/bid/:id',isAuthenticated,placeBid);

router.get('/myAuction',isAuthenticated, getMyAuction);

router.get('/wonAuction',isAuthenticated,wonAuction);


export default router;