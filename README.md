# 🎵 Vibe Check

**Music that matches your mood.**

Vibe Check is an AI-powered mood companion that analyzes your emotional state and creates personalized therapeutic playlists with stunning real-time visualizations.


---

## 🌟 Features

- **AI Mood Analysis** - Powered by Claude AI to understand your emotional state from natural language
- **Personalized Playlists** - 10-12 curated songs with explanations for why each matches your vibe
- **Dynamic Visualizations** - Real-time particle animations that adapt to your mood
- **Mood-Adaptive Design** - Color palettes and animations change based on your emotional state
- **Instant Results** - Get your personalized experience in seconds

---

## 🎨 Supported Moods

- Anxious 😰
- Happy 😊
- Sad 😢
- Energetic ⚡
- Chill 😌
- Melancholic 🌧️
- Excited 🎉
- Calm 🧘
- Stressed 😓

Each mood features unique particle animations and color schemes!

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required for basic functionality

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/vibe-check.git
cd vibe-check
```

2. **Open in browser**
```bash
# Option 1: Double-click index.html

# Option 2: Use Python server
python3 -m http.server 8000
# Then open http://localhost:8000

# Option 3: Use VS Code Live Server
# Right-click index.html → Open with Live Server
```

3. **Start vibing!** 🎉

---

## 📁 Project Structure
```
vibe-check/
├── index.html              # Main HTML structure
├── css/
│   └── styles.css         # All styling and animations
├── js/
│   ├── app.js            # Main application coordinator
│   ├── api.js            # Claude API integration
│   ├── ui.js             # DOM manipulation and UI updates
│   └── visualizer.js     # Canvas-based particle animations
└── assets/
    └── (images/icons)
```

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **AI**: Claude API (Anthropic)
- **Animations**: HTML5 Canvas
- **Design**: Custom particle systems, gradient animations

---

## 💡 How It Works

1. **User Input**: Describe your current emotional state in natural language
2. **AI Analysis**: Claude API analyzes the text and extracts:
   - Mood type (anxious, happy, sad, etc.)
   - Energy level (1-10)
   - Emotional keywords
   - Suggested color palette
3. **Visualization**: Particle system activates with mood-specific behaviors
4. **Playlist Generation**: AI curates 10-12 songs with explanations
5. **Display**: Beautiful UI presents your personalized vibe experience

---

## 🎯 Use Cases

- **Mental Health Support** - Process emotions through music
- **Mood Discovery** - Understand your emotional state better
- **Music Discovery** - Find new songs that match how you feel
- **Stress Relief** - Quick therapeutic experience during busy days
- **Creative Inspiration** - Set the right mood for work or creativity

---

## 🤝 Contributing

We built this in 30 minutes for a hackathon, but we'd love your contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions:
- Add more mood types
- Integrate Spotify API for actual playback
- Camera-based mood detection from facial expressions
- User accounts and saved playlists
- Mood tracking over time
- Share playlists with friends
- Mobile app version

---

## 🐛 Known Issues

- API calls may fail without proper Claude API access (designed for Claude.ai artifacts environment)
- Performance may vary on older devices due to canvas animations
- No persistent storage (playlists reset on refresh)

---

## 🎓 Team

Built with ❤️ by Hailegebriel, Moosay, Abel

---

## 🙏 Acknowledgments

- **Anthropic** for Claude AI
