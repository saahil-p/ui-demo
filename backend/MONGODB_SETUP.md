# MongoDB Local Setup Guide

## Option 1: Using Docker (Recommended - Easiest)

### Start MongoDB with Docker
```bash
docker run -d \
  --name ecommerce-mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:latest
```

### Verify MongoDB is Running
```bash
docker ps | grep mongo
```

### Stop MongoDB
```bash
docker stop ecommerce-mongodb
```

### Start MongoDB Again
```bash
docker start ecommerce-mongodb
```

### Remove MongoDB Container
```bash
docker stop ecommerce-mongodb
docker rm ecommerce-mongodb
```

## Option 2: Using Docker Compose (Even Easier)

### Start MongoDB
```bash
# From the backend directory
docker-compose up -d
```

### Check Status
```bash
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f mongodb
```

### Stop MongoDB
```bash
docker-compose down
```

## Option 3: Install MongoDB Locally (macOS with Homebrew)

### Install MongoDB
```bash
brew tap mongodb/brew
brew install mongodb-community
```

### Start MongoDB Service
```bash
brew services start mongodb-community
```

### Stop MongoDB Service
```bash
brew services stop mongodb-community
```

### Check Status
```bash
brew services list | grep mongodb
```

## Verify MongoDB Connection

### Using mongosh (MongoDB Shell)
```bash
# Install mongosh if not installed
brew install mongosh

# Connect to MongoDB
mongosh mongodb://localhost:27017

# Once connected, run:
show dbs
use ecommerce
show collections
```

### Using a GUI Tool

**MongoDB Compass** (Official GUI):
- Download from: https://www.mongodb.com/products/compass
- Connection String: `mongodb://localhost:27017`

## Quick Start After MongoDB is Running

1. **Start MongoDB** (choose one option above)

2. **Run the Spring Boot application**
   ```bash
   cd backend
   ./gradlew bootRun
   ```

3. **The application will automatically**:
   - Connect to MongoDB at `localhost:27017`
   - Create the `ecommerce` database
   - Seed 6 sample products
   - Create the 3 collections: products, carts, reserved_stock

4. **Test the API**
   ```bash
   curl http://localhost:8080/api/products
   ```

## Troubleshooting

### Port 27017 Already in Use
```bash
# Find what's using port 27017
lsof -i :27017

# Kill the process
kill -9 <PID>
```

### Docker Issues
```bash
# Check Docker is running
docker --version
docker ps

# Restart Docker Desktop if needed
```

### Connection Refused
- Make sure MongoDB is actually running
- Check if port 27017 is accessible
- Verify firewall settings

## Quick Reference

| Action | Command |
|--------|---------|
| Start (Docker) | `docker start ecommerce-mongodb` |
| Start (Docker Compose) | `docker-compose up -d` |
| Start (Homebrew) | `brew services start mongodb-community` |
| Stop (Docker) | `docker stop ecommerce-mongodb` |
| Stop (Docker Compose) | `docker-compose down` |
| Stop (Homebrew) | `brew services stop mongodb-community` |
| Connect | `mongosh mongodb://localhost:27017` |
| Check Status | `docker ps` or `brew services list` |

