import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { isSeller } from '../middleware/role.middleware.js';
import { createProduct } from '../controllers/product.controller.js';

const router = express.Router();;

router.post('/', protect, isSeller, createProduct);//Only sellers can access

export default router;