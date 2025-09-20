const express = require('express');
const router = express.Router();
const { saveGoal, getGoals, getGoalById, updateGoal } = require('../utils/goalManager');

// POST /api/goals - Create a new goal
router.post('/', async (req, res) => {
  try {
    const { title, description, targetDate } = req.body;
    
    // Create goal object
    const goal = {
      id: Date.now().toString(),
      title,
      description,
      targetDate: targetDate || null,
      createdAt: new Date().toISOString(),
      completed: false,
      progress: 0 // percentage
    };
    
    // Save goal to file system
    await saveGoal(goal);
    
    res.status(201).json({ 
      message: 'Goal created successfully',
      goal
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to create goal',
      details: error.message
    });
  }
});

// GET /api/goals - Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await getGoals();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve goals',
      details: error.message
    });
  }
});

// GET /api/goals/:id - Get a specific goal
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await getGoalById(id);
    
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    res.json(goal);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve goal',
      details: error.message
    });
  }
});

// PUT /api/goals/:id - Update a goal
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const goal = await updateGoal(id, updates);
    
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    res.json({ 
      message: 'Goal updated successfully',
      goal
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to update goal',
      details: error.message
    });
  }
});

module.exports = router;