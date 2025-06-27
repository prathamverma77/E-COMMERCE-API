import express from 'express';
import {
    getUserCart,
    addToCart,
    updateCartItem,
    removeFromCart,
} from '../controllers/cart.controller.js'

import { protect } from '../middleware/auth.middleware.js';
import { isBuyer } from '../middleware/role.middleware.js';

const router = express.Router();

//applying protect & isBuyer to all routes
router.use(protect);
router.use(isBuyer);

//Routes
router.get('/', getUserCart); //view cart
router.post('/add', addToCart); //add to cart
router.put('/update', updateCartItem); //update item quantity
router.delete('/remove/:productId', removeFromCart); //remove item

export default router;