import mongoose from 'mongoose';
import dotenv from 'dotenv';

import users from './data/users.js';
import { products } from './data/products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminId = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminId };
    });
    await Product.insertMany(sampleProducts);
    console.log('Data imported');
    process.exit();
  } catch (e) {
    console.log(`Got error insert data ${e}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data removed');
    process.exit();
  } catch (e) {
    console.log(`Got error remove data ${e}`);
    process.exit(1);
  }
};

if (process.argv[2] == '-d') {
  destroyData();
} else {
  importData();
}
