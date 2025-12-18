// Personalized support messages based on detected emotions with Japanese-inspired wisdom
const supportMessages = {
  happy: [
    "Your joy is like cherry blossoms in spring - beautiful and fleeting. Cherish this moment.",
    "Like the sun breaking through clouds, your happiness brings light to the world around you.",
    "In the Japanese tradition of 'ikigai', your happiness may be hinting at your purpose. What brings you this joy?",
    "As the Japanese say, 'Fall down seven times, stand up eight.' Your resilience creates this happiness.",
    "Your positive energy is like a gentle breeze through a bamboo forest - calming and uplifting."
  ],
  sad: [
    "Like the changing seasons, sadness is temporary. Even winter gives way to spring.",
    "The Japanese concept of 'ganbaru' reminds us to persist through difficult times with gentle strength.",
    "In the practice of 'mono no aware', we find beauty in impermanence. This feeling will pass.",
    "As bamboo bends in the storm but does not break, your spirit remains strong even in sorrow.",
    "The Japanese tea ceremony teaches us to find peace in the present moment, even when it's difficult."
  ],
  neutral: [
    "Like still water reflecting the moon, your calm state offers clarity for introspection.",
    "In the Japanese principle of 'ma', the space between thoughts holds its own quiet wisdom.",
    "Your neutral state is like the pause between waves - a moment of peaceful potential.",
    "The Japanese garden teaches us that simplicity can be profound. Rest in this quiet space.",
    "Like morning mist before the sun rises, your neutrality holds the promise of new understanding."
  ],
  mixed: [
    "Like the complexity of a Zen koan, your mixed emotions hold deeper truths waiting to be discovered.",
    "The Japanese art of 'kintsugi' shows us that golden beauty can emerge from broken pieces.",
    "In the balance of 'in-yo' (yin-yang), opposing feelings create harmony within you.",
    "Like a landscape painting with both light and shadow, your complexity creates depth.",
    "The Japanese practice of 'shoshin' (beginner's mind) invites you to explore these feelings with curiosity."
  ]
};

// Deeper reflection questions based on emotions
const reflectionQuestions = {
  happy: [
    "What three things contributed to this joy today?",
    "How can you cultivate more of this feeling in your life?",
    "Who else might benefit from sharing in this happiness?"
  ],
  sad: [
    "What lesson might this difficult time be teaching you?",
    "What small act of self-care would feel nurturing right now?",
    "Who could offer support during this time?"
  ],
  neutral: [
    "What subtle feelings might be hiding beneath this calm?",
    "What one small change could add color to this neutral state?",
    "What are you grateful for in this quiet moment?"
  ],
  mixed: [
    "What would you tell a friend experiencing these same emotions?",
    "Which feeling needs the most attention right now?",
    "What insight might emerge from sitting with these mixed emotions?"
  ]
};

// Encouraging messages with Japanese-inspired wisdom
const encouragements = [
  "Like a bonsai that grows slowly but beautifully, your personal growth takes time and patience.",
  "The Japanese concept of 'wabi-sabi' reminds us that imperfection has its own beauty.",
  "As the proverb says, 'Better than a thousand days of diligent study is one day with a great teacher.' You are your own great teacher.",
  "In the practice of 'kaizen' (continuous improvement), small daily steps lead to meaningful change.",
  "Like Mount Fuji, which appears different from every angle, your perspective shapes your experience."
];

// Function to get a personalized support message based on emotion
function getSupportMessage(emotion) {
  const messages = supportMessages[emotion] || supportMessages.neutral;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// Function to get a reflection question based on emotion
function getReflectionQuestion(emotion) {
  const questions = reflectionQuestions[emotion] || reflectionQuestions.neutral;
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

// Function to get an encouragement message
function getEncouragement() {
  const randomIndex = Math.floor(Math.random() * encouragements.length);
  return encouragements[randomIndex];
}

// Function to generate personalized response
function generatePersonalizedResponse(emotionAnalysis, entryContent) {
  const { emotion } = emotionAnalysis;
  const supportMessage = getSupportMessage(emotion);
  const reflectionQuestion = getReflectionQuestion(emotion);
  const encouragement = getEncouragement();
  
  // Mental health resources with Japanese-inspired mindfulness practices
  const resources = [
    "Crisis Text Line: Text HOME to 741741",
    "National Suicide Prevention Lifeline: 988",
    "SAMHSA National Helpline: 1-800-662-4357",
    "Mindfulness practice: Try 5 minutes of focused breathing",
    "Gratitude exercise: Write down three things you're thankful for"
  ];
  
  return {
    message: supportMessage,
    reflectionQuestion: reflectionQuestion,
    encouragement: encouragement,
    resources: emotion === 'sad' ? resources : [resources[3], resources[4]], // Only mindfulness resources for non-sad emotions
    emotionInsight: `In Japanese culture, emotions are seen as waves - they come and go. Your "${emotion}" feeling is part of the natural flow of life.`
  };
}

module.exports = { generatePersonalizedResponse };