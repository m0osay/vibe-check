// === UI CONTROLLER ===
// Handles all DOM updates and user interactions

// Get DOM elements
const moodInput = document.getElementById('moodInput');
const submitBtn = document.getElementById('submitBtn');
const loadingState = document.getElementById('loadingState');
const resultsSection = document.getElementById('resultsSection');
const errorMessage = document.getElementById('errorMessage');
const moodLabel = document.getElementById('moodLabel');
const moodDescription = document.getElementById('moodDescription');
const energyLevel = document.getElementById('energyLevel');
const playlistCards = document.getElementById('playlistCards');
const testModeIndicator = document.getElementById('testModeIndicator');

// Show loading state
export function showLoadingState() {
    loadingState.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    errorMessage.classList.add('hidden');
    submitBtn.disabled = true;
}

// Hide loading state
export function hideLoadingState() {
    loadingState.classList.add('hidden');
    submitBtn.disabled = false;
}

// Update mood display
export function updateMoodDisplay(moodData) {
    moodLabel.textContent = moodData.mood;
    moodDescription.textContent = moodData.keywords.join(', ');
    
    // Animate energy bar
    setTimeout(() => {
        energyLevel.style.width = `${moodData.energy * 10}%`;
    }, 100);
    
    // Apply mood colors
    document.documentElement.style.setProperty('--mood-primary', moodData.colors.primary);
    document.documentElement.style.setProperty('--mood-secondary', moodData.colors.secondary);
}

// Display playlist
export function displayPlaylist(songs) {
    playlistCards.innerHTML = ''; // Clear existing
    
    songs.forEach((song, index) => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <h4>${song.title}</h4>
            <div class="artist">${song.artist}</div>
            <div class="reason">${song.reason}</div>
        `;
        
        playlistCards.appendChild(card);
    });
    
    // Show results
    resultsSection.classList.remove('hidden');
}

// Show error message
export function showError(message) {
    hideLoadingState();
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// Export moodInput for use in app.js
export { moodInput };

// === INITIALIZE APP & EVENT LISTENERS ===

// We wait for the DOM to be ready to ensure all elements exist
document.addEventListener('DOMContentLoaded', async () => {
    // Import handleMoodSubmit dynamically to avoid circular dependencies
    const { handleMoodSubmit } = await import('./app.js');
    
    // Check test mode status and show indicator
    const { getTestModeStatus } = await import('./api.js');
    if (getTestModeStatus() && testModeIndicator) {
        testModeIndicator.classList.remove('hidden');
    }
    
    // Check if the elements exist before adding listeners
    if (submitBtn) {
        submitBtn.addEventListener('click', handleMoodSubmit);
    }

    if (moodInput) {
        moodInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                handleMoodSubmit();
            }
        });
    }

    console.log('Vibe Check initialized! 🎵');
    if (getTestModeStatus()) {
        console.log('🧪 Test mode is active - using mock data');
    }
});
