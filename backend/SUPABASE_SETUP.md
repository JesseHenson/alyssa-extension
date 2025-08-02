# Supabase CLI Setup Guide for Cosmic Tab Coach

## 🚀 Install Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Linux/Windows (with npm)
npm install -g supabase

# Or use npx (no global install)
npx supabase --help
```

## 📋 Setup Steps

### 1. Initialize Your Project
```bash
cd backend
supabase init
```

This creates:
- `supabase/config.toml` - Project configuration
- `supabase/migrations/` - Database migration files  
- `supabase/seed.sql` - Data seeding script

### 2. Start Local Development
```bash
supabase start
```

This starts:
- Local PostgreSQL database
- Local Supabase Studio (UI) at http://localhost:54323
- All Supabase services (Auth, Storage, etc.)

### 3. Login and Link to Remote Project
```bash
# Login with your Supabase account
supabase login

# Create a new project on Supabase.com, then link it
supabase link --project-ref YOUR_PROJECT_REF_HERE
```

## 🗄️ Database Management

### Create Tables via Migration
```bash
# Create a new migration file
supabase migration new create_cosmic_tables

# Edit the generated file: supabase/migrations/TIMESTAMP_create_cosmic_tables.sql
# Add your SQL from database_schema.sql

# Apply migration locally
supabase db reset

# Push to remote Supabase project
supabase db push
```

### Seed Data
```bash
# Add data to supabase/seed.sql
echo "INSERT INTO affirmations (text, category) VALUES ('You are cosmic!', 'cosmic_connection');" >> supabase/seed.sql

# Apply seed data
supabase db reset
```

### Pull Changes from Remote
```bash
# If you made changes in Supabase Studio online
supabase db pull
```

## 📂 File Structure After Setup

```
backend/
├── supabase/
│   ├── config.toml           # Project configuration
│   ├── migrations/           # Database schema changes
│   │   └── 001_initial.sql
│   ├── seed.sql             # Sample data
│   └── .env                 # Local environment variables
├── main.py                  # Your FastAPI server
└── database_schema.sql      # Your schema (to migrate)
```

## 🔄 Development Workflow

### Local Development
```bash
# Start Supabase stack
supabase start

# Make schema changes
supabase migration new add_new_feature

# Test locally
supabase db reset

# When ready, push to remote
supabase db push
```

### Production Deployment
```bash
# Push schema changes
supabase db push

# Push configuration changes  
supabase config push

# Deploy Edge Functions (if any)
supabase functions deploy
```

## 🎯 Key Commands for Your Use Case

### Database Operations
```bash
# Create migration from your existing schema
supabase migration new initial_schema
# Then copy your database_schema.sql content into the migration file

# Apply all migrations
supabase db reset

# Push to production
supabase db push

# Pull remote changes
supabase db pull

# Generate TypeScript types
supabase gen types typescript --local > types.ts
```

### Configuration Management
```bash
# Push config to remote
supabase config push

# View project status
supabase status

# Check differences
supabase db diff
```

## 🔧 Integration with Your Backend

### Update Your FastAPI Connection

```python
# In your main.py, use environment variables
import os
from supabase import create_client

# These will be automatically set by Supabase CLI
SUPABASE_URL = os.getenv("SUPABASE_URL", "http://localhost:54321")  # Local
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
```

### Environment Variables
The CLI automatically provides these when running locally:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`  
- `SUPABASE_SERVICE_ROLE_KEY`

## 📊 Monitoring & Debugging

```bash
# View all services status
supabase status

# View logs
supabase logs

# Stop all services
supabase stop

# Reset everything (careful!)
supabase stop --no-backup
```

## 🚀 Next Steps

1. **Initialize**: `supabase init`
2. **Migrate**: Move your `database_schema.sql` to a migration file
3. **Test Locally**: `supabase start` and test everything
4. **Deploy**: `supabase db push` to production

## 🔗 Useful Links

- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Local Development Guide](https://supabase.com/docs/guides/cli/local-development)  
- [Database Migrations](https://supabase.com/docs/guides/database/migrations)
- [Configuration as Code](https://supabase.com/docs/guides/cli/managing-environments)

## 💡 Pro Tips

- Use `supabase db diff` to generate migrations from Studio changes
- Keep your `supabase/` directory in version control
- Use `--linked` flag to operate on remote projects directly
- The CLI works great in CI/CD pipelines for automated deployments