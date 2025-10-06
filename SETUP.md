# How to Run the NestJS Backend

## Prerequisites
Your backend requires:
- Node.js (already installed ✅)
- PostgreSQL database
- Environment variables

## Step 1: Install Dependencies (Already Done ✅)
```bash
cd backend
npm install
```

## Step 2: Database Setup Options

### Option A: Docker PostgreSQL (Easiest)
```bash
# Run PostgreSQL in Docker
docker run --name postgres-jobapp -e POSTGRES_PASSWORD=password -e POSTGRES_DB=jobapp -p 5432:5432 -d postgres:13
```

### Option B: Local PostgreSQL Installation
1. Download and install PostgreSQL from https://www.postgresql.org/download/
2. Create a database named `jobapp`
3. Note your username/password

### Option C: Free Online PostgreSQL (Recommended for testing)
- **Neon**: https://neon.tech (Free tier)
- **Supabase**: https://supabase.com (Free tier)
- **ElephantSQL**: https://www.elephantsql.com (Free tier)

## Step 3: Create Environment File
Create `backend/.env` file:
```env
# For local PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/jobapp"

# OR for online service (example with Neon)
DATABASE_URL="postgresql://username:password@hostname:5432/dbname"

PORT=4000
```

## Step 4: Update Database Schema
The backend uses TypeORM with auto-sync, so tables will be created automatically.

## Step 5: Run the Backend
```bash
cd backend

# Development mode (with auto-reload)
npm run start:dev

# OR Production mode
npm run start

# OR Debug mode
npm run start:debug
```

## Quick Start (No Database Setup)
If you want to test immediately, I can modify the backend to use SQLite instead of PostgreSQL:

### Alternative: Use SQLite (File-based database)
1. I can update the TypeORM config to use SQLite
2. No external database required
3. Data stored in a local file

Would you like me to:
1. Help you set up PostgreSQL?
2. Convert the backend to use SQLite for quick testing?
3. Show you how to use a free online PostgreSQL service?