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
