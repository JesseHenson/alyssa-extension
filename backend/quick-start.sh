#!/bin/bash

# Cosmic Tab Coach - Quick Supabase Setup
# Run this script to get your database up and running!

echo "🌟 Setting up Cosmic Tab Coach Database with Supabase CLI..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing via npm..."
    npm install -g supabase
fi

# Initialize Supabase project
echo "📁 Initializing Supabase project..."
supabase init

# Create initial migration from our schema
echo "🗄️ Creating initial migration..."
supabase migration new initial_cosmic_schema

# Copy our schema to the migration file
MIGRATION_FILE=$(ls supabase/migrations/*_initial_cosmic_schema.sql | head -1)
echo "📝 Copying schema to migration file: $MIGRATION_FILE"
cp database_schema.sql "$MIGRATION_FILE"

# Add affirmations seed data
echo "🌱 Creating seed data..."
cat > supabase/seed.sql << 'EOF'
-- Cosmic Tab Coach Seed Data

-- Insert sample affirmations
INSERT INTO affirmations (text, category, is_public, created_by) VALUES
  ('You are exactly where you need to be in this cosmic moment', 'present_moment', true, 'system'),
  ('Your mindful presence ripples across the universe', 'cosmic_connection', true, 'system'),
  ('Every breath connects you to the infinite cosmos', 'self_care', true, 'system'),
  ('You carry the wisdom of stardust within you', 'cosmic_connection', true, 'system'),
  ('This moment is a gift from the universe to you', 'present_moment', true, 'system'),
  ('Your energy aligns with the cosmic flow of abundance', 'cosmic_connection', true, 'system'),
  ('Breathe in peace, breathe out gratitude', 'self_care', true, 'system'),
  ('You are a conscious co-creator in this cosmic dance', 'cosmic_connection', true, 'system'),
  ('Your authentic self shines like a supernova', 'self_care', true, 'system'),
  ('Every challenge is cosmic training for your growth', 'growth', true, 'system');

-- Insert sample user preferences
INSERT INTO user_preferences (user_id, theme, favorite_categories) VALUES
  ('demo_user_1', 'cosmic', ARRAY['cosmic_connection', 'present_moment']),
  ('demo_user_2', 'minimal', ARRAY['self_care', 'growth']);

-- Insert usage events for analytics
INSERT INTO usage_events (user_id, event_type, metadata) VALUES
  ('demo_user_1', 'viewed', '{"source": "new_tab"}'),
  ('demo_user_1', 'liked', '{"affirmation_category": "cosmic_connection"}'),
  ('demo_user_2', 'viewed', '{"source": "popup"}');
EOF

# Start local Supabase
echo "🚀 Starting local Supabase stack..."
supabase start

echo ""
echo "✨ Success! Your Cosmic Tab Coach database is ready!"
echo ""
echo "🌐 Access your local Supabase Studio at: http://localhost:54323"
echo "📊 Database URL: postgresql://postgres:postgres@localhost:54322/postgres"
echo ""
echo "Next steps:"
echo "1. Visit http://localhost:54323 to see your database"
echo "2. Run 'supabase login' to connect to your Supabase account"
echo "3. Create a project at https://supabase.com/dashboard"
echo "4. Run 'supabase link --project-ref YOUR_PROJECT_REF'"
echo "5. Run 'supabase db push' to deploy to production"
echo ""
echo "🎯 Pro tip: Use 'supabase status' to see all service URLs and keys"