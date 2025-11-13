const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import User model
const Category = require('../models/Category');  // Import Category model
const Product = require('../models/Product')

// category

// show category
router.get('/categories', async (req, res) => {
    try{
        const categories = await Category.find();
        res.json(categories);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

// create category

router.post('/categories', async (req, res) => {
    try{
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

// edit category

router.put('/categories/:id', async (req, res) => {
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!category){
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

// delete category

router.delete('/categories/:id', async (req, res) => {
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category){
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted' });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

// user management

// show users
router.get('/users', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

// create user
router.post('/users', async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

// edit user
router.put('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

// delete user
router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json     ({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});


// show product

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create product 

router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//edit product

router.put('/products/:id',  async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete product

router.delete('/products/:id',  async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;