const fs = require('fs').promises;
const path = require('path');

// Directory to store goals
const GOALS_DIR = path.join(__dirname, '../data/goals');

// Initialize data directory
async function init() {
  try {
    await fs.access(GOALS_DIR);
  } catch (error) {
    // Directory doesn't exist, create it
    await fs.mkdir(GOALS_DIR, { recursive: true });
  }
}

// Save a goal to a file
async function saveGoal(goal) {
  // Ensure data directory exists
  await init();
  
  // Create filename based on goal ID
  const filename = `${goal.id}.json`;
  const filepath = path.join(GOALS_DIR, filename);
  
  // Write goal to file
  await fs.writeFile(filepath, JSON.stringify(goal, null, 2));
}

// Get all goals
async function getGoals() {
  // Ensure data directory exists
  await init();
  
  // Read all files in the goals directory
  const files = await fs.readdir(GOALS_DIR);
  
  // Filter only JSON files
  const jsonFiles = files.filter(file => path.extname(file) === '.json');
  
  // Read and parse each file
  const goals = [];
  for (const file of jsonFiles) {
    try {
      const filepath = path.join(GOALS_DIR, file);
      const data = await fs.readFile(filepath, 'utf8');
      goals.push(JSON.parse(data));
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }
  
  // Sort goals by creation date (newest first)
  goals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  return goals;
}

// Get a specific goal by ID
async function getGoalById(id) {
  // Ensure data directory exists
  await init();
  
  // Create filename based on ID
  const filename = `${id}.json`;
  const filepath = path.join(GOALS_DIR, filename);
  
  try {
    // Read and parse file
    const data = await fs.readFile(filepath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or couldn't be read
    return null;
  }
}

// Update a goal
async function updateGoal(id, updates) {
  const goal = await getGoalById(id);
  
  if (!goal) {
    return null;
  }
  
  // Apply updates
  Object.assign(goal, updates);
  
  // Save updated goal
  await saveGoal(goal);
  
  return goal;
}

module.exports = { saveGoal, getGoals, getGoalById, updateGoal };