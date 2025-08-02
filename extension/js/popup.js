/**
 * Popup JavaScript
 * Handles popup UI interactions and communication with background script
 */

class PopupController {
    constructor() {
        this.currentAffirmation = null;
        this.favorites = new Set();
        this.isLoading = false;
        this.mindfulCoach = null;
        this.isChatOpen = false;
        this.isCoachTyping = false;
        
        this.init();
    }

    async init() {
        try {
            this.showLoading(true);
            
            // Initialize affirmation manager
            await this.initializeAffirmationManager();
            
            // Initialize mindful coach
            this.initializeMindfulCoach();
            
            // Load user data
            await this.loadUserData();
            
            // Setup UI
            this.setupEventListeners();
            await this.loadInitialAffirmation();
            await this.loadStats();
            
            // Apply current preferences to UI
            this.updateUIFromPreferences();
            
            this.showLoading(false);
            console.log('✨ Popup initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize popup:', error);
            this.showError('Failed to initialize. Please try again.');
            this.showLoading(false);
        }
    }

    async initializeAffirmationManager() {
        // Wait for affirmation manager to be ready
        let attempts = 0;
        while ((!window.affirmationManager || !window.affirmationManager.affirmations) && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!window.affirmationManager?.affirmations) {
            // Create a new instance if needed
            window.affirmationManager = new AffirmationManager();
            await window.affirmationManager.init();
        }
    }

    async loadUserData() {
        try {
            // Load favorites
            const result = await chrome.storage.local.get(['favorites']);
            this.favorites = new Set(result.favorites || []);
            
        } catch (error) {
            console.error('Failed to load user data:', error);
        }
    }

    setupEventListeners() {
        // Settings button
        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            chrome.runtime.openOptionsPage();
            window.close();
        });

        // Refresh affirmation
        document.getElementById('refreshAffirmation')?.addEventListener('click', () => {
            this.loadNewAffirmation();
        });

        // Quick actions
        document.getElementById('favoriteBtn')?.addEventListener('click', () => {
            this.toggleFavorite();
        });

        document.getElementById('shareBtn')?.addEventListener('click', () => {
            this.shareAffirmation();
        });

        document.getElementById('mindfulCoachBtn')?.addEventListener('click', () => {
            this.toggleMindfulCoach();
        });

        // Coach toggle and input handlers
        document.getElementById('coachToggle')?.addEventListener('click', () => {
            this.toggleMindfulCoach();
        });

        document.getElementById('mindfulCoachSend')?.addEventListener('click', () => {
            this.sendCoachMessage();
        });

        document.getElementById('mindfulCoachInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendCoachMessage();
            }
        });

        document.getElementById('newTabBtn')?.addEventListener('click', () => {
            chrome.tabs.create({ url: 'chrome://newtab/' });
            window.close();
        });

        // Settings controls
        document.getElementById('themeSelect')?.addEventListener('change', (e) => {
            this.updatePreference('theme', e.target.value);
        });

        document.getElementById('frequencySelect')?.addEventListener('change', (e) => {
            this.updatePreference('frequency', e.target.value);
        });

        document.getElementById('personalizedToggle')?.addEventListener('change', (e) => {
            this.updatePreference('personalizedContent', e.target.checked);
        });

        // Footer buttons
        document.getElementById('optionsBtn')?.addEventListener('click', () => {
            chrome.runtime.openOptionsPage();
            window.close();
        });

        document.getElementById('upgradeBtn')?.addEventListener('click', () => {
            chrome.tabs.create({ 
                url: 'https://cosmic-tab-coach.netlify.app/upgrade' 
            });
            window.close();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                window.close();
            } else if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.loadNewAffirmation();
            }
        });
    }

    async loadInitialAffirmation() {
        // Show loading state
        this.updateAffirmationDisplay({
            text: "Preparing your cosmic moment...",
            category: "Loading wisdom"
        });

        // Load actual affirmation after brief delay
        setTimeout(() => {
            this.loadNewAffirmation();
        }, 300);
    }

    async loadNewAffirmation() {
        if (this.isLoading) return;
        
        try {
            this.isLoading = true;
            
            if (!window.affirmationManager) {
                throw new Error('Affirmation manager not available');
            }

            const affirmation = window.affirmationManager.getContextualAffirmation();
            this.currentAffirmation = affirmation;
            
            // Record interaction
            await window.affirmationManager.recordInteraction(affirmation, 'viewed');
            
            // Update display
            this.updateAffirmationDisplay(affirmation);
            
            // Update favorite button
            this.updateFavoriteButton();
            
        } catch (error) {
            console.error('Failed to load affirmation:', error);
            this.updateAffirmationDisplay({
                text: "You are exactly where you need to be in this cosmic moment",
                category: "Present Moment Awareness"
            });
        } finally {
            this.isLoading = false;
        }
    }

    updateAffirmationDisplay(affirmation) {
        const textElement = document.getElementById('popupAffirmationText');
        const categoryElement = document.getElementById('popupAffirmationCategory');
        
        if (!textElement || !categoryElement) return;

        // Add fade effect
        textElement.style.opacity = '0';
        categoryElement.style.opacity = '0';
        
        setTimeout(() => {
            textElement.textContent = affirmation.text;
            categoryElement.textContent = affirmation.category;
            
            textElement.style.opacity = '1';
            categoryElement.style.opacity = '1';
        }, 150);
    }

    async toggleFavorite() {
        if (!this.currentAffirmation) return;
        
        const favoriteBtn = document.getElementById('favoriteBtn');
        const favoriteIcon = favoriteBtn.querySelector('.action-icon');
        const affirmationKey = this.currentAffirmation.text;
        
        try {
            if (this.favorites.has(affirmationKey)) {
                this.favorites.delete(affirmationKey);
                favoriteIcon.textContent = '♡';
                favoriteBtn.classList.remove('active');
                this.showToast('Removed from favorites');
            } else {
                this.favorites.add(affirmationKey);
                favoriteIcon.textContent = '♥';
                favoriteBtn.classList.add('active');
                this.showToast('💫 Added to favorites');
            }
            
            // Save to storage
            await chrome.storage.local.set({ favorites: Array.from(this.favorites) });
            
            // Record interaction
            if (window.affirmationManager) {
                await window.affirmationManager.recordInteraction(
                    this.currentAffirmation, 
                    this.favorites.has(affirmationKey) ? 'liked' : 'unliked'
                );
            }
            
            // Update stats
            await this.loadStats();
            
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            this.showToast('Failed to save favorite');
        }
    }

    updateFavoriteButton() {
        if (!this.currentAffirmation) return;
        
        const favoriteBtn = document.getElementById('favoriteBtn');
        const favoriteIcon = favoriteBtn.querySelector('.action-icon');
        const isFavorite = this.favorites.has(this.currentAffirmation.text);
        
        favoriteIcon.textContent = isFavorite ? '♥' : '♡';
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
            if (window.affirmationManager) {
                await window.affirmationManager.recordInteraction(this.currentAffirmation, 'shared');
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

    async updatePreference(key, value) {
        if (!window.affirmationManager) return;
        
        try {
            await window.affirmationManager.updateUserPreferences({ [key]: value });
            
            // Show confirmation
            this.showToast('⚙️ Setting updated');
            
            // Apply any immediate UI changes
            if (key === 'theme') {
                this.applyThemeToPopup(value);
            }
            
        } catch (error) {
            console.error('Failed to update preference:', error);
            this.showToast('Failed to save setting');
        }
    }

    updateUIFromPreferences() {
        if (!window.affirmationManager) return;
        
        const prefs = window.affirmationManager.userPreferences;
        
        // Update select values
        const themeSelect = document.getElementById('themeSelect');
        const frequencySelect = document.getElementById('frequencySelect');
        const personalizedToggle = document.getElementById('personalizedToggle');
        
        if (themeSelect) themeSelect.value = prefs.theme;
        if (frequencySelect) frequencySelect.value = prefs.frequency;
        if (personalizedToggle) personalizedToggle.checked = prefs.personalizedContent;
        
        // Apply theme to popup
        this.applyThemeToPopup(prefs.theme);
    }

    applyThemeToPopup(theme) {
        // Apply subtle theme coloring to popup
        const container = document.querySelector('.popup-container');
        if (!container) return;
        
        container.className = 'popup-container';
        
        if (theme !== 'auto') {
            container.classList.add(`theme-${theme}`);
        }
    }

    async loadStats() {
        try {
            const result = await chrome.storage.local.get(['stats']);
            const stats = result.stats || {};
            
            // Update stats display
            document.getElementById('totalTabs').textContent = stats.totalTabsOpened || 0;
            document.getElementById('totalFavorites').textContent = this.favorites.size;
            document.getElementById('daysActive').textContent = stats.daysActive || 0;
            
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.toggle('show', show);
        }
    }

    showError(message) {
        const affirmationContainer = document.querySelector('.quick-affirmation');
        if (affirmationContainer) {
            affirmationContainer.classList.add('error-state');
            
            this.updateAffirmationDisplay({
                text: message,
                category: "Error"
            });
        }
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (!toast || !toastMessage) return;
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // Handle messages from background script
    handleMessage(message) {
        switch (message.type) {
            case 'PREFERENCES_UPDATED':
                this.updateUIFromPreferences();
                break;
                
            case 'STATS_UPDATED':
                this.loadStats();
                break;
        }
    }

    // Initialize mindful coach
    initializeMindfulCoach() {
        if (typeof MindfulCoach !== 'undefined') {
            this.mindfulCoach = new MindfulCoach();
            console.log('🧘‍♀️ Mindful Coach initialized in popup');
        } else {
            console.warn('MindfulCoach class not available in popup');
        }
    }

    // Toggle mindful coach chat
    toggleMindfulCoach() {
        const chatContainer = document.getElementById('mindfulCoachChat');
        const toggleBtn = document.getElementById('coachToggle');
        
        if (!chatContainer || !toggleBtn) return;
        
        this.isChatOpen = !this.isChatOpen;
        
        if (this.isChatOpen) {
            chatContainer.style.display = 'block';
            toggleBtn.textContent = '×';
            
            // Focus on input
            setTimeout(() => {
                const input = document.getElementById('mindfulCoachInput');
                if (input) input.focus();
            }, 100);
        } else {
            chatContainer.style.display = 'none';
            toggleBtn.textContent = '💬';
        }
    }

    // Send message to coach
    async sendCoachMessage() {
        const input = document.getElementById('mindfulCoachInput');
        const sendBtn = document.getElementById('mindfulCoachSend');
        
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
            const messagesContainer = document.getElementById('mindfulCoachMessages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }

    // Add message to chat
    addChatMessage(message, role, stressAnalysis = null) {
        const messagesContainer = document.getElementById('mindfulCoachMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `mindful-coach-message ${role}`;
        
        // Format message with line breaks
        const formattedMessage = message.replace(/\n/g, '<br>');
        messageDiv.innerHTML = formattedMessage;

        // Add stress indicator for coach messages if available
        if (role === 'coach' && stressAnalysis) {
            const stressLevel = stressAnalysis.level;
            if (stressLevel > 0.4) {
                const stressEmoji = stressLevel > 0.7 ? '🫂' : '💙';
                const stressText = `${stressEmoji} ${Math.round(stressLevel * 100)}% stress detected`;
                
                const stressSpan = document.createElement('div');
                stressSpan.style.fontSize = '0.7rem';
                stressSpan.style.opacity = '0.8';
                stressSpan.style.marginTop = '0.3rem';
                stressSpan.textContent = stressText;
                messageDiv.appendChild(stressSpan);
            }
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Show typing indicator
    showCoachTyping() {
        if (this.isCoachTyping) return;
        
        this.isCoachTyping = true;
        const messagesContainer = document.getElementById('mindfulCoachMessages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'mindful-coach-message coach';
        typingDiv.id = 'mindfulCoachTyping';
        typingDiv.style.opacity = '0.7';
        typingDiv.innerHTML = '🌟 Reflecting...';

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Hide typing indicator
    hideCoachTyping() {
        this.isCoachTyping = false;
        const typingIndicator = document.getElementById('mindfulCoachTyping');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Initialize popup when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PopupController();
    });
} else {
    new PopupController();
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (window.popupController) {
        window.popupController.handleMessage(message);
    }
});