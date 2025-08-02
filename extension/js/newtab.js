/**
 * New Tab Page JavaScript
 * Handles UI interactions, theme switching, and affirmation display
 */

class NewTabController {
    constructor() {
        this.currentAffirmation = null;
        this.refreshInterval = null;
        this.isInitialized = false;
        this.favorites = new Set();
        this.mindfulCoach = null;
        this.isCoachTyping = false;
        
        this.init();
    }

    async init() {
        try {
            // Wait for affirmation manager to be ready
            if (typeof affirmationManager === 'undefined') {
                setTimeout(() => this.init(), 100);
                return;
            }

            await this.waitForAffirmationManager();
            await this.loadFavorites();
            await this.loadUserPreferences();
            
            // Initialize Mindful Coach
            this.initializeMindfulCoach();
            
            this.setupEventListeners();
            this.createStars();
            await this.loadInitialAffirmation();
            this.setupAutoRefresh();
            
            this.isInitialized = true;
            console.log('✨ New Tab initialized successfully');
        } catch (error) {
            console.error('Failed to initialize New Tab:', error);
            this.showFallbackContent();
        }
    }

    async waitForAffirmationManager() {
        let attempts = 0;
        while (!affirmationManager?.affirmations && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!affirmationManager?.affirmations) {
            throw new Error('Affirmation manager failed to load');
        }
    }

    async loadFavorites() {
        try {
            const result = await chrome.storage.local.get(['favorites']);
            this.favorites = new Set(result.favorites || []);
        } catch (error) {
            console.error('Failed to load favorites:', error);
        }
    }

    async saveFavorites() {
        try {
            await chrome.storage.local.set({ favorites: Array.from(this.favorites) });
        } catch (error) {
            console.error('Failed to save favorites:', error);
        }
    }

    async loadUserPreferences() {
        if (!affirmationManager) return;
        
        const prefs = affirmationManager.userPreferences;
        
        // Apply theme
        this.applyTheme(prefs.theme);
        
        // Apply text size
        document.body.className = document.body.className.replace(/text-(small|medium|large)/, '');
        document.body.classList.add(`text-${prefs.textSize}`);
        
        // Update UI controls
        const themeButtons = document.querySelectorAll('.theme-option');
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === prefs.theme);
        });
    }

    setupEventListeners() {
        // Refresh button
        document.getElementById('refreshBtn')?.addEventListener('click', () => {
            this.loadNewAffirmation();
        });

        // Settings button
        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            this.showSettingsModal();
        });

        // Theme switcher
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                this.changeTheme(theme);
            });
        });

        // Quick actions
        document.getElementById('favoriteBtn')?.addEventListener('click', () => {
            this.toggleFavorite();
        });

        document.getElementById('shareBtn')?.addEventListener('click', () => {
            this.shareAffirmation();
        });

        document.getElementById('skipBtn')?.addEventListener('click', () => {
            this.loadNewAffirmation();
        });

        // Bottom navigation
        document.getElementById('bookmarksBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            chrome.tabs.create({ url: 'chrome://bookmarks/' });
        });

        document.getElementById('historyBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            chrome.tabs.create({ url: 'chrome://history/' });
        });

        document.getElementById('appsBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            chrome.tabs.create({ url: 'chrome://apps/' });
        });

        document.getElementById('upgradeBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showUpgradeModal();
        });

        // Mindful Coach
        document.getElementById('mindfulCoachBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showMindfulCoachModal();
        });

        document.getElementById('mindfulCoachToggle')?.addEventListener('click', () => {
            this.showMindfulCoachModal();
        });

        document.getElementById('closeMindfulCoach')?.addEventListener('click', () => {
            this.hideMindfulCoachModal();
        });

        document.getElementById('mindfulCoachSend')?.addEventListener('click', () => {
            this.sendMindfulCoachMessage();
        });

        document.getElementById('mindfulCoachInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMindfulCoachMessage();
            }
        });

        // Settings modal
        document.getElementById('closeModal')?.addEventListener('click', () => {
            this.hideSettingsModal();
        });

        document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
            this.saveSettings();
        });

        document.getElementById('optionsBtn')?.addEventListener('click', () => {
            chrome.runtime.openOptionsPage();
        });

        // Close modal on overlay click
        document.getElementById('settingsModal')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.hideSettingsModal();
            }
        });

        document.getElementById('mindfulCoachModal')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.hideMindfulCoachModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideSettingsModal();
                this.hideMindfulCoachModal();
            } else if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.loadNewAffirmation();
            } else if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.showSettingsModal();
            } else if (e.key === 'm' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.showMindfulCoachModal();
            }
        });
    }

    createStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;
        
        // Clear existing stars
        starsContainer.innerHTML = '';
        
        // Create new stars
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    async loadInitialAffirmation() {
        // Show loading state
        this.updateAffirmationDisplay({
            text: "Preparing your cosmic moment...",
            category: "Loading wisdom"
        });

        // Load actual affirmation
        setTimeout(() => {
            this.loadNewAffirmation();
        }, 500);
    }

    async loadNewAffirmation() {
        if (!affirmationManager) {
            this.showFallbackContent();
            return;
        }

        try {
            const affirmation = affirmationManager.getContextualAffirmation();
            this.currentAffirmation = affirmation;
            
            // Record interaction
            await affirmationManager.recordInteraction(affirmation, 'viewed');
            
            // Update display with animation
            this.updateAffirmationDisplay(affirmation);
            
            // Update favorite button state
            this.updateFavoriteButton();
            
        } catch (error) {
            console.error('Failed to load affirmation:', error);
            this.showFallbackContent();
        }
    }

    updateAffirmationDisplay(affirmation) {
        const textElement = document.getElementById('affirmationText');
        const categoryElement = document.getElementById('affirmationCategory');
        
        if (!textElement || !categoryElement) return;

        // Fade out
        textElement.style.opacity = '0';
        categoryElement.style.opacity = '0';
        
        setTimeout(() => {
            textElement.textContent = affirmation.text;
            categoryElement.textContent = affirmation.category;
            
            // Fade in
            textElement.style.opacity = '1';
            categoryElement.style.opacity = '1';
        }, 300);
    }

    showFallbackContent() {
        this.updateAffirmationDisplay({
            text: "You are exactly where you need to be in this cosmic moment",
            category: "Present Moment Awareness"
        });
    }

    async changeTheme(theme) {
        if (!affirmationManager) return;
        
        // Update visual theme
        this.applyTheme(theme);
        
        // Update preferences
        await affirmationManager.updateUserPreferences({ theme });
        
        // Update active button
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
        
        // Load new themed affirmation
        setTimeout(() => {
            this.loadNewAffirmation();
        }, 300);
    }

    applyTheme(theme) {
        // Remove existing theme classes
        document.body.className = document.body.className.replace(/\b(cosmic|nature|minimal|sunset|ocean)\b/g, '');
        
        // Add new theme class
        if (theme !== 'auto') {
            document.body.classList.add(theme);
        } else {
            // Auto theme based on time
            const hour = new Date().getHours();
            let autoTheme;
            
            if (hour < 6) autoTheme = 'cosmic';
            else if (hour < 12) autoTheme = 'nature';
            else if (hour < 17) autoTheme = 'minimal';
            else if (hour < 20) autoTheme = 'sunset';
            else autoTheme = 'cosmic';
            
            document.body.classList.add(autoTheme);
        }
    }

    setupAutoRefresh() {
        if (!affirmationManager) return;
        
        const frequency = affirmationManager.userPreferences.frequency;
        
        // Clear existing interval
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
        
        // Set new interval based on frequency
        switch (frequency) {
            case '30s':
                this.refreshInterval = setInterval(() => this.loadNewAffirmation(), 30000);
                break;
            case '5m':
                this.refreshInterval = setInterval(() => this.loadNewAffirmation(), 300000);
                break;
            case 'auto':
                // Auto refresh every 2 minutes
                this.refreshInterval = setInterval(() => this.loadNewAffirmation(), 120000);
                break;
            // 'manual' - no auto refresh
        }
    }

    async toggleFavorite() {
        if (!this.currentAffirmation) return;
        
        const favoriteBtn = document.getElementById('favoriteBtn');
        const affirmationKey = this.currentAffirmation.text;
        
        if (this.favorites.has(affirmationKey)) {
            this.favorites.delete(affirmationKey);
            favoriteBtn.textContent = '♡';
            favoriteBtn.classList.remove('active');
        } else {
            this.favorites.add(affirmationKey);
            favoriteBtn.textContent = '♥';
            favoriteBtn.classList.add('active');
            this.showToast('💫 Added to favorites');
        }
        
        await this.saveFavorites();
        
        // Record interaction
        if (affirmationManager) {
            await affirmationManager.recordInteraction(
                this.currentAffirmation, 
                this.favorites.has(affirmationKey) ? 'liked' : 'unliked'
            );
        }
    }

    updateFavoriteButton() {
        if (!this.currentAffirmation) return;
        
        const favoriteBtn = document.getElementById('favoriteBtn');
        const isFavorite = this.favorites.has(this.currentAffirmation.text);
        
        favoriteBtn.textContent = isFavorite ? '♥' : '♡';
        favoriteBtn.classList.toggle('active', isFavorite);
    }

    async shareAffirmation() {
        if (!this.currentAffirmation) return;
        
        const text = `"${this.currentAffirmation.text}" - Cosmic Tab Coach`;
        
        try {
            // Try native share API first (mobile/some desktop)
            if (navigator.share && navigator.canShare && navigator.canShare({ text })) {
                await navigator.share({
                    title: 'Cosmic Affirmation',
                    text: text
                });
                this.showToast('✨ Shared successfully');
            } 
            // Try modern clipboard API
            else if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                this.showToast('📋 Copied to clipboard');
            }
            // Fallback for older browsers/contexts
            else {
                this.fallbackCopyToClipboard(text);
                this.showToast('📋 Copied to clipboard');
            }
            
            // Record interaction
            if (affirmationManager) {
                await affirmationManager.recordInteraction(this.currentAffirmation, 'shared');
            }
            
        } catch (error) {
            console.error('Failed to share:', error);
            
            // Try fallback method
            try {
                this.fallbackCopyToClipboard(text);
                this.showToast('📋 Copied to clipboard');
            } catch (fallbackError) {
                console.error('Fallback copy also failed:', fallbackError);
                this.showToast('❌ Unable to copy. Please copy manually.');
            }
        }
    }

    fallbackCopyToClipboard(text) {
        // Create a temporary textarea element
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } finally {
            document.body.removeChild(textArea);
        }
    }

    showSettingsModal() {
        const modal = document.getElementById('settingsModal');
        if (!modal || !affirmationManager) return;
        
        // Populate current settings
        const prefs = affirmationManager.userPreferences;
        
        document.getElementById('themeSelect').value = prefs.theme;
        document.getElementById('frequencySelect').value = prefs.frequency;
        document.getElementById('textSizeSelect').value = prefs.textSize;
        document.getElementById('personalizedCheck').checked = prefs.personalizedContent;
        
        modal.classList.add('show');
    }

    hideSettingsModal() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    async saveSettings() {
        if (!affirmationManager) return;
        
        const newPrefs = {
            theme: document.getElementById('themeSelect').value,
            frequency: document.getElementById('frequencySelect').value,
            textSize: document.getElementById('textSizeSelect').value,
            personalizedContent: document.getElementById('personalizedCheck').checked
        };
        
        // Update preferences
        await affirmationManager.updateUserPreferences(newPrefs);
        
        // Apply changes
        this.applyTheme(newPrefs.theme);
        document.body.className = document.body.className.replace(/text-(small|medium|large)/, '');
        document.body.classList.add(`text-${newPrefs.textSize}`);
        this.setupAutoRefresh();
        
        // Update theme buttons
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === newPrefs.theme);
        });
        
        // Load new affirmation if needed
        this.loadNewAffirmation();
        
        this.hideSettingsModal();
        this.showToast('⚙️ Settings saved');
    }

    showUpgradeModal() {
        // For now, open Chrome Web Store page
        chrome.tabs.create({ 
            url: 'https://cosmic-tab-coach.netlify.app/upgrade' 
        });
    }

    showToast(message) {
        const toast = document.getElementById('favoriteToast');
        if (!toast) return;
        
        toast.innerHTML = `<span>${message}</span>`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Mindful Coach Methods

    initializeMindfulCoach() {
        if (typeof MindfulCoach !== 'undefined') {
            this.mindfulCoach = new MindfulCoach();
            console.log('🧘‍♀️ Mindful Coach initialized');
        } else {
            console.warn('MindfulCoach class not available');
        }
    }

    showMindfulCoachModal() {
        const modal = document.getElementById('mindfulCoachModal');
        if (!modal) return;
        
        modal.style.display = 'flex';
        
        // Focus on input
        setTimeout(() => {
            const input = document.getElementById('mindfulCoachInput');
            if (input) input.focus();
        }, 100);

        // Track usage
        if (affirmationManager) {
            affirmationManager.recordInteraction({ text: 'mindful_coach_opened' }, 'mindful_coach_session_start');
        }
    }

    hideMindfulCoachModal() {
        const modal = document.getElementById('mindfulCoachModal');
        if (!modal) return;
        
        modal.style.display = 'none';

        // Track usage
        if (affirmationManager && this.mindfulCoach) {
            const summary = this.mindfulCoach.getConversationSummary();
            affirmationManager.recordInteraction({ 
                text: 'mindful_coach_closed',
                metadata: summary 
            }, 'mindful_coach_session_end');
        }
    }

    async sendMindfulCoachMessage() {
        const input = document.getElementById('mindfulCoachInput');
        const sendBtn = document.getElementById('mindfulCoachSend');
        const messagesContainer = document.getElementById('mindfulCoachMessages');
        
        if (!input || !this.mindfulCoach || this.isCoachTyping) return;
        
        const userMessage = input.value.trim();
        if (!userMessage) return;

        // Disable input while processing
        input.disabled = true;
        sendBtn.disabled = true;
        input.value = '';

        // Add user message to chat
        this.addChatMessage(userMessage, 'user');
        
        // Show typing indicator
        this.showCoachTyping();

        try {
            // Get response from mindful coach
            const result = await this.mindfulCoach.handleUserInput(userMessage);
            
            // Hide typing indicator
            this.hideCoachTyping();
            
            // Add coach response
            this.addChatMessage(result.response, 'coach', result.stressAnalysis);
            
            // Show intervention if suggested
            if (result.suggestedIntervention) {
                this.showInterventionSuggestion(result.suggestedIntervention);
            }

        } catch (error) {
            console.error('Error processing mindful coach message:', error);
            this.hideCoachTyping();
            this.addChatMessage(
                "I sense some cosmic turbulence in our connection. 🌟 Let's try that again, or take a moment to breathe together.",
                'coach'
            );
        } finally {
            // Re-enable input
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    addChatMessage(message, role, stressAnalysis = null) {
        const messagesContainer = document.getElementById('mindfulCoachMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `mindful-coach-message ${role}`;
        
        // Format message with line breaks
        const formattedMessage = message.replace(/\n/g, '<br>');
        messageDiv.innerHTML = formattedMessage;

        // Add stress indicator for coach messages
        if (role === 'coach' && stressAnalysis) {
            const stressLevel = stressAnalysis.level;
            let stressCategory = 'low';
            let stressEmoji = '😌';
            
            if (stressLevel > 0.7) {
                stressCategory = 'high';
                stressEmoji = '🫂';
            } else if (stressLevel > 0.4) {
                stressCategory = 'medium';  
                stressEmoji = '💙';
            }
            
            const stressIndicator = document.createElement('div');
            stressIndicator.className = `mindful-coach-stress-indicator ${stressCategory}`;
            stressIndicator.innerHTML = `${stressEmoji} ${Math.round(stressLevel * 100)}% stress detected`;
            messageDiv.appendChild(stressIndicator);
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showCoachTyping() {
        if (this.isCoachTyping) return;
        
        this.isCoachTyping = true;
        const messagesContainer = document.getElementById('mindfulCoachMessages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'mindful-coach-typing';
        typingDiv.id = 'mindfulCoachTyping';
        typingDiv.innerHTML = `
            <div class="mindful-coach-typing-text">Coach is reflecting...</div>
            <div class="mindful-coach-typing-dots">
                <div class="mindful-coach-typing-dot"></div>
                <div class="mindful-coach-typing-dot"></div>
                <div class="mindful-coach-typing-dot"></div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideCoachTyping() {
        this.isCoachTyping = false;
        const typingIndicator = document.getElementById('mindfulCoachTyping');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    showInterventionSuggestion(intervention) {
        const messagesContainer = document.getElementById('mindfulCoachMessages');
        if (!messagesContainer) return;

        const interventionDiv = document.createElement('div');
        interventionDiv.className = 'mindful-coach-intervention';
        interventionDiv.innerHTML = `
            <h4>🌟 ${intervention.name}</h4>
            <p>${intervention.description}</p>
            <p><em>Duration: ${intervention.duration}</em></p>
            <div class="mindful-coach-intervention-buttons">
                <button class="mindful-coach-btn primary" onclick="newTabController.startIntervention('${intervention.name.toLowerCase().replace(/\s+/g, '_')}')">
                    ✨ Let's try it
                </button>
                <button class="mindful-coach-btn secondary" onclick="this.parentElement.parentElement.style.display='none'">
                    🤚 Maybe later
                </button>
            </div>
        `;

        messagesContainer.appendChild(interventionDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    startIntervention(interventionType) {
        if (!this.mindfulCoach) return;

        // Map display names back to internal types
        const typeMap = {
            'cosmic_breathing': 'breathing',
            'cosmic_grounding': 'grounding', 
            'cosmic_perspective': 'perspective',
            'cosmic_affirmation': 'affirmation'
        };
        
        const actualType = typeMap[interventionType] || interventionType;
        const intervention = this.mindfulCoach.startIntervention(actualType);
        
        this.showInterventionModal(intervention);
    }

    showInterventionModal(intervention) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'mindful-coach-intervention-modal';
        modal.innerHTML = `
            <div class="mindful-coach-intervention-content">
                <button class="mindful-coach-close" onclick="this.parentElement.parentElement.remove()">×</button>
                <h2>🌟 ${intervention.name}</h2>
                <p>Take ${intervention.duration} for yourself. Follow along with gentle awareness.</p>
                <div class="mindful-coach-intervention-steps" id="interventionSteps">
                    ${intervention.steps.map((step, index) => 
                        `<div class="mindful-coach-intervention-step" data-step="${index}">${step}</div>`
                    ).join('')}
                </div>
                <button class="mindful-coach-btn primary" onclick="newTabController.startInterventionFlow()">
                    Begin Journey ✨
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Store reference for intervention flow
        this.currentIntervention = { modal, steps: intervention.steps };
    }

    startInterventionFlow() {
        if (!this.currentIntervention) return;

        const steps = this.currentIntervention.modal.querySelectorAll('.mindful-coach-intervention-step');
        let currentStep = 0;

        // Hide start button
        const startBtn = this.currentIntervention.modal.querySelector('.mindful-coach-btn.primary');
        if (startBtn) startBtn.style.display = 'none';

        const showNextStep = () => {
            // Deactivate all steps
            steps.forEach(step => step.classList.remove('active'));
            
            // Activate current step
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                currentStep++;
                
                // Schedule next step (every 8-12 seconds for breathing rhythm)
                setTimeout(showNextStep, currentStep === 1 ? 3000 : 8000);
            } else {
                // Intervention complete
                setTimeout(() => {
                    if (this.currentIntervention) {
                        this.currentIntervention.modal.remove();
                        this.currentIntervention = null;
                        this.addChatMessage(
                            "Beautiful work! 🌟 How are you feeling after that cosmic moment of self-care?",
                            'coach'
                        );
                    }
                }, 2000);
            }
        };

        showNextStep();
    }
}

// Global reference for intervention buttons
let newTabController;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'OPEN_MINDFUL_COACH' && newTabController) {
        newTabController.showMindfulCoachModal();
        sendResponse({ success: true });
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        newTabController = new NewTabController();
    });
} else {
    newTabController = new NewTabController();
}