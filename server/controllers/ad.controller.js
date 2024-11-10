import { createRazorpayInstance } from "../helper/razorPayConfig.js";
import Ad from "../models/ad.model.js";
import User from "../models/user.model.js";

const razorpayInstance = createRazorpayInstance();

export const getAd = async (req, res) => {
    try {
        const ads = await Ad.find().populate('seller', 'username');  // Populate seller info
        if (!ads.length) {
            return res.status(404).json({
                error: "No ads found"
            });
        }
        return res.status(200).json(ads);
    } catch (error) {
        console.error('Error fetching ads:', error);
        return res.status(500).json({
            error: "Something went wrong while fetching ads",
            error
        });
    }
};

export const postAd = async (req, res) => {
    try {
        const { title, description, price, location, productType } = req.body;
        console.log("title -",title);
        const imageurl = req.file.path;
        console.log(imageurl,"img to  agyi");
        const seller = req.user.userId;

        console.log("img url", imageurl);

        const existingAd = await Ad.findOne({ title });
        if (existingAd) {
            return res.status(400).json({
                error: "An ad with this title already exists",
            });
        }

        const newAd = new Ad({
            title,
            description,
            imageurl,
            price,
            productType,
            location,
            seller,
            status: 'active'
        });

        const response = await newAd.save();

        const user = await User.findById(seller);
        user.ads.push(newAd._id);
        await user.save();

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error in creating ad:', error);
        return res.status(500).json({
            error: "Something went wrong in creating ad"
        });
    }
};

export const getMyAd = async (req, res) => {
    try {
        const userId = req.user.userId;
        const myAds = await Ad.find({ seller: userId })
            .populate('seller', 'username')  
            .populate('likes.user', 'username') 
            .populate('reviews.user', 'username'); 

        if (!myAds.length) {
            return res.status(200).json({
                message: "No ads found for this user"
            });
        }

        return res.status(200).json(myAds);
    } catch (error) {
        console.error('Error fetching user ads:', error);
        return res.status(500).json({
            error: "Something went wrong while fetching user's ads",
            error
        });
    }
};

export const adBuy = async (req, res) => {
    try {
        const { adId } = req.params;
        const { price } = req.body;

        const ad = await Ad.findById(adId);
        if (!ad) {
            return res.status(404).json({ error: "Ad not found" });
        }

        const options = {
            amount: price * 100,  // Amount in paise (Razorpay format)
            currency: "INR",
            receipt: `receipt_order_${ad._id}`,
        };

        try {
            const order = await razorpayInstance.orders.create(options);
            console.log("Order response ->", order);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Order creation failed",
                error: error.message,
            });
        }

    } catch (error) {
        console.log("Error in initiating payment:", error);
        res.status(500).json({
            error: "Something went wrong while starting the payment",
        });
    }
};

export const markAsSold = async (req, res) => {
    try {
        const { adId } = req.params;
        const { order_id, payment_id, signature } = req.body;
        const buyerId = req.user.userId;
        const secret = process.env.RAZORPAY_KEY_SECRET;

        // Verifying the payment signature
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(`${order_id}|${payment_id}`);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature !== signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }

        const ad = await Ad.findById(adId);
        if (!ad) {
            return res.status(404).json({
                error: "Ad not found",
            });
        }

        // Mark the ad as sold and save the buyer info
        ad.status = "sold";
        ad.soldTo = buyerId;
        await ad.save();

        // Update the user's purchasedAds list
        const user = await User.findById(buyerId);
        user.purchasedAds.push(ad._id);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Payment verified and ad marked as sold",
            ad,
        });
    } catch (error) {
        console.error("Error marking ad as sold:", error);
        return res.status(500).json({
            error: "Something went wrong while marking the ad as sold",
        });
    }
};

export const getMyPurchasedAds = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log(userId);

        const purchasedAds = await Ad.find({ soldTo: userId })
            .populate('seller', 'username')  
            .populate('likes.user', 'username')  
            .populate('reviews.user', 'username'); 

        return res.status(200).json(purchasedAds || []);  
    } catch (error) {
        console.error('Error fetching purchased ads:', error);
        return res.status(500).json({
            error: "Something went wrong while fetching user's purchased ads"
        });
    }
};


export const deleteAd = async (req, res) => {
    const { adId } = req.params;
    const userId = req.user.userId;

    try {
        const ad = await Ad.findById(adId);

        if (!ad) {
            return res.status(404).json({
                error: "Ad not found"
            });
        }

        if (ad.seller.toString() !== userId) {
            return res.status(403).json({
                error: "You are not authorized to delete this ad"
            });
        }

        await Ad.findByIdAndDelete(adId);

        return res.status(200).json(ad); 
    } catch (error) {
        console.error('Error deleting ad:', error);
        return res.status(500).json({
            error: "Something went wrong while deleting the ad",
            error
        });
    }
};

export const getActiveAds = async (req, res) => {
    try {
        const activeAds = await Ad.find({ status: 'active' })
            .populate('seller', 'username');  
        if (!activeAds.length) {
            return res.status(404).json({ error: "No active ads found" });
        }
        return res.status(200).json(activeAds); 
    } catch (error) {
        console.error('Error fetching active ads:', error);
        return res.status(500).json({ error: "Something went wrong while fetching active ads" });
    }
};

export const addReviewToAd = async (req, res) => {
    try {
        const { adId } = req.params;
        const { comment } = req.body;
        const userId = req.user.userId;

        const ad = await Ad.findById(adId);
        if (!ad) {
            return res.status(404).json({ error: "Ad not found" });
        }

        await ad.addReview(userId, comment);

        return res.status(200).json(ad);  
    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ error: "Something went wrong while adding review" });
    }
};

export const likeAd = async (req, res) => {
    try {
        const { adId } = req.params;
        const userId = req.user.userId;

        const ad = await Ad.findById(adId);
        if (!ad) {
            return res.status(404).json({ error: "Ad not found" });
        }

        await ad.likeAd(userId); // Toggle like on ad

        return res.status(200).json(ad);  // Send the updated ad directly
    } catch (error) {
        console.error('Error liking ad:', error);
        return res.status(500).json({ error: "Something went wrong while liking the ad" });
    }
};

export const getAdById = async (req, res) => {
    try {
        const { adId } = req.params;

        const ad = await Ad.findById(adId)
            .populate('seller', 'username') 
            .populate('likes.user', 'username')  
            .populate('reviews.user', 'username');  

        if (!ad) {
            return res.status(404).json({
                error: "Ad not found"
            });
        }

        return res.status(200).json(ad); 
    } catch (error) {
        console.error('Error fetching individual ad:', error);
        return res.status(500).json({
            error: "Something went wrong while fetching the ad details",
            error
        });
    }
};
