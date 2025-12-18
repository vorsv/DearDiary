const express = require('express');
const router = express.Router();
const { analyzeEmotion } = require('../utils/emotionAnalyzer');
const { generatePersonalizedResponse } = require('../utils/personalizedSupport');
const { saveEntry, getEntries, getEntryById } = require('../utils/fileManager');

// POST /api/diary/entries - Create a new diary entry
router.post('/entries', async (req, res) => {
  try {
    const { content, date } = req.body;
    
    // Analyze emotion in the entry
    const emotionAnalysis = analyzeEmotion(content);
    
    // Generate personalized support response
    const supportResponse = generatePersonalizedResponse(emotionAnalysis, content);
    
    // Create entry object
    const entry = {
      id: Date.now().toString(),
      content,
      date: date || new Date().toISOString(),
      emotion: emotionAnalysis,
      supportResponse
    };
    
    // Save entry to file system
    await saveEntry(entry);
    
    res.status(201).json({ 
      message: 'Diary entry created successfully',
      entry
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to create diary entry',
      details: error.message
    });
  }
});

// GET /api/diary/entries - Get all diary entries
router.get('/entries', async (req, res) => {
  try {
    const entries = await getEntries();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve diary entries',
      details: error.message
    });
  }
});

// GET /api/diary/entries/:id - Get a specific diary entry
router.get('/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await getEntryById(id);
    
    if (!entry) {
      return res.status(404).json({ error: 'Diary entry not found' });
    }
    
    res.json(entry);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve diary entry',
      details: error.message
    });
  }
});

module.exports = router;