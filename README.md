# vibe-check

A web application that analyzes your mood and generates a personalized music playlist using AI.

## How to Run

### Option 1: Using Python's Built-in Server (Recommended)

1. Open a terminal in the project directory
2. Run one of these commands:

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Option 2: Using Node.js (if you have it installed)

```bash
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Using VS Code Live Server

If you're using VS Code, you can install the "Live Server" extension and right-click on `index.html` → "Open with Live Server"

## Setup

1. **Get a Claude API Key:**
   - Sign up at [console.anthropic.com](https://console.anthropic.com)
   - Create an API key
   - The app will prompt you for the key on first use, or you can set it in browser localStorage

2. **First Run:**
   - When you first use the app, it will prompt you to enter your Claude API key
   - The key will be stored in your browser's localStorage for future sessions

## Usage

1. Open the app in your browser
2. Enter a description of how you're feeling in the text area
3. Click "Analyze My Vibe"
4. The app will analyze your mood and generate a personalized playlist

## Note

You must serve the files through a web server (not just open the HTML file directly) because the app makes API calls that require proper CORS handling.