import Ad from "../models/ad.model.js";


export const getAd = async (req, res) => {
    try {
        const ads = await Ad.find();
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
        console.log("yo")
        const { title, description, price, location, productType } = req.body;
        const imageurl = req.file.path;
        const seller = req.user.userId; 

        console.log("img url",imageurl);

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
        return res.status(200).json({
            message: "Ad created successfully",
            ad: response
        });
    } catch (error) {
        console.error('Error in creating ad:', error);
        return res.status(500).json({
            error: "Something went wrong in creating ad",
            error
        });
    }
};

export const getMyAd = async (req, res) => {
    try {
        const userId = req.user.userId;
        const myAds = await Ad.find({ seller: userId });

        if (!myAds.length) {
            return res.status(404).json({
                message: "No ads found for this user"
            });
        }

        return res.status(200).json({
            message: "User's ads fetched successfully",
            myAds
        });
    } catch (error) {
        console.error('Error fetching user ads:', error);
        return res.status(500).json({
            error: "Something went wrong while fetching user's ads",
            error
        });
    }
};

export const markAsSold = async (req, res) => {
    try {
        const { adId } = req.params;
        const buyerId = req.user.userId;

        const ad = await Ad.findById(adId);

        if (!ad) {
            return res.status(404).json({
                error: "Ad not found"
            });
        }

        ad.status = 'sold';
        ad.soldTo = buyerId;
        await ad.save();

        return res.status(200).json({
            message: "Ad marked as sold",
            ad
        });
    } catch (error) {
        console.error('Error marking ad as sold:', error);
        return res.status(500).json({
            error: "Something went wrong while marking the ad as sold",
            error
        });
    }
};

export const getMyPurchasedAds = async (req, res) => {
    try {
        const userId = req.user.userId;
        const purchasedAds = await Ad.find({ soldTo: userId });

        if (!purchasedAds.length) {
            return res.status(404).json({
                error: "No purchased ads found for this user"
            });
        }

        return res.status(200).json({
            message: "User's purchased ads fetched successfully",
            purchasedAds
        });
    } catch (error) {
        console.error('Error fetching purchased ads:', error);
        return res.status(500).json({
            error: "Something went wrong while fetching user's purchased ads",
            error
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

        return res.status(200).json({
            message: "Ad deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting ad:', error);
        return res.status(500).json({
            error: "Something went wrong while deleting the ad",
            error
        });
    }
};