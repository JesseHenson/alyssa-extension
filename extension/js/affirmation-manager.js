/**
 * Affirmation Manager for Chrome Extension
 * Handles loading, caching, and serving affirmations with Chrome storage integration
 */

class AffirmationManager {
    constructor() {
        this.affirmations = null;
        this.loadedCategories = [];
        this.cache = new Map();
        this.userPreferences = {
            categories: ['present_moment', 'self_care', 'cosmic_connection'],
            excludedCategories: [],
            personalizedContent: false,
            theme: 'cosmic',
            frequency: 'auto', // 'auto', 'manual', '30s', '5m'
            textSize: 'medium' // 'small', 'medium', 'large'
        };
        this.init();
    }

    async init() {
        await this.loadUserPreferences();
        await this.loadAffirmations();
    }

    /**
     * Load user preferences from Chrome storage
     */
    async loadUserPreferences() {
        try {
            const result = await chrome.storage.sync.get(['userPreferences']);
            if (result.userPreferences) {
                this.userPreferences = { ...this.userPreferences, ...result.userPreferences };
            }
        } catch (error) {
            console.log('Using default preferences:', error);
        }
    }

    /**
     * Save user preferences to Chrome storage
     */
    async saveUserPreferences() {
        try {
            await chrome.storage.sync.set({ userPreferences: this.userPreferences });
        } catch (error) {
            console.error('Failed to save preferences:', error);
        }
    }

    /**
     * Load affirmations from JSON file
     */
    async loadAffirmations() {
        try {
            const response = await fetch(chrome.runtime.getURL('data/affirmations.json'));
            if (!response.ok) {
                throw new Error(`Failed to load affirmations: ${response.status}`);
            }
            
            this.affirmations = await response.json();
            this.loadedCategories = Object.keys(this.affirmations.categories);
            
            console.log(`✨ Loaded ${this.affirmations.total_affirmations} affirmations across ${this.loadedCategories.length} categories`);
            return this.affirmations;
        } catch (error) {
            console.error('Error loading affirmations:', error);
            return this.getFallbackAffirmations();
        }
    }

    /**
     * Get a random affirmation from all categories
     */
    getRandomAffirmation() {
        if (!this.affirmations) {
            return this.getFallbackAffirmation();
        }

        const allAffirmations = this.getAllAffirmationsFlat();
        const randomIndex = Math.floor(Math.random() * allAffirmations.length);
        return allAffirmations[randomIndex];
    }

    /**
     * Get affirmation based on user's preferred categories
     */
    getPersonalizedAffirmation() {
        if (!this.affirmations) {
            return this.getFallbackAffirmation();
        }

        const preferredCategories = this.userPreferences.categories.filter(
            cat => this.loadedCategories.includes(cat)
        );

        if (preferredCategories.length === 0) {
            return this.getRandomAffirmation();
        }

        const categoryAffirmations = [];
        preferredCategories.forEach(categoryKey => {
            const category = this.affirmations.categories[categoryKey];
            if (category) {
                category.affirmations.forEach(text => {
                    categoryAffirmations.push({
                        text,
                        category: category.name,
                        categoryKey,
                        description: category.description
                    });
                });
            }
        });

        if (categoryAffirmations.length === 0) {
            return this.getRandomAffirmation();
        }

        const randomIndex = Math.floor(Math.random() * categoryAffirmations.length);
        return categoryAffirmations[randomIndex];
    }

    /**
     * Get affirmation from specific category
     */
    getAffirmationByCategory(categoryKey) {
        if (!this.affirmations || !this.affirmations.categories[categoryKey]) {
            return this.getFallbackAffirmation();
        }

        const category = this.affirmations.categories[categoryKey];
        const randomIndex = Math.floor(Math.random() * category.affirmations.length);
        
        return {
            text: category.affirmations[randomIndex],
            category: category.name,
            categoryKey,
            description: category.description
        };
    }

    /**
     * Get affirmations based on theme/mood
     */
    getThemedAffirmation(theme = null) {
        const currentTheme = theme || this.userPreferences.theme;
        
        const themeMapping = {
            'cosmic': ['cosmic_connection', 'present_moment', 'inner_strength'],
            'nature': ['self_care', 'gratitude', 'mindful_focus'],
            'minimal': ['present_moment', 'mindful_focus', 'inner_strength'],
            'sunset': ['gratitude', 'personal_growth', 'relationships'],
            'ocean': ['self_care', 'mindful_focus', 'creativity'],
            'forest': ['inner_strength', 'personal_growth', 'abundance']
        };

        const categories = themeMapping[currentTheme] || ['present_moment', 'self_care'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        return this.getAffirmationByCategory(randomCategory);
    }

    /**
     * Get affirmation based on time of day
     */
    getTimeBasedAffirmation() {
        const hour = new Date().getHours();
        let categories;

        if (hour < 6) { // Late night/early morning
            categories = ['inner_strength', 'self_care', 'present_moment'];
        } else if (hour < 12) { // Morning
            categories = ['personal_growth', 'gratitude', 'cosmic_connection'];
        } else if (hour < 17) { // Afternoon
            categories = ['work_balance', 'mindful_focus', 'inner_strength'];
        } else if (hour < 21) { // Evening
            categories = ['relationships', 'gratitude', 'self_care'];
        } else { // Night
            categories = ['self_care', 'present_moment', 'gratitude'];
        }

        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        return this.getAffirmationByCategory(randomCategory);
    }

    /**
     * Get contextual affirmation based on preferences and time
     */
    getContextualAffirmation() {
        if (this.userPreferences.personalizedContent) {
            return this.getPersonalizedAffirmation();
        } else if (this.userPreferences.theme !== 'auto') {
            return this.getThemedAffirmation();
        } else {
            return this.getTimeBasedAffirmation();
        }
    }

    /**
     * Flatten all affirmations into a single array
     */
    getAllAffirmationsFlat() {
        const allAffirmations = [];
        
        Object.keys(this.affirmations.categories).forEach(categoryKey => {
            const category = this.affirmations.categories[categoryKey];
            category.affirmations.forEach(text => {
                allAffirmations.push({
                    text,
                    category: category.name,
                    categoryKey,
                    description: category.description
                });
            });
        });

        return allAffirmations;
    }

    /**
     * Update user preferences
     */
    async updateUserPreferences(preferences) {
        this.userPreferences = { ...this.userPreferences, ...preferences };
        await this.saveUserPreferences();
        
        // Notify other extension pages of preference changes
        try {
            chrome.runtime.sendMessage({
                type: 'PREFERENCES_UPDATED',
                preferences: this.userPreferences
            });
        } catch (error) {
            // Ignore errors if no listeners
        }
    }

    /**
     * Get available categories
     */
    getCategories() {
        if (!this.affirmations) return [];
        
        return Object.keys(this.affirmations.categories).map(key => ({
            key,
            name: this.affirmations.categories[key].name,
            description: this.affirmations.categories[key].description,
            count: this.affirmations.categories[key].affirmations.length
        }));
    }

    /**
     * Search affirmations by keyword
     */
    searchAffirmations(keyword) {
        if (!this.affirmations) return [];
        
        const searchTerm = keyword.toLowerCase();
        const results = [];
        
        this.getAllAffirmationsFlat().forEach(affirmation => {
            if (affirmation.text.toLowerCase().includes(searchTerm) ||
                affirmation.category.toLowerCase().includes(searchTerm)) {
                results.push(affirmation);
            }
        });
        
        return results;
    }

    /**
     * Record affirmation interaction for analytics
     */
    async recordInteraction(affirmation, interactionType) {
        try {
            const interaction = {
                affirmationText: affirmation.text.substring(0, 50) + '...', // Truncate for privacy
                category: affirmation.categoryKey,
                interactionType, // 'viewed', 'liked', 'skipped', 'shared'
                timestamp: Date.now(),
                theme: this.userPreferences.theme
            };

            // Store locally for potential analytics (anonymized)
            const { interactions = [] } = await chrome.storage.local.get(['interactions']);
            interactions.push(interaction);
            
            // Keep only last 100 interactions
            if (interactions.length > 100) {
                interactions.splice(0, interactions.length - 100);
            }
            
            await chrome.storage.local.set({ interactions });
        } catch (error) {
            console.error('Failed to record interaction:', error);
        }
    }

    /**
     * Get usage statistics
     */
    async getUsageStats() {
        try {
            const { interactions = [] } = await chrome.storage.local.get(['interactions']);
            
            const stats = {
                totalInteractions: interactions.length,
                favoriteCategories: {},
                themeUsage: {},
                dailyUsage: {},
                lastWeekInteractions: 0
            };

            const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

            interactions.forEach(interaction => {
                // Category stats
                stats.favoriteCategories[interaction.category] = 
                    (stats.favoriteCategories[interaction.category] || 0) + 1;

                // Theme stats  
                stats.themeUsage[interaction.theme] = 
                    (stats.themeUsage[interaction.theme] || 0) + 1;

                // Recent activity
                if (interaction.timestamp > oneWeekAgo) {
                    stats.lastWeekInteractions++;
                }

                // Daily usage pattern
                const hour = new Date(interaction.timestamp).getHours();
                const timeSlot = Math.floor(hour / 6); // 0-3 for 4 time slots
                stats.dailyUsage[timeSlot] = (stats.dailyUsage[timeSlot] || 0) + 1;
            });

            return stats;
        } catch (error) {
            console.error('Failed to get usage stats:', error);
            return {};
        }
    }

    /**
     * Fallback affirmations if main JSON fails
     */
    getFallbackAffirmations() {
        return {
            version: "1.0.0-fallback",
            total_affirmations: 10,
            categories: {
                fallback: {
                    name: "Essential Affirmations",
                    description: "Core affirmations for when content fails to load",
                    affirmations: [
                        "You are exactly where you need to be in this moment",
                        "You are worthy of love and belonging",
                        "Your presence makes a difference in the world",
                        "You have everything within you to handle whatever comes",
                        "This moment is a gift, and you are grateful for it",
                        "You trust the process of your life's unfolding",
                        "You are growing stronger and wiser each day",
                        "Your heart is open to giving and receiving love",
                        "You find peace in accepting what is",
                        "You are a unique and valuable part of the universe"
                    ]
                }
            }
        };
    }

    /**
     * Get fallback affirmation
     */
    getFallbackAffirmation() {
        const fallback = this.getFallbackAffirmations();
        const affirmations = fallback.categories.fallback.affirmations;
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        
        return {
            text: affirmations[randomIndex],
            category: "Essential Guidance",
            categoryKey: "fallback",
            description: "Core wisdom for daily guidance"
        };
    }

    /**
     * Get statistics about loaded content
     */
    getStats() {
        if (!this.affirmations) return null;
        
        return {
            totalAffirmations: this.affirmations.total_affirmations,
            categories: this.loadedCategories.length,
            version: this.affirmations.version,
            lastUpdated: this.affirmations.last_updated,
            userPreferences: this.userPreferences,
            cacheSize: this.cache.size
        };
    }
}

// Global instance for extension use
let affirmationManager;

// Initialize when script loads
(async () => {
    affirmationManager = new AffirmationManager();
})();

// Export for other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AffirmationManager;
} else if (typeof window !== 'undefined') {
    window.AffirmationManager = AffirmationManager;
    window.affirmationManager = affirmationManager;
}