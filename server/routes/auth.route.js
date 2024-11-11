import express from "express"
import { isAuthenticated } from "../middlewares/isAuth.js";
import { getProfile, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { verifyOTP } from "../controllers/otp.controller.js";

const router = express.Router();

router.post('/register',registerUser);

router.post('/login',loginUser);

router.post('/verify-otp/:id', verifyOTP);

router.get('/logout',logoutUser);

router.get('/profile',isAuthenticated,getProfile);

export default router;