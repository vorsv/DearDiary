# Dear Diary

A digital diary application with emotion recognition and personalized support, featuring Japanese-inspired wisdom and aesthetics.

## Features

- Emotion recognition using Natural Language Processing
- Personalized support and encouraging messages with Japanese wisdom
- Goal setting and tracking
- Privacy-focused with end-to-end encryption
- User-friendly interface with accessibility features
- AI-powered insights and summaries
- Guided journaling prompts
- Cross-platform support (mobile apps)
- Integration with wearable devices
- Community-based features (anonymous forums)
- Advanced NLP capabilities
- Data visualization of emotional trends
- Japanese-inspired design elements and wisdom

## Technologies Used

- **Server-Side**: Node.js, Express, Natural NLP Library
- **Client-Side**: HTML, JavaScript, CSS, File System operations

## Project Structure

```
DearDiary/
├── server/
│   ├── index.js          # Main server file
│   ├── routes/
│   │   ├── diary.js      # Diary-related routes
│   │   ├── goals.js      # Goal-related routes
│   │   └── prompts.js    # Prompt-related routes
│   └── utils/
│       ├── emotionAnalyzer.js     # Emotion analysis functions
│       ├── fileManager.js         # File system operations for diary entries
│       ├── goalManager.js         # File system operations for goals
│       ├── journalPrompts.js      # Guided journaling prompts
│       └── personalizedSupport.js # Personalized support messages with Japanese wisdom
├── client/
│   ├── index.html        # Main HTML file
│   ├── styles.css        # Stylesheet with Japanese-inspired design
│   └── app.js            # Client-side JavaScript
├── docs/                 # Documentation
├── tests/                # Test files
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser to `http://localhost:3000`

## API Endpoints

### Diary Entries
- `POST /api/diary/entries` - Create a new diary entry
- `GET /api/diary/entries` - Get all diary entries
- `GET /api/diary/entries/:id` - Get a specific diary entry

### Goals
- `POST /api/goals` - Create a new goal
- `GET /api/goals` - Get all goals
- `GET /api/goals/:id` - Get a specific goal
- `PUT /api/goals/:id` - Update a goal

### Prompts
- `GET /api/prompts` - Get a random journaling prompt
- `GET /api/prompts/categories` - Get all prompt categories
- `GET /api/prompts/:category` - Get a random prompt from a specific category

## Development

- Server runs on port 3000 by default
- Nodemon is used for auto-reloading during development

## UI Features

The application now features an authentic diary book-like interface with:

- Vintage book design with a realistic spine and pages
- Handwriting-style fonts for a personal touch
- Two-page spread layout (left for navigation, right for content)
- Paper texture background with lined paper effect
- Responsive design that works on all devices
- Realistic page flipping animations
- Shrinkable side menu for past entries and other modules
- Smooth animations and transitions
- Card-based layout for entries and goals
- Emotional insight visualizations
- Guided journaling prompts to inspire writing
- Warm, comforting color scheme inspired by leather-bound journals
- Japanese-inspired design elements and wisdom throughout the interface