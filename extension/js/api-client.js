/**
 * Cosmic Tab Coach API Client
 * Handles communication between Chrome extension and backend database
 */

class CosmicAPI {
    constructor() {
        // Update this URL when you deploy your backend
        this.baseUrl = 'http://localhost:8000'; // Development
        // this.baseUrl = 'https://your-api-domain.com'; // Production
        
        this.userId = null;
        this.isOnline = navigator.onLine;
        this.pendingEvents = [];
        
        // Listen for online/offline events
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    }

    async init() {
        try {
            // Get or create anonymous user ID
            const stored = await chrome.storage.local.get(['cosmic_user_id']);
            
            if (stored.cosmic_user_id) {
                this.userId = stored.cosmic_user_id;
                console.log('✨ Existing user loaded:', this.userId);
            } else {
                await this.createAnonymousUser();
            }
            
            // Sync any pending offline events
            await this.syncPendingEvents();
            
        } catch (error) {
            console.log('🔄 API unavailable, using offline mode');
            // Generate local user ID for offline functionality
            if (!this.userId) {
                this.userId = 'offline_' + Math.random().toString(36).substr(2, 9);
                await chrome.storage.local.set({ cosmic_user_id: this.userId });
            }
        }
    }

    async createAnonymousUser() {
        const response = await this.fetchWithTimeout('/auth/anonymous', {
            method: 'POST'
        });
        
        if (response.ok) {
            const data = await response.json();
            this.userId = data.user_id;
            await chrome.storage.local.set({ cosmic_user_id: this.userId });
            console.log('🌟 New anonymous user created:', this.userId);
            return data;
        } else {
            throw new Error('Failed to create user');
        }
    }

    async getPersonalizedAffirmations(limit = 10) {
        if (!this.isOnline || !this.userId.startsWith('offline_') === false) {
            return this.getFallbackAffirmations(limit);
        }

        try {
            const response = await this.fetchWithTimeout(
                `/affirmations/personalized/${this.userId}?limit=${limit}`
            );
            
            if (response.ok) {
                const data = await response.json();
                // Cache for offline use
                await chrome.storage.local.set({ 
                    cached_affirmations: data.affirmations,
                    cache_timestamp: Date.now()
                });
                return data.affirmations;
            }
        } catch (error) {
            console.log('🔄 Using cached affirmations');
        }
        
        return this.getFallbackAffirmations(limit);
    }

    async getFallbackAffirmations(limit = 10) {
        // Try cached affirmations first
        const stored = await chrome.storage.local.get(['cached_affirmations']);
        if (stored.cached_affirmations && stored.cached_affirmations.length > 0) {
            return stored.cached_affirmations.slice(0, limit);
        }
        
        // Fallback to local JSON data
        // This would use your existing affirmation-manager.js logic
        return [];
    }

    async updatePreferences(preferences) {
        const updateData = {
            user_id: this.userId,
            ...preferences,
            updated_at: new Date().toISOString()
        };

        if (this.isOnline && !this.userId.startsWith('offline_')) {
            try {
                const response = await this.fetchWithTimeout(`/preferences/${this.userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData)
                });
                
                if (response.ok) {
                    console.log('✅ Preferences synced to cloud');
                    return await response.json();
                }
            } catch (error) {
                console.log('🔄 Saving preferences locally');
            }
        }

        // Always save locally as backup/offline storage
        await chrome.storage.local.set({ user_preferences: updateData });
        return { status: 'saved_locally', data: updateData };
    }

    async trackUsage(eventType, affirmationId = null, metadata = {}) {
        const event = {
            user_id: this.userId,
            event_type: eventType,
            affirmation_id: affirmationId,
            session_id: await this.getSessionId(),
            metadata,
            created_at: new Date().toISOString()
        };

        if (this.isOnline && !this.userId.startsWith('offline_')) {
            try {
                const response = await this.fetchWithTimeout('/usage/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(event)
                });
                
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                // Queue for later sync
                this.pendingEvents.push(event);
                await this.savePendingEvents();
            }
        } else {
            // Queue for later sync
            this.pendingEvents.push(event);
            await this.savePendingEvents();
        }
    }

    async getAnalytics() {
        if (!this.isOnline || this.userId.startsWith('offline_')) {
            return this.getLocalAnalytics();
        }

        try {
            const response = await this.fetchWithTimeout(`/analytics/${this.userId}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.log('🔄 Using local analytics');
        }
        
        return this.getLocalAnalytics();
    }

    async getLocalAnalytics() {
        const events = await chrome.storage.local.get(['pending_events']);
        const pendingEvents = events.pending_events || [];
        
        const analytics = {
            user_id: this.userId,
            total_affirmations_viewed: pendingEvents.filter(e => e.event_type === 'viewed').length,
            total_favorites: pendingEvents.filter(e => e.event_type === 'liked').length,
            total_shares: pendingEvents.filter(e => e.event_type === 'shared').length,
            most_active_categories: [],
            mindfulness_streak: 0,
            offline_mode: true
        };
        
        return analytics;
    }

    // Utility Methods

    async fetchWithTimeout(endpoint, options = {}, timeout = 5000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(this.baseUrl + endpoint, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    async getSessionId() {
        const stored = await chrome.storage.session.get(['session_id']);
        if (stored.session_id) {
            return stored.session_id;
        }
        
        const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
        await chrome.storage.session.set({ session_id: sessionId });
        return sessionId;
    }

    async savePendingEvents() {
        await chrome.storage.local.set({ pending_events: this.pendingEvents });
    }

    async loadPendingEvents() {
        const stored = await chrome.storage.local.get(['pending_events']);
        this.pendingEvents = stored.pending_events || [];
    }

    async syncPendingEvents() {
        if (!this.isOnline || this.userId.startsWith('offline_')) {
            return;
        }

        await this.loadPendingEvents();
        
        if (this.pendingEvents.length === 0) {
            return;
        }

        console.log(`🔄 Syncing ${this.pendingEvents.length} pending events...`);
        
        for (const event of this.pendingEvents) {
            try {
                await this.fetchWithTimeout('/usage/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(event)
                });
            } catch (error) {
                console.log('❌ Failed to sync event:', error);
                break; // Stop syncing if we hit an error
            }
        }
        
        // Clear synced events
        this.pendingEvents = [];
        await this.savePendingEvents();
        console.log('✅ Pending events synced');
    }

    handleOnline() {
        this.isOnline = true;
        console.log('🌐 Back online - syncing data...');
        this.syncPendingEvents();
    }

    handleOffline() {
        this.isOnline = false;
        console.log('📴 Offline mode activated');
    }

    // Check if user has premium features
    async isPremiumUser() {
        if (this.userId.startsWith('offline_')) {
            return false;
        }

        try {
            const response = await this.fetchWithTimeout(`/user/${this.userId}/premium`);
            if (response.ok) {
                const data = await response.json();
                return data.premium_active;
            }
        } catch (error) {
            // Default to free tier if can't check
            return false;
        }
        
        return false;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CosmicAPI;
} else {
    window.CosmicAPI = CosmicAPI;
}