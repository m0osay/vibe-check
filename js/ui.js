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

// Show loading state
function showLoadingState() {
    loadingState.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    errorMessage.classList.add('hidden');
    submitBtn.disabled = true;
}

// Hide loading state
function hideLoadingState() {
    loadingState.classList.add('hidden');
    submitBtn.disabled = false;
}

// Update mood display
function updateMoodDisplay(moodData) {
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
function displayPlaylist(songs) {
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
function showError(message) {
    hideLoadingState();
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// Initialize - set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    submitBtn.addEventListener('click', handleMoodSubmit);
    
    // Allow Enter key to submit (Ctrl+Enter in textarea)
    moodInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleMoodSubmit();
        }
    });
});
