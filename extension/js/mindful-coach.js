/**
 * Cosmic Tab Coach - Mindful Coach Agent
 * AI-powered conversational coach with stress detection and cosmic wisdom
 */

class MindfulCoach {
    constructor() {
        this.conversationHistory = [];
        this.userStressLevel = 0;
        this.sessionStartTime = Date.now();
        this.interventionCount = 0;
        this.isListening = false;
        
        // Stress detection patterns
        this.stressPatterns = {
            urgency: [
                'urgent', 'asap', 'deadline', 'hurry', 'rush', 'quickly', 'emergency',
                'immediately', 'right now', 'too much', 'overwhelmed', 'stressed'
            ],
            overwhelm: [
                'too many', 'can\'t handle', 'falling behind', 'drowning', 'impossible',
                'everything is', 'all at once', 'no time', 'breaking down'
            ],
            anxiety: [
                'what if', 'worried', 'anxious', 'nervous', 'scared', 'panicking',
                'freaking out', 'can\'t breathe', 'racing thoughts', 'restless'
            ],
            decision_paralysis: [
                'don\'t know what', 'confused', 'unsure', 'stuck', 'paralyzed',
                'can\'t decide', 'what should i', 'help me choose'
            ],
            irritation: [
                'annoying', 'irritating', 'frustrating', 'people are', 'hate when',
                'so stupid', 'drives me crazy', 'fed up', 'can\'t stand'
            ]
        };

        // Cosmic response templates
        this.responseTemplates = {
            high_stress: [
                "I can feel the intensity in your words, and it sounds like you're carrying the weight of stars right now. 🌟 Let's pause and create some cosmic spaciousness together.",
                "Your energy feels swirling and urgent - like a cosmic storm. 🌪️ Before we dive in, would you like to take a celestial breath with me?",
                "I sense you're in the thick of it right now. 🌌 Sometimes when we're in the eye of the storm, a moment of cosmic stillness can bring clarity."
            ],
            moderate_stress: [
                "I hear some tension in your question, like you're navigating choppy cosmic waters. 🌊 Let's approach this with gentle wisdom.",
                "It sounds like you're feeling pulled in different directions, like planets in orbit. 🪐 Let's find your center.",
                "I can sense some underlying current of concern. 🌙 Would it help to explore this with some cosmic perspective?"
            ],
            gentle_guidance: [
                "That's a beautiful question that shows your thoughtful cosmic nature. ✨ Let's explore this together.",
                "I love how you're reaching out for guidance - that takes cosmic courage. 🌟 Here's what I'm sensing...",
                "Your question carries such depth, like starlight from distant galaxies. 🌌 Let me offer some perspective..."
            ]
        };

        // Wellness interventions
        this.interventions = {
            breathing: {
                name: "Cosmic Breathing",
                duration: "2-3 minutes",
                description: "Breathe with the rhythm of the universe",
                script: "Imagine you're breathing in stardust and exhaling cosmic light..."
            },
            grounding: {
                name: "Cosmic Grounding",
                duration: "1-2 minutes", 
                description: "Connect with your place in the universe",
                script: "Feel your feet on Earth, this beautiful planet spinning through space..."
            },
            perspective: {
                name: "Cosmic Perspective",
                duration: "30 seconds",
                description: "Zoom out to see the bigger picture",
                script: "Imagine looking at your situation from the International Space Station..."
            },
            affirmation: {
                name: "Cosmic Affirmation",
                duration: "1 minute",
                description: "Gentle cosmic wisdom for your soul",
                script: "You are exactly where you need to be in this cosmic moment..."
            }
        };
    }

    /**
     * Analyze user message for stress patterns
     */
    analyzeStress(message) {
        const text = message.toLowerCase();
        let stressScore = 0;
        let detectedPatterns = [];

        // Check each stress pattern category
        Object.keys(this.stressPatterns).forEach(category => {
            const patterns = this.stressPatterns[category];
            let categoryMatches = 0;
            
            patterns.forEach(pattern => {
                if (text.includes(pattern)) {
                    categoryMatches++;
                    detectedPatterns.push({category, pattern});
                }
            });
            
            // Weight different categories
            const weights = {
                urgency: 0.8,
                overwhelm: 1.0,
                anxiety: 0.9,
                decision_paralysis: 0.7,
                irritation: 0.6
            };
            
            stressScore += categoryMatches * (weights[category] || 0.5);
        });

        // Check for repeated concerns (conversation history)
        const recentMessages = this.conversationHistory.slice(-3);
        const similarConcerns = recentMessages.filter(msg => 
            this.calculateSimilarity(text, msg.content.toLowerCase()) > 0.6
        ).length;
        
        if (similarConcerns > 1) {
            stressScore += 0.5; // Repetitive concerns indicate stress
            detectedPatterns.push({category: 'repetition', pattern: 'similar_concerns'});
        }

        // Normalize stress score (0-1 scale)
        const normalizedScore = Math.min(stressScore / 5, 1);
        
        return {
            level: normalizedScore,
            patterns: detectedPatterns,
            category: this.getStressCategory(normalizedScore),
            needsIntervention: normalizedScore > 0.6
        };
    }

    /**
     * Calculate similarity between two strings
     */
    calculateSimilarity(str1, str2) {
        const words1 = str1.split(' ');
        const words2 = str2.split(' ');
        const intersection = words1.filter(word => words2.includes(word));
        return intersection.length / Math.max(words1.length, words2.length);
    }

    /**
     * Get stress category based on level
     */
    getStressCategory(level) {
        if (level > 0.7) return 'high_stress';
        if (level > 0.4) return 'moderate_stress';
        return 'gentle_guidance';
    }

    /**
     * Generate mindful response based on stress analysis
     */
    generateResponse(userMessage, stressAnalysis, contextualAffirmations = { results: [] }) {
        const templates = this.responseTemplates[stressAnalysis.category];
        const baseResponse = templates[Math.floor(Math.random() * templates.length)];
        
        let response = baseResponse;
        
        // 🆕 Add personalized affirmation from vector search if available
        if (contextualAffirmations.results && contextualAffirmations.results.length > 0) {
            const bestMatch = contextualAffirmations.results[0]; // Highest relevance score
            response += `\n\n✨ **Cosmic Wisdom for You:**\n"${bestMatch.text}"\n*This resonates with your ${bestMatch.category.toLowerCase()} energy*`;
        }
        
        // Add specific guidance based on detected patterns
        if (stressAnalysis.patterns.some(p => p.category === 'urgency')) {
            response += "\n\nI notice you're feeling time pressure. Sometimes when we're rushing, we miss the wisdom that comes from pausing. ⏰✨";
        }
        
        if (stressAnalysis.patterns.some(p => p.category === 'overwhelm')) {
            response += "\n\nIt sounds like you're juggling many cosmic forces at once. Remember, even galaxies formed one star at a time. 🌌";
        }
        
        if (stressAnalysis.patterns.some(p => p.category === 'decision_paralysis')) {
            response += "\n\nDecisions can feel heavy when we're disconnected from our inner compass. Your intuition holds more wisdom than you know. 🧭✨";
        }
        
        if (stressAnalysis.patterns.some(p => p.category === 'anxiety')) {
            response += "\n\nI can feel the swirling energy of worry. Anxiety often means our mind is time-traveling - let's bring you back to this cosmic moment. 🌸";
        }
        
        if (stressAnalysis.patterns.some(p => p.category === 'irritation')) {
            response += "\n\nWhen everything feels irritating, it's often our nervous system asking for care. You might be running on empty cosmic fuel. 🔋💫";
        }
        
        // 🆕 Show additional relevant affirmations if stress is high
        if (stressAnalysis.level > 0.6 && contextualAffirmations.results && contextualAffirmations.results.length > 1) {
            const additionalAffirmation = contextualAffirmations.results[1];
            response += `\n\n🌟 **Another Cosmic Truth:** "${additionalAffirmation.text}"`;
        }
        
        // Suggest intervention if needed
        if (stressAnalysis.needsIntervention && this.interventionCount < 3) {
            const intervention = this.selectIntervention(stressAnalysis);
            response += `\n\n🌟 **Cosmic Intervention Suggested:**\nWould you like to try a ${intervention.name}? It takes just ${intervention.duration} and might help bring you back to your center. ${intervention.description}`;
        }
        
        return response;
    }

    /**
     * Select appropriate intervention based on stress analysis
     */
    selectIntervention(stressAnalysis) {
        const patterns = stressAnalysis.patterns.map(p => p.category);
        
        if (patterns.includes('anxiety') || patterns.includes('urgency')) {
            return this.interventions.breathing;
        } else if (patterns.includes('overwhelm')) {
            return this.interventions.perspective;
        } else if (patterns.includes('decision_paralysis')) {
            return this.interventions.grounding;
        } else {
            return this.interventions.affirmation;
        }
    }

    /**
     * Get contextual affirmations from vector search API
     */
    async getContextualAffirmations(userMessage, stressAnalysis) {
        try {
            const response = await fetch('http://localhost:8000/affirmations/contextual', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_input: userMessage,
                    current_mood: this.getMoodFromStress(stressAnalysis.level),
                    stress_level: stressAnalysis.level,
                    preferred_themes: this.getThemesFromPatterns(stressAnalysis.patterns),
                    user_id: 'anonymous' // For privacy
                })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.warn('Vector affirmation search unavailable:', error);
            return { results: [], source: 'unavailable' };
        }
    }

    /**
     * Map stress level to mood description
     */
    getMoodFromStress(stressLevel) {
        if (stressLevel > 0.7) return 'overwhelmed';
        if (stressLevel > 0.4) return 'stressed';
        if (stressLevel > 0.2) return 'tense';
        return 'calm';
    }

    /**
     * Map stress patterns to affirmation themes
     */
    getThemesFromPatterns(patterns) {
        const themeMapping = {
            'overwhelm': ['mindful_focus', 'work_balance'],
            'time_pressure': ['present_moment', 'work_balance'],
            'decision_anxiety': ['inner_strength', 'clarity'],
            'perfectionism': ['self_care', 'personal_growth'],
            'imposter_syndrome': ['inner_strength', 'self_care'],
            'criticism': ['self_care', 'inner_strength'],
            'isolation': ['relationships', 'cosmic_connection'],
            'uncertainty': ['inner_strength', 'present_moment']
        };

        const themes = new Set();
        patterns.forEach(pattern => {
            const mappedThemes = themeMapping[pattern] || ['present_moment'];
            mappedThemes.forEach(theme => themes.add(theme));
        });

        return Array.from(themes);
    }

    /**
     * Main method to handle user input and generate response
     */
    async handleUserInput(userMessage) {
        // Record conversation
        this.conversationHistory.push({
            timestamp: Date.now(),
            role: 'user',
            content: userMessage
        });

        // Analyze stress patterns
        const stressAnalysis = this.analyzeStress(userMessage);
        this.userStressLevel = stressAnalysis.level;

        // 🆕 Get contextual affirmations from vector search
        const contextualAffirmations = await this.getContextualAffirmations(userMessage, stressAnalysis);

        // Generate mindful response (enhanced with vector search results)
        const response = this.generateResponse(userMessage, stressAnalysis, contextualAffirmations);

        // Record response
        this.conversationHistory.push({
            timestamp: Date.now(),
            role: 'coach',
            content: response,
            stressLevel: stressAnalysis.level,
            patterns: stressAnalysis.patterns
        });

        // Track analytics (if available)
        if (typeof cosmicAPI !== 'undefined') {
            try {
                await cosmicAPI.trackUsage('mindful_coach_interaction', null, {
                    stress_level: stressAnalysis.level,
                    patterns_detected: stressAnalysis.patterns.length,
                    intervention_offered: stressAnalysis.needsIntervention
                });
            } catch (error) {
                console.log('Analytics tracking unavailable');
            }
        }

        return {
            response,
            stressAnalysis,
            suggestedIntervention: stressAnalysis.needsIntervention ? this.selectIntervention(stressAnalysis) : null,
            contextualAffirmations: contextualAffirmations.results || []
        };
    }

    /**
     * Start a guided intervention
     */
    startIntervention(interventionType) {
        this.interventionCount++;
        const intervention = this.interventions[interventionType];
        
        return {
            name: intervention.name,
            steps: this.getInterventionSteps(interventionType),
            duration: intervention.duration
        };
    }

    /**
     * Get detailed intervention steps
     */
    getInterventionSteps(type) {
        const steps = {
            breathing: [
                "🌟 Find a comfortable position and gently close your eyes if you'd like",
                "🌌 Imagine you're floating in peaceful cosmic space",
                "✨ Breathe in slowly for 4 counts, drawing in starlight and calm",
                "🌙 Hold for 4 counts, feeling the light fill your entire being", 
                "💫 Exhale for 6 counts, releasing any tension into the cosmic void",
                "🌟 Repeat this cosmic rhythm 5-7 times, letting each breath bring you peace"
            ],
            grounding: [
                "🌍 Feel your connection to this beautiful planet Earth",
                "🦶 Notice your feet touching the ground - you are supported",
                "👀 Name 5 things you can see around you",
                "👂 Name 4 things you can hear right now",
                "✋ Name 3 things you can touch", 
                "👃 Name 2 things you can smell",
                "👅 Name 1 thing you can taste",
                "🌌 You are here, present, connected to the cosmos"
            ],
            perspective: [
                "🌍 Imagine floating above Earth, seeing your situation from space",
                "🌌 Notice how vast and beautiful the universe is",
                "⭐ Your challenge is just one small part of an infinite cosmic story",
                "🌟 Zoom back down slowly, bringing that perspective with you",
                "💫 You have cosmic wisdom within you to handle whatever comes"
            ],
            affirmation: [
                "🌟 Place your hand on your heart and feel it beating",
                "💫 Repeat: 'I am exactly where I need to be in this cosmic moment'",
                "✨ Repeat: 'I have all the wisdom I need within my cosmic being'",
                "🌙 Repeat: 'This challenge is helping me grow like a star'",
                "🌌 Take a deep breath and carry this cosmic truth with you"
            ]
        };
        
        return steps[type] || [];
    }

    /**
     * Get conversation summary for analytics
     */
    getConversationSummary() {
        return {
            duration: Date.now() - this.sessionStartTime,
            messageCount: this.conversationHistory.length,
            averageStressLevel: this.conversationHistory
                .filter(m => m.stressLevel !== undefined)
                .reduce((sum, m) => sum + m.stressLevel, 0) / 
                this.conversationHistory.filter(m => m.stressLevel !== undefined).length,
            interventionsOffered: this.interventionCount,
            patterns: this.conversationHistory
                .flatMap(m => m.patterns || [])
                .reduce((acc, pattern) => {
                    acc[pattern.category] = (acc[pattern.category] || 0) + 1;
                    return acc;
                }, {})
        };
    }

    /**
     * Clear conversation history
     */
    clearHistory() {
        this.conversationHistory = [];
        this.userStressLevel = 0;
        this.sessionStartTime = Date.now();
        this.interventionCount = 0;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MindfulCoach;
} else {
    window.MindfulCoach = MindfulCoach;
}