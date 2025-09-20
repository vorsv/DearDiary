const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Import routes
const diaryRoutes = require('./routes/diary');
const goalsRoutes = require('./routes/goals');
const promptsRoutes = require('./routes/prompts');

// Use routes
app.use('/api/diary', diaryRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/prompts', promptsRoutes);

// Serve the main HTML file for all other routes (for SPA)
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});