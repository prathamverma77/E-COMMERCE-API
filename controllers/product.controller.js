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

//FOR GET PRODUCTS LOGIC
export const getAllProducts = async (req, res)=> {
    try{
        const products = await Product.find()
        .populate('seller', 'name email')//showing the seller info name email
        .sort({createdAt: -1});// optional: latest first

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    }catch (error) {
        console.error('Fetch Products Error', error.message);
        res.status(500).json({message:'Server error while fetching products'});
    }
};

//FOR GET SINGLE PRODUCT BY ID
export const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        .populate('seller', 'name email');
        if (!product) {
            return res.status(404).josn({message:'Product not found'});
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error('Get Product Error', error.message);
        res.status(500).json({message:'Server error while fetching product'});
    }
};

//UPDATING PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        //checking if product exists
        if(!product) {
            return res.status(404).json({message:'Product not found'});
        }

        //only seller who created it can update
        if(product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({message:'Access denied: Not your Product'});

        }
        //Update only allowed fields
        const fields = [
            'title',
            'description',
            'price',
            'category',
            'tags',
            'stock',
            'image'
        ];
        fields.forEach((field) => {
            if (req.body[field] !==undefined){
                product[field] = req.body[field];
            }
        });

        const updatedProduct = await product.save();
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct,
        });
    }catch (error) {
        console.error('upadte Product Error', error.message);
        res.status(500).json({message:'Server error while updating product'});
    }
};

//DELETING PRODUCT
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        //Produt not found 
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        //Only the seller who created it can delete
        if(product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({message:'Access denied: Not your product'});
        }

        await product.deleteOne(); 

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    }catch (error) {
        console.error('Delete Product Error:', error.message);
        res.status(500).json({message:'Server error while deleting product'});
    }
};