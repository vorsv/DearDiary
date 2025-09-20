// Personalized support messages based on detected emotions
const supportMessages = {
  happy: [
    "It's wonderful to see you're feeling happy today!",
    "Your positive energy is contagious! Keep shining!",
    "Cherish these happy moments. They're precious.",
    "Your happiness brings joy to those around you.",
    "Keep up the great work on maintaining this positive outlook!"
  ],
  sad: [
    "It's okay to feel sad sometimes. This feeling will pass.",
    "Remember that it's okay to not be okay. You're not alone.",
    "Take some time for self-care today. You deserve it.",
    "This difficult time will make you stronger. Keep going.",
    "Reach out to someone you trust. Sharing your feelings helps."
  ],
  neutral: [
    "Taking time to reflect is valuable. Keep journaling!",
    "Balance is important. Your neutral state is a good foundation.",
    "Every day doesn't have to be extraordinary. Normal is okay too.",
    "Use this calm state to plan your next steps.",
    "A neutral state can be a peaceful place to recharge."
  ],
  mixed: [
    "It's normal to have mixed emotions. Life is complex.",
    "Having mixed feelings shows you're processing your experiences.",
    "Embrace the complexity of your emotions. It's part of being human.",
    "These mixed emotions might be telling you something important.",
    "Give yourself permission to feel all your emotions without judgment."
  ]
};

// Function to get a personalized support message based on emotion
function getSupportMessage(emotion) {
  const messages = supportMessages[emotion] || supportMessages.neutral;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// Function to generate personalized response
function generatePersonalizedResponse(emotionAnalysis) {
  const { emotion } = emotionAnalysis;
  const supportMessage = getSupportMessage(emotion);
  
  // Basic mental health resources
  const resources = [
    "Crisis Text Line: Text HOME to 741741",
    "National Suicide Prevention Lifeline: 988",
    "SAMHSA National Helpline: 1-800-662-4357"
  ];
  
  return {
    message: supportMessage,
    resources: emotion === 'sad' ? resources : [],
    encouragement: "Remember, you're doing better than you think."
  };
}

module.exports = { generatePersonalizedResponse };