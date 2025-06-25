import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const{title, description, price, category, tags, stock, image}=req.body;

        //create product with seller ID from req.user
        const product = new Product({
            seller: req.user._id,
            title,
            description,
            price,
            category,
            tags,
            stock,
            image,
        });

        const savedProduct = await product.save();
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: savedProduct,
        });
    } catch (error){
        console.error('Create Product Error', error.message);
        res.status(500).json({message:'Server error while creating product'});
    }
};