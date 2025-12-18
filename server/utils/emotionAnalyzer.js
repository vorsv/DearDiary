const natural = require('natural');

// Initialize the sentiment analyzer with English stopwords
const analyzer = new natural.SentimentAnalyzer('English', 
  natural.PorterStemmer, 
  'afinn'
);

// Function to analyze emotion in text
function analyzeEmotion(text) {
  // Tokenize the text
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);
  
  // Calculate sentiment score
  const score = analyzer.getSentiment(tokens);
  
  // Determine emotion based on score
  let emotion = 'neutral';
  let intensity = 'mild';
  
  if (score > 0.5) {
    emotion = 'happy';
    if (score > 0.7) intensity = 'strong';
  } else if (score < -0.5) {
    emotion = 'sad';
    if (score < -0.7) intensity = 'strong';
  } else if (score !== 0) {
    emotion = 'mixed';
  }
  
  // Return detailed analysis
  return {
    sentimentScore: score,
    emotion,
    intensity,
    analysisDate: new Date().toISOString()
  };
}

module.exports = { analyzeEmotion };