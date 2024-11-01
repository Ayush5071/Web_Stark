import express from "express";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { getActiveUsers, getMessage, postMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:id",isAuthenticated,getMessage);

router.post("/send/:id",isAuthenticated,postMessage);

router.get("/active",isAuthenticated,getActiveUsers);

export default router;