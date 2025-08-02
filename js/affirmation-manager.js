/**
 * Affirmation Manager - Handles loading and selecting affirmations
 * Version 1.0.0 - Static JSON file approach
 * Future: Will evolve to AI-generated, theme-based content with caching
 */

class AffirmationManager {
    constructor() {
        this.affirmations = null;
        this.loadedCategories = [];
        this.cache = new Map(); // For future AI-generated content caching
        this.userPreferences = {
            categories: ['present_moment', 'self_care', 'cosmic_connection'],
            excludedCategories: [],
            personalizedContent: false // Future: AI personalization
        };
    }

    /**
     * Load affirmations from JSON file
     * @param {string} jsonPath - Path to affirmations.json
     */
    async loadAffirmations(jsonPath = './data/affirmations.json') {
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`Failed to load affirmations: ${response.status}`);
            }
            
            this.affirmations = await response.json();
            this.loadedCategories = Object.keys(this.affirmations.categories);
            
            console.log(`✨ Loaded ${this.affirmations.total_affirmations} affirmations across ${this.loadedCategories.length} categories`);
            return this.affirmations;
        } catch (error) {
            console.error('Error loading affirmations:', error);
            // Fallback affirmations if JSON fails to load
            return this.getFallbackAffirmations();
        }
    }

    /**
     * Get a random affirmation from all categories
     * @returns {Object} Affirmation object with text, category, and metadata
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
     * @returns {Object} Affirmation object
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
            category.affirmations.forEach(text => {
                categoryAffirmations.push({
                    text,
                    category: category.name,
                    categoryKey,
                    description: category.description
                });
            });
        });

        const randomIndex = Math.floor(Math.random() * categoryAffirmations.length);
        return categoryAffirmations[randomIndex];
    }

    /**
     * Get affirmation from specific category
     * @param {string} categoryKey - The category identifier
     * @returns {Object} Affirmation object
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
     * @param {string} theme - Theme identifier (cosmic, nature, minimal, etc.)
     * @returns {Object} Themed affirmation
     */
    getThemedAffirmation(theme) {
        const themeMapping = {
            'cosmic': ['cosmic_connection', 'present_moment', 'inner_strength'],
            'nature': ['self_care', 'gratitude', 'mindful_focus'],
            'minimal': ['present_moment', 'mindful_focus', 'inner_strength'],
            'sunset': ['gratitude', 'personal_growth', 'relationships'],
            'ocean': ['self_care', 'mindful_focus', 'creativity'],
            'forest': ['inner_strength', 'personal_growth', 'abundance']
        };

        const categories = themeMapping[theme] || ['present_moment', 'self_care'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        return this.getAffirmationByCategory(randomCategory);
    }

    /**
     * Flatten all affirmations into a single array for easy random selection
     * @returns {Array} Array of affirmation objects
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
     * Update user preferences for personalized content
     * @param {Object} preferences - User preference object
     */
    updateUserPreferences(preferences) {
        this.userPreferences = { ...this.userPreferences, ...preferences };
        
        // Future: This is where we'd trigger AI re-generation of personalized content
        if (preferences.personalizedContent && preferences.focusAreas) {
            this.scheduleAIContentGeneration(preferences.focusAreas);
        }
    }

    /**
     * Future: Schedule AI-generated content based on user preferences
     * @param {Array} focusAreas - User's current focus areas
     */
    scheduleAIContentGeneration(focusAreas) {
        // This will be implemented in Phase 2
        console.log('🤖 AI content generation scheduled for:', focusAreas);
        
        // Future implementation:
        // 1. Call OpenAI API with user's focus areas and current life situation
        // 2. Generate 20-30 personalized affirmations
        // 3. Cache them locally with expiration
        // 4. Blend with curated content for variety
    }

    /**
     * Get available categories for user selection
     * @returns {Array} Array of category objects
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
     * @param {string} keyword - Search term
     * @returns {Array} Array of matching affirmations
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
     * Fallback affirmations if main JSON fails to load
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

// Export for use in Chrome extension or web app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AffirmationManager;
} else {
    window.AffirmationManager = AffirmationManager;
}