const express = require('express');

const products = require('./data/products');

const app = express();
const PORT = 3031;

app.get('/api', (req, res) => {
  res.send('API is working');
});
app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(PORT, () => console.log(`Bob-shop server started on port ${PORT}`));
