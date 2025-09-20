// Guided journaling prompts categorized by themes
const journalPrompts = {
  gratitude: [
    "What are three things you're grateful for today?",
    "Who made a positive impact on your day and how?",
    "What simple pleasures did you enjoy today?",
    "How have you grown or learned something new recently?",
    "What challenges have you overcome that you're proud of?"
  ],
  anxiety: [
    "What thoughts are causing you anxiety right now?",
    "What evidence do you have that supports or contradicts these anxious thoughts?",
    "What would you tell a friend who had these same concerns?",
    "What small step can you take today to reduce your anxiety?",
    "When did you last feel truly calm? What were you doing?"
  ],
  selfCompassion: [
    "What would you say to a friend who made the same mistake you made?",
    "What are three kind things you can say about yourself?",
    "What are your strengths and talents?",
    "How have you shown resilience in difficult times?",
    "What do you need right now to feel cared for and supported?"
  ],
  reflection: [
    "What did you learn about yourself today?",
    "What would you do differently if you could relive today?",
    "What are your core values and how did you live by them today?",
    "What moments brought you joy today?",
    "How have your priorities shifted recently?"
  ],
  growth: [
    "What new skill would you like to develop and why?",
    "What habits would you like to change and what steps can you take?",
    "Who inspires you and what qualities do they have that you admire?",
    "What does success mean to you personally?",
    "What fears are holding you back and how can you address them?"
  ]
};

// Function to get a random prompt from a category
function getRandomPrompt(category) {
  const prompts = journalPrompts[category];
  if (!prompts || prompts.length === 0) {
    return "Take a few moments to reflect on your day.";
  }
  
  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
}

// Function to get all categories
function getCategories() {
  return Object.keys(journalPrompts);
}

// Function to get all prompts (for debugging)
function getAllPrompts() {
  return journalPrompts;
}

module.exports = { getRandomPrompt, getCategories, getAllPrompts };