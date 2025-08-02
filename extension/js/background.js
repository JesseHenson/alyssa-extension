/**
 * Background Service Worker for Cosmic Tab Coach
 * Handles extension lifecycle, storage, and cross-tab communication
 */

class BackgroundService {
    constructor() {
        this.init();
    }

    init() {
        this.setupInstallHandler();
        this.setupMessageHandlers();
        this.setupStorageHandlers();
        this.setupTabHandlers();
        
        console.log('🌟 Cosmic Tab Coach background service initialized');
    }

    setupInstallHandler() {
        chrome.runtime.onInstalled.addListener(async (details) => {
            console.log('Extension installed/updated:', details.reason);
            
            if (details.reason === 'install') {
                await this.handleFirstInstall();
            } else if (details.reason === 'update') {
                await this.handleUpdate(details.previousVersion);
            }
        });
    }

    async handleFirstInstall() {
        try {
            // Set default preferences
            const defaultPreferences = {
                categories: ['present_moment', 'self_care', 'cosmic_connection'],
                excludedCategories: [],
                personalizedContent: false,
                theme: 'cosmic',
                frequency: 'auto',
                textSize: 'medium',
                showWelcome: true,
                installDate: Date.now()
            };

            await chrome.storage.sync.set({ 
                userPreferences: defaultPreferences,
                version: chrome.runtime.getManifest().version
            });

            // Initialize local storage
            await chrome.storage.local.set({
                favorites: [],
                interactions: [],
                stats: {
                    totalTabsOpened: 0,
                    favoriteAffirmations: 0,
                    daysActive: 0
                }
            });

            console.log('✨ First install setup complete');
            
            // Open welcome page
            chrome.tabs.create({
                url: chrome.runtime.getURL('pages/welcome.html')
            });
            
        } catch (error) {
            console.error('Failed to handle first install:', error);
        }
    }

    async handleUpdate(previousVersion) {
        try {
            console.log(`Updating from version ${previousVersion}`);
            
            // Migration logic based on previous version
            await this.migrateData(previousVersion);
            
            // Update version in storage
            await chrome.storage.sync.set({ 
                version: chrome.runtime.getManifest().version 
            });
            
            console.log('✅ Update migration complete');
            
        } catch (error) {
            console.error('Failed to handle update:', error);
        }
    }

    async migrateData(previousVersion) {
        // Add migration logic here when needed
        // For example, if we change the structure of preferences or add new features
        
        const result = await chrome.storage.sync.get(['userPreferences']);
        if (result.userPreferences) {
            let preferences = result.userPreferences;
            let needsUpdate = false;

            // Example migration: Add new textSize preference if it doesn't exist
            if (!preferences.textSize) {
                preferences.textSize = 'medium';
                needsUpdate = true;
            }

            // Example migration: Ensure new categories are in the default list
            if (!preferences.categories.includes('inner_strength')) {
                preferences.categories.push('inner_strength');
                needsUpdate = true;
            }

            if (needsUpdate) {
                await chrome.storage.sync.set({ userPreferences: preferences });
                console.log('📦 Preferences migrated');
            }
        }
    }

    setupMessageHandlers() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
            return true; // Keep channel open for async responses
        });
    }

    async handleMessage(message, sender, sendResponse) {
        try {
            switch (message.type) {
                case 'GET_AFFIRMATION':
                    await this.handleGetAffirmation(message, sendResponse);
                    break;
                    
                case 'RECORD_INTERACTION':
                    await this.handleRecordInteraction(message, sendResponse);
                    break;
                    
                case 'UPDATE_PREFERENCES':
                    await this.handleUpdatePreferences(message, sendResponse);
                    break;
                    
                case 'GET_STATS':
                    await this.handleGetStats(message, sendResponse);
                    break;
                    
                case 'EXPORT_DATA':
                    await this.handleExportData(message, sendResponse);
                    break;
                    
                case 'PREFERENCES_UPDATED':
                    await this.broadcastPreferencesUpdate(message.preferences);
                    sendResponse({ success: true });
                    break;
                    
                default:
                    console.warn('Unknown message type:', message.type);
                    sendResponse({ error: 'Unknown message type' });
            }
        } catch (error) {
            console.error('Error handling message:', error);
            sendResponse({ error: error.message });
        }
    }

    async handleGetAffirmation(message, sendResponse) {
        // This could be used by popup or options page to get affirmations
        // For now, we'll delegate to the affirmation manager in the requesting context
        sendResponse({ 
            message: 'Affirmation requests should be handled by local AffirmationManager' 
        });
    }

    async handleRecordInteraction(message, sendResponse) {
        try {
            const { interactions = [] } = await chrome.storage.local.get(['interactions']);
            
            const interaction = {
                ...message.interaction,
                timestamp: Date.now(),
                tabId: message.tabId
            };
            
            interactions.push(interaction);
            
            // Keep only last 100 interactions
            if (interactions.length > 100) {
                interactions.splice(0, interactions.length - 100);
            }
            
            await chrome.storage.local.set({ interactions });
            
            // Update stats
            await this.updateStats(interaction);
            
            sendResponse({ success: true });
        } catch (error) {
            sendResponse({ error: error.message });
        }
    }

    async handleUpdatePreferences(message, sendResponse) {
        try {
            const { userPreferences } = await chrome.storage.sync.get(['userPreferences']);
            const updatedPreferences = { ...userPreferences, ...message.preferences };
            
            await chrome.storage.sync.set({ userPreferences: updatedPreferences });
            
            // Broadcast to all tabs
            await this.broadcastPreferencesUpdate(updatedPreferences);
            
            sendResponse({ success: true, preferences: updatedPreferences });
        } catch (error) {
            sendResponse({ error: error.message });
        }
    }

    async handleGetStats(message, sendResponse) {
        try {
            const [syncData, localData] = await Promise.all([
                chrome.storage.sync.get(['userPreferences', 'version']),
                chrome.storage.local.get(['interactions', 'favorites', 'stats'])
            ]);
            
            const stats = this.calculateStats(syncData, localData);
            sendResponse({ success: true, stats });
        } catch (error) {
            sendResponse({ error: error.message });
        }
    }

    async handleExportData(message, sendResponse) {
        try {
            const [syncData, localData] = await Promise.all([
                chrome.storage.sync.get(),
                chrome.storage.local.get()
            ]);
            
            const exportData = {
                version: chrome.runtime.getManifest().version,
                exportDate: new Date().toISOString(),
                preferences: syncData.userPreferences,
                favorites: localData.favorites || [],
                stats: localData.stats || {},
                // Don't export full interaction history for privacy
                interactionSummary: this.summarizeInteractions(localData.interactions || [])
            };
            
            sendResponse({ success: true, data: exportData });
        } catch (error) {
            sendResponse({ error: error.message });
        }
    }

    async broadcastPreferencesUpdate(preferences) {
        try {
            const tabs = await chrome.tabs.query({});
            const newtabUrl = chrome.runtime.getURL('pages/newtab.html');
            
            for (const tab of tabs) {
                if (tab.url === newtabUrl) {
                    try {
                        await chrome.tabs.sendMessage(tab.id, {
                            type: 'PREFERENCES_UPDATED',
                            preferences
                        });
                    } catch (error) {
                        // Tab might not have content script loaded yet
                        console.log('Could not send message to tab:', tab.id);
                    }
                }
            }
        } catch (error) {
            console.error('Failed to broadcast preferences update:', error);
        }
    }

    async updateStats(interaction) {
        try {
            const { stats = {} } = await chrome.storage.local.get(['stats']);
            
            // Initialize stats if needed
            if (!stats.totalTabsOpened) stats.totalTabsOpened = 0;
            if (!stats.favoriteAffirmations) stats.favoriteAffirmations = 0;
            if (!stats.daysActive) stats.daysActive = 0;
            if (!stats.lastActiveDate) stats.lastActiveDate = null;
            
            // Update relevant stats
            if (interaction.interactionType === 'viewed') {
                stats.totalTabsOpened++;
            } else if (interaction.interactionType === 'liked') {
                stats.favoriteAffirmations++;
            }
            
            // Update days active
            const today = new Date().toDateString();
            if (stats.lastActiveDate !== today) {
                stats.daysActive++;
                stats.lastActiveDate = today;
            }
            
            await chrome.storage.local.set({ stats });
        } catch (error) {
            console.error('Failed to update stats:', error);
        }
    }

    calculateStats(syncData, localData) {
        const interactions = localData.interactions || [];
        const favorites = localData.favorites || [];
        const baseStats = localData.stats || {};
        
        // Calculate interaction stats
        const interactionStats = {
            total: interactions.length,
            byType: {},
            byCategory: {},
            byTheme: {},
            recentActivity: 0
        };
        
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        
        interactions.forEach(interaction => {
            // By type
            interactionStats.byType[interaction.interactionType] = 
                (interactionStats.byType[interaction.interactionType] || 0) + 1;
            
            // By category
            if (interaction.category) {
                interactionStats.byCategory[interaction.category] = 
                    (interactionStats.byCategory[interaction.category] || 0) + 1;
            }
            
            // By theme
            if (interaction.theme) {
                interactionStats.byTheme[interaction.theme] = 
                    (interactionStats.byTheme[interaction.theme] || 0) + 1;
            }
            
            // Recent activity
            if (interaction.timestamp > oneWeekAgo) {
                interactionStats.recentActivity++;
            }
        });
        
        return {
            ...baseStats,
            interactions: interactionStats,
            favorites: {
                total: favorites.length,
                list: favorites
            },
            preferences: syncData.userPreferences,
            version: syncData.version
        };
    }

    summarizeInteractions(interactions) {
        return {
            total: interactions.length,
            dateRange: interactions.length > 0 ? {
                earliest: Math.min(...interactions.map(i => i.timestamp)),
                latest: Math.max(...interactions.map(i => i.timestamp))
            } : null,
            mostCommonCategory: this.getMostCommon(interactions, 'category'),
            mostCommonTheme: this.getMostCommon(interactions, 'theme')
        };
    }

    getMostCommon(items, property) {
        const counts = {};
        items.forEach(item => {
            if (item[property]) {
                counts[item[property]] = (counts[item[property]] || 0) + 1;
            }
        });
        
        let maxCount = 0;
        let mostCommon = null;
        
        Object.entries(counts).forEach(([value, count]) => {
            if (count > maxCount) {
                maxCount = count;
                mostCommon = value;
            }
        });
        
        return mostCommon;
    }

    setupStorageHandlers() {
        // Listen for storage changes to sync across extension contexts
        chrome.storage.onChanged.addListener((changes, areaName) => {
            if (areaName === 'sync' && changes.userPreferences) {
                console.log('User preferences changed');
                // Could broadcast this change to active tabs if needed
            }
        });
    }

    setupTabHandlers() {
        // Track when new tabs are opened (for statistics)
        chrome.tabs.onCreated.addListener(async (tab) => {
            const newtabUrl = chrome.runtime.getURL('pages/newtab.html');
            
            if (tab.url === newtabUrl || tab.pendingUrl === newtabUrl) {
                // This is our new tab page opening
                try {
                    const { stats = {} } = await chrome.storage.local.get(['stats']);
                    if (!stats.totalTabsOpened) stats.totalTabsOpened = 0;
                    stats.totalTabsOpened++;
                    await chrome.storage.local.set({ stats });
                } catch (error) {
                    console.error('Failed to update tab stats:', error);
                }
            }
        });
    }
}

// Initialize the background service
new BackgroundService();