import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { isSeller } from '../middleware/role.middleware.js';
import { getAllProducts,createProduct,getSingleProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();;

router.post('/', protect, isSeller, createProduct);//Only sellers can access
router.get('/', getAllProducts);//getting products info
router.get('/:id', getSingleProduct);//view one product by ID
router.put('/:id', protect, isSeller, updateProduct)
router.delete('/:id', protect, isSeller, deleteProduct);
export default router;