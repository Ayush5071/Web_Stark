import express from "express";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { createAuction, getActiveAuctions } from "../controllers/auction.controller.js";
const router = express.Router();

router.post('/create',isAuthenticated,createAuction);

router.get('/active',isAuthenticated,getActiveAuctions);

export default router;