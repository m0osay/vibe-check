// === MAIN APPLICATION CONTROLLER ===
// Coordinates between UI, API, and Visualizer

// Main function - handles the entire flow
async function handleMoodSubmit() {
  const input = moodInput.value.trim();

  // Validation
  if (!input) {
    showError("Please describe how you're feeling!");
    return;
  }

  if (input.length < 10) {
    showError("Please tell us a bit more about your mood!");
    return;
  }

  // Show loading
  showLoadingState();

  try {
    // Step 1: Analyze mood
    console.log("Analyzing mood...");
    const moodData = await analyzeMood(input);
    console.log("Mood data:", moodData);

    // Step 2: Update UI with mood
    updateMoodDisplay(moodData);

    // Step 3: Start visualization
    startMoodAnimation(moodData);

    // Step 4: Generate playlist
    console.log("Generating playlist...");
    const songs = await generatePlaylist(moodData);
    console.log("Songs:", songs);

    // Step 5: Display playlist
    displayPlaylist(songs);

    // Hide loading
    hideLoadingState();
  } catch (error) {
    console.error("Error:", error);
    showError(error.message || "Something went wrong. Please try again!");
    hideLoadingState();
  }
}

// Initialize when page loads
console.log("Vibe Check initialized! 🎵");
