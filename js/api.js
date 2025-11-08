// === GEMINI API INTEGRATION ===

// Import the Google AI SDK
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// === TESTING MODE ===
// Enable testing mode by adding ?test=true to URL or setting localStorage.setItem('api_test_mode', 'true')
function isTestMode() {
    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === 'true') {
        return true;
    }
    // Check localStorage
    return localStorage.getItem('api_test_mode') === 'true';
}

// Simulate API delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Mock mood analysis based on input keywords
function getMockMoodData(userInput) {
    const input = userInput.toLowerCase();
    
    // Determine mood based on keywords
    let mood = 'chill';
    let energy = 5;
    let keywords = [];
    let colors = { primary: '#4ECDC4', secondary: '#74B9FF', background: '#1a1a2e' };
    
    if (input.includes('anxious') || input.includes('worried') || input.includes('stressed') || input.includes('nervous')) {
        mood = 'anxious';
        energy = 8;
        keywords = ['anxious', 'worried', 'tense'];
        colors = { primary: '#FF6B6B', secondary: '#FF7675', background: '#1a1a2e' };
    } else if (input.includes('happy') || input.includes('joy') || input.includes('excited') || input.includes('great')) {
        mood = 'happy';
        energy = 9;
        keywords = ['happy', 'joyful', 'excited'];
        colors = { primary: '#FFD93D', secondary: '#FDCB6E', background: '#1a1a2e' };
    } else if (input.includes('sad') || input.includes('depressed') || input.includes('down') || input.includes('melancholic')) {
        mood = 'sad';
        energy = 3;
        keywords = ['sad', 'melancholic', 'down'];
        colors = { primary: '#6C5CE7', secondary: '#A29BFE', background: '#1a1a2e' };
    } else if (input.includes('energetic') || input.includes('pumped') || input.includes('hyped')) {
        mood = 'energetic';
        energy = 10;
        keywords = ['energetic', 'pumped', 'hyped'];
        colors = { primary: '#00D9FF', secondary: '#74B9FF', background: '#1a1a2e' };
    } else if (input.includes('calm') || input.includes('peaceful') || input.includes('relaxed')) {
        mood = 'calm';
        energy = 2;
        keywords = ['calm', 'peaceful', 'relaxed'];
        colors = { primary: '#74B9FF', secondary: '#4ECDC4', background: '#1a1a2e' };
    } else if (input.includes('chill') || input.includes('laid back')) {
        mood = 'chill';
        energy = 4;
        keywords = ['chill', 'relaxed', 'easy-going'];
        colors = { primary: '#4ECDC4', secondary: '#74B9FF', background: '#1a1a2e' };
    }
    
    return { mood, energy, keywords, colors };
}

// Mock playlist generation
function getMockPlaylist(moodData) {
    const playlists = {
        anxious: [
            { title: "Weightless", artist: "Marconi Union", reason: "Scientifically proven to reduce anxiety" },
            { title: "Breathe", artist: "Pink Floyd", reason: "Calming progressive rock" },
            { title: "Gymnopédie No. 1", artist: "Erik Satie", reason: "Soothing classical piece" },
            { title: "Strawberry Swing", artist: "Coldplay", reason: "Gentle and uplifting" },
            { title: "Watermark", artist: "Enya", reason: "Ethereal and calming" }
        ],
        happy: [
            { title: "Happy", artist: "Pharrell Williams", reason: "The ultimate feel-good anthem" },
            { title: "Walking on Sunshine", artist: "Katrina & The Waves", reason: "Pure joy and energy" },
            { title: "Don't Stop Me Now", artist: "Queen", reason: "Upbeat and empowering" },
            { title: "Good Vibrations", artist: "The Beach Boys", reason: "Classic happy vibes" },
            { title: "I Gotta Feeling", artist: "Black Eyed Peas", reason: "Party starter" }
        ],
        sad: [
            { title: "Hurt", artist: "Johnny Cash", reason: "Raw emotional depth" },
            { title: "Mad World", artist: "Gary Jules", reason: "Melancholic and introspective" },
            { title: "The Sound of Silence", artist: "Simon & Garfunkel", reason: "Hauntingly beautiful" },
            { title: "Fix You", artist: "Coldplay", reason: "Cathartic and healing" },
            { title: "Someone Like You", artist: "Adele", reason: "Emotional resonance" }
        ],
        energetic: [
            { title: "Eye of the Tiger", artist: "Survivor", reason: "High-energy motivation" },
            { title: "Thunder", artist: "Imagine Dragons", reason: "Powerful and driving" },
            { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", reason: "Explosive energy" },
            { title: "Stronger", artist: "Kanye West", reason: "Confident and powerful" },
            { title: "Titanium", artist: "David Guetta ft. Sia", reason: "Uplifting and strong" }
        ],
        calm: [
            { title: "Weightless", artist: "Marconi Union", reason: "Ultra-relaxing" },
            { title: "Clair de Lune", artist: "Claude Debussy", reason: "Peaceful classical" },
            { title: "River Flows in You", artist: "Yiruma", reason: "Gentle piano" },
            { title: "Gravity", artist: "John Mayer", reason: "Smooth and soothing" },
            { title: "Blackbird", artist: "The Beatles", reason: "Simple and peaceful" }
        ],
        chill: [
            { title: "Island in the Sun", artist: "Weezer", reason: "Laid-back vibes" },
            { title: "Banana Pancakes", artist: "Jack Johnson", reason: "Relaxed acoustic" },
            { title: "Three Little Birds", artist: "Bob Marley", reason: "Don't worry, be happy" },
            { title: "Riptide", artist: "Vance Joy", reason: "Easy-going indie" },
            { title: "Holocene", artist: "Bon Iver", reason: "Atmospheric and calm" }
        ]
    };
    
    const defaultPlaylist = [
        { title: "Song 1", artist: "Artist 1", reason: "Fits your mood" },
        { title: "Song 2", artist: "Artist 2", reason: "Matches your vibe" },
        { title: "Song 3", artist: "Artist 3", reason: "Perfect for now" }
    ];
    
    return playlists[moodData.mood] || defaultPlaylist;
}

// Cache for config API key
let cachedConfigApiKey = null;

// Get API key from config, localStorage, or prompt user
async function getApiKey() {
    // Priority 1: Check config.js file (only try once, then cache)
    if (cachedConfigApiKey === null) {
        try {
            const config = await import('./config.js');
            if (config.GEMINI_API_KEY && 
                config.GEMINI_API_KEY !== 'YOUR_API_KEY_HERE' && 
                config.GEMINI_API_KEY !== null) {
                cachedConfigApiKey = config.GEMINI_API_KEY;
                return cachedConfigApiKey;
            }
        } catch (error) {
            // config.js doesn't exist or failed to load - that's okay
            cachedConfigApiKey = false; // Mark as checked
        }
    } else if (cachedConfigApiKey) {
        return cachedConfigApiKey;
    }
    
    // Priority 2: Check localStorage
    let apiKey = localStorage.getItem('gemini_api_key');
    if (apiKey) {
        return apiKey;
    }
    
    // Priority 3: Prompt user
    apiKey = prompt('Please enter your Google Gemini API key:\n\nGet one free at: https://aistudio.google.com/app/apikey');
    if (apiKey) {
        localStorage.setItem('gemini_api_key', apiKey);
        return apiKey;
    } else {
        throw new Error("API key is required to use this app");
    }
}

// Initialize the SDK (will be set when API key is available)
let genAI = null;

/**
 * A generic function to call the Gemini API.
 * @param {string} prompt - The user prompt.
 * @param {string} systemInstruction - The system prompt to guide the model.
 * @param {boolean} jsonOutput - Whether to force JSON output.
 * @returns {Promise<string>} - The raw text or JSON string from the API.
 */
async function callGemini(prompt, systemInstruction = '', jsonOutput = true) {
    try {
        // Initialize SDK if not already done
        if (!genAI) {
            const apiKey = await getApiKey();
            genAI = new GoogleGenerativeAI(apiKey);
        }
        
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
            systemInstruction: systemInstruction,
            generationConfig: {
                // Force JSON output if requested
                responseMimeType: jsonOutput ? "application/json" : "text/plain",
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;

    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to connect to AI service. Please try again.');
    }
}

// Analyze user's mood
export async function analyzeMood(userInput) {
    // Testing mode: return mock data
    if (isTestMode()) {
        console.log('🧪 TEST MODE: Using mock mood analysis');
        await delay(800); // Simulate API delay
        return getMockMoodData(userInput);
    }
    
    // This prompt is now simpler. We just describe the task and the
    // JSON schema. Gemini's JSON mode will handle the rest.
    const systemPrompt = `You are a mood analysis expert. Analyze the user's emotional state. Return ONLY a JSON object with this exact structure:
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

The energy level should be 1-10. Choose colors that match the mood.`;

    const prompt = `Analyze this mood description: "${userInput}"`;
    
    // Pass `true` for jsonOutput
    const response = await callGemini(prompt, systemPrompt, true);
    
    // Parse JSON response
    try {
        // No need to clean markdown! The response is already a clean JSON string.
        const moodData = JSON.parse(response);
        return moodData;
    } catch (error) {
        console.error('JSON Parse Error:', error, 'Response:', response);
        throw new Error('Failed to analyze mood. Please try again.');
    }
}

// Generate playlist based on mood
export async function generatePlaylist(moodData) {
    // Testing mode: return mock playlist
    if (isTestMode()) {
        console.log('🧪 TEST MODE: Using mock playlist');
        await delay(1000); // Simulate API delay
        return getMockPlaylist(moodData);
    }
    
    // Simplified prompt for JSON mode
    const systemPrompt = `You are a music curator. Generate a playlist that matches the user's mood. Return ONLY a JSON array with this structure:
[
    {
        "title": "Song Name",
        "artist": "Artist Name",
        "reason": "Brief reason why this song fits the mood"
    }
]

Generate 10-12 songs. Be creative and diverse.`;

    const prompt = `Create a playlist for someone feeling ${moodData.mood} with energy level ${moodData.energy}/10. Keywords: ${moodData.keywords.join(', ')}`;
    
    // Pass `true` for jsonOutput
    const response = await callGemini(prompt, systemPrompt, true);
    
    // Parse JSON response
    try {
        // No need to clean markdown
        const songs = JSON.parse(response);
        return songs;
    } catch (error) {
        console.error('JSON Parse Error:', error, 'Response:', response);
        throw new Error('Failed to generate playlist. Please try again.');
    }
}

// Export test mode helper for UI
export function enableTestMode() {
    localStorage.setItem('api_test_mode', 'true');
    console.log('🧪 Test mode enabled! Refresh the page.');
}

export function disableTestMode() {
    localStorage.removeItem('api_test_mode');
    console.log('✅ Test mode disabled! Refresh the page.');
}

export function getTestModeStatus() {
    return isTestMode();
}