import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { products } from './data/products.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3031;

app.get('/api', (req, res) => {
  res.send('API is working');
});
app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get('/api/products/:id', (req, res) => {
  const product = find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(PORT, () => console.log(`Bob-shop server started in ${process.env.NODE_ENV} mode on port ${PORT}`));
