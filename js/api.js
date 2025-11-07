// Call Claude API
async function callClaude(prompt, systemPrompt = "") {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error("Claude API Error:", error);
    throw new Error("Failed to connect to AI service. Please try again.");
  }
}

// Analyze user's mood
async function analyzeMood(userInput) {
  const systemPrompt = `You are a mood analysis expert. Analyze the user's emotional state and return ONLY a JSON object with this exact structure:
{
    "mood": "one of: anxious, happy, sad, energetic, chill, melancholic, excited, calm, stressed",
    "energy": 7,
    "keywords": ["keyword1", "keyword2", "keyword3"],
    "colors": {
        "primary": "#FF6B6B",
        "secondary": "#4ECDC4",
        "background": "#1a1a2e"
    }
}

The energy level should be 1-10. Choose colors that match the mood. Return ONLY the JSON, no other text.`;

  const prompt = `Analyze this mood description: "${userInput}"`;

  const response = await callClaude(prompt, systemPrompt);

  // Parse JSON response
  try {
    // Remove markdown code blocks if present
    const cleanResponse = response.replace(/```json\n?|\n?```/g, "").trim();
    const moodData = JSON.parse(cleanResponse);
    return moodData;
  } catch (error) {
    console.error("JSON Parse Error:", error);
    throw new Error("Failed to analyze mood. Please try again.");
  }
}

// Generate playlist based on mood
async function generatePlaylist(moodData) {
  const systemPrompt = `You are a music curator. Generate a playlist that matches the user's mood. Return ONLY a JSON array with this structure:
[
    {
        "title": "Song Name",
        "artist": "Artist Name",
        "reason": "Brief reason why this song fits the mood"
    }
]

Generate 10-12 songs. Be creative and diverse. Return ONLY the JSON array, no other text.`;

  const prompt = `Create a playlist for someone feeling ${
    moodData.mood
  } with energy level ${moodData.energy}/10. Keywords: ${moodData.keywords.join(
    ", "
  )}`;

  const response = await callClaude(prompt, systemPrompt);

  // Parse JSON response
  try {
    const cleanResponse = response.replace(/```json\n?|\n?```/g, "").trim();
    const songs = JSON.parse(cleanResponse);
    return songs;
  } catch (error) {
    console.error("JSON Parse Error:", error);
    throw new Error("Failed to generate playlist. Please try again.");
  }
}
