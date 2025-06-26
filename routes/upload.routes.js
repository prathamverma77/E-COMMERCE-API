import express from 'express';
import upload from '../middleware/upload.middleware.js';
import { isSeller } from '../middleware/role.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/image', protect, isSeller, upload.single('image'), (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Image uploaded',
        imageUrl: req.file.path, //cloudinary URL
    });
});

export default router;