import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3031;

app.use('/api/products', productRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Bob-shop server started in ${process.env.NODE_ENV} mode on port ${PORT}`));
