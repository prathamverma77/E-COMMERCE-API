import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js'
import cors from "cors";
import uploadRoutes from './routes/upload.routes.js';
import cartRoutes from './routes/cart.routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

app.use('/api/upload', uploadRoutes);

app.use('/api/cart', cartRoutes);


const PORT = process.env.PORT || 7000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));