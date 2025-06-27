import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get logged-in users cart
export const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({user:req.user._id}).populate('items.product');
        if(!cart) {
            return res.status(404).json({message:'Cart not found'});
        }
        res.status(200).json({success:true, cart});
    }catch (error) {
        console.error('Get Cart Error', error.message);
        res.status(500).json({message:'Server error while fetching cart'});
    }
};

//Adding a product to cart
export const addToCart = async (req, res) => {
    const {productId, quantity} = req.body;

    try {
        let cart = await Cart.findOne({user:req.user._id});

        if(!cart) {
            cart = new Cart({
                user: req.user._id,
                items:[{product: productId,quantity}]
            });
        }else {
            const itemIndex = cart.items.findIndex(
                item => item.product.toString()=== productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({product: ProductId, quantity});
            }
        }

        const savedCart = await cart.save();
        res.status(200).json({
            success: true,
            message:'Product added to cart', cart: savedCart
        });
    }catch (error) {
        console.error('Add to Cart error', error.message);
        res.status(500).json({message:'Server error while adding to cart'});
    }
};

//Update quantity for a product
export const updateCartItem = async (req, res) => {
    const {productId, quantity} = req.body;

    try {
        const cart = await Cart.findOne({user: req.user._id});

        if (!cart){
            return res.status(404).json({message: 'Cart not found'});
        }

        const item = cart.items.find(item => item.product.toString() === productId);

        if(item) {
            item.quantity = quantity;
            const updatedCart = await cart.save();
            res.status(200).json({success: true, message: 'Cart updated', cart:updatedCart});
        } else {
            res.status(404).json({message: 'Product not found in cart'});
        }
    } catch (error) {
        console.error('Update Cart Error', error.message);
        res.status(500).json({message: 'Server error while updating cart'});
    }
};

//Remove from cart
export const removeFromCart = async(req, res) => {
    const {productId} = req.params;

    try {
        const cart = await Cart.findOne({user: req.user._id});

        if(!cart) return res.status(404).json({message:'Cart not found'});

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        const updatedCart = await cart.save();
        res.status(200).json({success:true, message:'Item removed', cart:updatedCart});
    } catch(error) {
        console.error('Remove Cart Item Error', error.message);
        res.status(500).json({message: 'Server error while removing item'});
    }
};