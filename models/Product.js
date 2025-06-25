import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,

        },
        tags: [String],
        stock:{
            type: Number,
            required: true,
            default: 0,
        },
        image:{
            type: String, //later for cloudinary or local url
            default: '',
        },
    },
    {timestamps: true}
);

const Product = mongoose.model('Product', productSchema);

export default Product;