const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import User model
const Category = require('../models/Category');  // Import Category model

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