import dotenv from "dotenv";
import razorpay from 'razorpay';
dotenv.config();

export const createRazorpayInstance = () => {
    console.log("inside rp instance ->",process.env.RAZORPAY_KEY_ID);
    return new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
}
