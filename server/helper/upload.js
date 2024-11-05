import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

export const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
    console.log('Image upload route called');

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
        return res.status(200).json({ imageurl: req.file.path });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    }
});

export default router;
