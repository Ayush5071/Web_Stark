import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Ad from '../models/ad.model.js';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getad = async (req, res) => {
    try {
        const ads = await Ad.find(); // Fetch all ads from the database
        if (!ads) {
            return res.status(404).json({
                message: "No ads found"
            });
        }
        return res.status(200).json({
            message: "Ads fetched successfully",
            ads
        });
    } catch (error) {
        console.error('Error fetching ads:', error);
        return res.status(500).json({
            message: "Something went wrong while fetching ads",
            error
        });
    }
};

export const postad = async (req, res) => {
    try {
        
        const { title, description, price, location,productType } = req.body;
        const imageurl = req.file.path; 

        const existad = await Ad.findOne({ title });
        if (existad) {
            return res.status(400).json({
                message: "Ad with this title already exists",
            });
        }

        // Create a new ad with the image URL
        const newad = new Ad({
            title,
            description,
            imageurl,
            price,
            productType,
            location,
            seller,
            // object of seller should be in rebody
        });

        const response = await newad.save();
        return res.status(200).json({
            message: "Ad created successfully",
            ad: response
        });
    } catch (error) {
        console.error('Error in creating ad:', error);
        res.status(500).json({
            message: "Something went wrong in creating ad",
            error
        });
    }
}

// export default {getad,postad}
