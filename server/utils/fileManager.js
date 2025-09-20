const fs = require('fs').promises;
const path = require('path');

// Directory to store diary entries
const ENTRIES_DIR = path.join(__dirname, '../data/entries');

// Initialize data directory
async function init() {
  try {
    await fs.access(ENTRIES_DIR);
  } catch (error) {
    // Directory doesn't exist, create it
    await fs.mkdir(ENTRIES_DIR, { recursive: true });
  }
}

// Save a diary entry to a file
async function saveEntry(entry) {
  // Ensure data directory exists
  await init();
  
  // Create filename based on entry ID
  const filename = `${entry.id}.json`;
  const filepath = path.join(ENTRIES_DIR, filename);
  
  // Write entry to file
  await fs.writeFile(filepath, JSON.stringify(entry, null, 2));
}

// Get all diary entries
async function getEntries() {
  // Ensure data directory exists
  await init();
  
  // Read all files in the entries directory
  const files = await fs.readdir(ENTRIES_DIR);
  
  // Filter only JSON files
  const jsonFiles = files.filter(file => path.extname(file) === '.json');
  
  // Read and parse each file
  const entries = [];
  for (const file of jsonFiles) {
    try {
      const filepath = path.join(ENTRIES_DIR, file);
      const data = await fs.readFile(filepath, 'utf8');
      entries.push(JSON.parse(data));
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }
  
  // Sort entries by date (newest first)
  entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return entries;
}

// Get a specific diary entry by ID
async function getEntryById(id) {
  // Ensure data directory exists
  await init();
  
  // Create filename based on ID
  const filename = `${id}.json`;
  const filepath = path.join(ENTRIES_DIR, filename);
  
  try {
    // Read and parse file
    const data = await fs.readFile(filepath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or couldn't be read
    return null;
  }
}

module.exports = { saveEntry, getEntries, getEntryById };