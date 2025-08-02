-- Cosmic Tab Coach Database Schema
-- For Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Preferences Table
CREATE TABLE user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    theme TEXT DEFAULT 'cosmic',
    frequency INTEGER DEFAULT 30,
    personalized_content BOOLEAN DEFAULT false,
    favorite_categories TEXT[] DEFAULT ARRAY['present_moment', 'self_care'],
    text_size INTEGER DEFAULT 16,
    animations_enabled BOOLEAN DEFAULT true,
    notifications_enabled BOOLEAN DEFAULT false,
    premium_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affirmations Table (for custom and AI-generated content)
CREATE TABLE affirmations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    text TEXT NOT NULL,
    category TEXT NOT NULL,
    created_by TEXT, -- user_id who created it
    is_ai_generated BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT false, -- for community sharing
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    mood_tags TEXT[] DEFAULT ARRAY[]::TEXT[], -- happy, calm, energetic, etc.
    usage_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0, -- community rating
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage Events Table (for analytics and personalization)
CREATE TABLE usage_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT NOT NULL,
    event_type TEXT NOT NULL, -- viewed, liked, shared, custom_created, etc.
    affirmation_id UUID REFERENCES affirmations(id),
    session_id TEXT, -- for grouping events in same browsing session
    metadata JSONB DEFAULT '{}', -- flexible data storage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Favorites Table
CREATE TABLE user_favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT NOT NULL,
    affirmation_id UUID REFERENCES affirmations(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, affirmation_id)
);

-- AI Learning Data Table (for personalization)
CREATE TABLE ai_learning_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT NOT NULL,
    learning_type TEXT NOT NULL, -- mood_pattern, category_preference, timing_preference
    pattern_data JSONB NOT NULL,
    confidence_score DECIMAL(3,2) DEFAULT 0.0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Premium Subscriptions Table (for future monetization)
CREATE TABLE premium_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    subscription_type TEXT NOT NULL, -- monthly, lifetime
    status TEXT DEFAULT 'active', -- active, cancelled, expired
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    stripe_subscription_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Circles Table (for future social features)
CREATE TABLE mindfulness_circles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    creator_id TEXT NOT NULL,
    member_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Circle Memberships
CREATE TABLE circle_memberships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    circle_id UUID REFERENCES mindfulness_circles(id),
    user_id TEXT NOT NULL,
    role TEXT DEFAULT 'member', -- member, moderator, creator
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(circle_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX idx_usage_events_user_id ON usage_events(user_id);
CREATE INDEX idx_usage_events_created_at ON usage_events(created_at);
CREATE INDEX idx_affirmations_category ON affirmations(category);
CREATE INDEX idx_affirmations_is_public ON affirmations(is_public);
CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_ai_learning_data_user_id ON ai_learning_data(user_id);

-- Row Level Security (RLS) for privacy
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_learning_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can access own preferences" ON user_preferences
    FOR ALL USING (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Users can access own events" ON usage_events
    FOR ALL USING (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Users can access own favorites" ON user_favorites
    FOR ALL USING (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Users can access own learning data" ON ai_learning_data
    FOR ALL USING (user_id = current_setting('app.current_user_id'));

-- Public affirmations are viewable by all
CREATE POLICY "Public affirmations viewable by all" ON affirmations
    FOR SELECT USING (is_public = true);

-- Users can create their own affirmations
CREATE POLICY "Users can create own affirmations" ON affirmations
    FOR INSERT WITH CHECK (created_by = current_setting('app.current_user_id'));