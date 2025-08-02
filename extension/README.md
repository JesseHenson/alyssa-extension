# Cosmic Tab Coach - Chrome Extension

A Chrome extension that transforms every new browser tab into a cosmic opportunity for growth, peace, and self-care with AI-powered affirmations.

## 🚀 Quick Start

### Install as Developer Extension

1. **Open Chrome Extensions Page**
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode**
   - Toggle "Developer mode" in the top right

3. **Load Extension**
   - Click "Load unpacked"
   - Select the `extension/` folder
   - Extension will appear in your toolbar

4. **Test the Extension**
   - Open a new tab to see the cosmic interface
   - Click the extension icon for quick popup
   - Right-click icon → Options for full settings

## 📁 Project Structure

```
extension/
├── manifest.json              # Extension configuration (Manifest V3)
├── pages/
│   ├── newtab.html            # New tab replacement page
│   ├── popup.html             # Toolbar popup interface
│   └── options.html           # Full settings page
├── css/
│   ├── newtab.css             # New tab styling
│   ├── popup.css              # Popup styling
│   └── options.css            # Options page styling (to be created)
├── js/
│   ├── background.js          # Service worker (background script)
│   ├── affirmation-manager.js # Core affirmation logic
│   ├── mindful-coach.js       # AI coach with stress detection
│   ├── newtab.js              # New tab functionality
│   ├── popup.js               # Popup functionality
│   └── options.js             # Options page logic (to be created)
├── data/
│   └── affirmations.json      # 500+ curated affirmations database
├── icons/
│   ├── icon-16.png            # 16x16 toolbar icon (placeholder)
│   ├── icon-32.png            # 32x32 extension icon (placeholder)
│   ├── icon-48.png            # 48x48 extension icon (placeholder)
│   └── icon-128.png           # 128x128 store icon (placeholder)
└── README.md                  # This file
```

## ✨ Features

### Current Implementation

- ✅ **New Tab Override**: Replaces Chrome's default new tab
- ✅ **500+ Affirmations**: Curated content across 12 categories
- ✅ **Mindful Coach Agent**: AI-powered conversational coach with stress detection
- ✅ **Stress Pattern Recognition**: Detects overwhelm, anxiety, urgency in messages
- ✅ **Wellness Interventions**: Guided breathing, grounding, perspective exercises
- ✅ **Theme System**: Cosmic, Nature, Minimal themes
- ✅ **Theme-Based Content**: Affirmations match visual themes
- ✅ **User Preferences**: Persistent settings via Chrome storage
- ✅ **Favorites System**: Save and manage favorite affirmations
- ✅ **Quick Actions**: Share, favorite, skip affirmations
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Popup Interface**: Quick access from toolbar
- ✅ **Background Service**: Handles storage and messaging
- ✅ **Privacy First**: All data stored locally
- ✅ **Usage Analytics**: Local tracking for insights

### Planned Features

- 🔮 **AI Personalization**: Dynamic content generation
- 🔮 **Audio Affirmations**: Spoken content with TTS
- 🔮 **Smart Timing**: Context-aware content delivery
- 🔮 **Mood Tracking**: Emotional state integration
- 🔮 **Cloud Sync**: Optional cross-device synchronization
- 🔮 **Premium Themes**: Extended visual collection

## 🎯 Core Components

### 1. New Tab Page (`pages/newtab.html`)

**Primary Interface** - What users see when opening new tabs

**Features:**
- Dynamic affirmation display with smooth transitions
- Theme switching with visual feedback
- Star field animation background
- Quick action buttons (favorite, share, skip)
- Bottom navigation to Chrome's default functions
- Settings modal for quick configuration
- Keyboard shortcuts support

**Data Flow:**
```
User opens new tab → AffirmationManager loads → 
Theme-based content selection → Display with animation → 
Record interaction → Auto-refresh based on preferences
```

### 2. Popup Interface (`pages/popup.html`)

**Quick Access** - Toolbar popup for rapid interaction

**Features:**
- Condensed affirmation display
- **🧘‍♀️ Integrated Mindful Coach** - Direct access to AI wellness coach without opening new tab
- Quick settings controls (theme, frequency)
- Usage statistics summary
- Direct links to full options and new tab
- Favorite/share actions

**Size:** 380px wide, adaptive height

**Mindful Coach Integration:**
- Collapsible chat interface with toggle button
- Real-time stress detection and cosmic wisdom
- Typing indicators and stress level feedback
- Optimized for popup constraints (300px max height)

### 3. Background Service (`js/background.js`)

**Core Logic** - Handles extension lifecycle and data management

**Responsibilities:**
- Extension installation and updates
- Cross-tab message broadcasting  
- Usage statistics collection
- Data migration between versions
- Storage management and cleanup

### 4. Affirmation Manager (`js/affirmation-manager.js`)

**Content Engine** - Handles all affirmation logic

**Key Methods:**
- `getContextualAffirmation()` - Smart content selection
- `getThemedAffirmation(theme)` - Theme-matched content
- `getPersonalizedAffirmation()` - User preference-based
- `recordInteraction(type)` - Usage tracking
- `updateUserPreferences(prefs)` - Settings management

### 5. Mindful Coach (`js/mindful-coach.js`)

**AI Wellness Coach** - Conversational agent with stress detection and gentle guidance

**Core Features:**
- **Stress Pattern Recognition**: Analyzes user messages for overwhelm, urgency, anxiety, decision paralysis, and irritation patterns
- **Cosmic Brand Voice**: Responds with gentle, non-judgmental guidance using cosmic metaphors and wisdom
- **Wellness Interventions**: Offers personalized mindfulness tools based on detected stress levels
- **Conversation Memory**: Tracks patterns over time to provide increasingly personalized support
- **Interactive Exercises**: Guided breathing, grounding, perspective, and affirmation sessions

**Stress Detection Categories:**
- **Urgency**: "deadline", "urgent", "asap", "rushed" → Breathing exercises
- **Overwhelm**: "too many", "can't handle", "drowning" → Perspective shifts  
- **Anxiety**: "what if", "worried", "panicking" → Grounding techniques
- **Decision Paralysis**: "don't know what", "confused", "stuck" → Clarity exercises
- **Irritation**: "annoying", "frustrating", "fed up" → Gentle affirmations

**Key Methods:**
- `handleUserInput(message)` - Processes user input and generates mindful response
- `analyzeStress(message)` - Detects stress patterns and calculates stress level (0-1)
- `generateResponse(message, analysis)` - Creates brand-aligned cosmic responses
- `startIntervention(type)` - Launches guided wellness exercises
- `getConversationSummary()` - Provides session analytics

**Access Points:**
- **New Tab Page**: Floating coach button and bottom navigation
- **Popup Interface**: Quick coach access button
- **Keyboard Shortcut**: Ctrl/Cmd + M to open coach modal

**Intervention Types:**
```javascript
{
  breathing: "Cosmic Breathing - 2-3 minutes of guided breath with stardust visualization",
  grounding: "Cosmic Grounding - 1-2 minutes of 5-4-3-2-1 sensory awareness", 
  perspective: "Cosmic Perspective - 30 seconds of zooming out to universal view",
  affirmation: "Cosmic Affirmation - 1 minute of gentle self-compassion"
}
```

## 🎨 Theme System

### Theme Configuration

```javascript
const themeMapping = {
  'cosmic': ['cosmic_connection', 'present_moment', 'inner_strength'],
  'nature': ['self_care', 'gratitude', 'mindful_focus'],
  'minimal': ['present_moment', 'mindful_focus', 'inner_strength']
};
```

### Adding New Themes

1. **Update CSS** with new theme class
2. **Add theme mapping** in affirmation manager
3. **Create theme UI** in settings pages
4. **Test visual consistency** across all components

### Theme Structure

```css
/* Base theme in CSS */
body.theme-name {
  background: linear-gradient(135deg, #color1, #color2);
}

/* Theme-specific elements */
.theme-name .affirmation-text {
  color: #text-color;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
```

## 📊 Data Management

### Storage Structure

**Chrome Storage Sync** (cross-device):
```javascript
{
  userPreferences: {
    categories: ['present_moment', 'self_care', 'cosmic_connection'],
    theme: 'cosmic',
    frequency: 'auto',
    textSize: 'medium',
    personalizedContent: false
  },
  version: '1.0.0'
}
```

**Chrome Storage Local** (device-specific):
```javascript
{
  favorites: ['affirmation text 1', 'affirmation text 2'],
  interactions: [
    {
      affirmationText: 'You are stardust...',
      category: 'cosmic_connection', 
      interactionType: 'viewed',
      timestamp: 1704067200000,
      theme: 'cosmic'
    }
  ],
  stats: {
    totalTabsOpened: 42,
    favoriteAffirmations: 7,
    daysActive: 5
  }
}
```

### Privacy Considerations

- **Local Storage Only**: No external data transmission
- **Anonymized Interactions**: Personal content truncated
- **Minimal Data Collection**: Only essential usage metrics
- **User Control**: Clear data options in settings
- **Transparent Practices**: Open source and auditable

## 🔧 Development

### Prerequisites

- Chrome browser (version 88+)
- Text editor or IDE
- Basic understanding of Chrome Extensions

### Local Development

1. **Clone/Download** the extension folder
2. **Modify** any files as needed
3. **Reload Extension** in Chrome
   - Go to `chrome://extensions/`
   - Click refresh icon on Cosmic Tab Coach
   - Changes take effect immediately

### Testing Checklist

- [ ] **New tab** opens with cosmic interface
- [ ] **Theme switching** works across all themes
- [ ] **Affirmations** rotate properly
- [ ] **Favorites** persist across sessions
- [ ] **Settings** save and apply correctly
- [ ] **Popup** loads and functions properly
- [ ] **Mindful Coach** opens from new tab and popup
- [ ] **Stress detection** correctly identifies overwhelm patterns
- [ ] **Wellness interventions** launch and guide properly
- [ ] **Coach responses** maintain cosmic brand voice
- [ ] **Conversation memory** tracks patterns over time
- [ ] **Responsive design** works on mobile/tablet
- [ ] **Keyboard shortcuts** function correctly (including Ctrl+M for coach)
- [ ] **Performance** is smooth and fast

### Debug Tools

**Console Logging:**
```javascript
// Check if affirmation manager is loaded
console.log(window.affirmationManager);

// View current preferences
console.log(window.affirmationManager.userPreferences);

// Test affirmation retrieval
console.log(window.affirmationManager.getRandomAffirmation());

// Test mindful coach (from new tab page)
console.log(newTabController.mindfulCoach);

// Test stress detection
const coach = newTabController.mindfulCoach;
console.log(coach.analyzeStress("I have 5 deadlines tomorrow and I'm so overwhelmed"));

// Test mindful coach response
coach.handleUserInput("I'm feeling really anxious about my presentation").then(console.log);
```

**Chrome DevTools:**
- Right-click → Inspect on new tab page
- Background script: `chrome://extensions/` → Extension details → Inspect views: background page
- Storage: Application tab → Storage → Extension

## 📦 Building for Production

### Pre-Release Checklist

- [ ] **Update version** in manifest.json
- [ ] **Replace icon placeholders** with actual PNG files
- [ ] **Test on multiple screen sizes**
- [ ] **Verify all features** work correctly
- [ ] **Check performance** and memory usage
- [ ] **Review permissions** in manifest
- [ ] **Update README** and documentation

### Chrome Web Store Preparation

1. **Create Icons**
   - 16x16, 32x32, 48x48, 128x128 PNG files
   - Consistent cosmic theme design
   - High quality and clear at all sizes

2. **Create Screenshots**
   - New tab interface in action
   - Settings page overview
   - Popup interface
   - Different themes showcased

3. **Package Extension**
   ```bash
   # Create ZIP file of extension folder
   zip -r cosmic-tab-coach-v1.0.0.zip extension/
   ```

4. **Store Listing Content**
   - Compelling description
   - Feature highlights
   - Privacy policy
   - Support contact information

### Distribution Options

- **Chrome Web Store** (recommended for wide distribution)
- **Developer Mode** (for testing and development)
- **Enterprise Distribution** (for organizations)
- **Sideloading** (manual installation)

## 🐛 Troubleshooting

### Common Issues

**Extension Not Loading:**
- Check manifest.json syntax
- Verify all file paths are correct
- Enable Developer Mode in Chrome
- Check browser console for errors

**Affirmations Not Showing:**
- Verify affirmations.json is valid JSON
- Check AffirmationManager initialization
- Look for network/file loading errors
- Test with fallback content

**Settings Not Saving:**
- Check Chrome storage permissions
- Verify storage API calls
- Test with browser console
- Clear extension data and retry

**Performance Issues:**
- Monitor memory usage in Task Manager
- Check for memory leaks in DevTools
- Optimize image and animation performance
- Review background script efficiency

### Debug Commands

```javascript
// Clear all extension data
chrome.storage.local.clear();
chrome.storage.sync.clear();

// View storage contents
chrome.storage.local.get(null, console.log);
chrome.storage.sync.get(null, console.log);

// Test affirmation loading
const manager = new AffirmationManager();
manager.init().then(() => {
  console.log('Loaded:', manager.getStats());
});
```

## 🤝 Contributing

### Code Style

- Use ES6+ features
- Consistent indentation (2 spaces)
- Meaningful variable names
- Comment complex logic
- Follow Chrome extension best practices

### Adding Features

1. **Plan the feature** with user stories
2. **Update data structures** if needed
3. **Implement functionality** in appropriate files
4. **Add UI elements** to relevant pages
5. **Test thoroughly** across use cases
6. **Document** new functionality

### Pull Request Guidelines

- Clear description of changes
- Include screenshots for UI changes
- Test on multiple Chrome versions
- Update documentation as needed
- Follow existing code patterns

---

## 📄 License

MIT License - Feel free to modify and distribute

## 💬 Support

- **Email**: hello@cosmic-tab-coach.com
- **Website**: https://cosmic-tab-coach.netlify.app
- **Issues**: GitHub repository issues page

---

*Transform every browser moment into a cosmic opportunity for growth* ✨