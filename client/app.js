// DOM Elements
const newEntrySection = document.getElementById('new-entry-section');
const entriesSection = document.getElementById('entries-section');
const goalsSection = document.getElementById('goals-section');
const analyticsSection = document.getElementById('analytics-section');

const newEntryLink = document.getElementById('new-entry-link');
const entriesLink = document.getElementById('entries-link');
const goalsLink = document.getElementById('goals-link');
const analyticsLink = document.getElementById('analytics-link');

const diaryForm = document.getElementById('diary-form');
const entryContent = document.getElementById('entry-content');
const supportResponse = document.getElementById('support-response');
const entriesList = document.getElementById('entries-list');
const analyticsChart = document.getElementById('analytics-chart');
const pageTitle = document.getElementById('page-title');

// Prompt elements
const dailyPrompt = document.getElementById('daily-prompt');
const refreshPromptBtn = document.getElementById('refresh-prompt-btn');
const promptCategory = document.getElementById('prompt-category');

// Goal elements
const newGoalBtn = document.getElementById('new-goal-btn');
const goalFormSection = document.getElementById('goal-form-section');
const goalForm = document.getElementById('goal-form');
const goalTitle = document.getElementById('goal-title');
const goalDescription = document.getElementById('goal-description');
const goalTargetDate = document.getElementById('goal-target-date');
const cancelGoalBtn = document.getElementById('cancel-goal-btn');
const goalsList = document.getElementById('goals-list');

// Navigation elements
const navLinks = document.querySelectorAll('.nav-link');

// Set current date
const currentDateElement = document.getElementById('current-date');
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
currentDateElement.textContent = now.toLocaleDateString('en-US', options);

// Event Listeners
newEntryLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(newEntrySection, newEntryLink, 'New Entry');
});

entriesLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(entriesSection, entriesLink, 'My Entries');
});

goalsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(goalsSection, goalsLink, 'My Goals');
});

analyticsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(analyticsSection, analyticsLink, 'Emotional Insights');
});

// Prompt event listeners
refreshPromptBtn.addEventListener('click', loadDailyPrompt);
promptCategory.addEventListener('change', loadDailyPrompt);

diaryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const content = entryContent.value;
    
    try {
        const response = await fetch('/api/diary/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Entry saved:', result);
            entryContent.value = '';
            
            // Show personalized support response
            displaySupportResponse(result.entry.supportResponse);
            
            // Show success message
            showTemporaryMessage('Diary entry saved successfully!', 'success');
        } else {
            const error = await response.json();
            console.error('Error saving entry:', error);
            showTemporaryMessage('Failed to save diary entry. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Network error:', error);
        showTemporaryMessage('Network error. Please try again.', 'error');
    }
});

// Goal event listeners
newGoalBtn.addEventListener('click', () => {
    goalFormSection.classList.remove('hidden');
});

cancelGoalBtn.addEventListener('click', () => {
    goalFormSection.classList.add('hidden');
    goalForm.reset();
});

goalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const goalData = {
        title: goalTitle.value,
        description: goalDescription.value,
        targetDate: goalTargetDate.value || null
    };
    
    try {
        const response = await fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(goalData)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Goal saved:', result);
            goalForm.reset();
            goalFormSection.classList.add('hidden');
            await loadGoals();
            showTemporaryMessage('Goal created successfully!', 'success');
        } else {
            const error = await response.json();
            console.error('Error saving goal:', error);
            showTemporaryMessage('Failed to create goal. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Network error:', error);
        showTemporaryMessage('Network error. Please try again.', 'error');
    }
});

// Show entries when entries section is displayed
entriesSection.addEventListener('click', async () => {
    if (!entriesSection.classList.contains('hidden')) {
        await loadEntries();
    }
});

// Show goals when goals section is displayed
goalsSection.addEventListener('click', async () => {
    if (!goalsSection.classList.contains('hidden')) {
        await loadGoals();
    }
});

// Show analytics when analytics section is displayed
analyticsSection.addEventListener('click', async () => {
    if (!analyticsSection.classList.contains('hidden')) {
        await loadAnalytics();
    }
});

// Functions
function showSection(section, link, title) {
    // Hide all sections
    newEntrySection.classList.add('hidden');
    entriesSection.classList.add('hidden');
    goalsSection.classList.add('hidden');
    analyticsSection.classList.add('hidden');
    
    // Remove active class from all nav links
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    
    // Show the selected section
    section.classList.remove('hidden');
    
    // Add active class to clicked nav link
    link.classList.add('active');
    
    // Update page title
    pageTitle.textContent = title;
    
    // Hide support response when not in new entry section
    if (section !== newEntrySection) {
        supportResponse.classList.add('hidden');
    }
    
    // Load daily prompt when showing new entry section
    if (section === newEntrySection) {
        loadDailyPrompt();
        loadPromptCategories();
    }
}

function showTemporaryMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.temporary-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `temporary-message ${type}`;
    messageElement.textContent = message;
    
    // Add to document
    document.body.appendChild(messageElement);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

async function loadDailyPrompt() {
    try {
        const category = promptCategory.value;
        const url = category ? `/api/prompts/${category}` : '/api/prompts';
        
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            dailyPrompt.textContent = `"${data.prompt}"`;
        } else {
            dailyPrompt.textContent = "Take a few moments to reflect on your day.";
        }
    } catch (error) {
        console.error('Error loading prompt:', error);
        dailyPrompt.textContent = "Take a few moments to reflect on your day.";
    }
}

async function loadPromptCategories() {
    try {
        const response = await fetch('/api/prompts/categories');
        
        if (response.ok) {
            const categories = await response.json();
            
            // Clear existing options except the first one
            while (promptCategory.options.length > 1) {
                promptCategory.remove(1);
            }
            
            // Add new options
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                promptCategory.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

function displaySupportResponse(supportData) {
    if (!supportData || !supportData.message) {
        supportResponse.classList.add('hidden');
        return;
    }
    
    let responseHTML = `<h3>Your Personalized Support</h3>`;
    responseHTML += `<p><strong>${supportData.message}</strong></p>`;
    
    if (supportData.resources && supportData.resources.length > 0) {
        responseHTML += '<h4>Helpful Resources:</h4><ul>';
        supportData.resources.forEach(resource => {
            responseHTML += `<li>${resource}</li>`;
        });
        responseHTML += '</ul>';
    }
    
    if (supportData.encouragement) {
        responseHTML += `<p><em>${supportData.encouragement}</em></p>`;
    }
    
    supportResponse.innerHTML = responseHTML;
    supportResponse.classList.remove('hidden');
}

async function loadEntries() {
    try {
        const response = await fetch('/api/diary/entries');
        
        if (response.ok) {
            const entries = await response.json();
            displayEntries(entries);
        } else {
            console.error('Failed to load entries');
            entriesList.innerHTML = '<p class="error-message">Failed to load diary entries.</p>';
        }
    } catch (error) {
        console.error('Network error:', error);
        entriesList.innerHTML = '<p class="error-message">Network error. Please try again.</p>';
    }
}

function displayEntries(entries) {
    if (entries.length === 0) {
        entriesList.innerHTML = '<p class="empty-message">No entries found. Write your first diary entry!</p>';
        return;
    }
    
    entriesList.innerHTML = entries.map(entry => {
        const entryDate = new Date(entry.date);
        const formattedDate = entryDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        return `
            <div class="entries-list-item">
                <h3>${formattedDate}</h3>
                <p>${entry.content}</p>
                <div class="entry-meta">
                    <span class="emotion-tag ${entry.emotion.emotion}">
                        Mood: ${entry.emotion.emotion} (${entry.emotion.intensity})
                    </span>
                    ${entry.supportResponse && entry.supportResponse.message ? 
                      `<p class="support-summary"><strong>Reflection:</strong> ${entry.supportResponse.message}</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

async function loadGoals() {
    try {
        const response = await fetch('/api/goals');
        
        if (response.ok) {
            const goals = await response.json();
            displayGoals(goals);
        } else {
            console.error('Failed to load goals');
            goalsList.innerHTML = '<p class="error-message">Failed to load goals.</p>';
        }
    } catch (error) {
        console.error('Network error:', error);
        goalsList.innerHTML = '<p class="error-message">Network error. Please try again.</p>';
    }
}

function displayGoals(goals) {
    if (goals.length === 0) {
        goalsList.innerHTML = '<p class="empty-message">No goals found. Create your first goal!</p>';
        return;
    }
    
    goalsList.innerHTML = goals.map(goal => {
        const progress = goal.progress || 0;
        const isCompleted = goal.completed;
        const status = isCompleted ? 'Completed' : `${progress}% complete`;
        
        // Format target date if it exists
        let targetDateInfo = '';
        if (goal.targetDate) {
            const targetDate = new Date(goal.targetDate);
            const formattedDate = targetDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            targetDateInfo = `<p><strong>Target Date:</strong> ${formattedDate}</p>`;
        }
        
        return `
            <div class="goals-list-item">
                <h3>${goal.title}</h3>
                <p>${goal.description || 'No description provided'}</p>
                ${targetDateInfo}
                <p><strong>Status:</strong> ${status}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="goal-actions">
                    <button class="update-goal-btn" data-id="${goal.id}" data-completed="${isCompleted}" data-progress="${progress}">
                        ${isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Add event listeners to update buttons
    document.querySelectorAll('.update-goal-btn').forEach(button => {
        button.addEventListener('click', handleUpdateGoal);
    });
}

async function handleUpdateGoal(e) {
    const goalId = e.target.dataset.id;
    const isCompleted = e.target.dataset.completed === 'true';
    const currentProgress = parseInt(e.target.dataset.progress);
    
    // For simplicity, we'll just toggle completion status
    // In a real app, you might want a more sophisticated progress update
    const newProgress = isCompleted ? 0 : 100;
    const newCompleted = !isCompleted;
    
    try {
        const response = await fetch(`/api/goals/${goalId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                progress: newProgress,
                completed: newCompleted
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Goal updated:', result);
            await loadGoals(); // Refresh the goals list
            showTemporaryMessage('Goal updated successfully!', 'success');
        } else {
            const error = await response.json();
            console.error('Error updating goal:', error);
            showTemporaryMessage('Failed to update goal. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Network error:', error);
        showTemporaryMessage('Network error. Please try again.', 'error');
    }
}

async function loadAnalytics() {
    try {
        const response = await fetch('/api/diary/entries');
        
        if (response.ok) {
            const entries = await response.json();
            displayAnalytics(entries);
        } else {
            console.error('Failed to load entries for analytics');
            analyticsChart.innerHTML = '<p class="error-message">Failed to load analytics data.</p>';
        }
    } catch (error) {
        console.error('Network error:', error);
        analyticsChart.innerHTML = '<p class="error-message">Network error. Please try again.</p>';
    }
}

function displayAnalytics(entries) {
    if (entries.length === 0) {
        analyticsChart.innerHTML = '<p class="empty-message">No data available for analytics. Write some diary entries first!</p>';
        return;
    }
    
    // Simple emotion distribution calculation
    const emotionCounts = {};
    entries.forEach(entry => {
        const emotion = entry.emotion.emotion;
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    });
    
    // Generate a simple text-based chart
    let chartHTML = '<h3>Emotion Distribution</h3><ul class="emotion-list">';
    for (const [emotion, count] of Object.entries(emotionCounts)) {
        chartHTML += `<li><span class="emotion-tag ${emotion}">${emotion}</span>: ${count} entries</li>`;
    }
    chartHTML += '</ul>';
    
    // Add emotion trend over time
    chartHTML += '<h3>Recent Emotions</h3><ul class="recent-emotions">';
    const recentEntries = entries.slice(0, 5); // Last 5 entries
    recentEntries.forEach(entry => {
        const entryDate = new Date(entry.date);
        const formattedDate = entryDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        
        chartHTML += `
            <li>
                <span class="date">${formattedDate}:</span>
                <span class="emotion-tag ${entry.emotion.emotion}">${entry.emotion.emotion}</span>
            </li>
        `;
    });
    chartHTML += '</ul>';
    
    analyticsChart.innerHTML = chartHTML;
}

// Load daily prompt when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadDailyPrompt();
    loadPromptCategories();
});