const express = require('express');
const router = express.Router();
const { getRandomPrompt, getCategories } = require('../utils/journalPrompts');

// GET /api/prompts/categories - Get all prompt categories
router.get('/categories', (req, res) => {
  try {
    const categories = getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve prompt categories',
      details: error.message
    });
  }
});

// GET /api/prompts/:category - Get a random prompt from a specific category
router.get('/:category', (req, res) => {
  try {
    const { category } = req.params;
    const prompt = getRandomPrompt(category);
    
    if (!prompt) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json({ category, prompt });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve prompt',
      details: error.message
    });
  }
});

// GET /api/prompts - Get a random prompt from any category
router.get('/', (req, res) => {
  try {
    const categories = getCategories();
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const prompt = getRandomPrompt(randomCategory);
    
    res.json({ category: randomCategory, prompt });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve prompt',
      details: error.message
    });
  }
});

module.exports = router;