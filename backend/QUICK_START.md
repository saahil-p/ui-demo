# Quick Start Guide

## ✅ MongoDB is Running!

Your MongoDB instance is already running on `localhost:27017`.

Container name: `ecommerce-mongodb`

## Start the Spring Boot Application

```bash
cd backend
./gradlew bootRun
```

The application will:
1. Connect to MongoDB at `localhost:27017`
2. Create the `ecommerce` database
3. Automatically seed 6 sample products
4. Start on port 8080

## Test the API

Once the application starts, test it:

```bash
# Get all products
curl http://localhost:8080/api/products

# Add item to cart
curl -X POST http://localhost:8080/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 2,
    "sessionId": "test-session-123"
  }'
```

## MongoDB Management Commands

**Check if MongoDB is running:**
```bash
docker ps | grep mongo
```

**View MongoDB logs:**
```bash
docker logs ecommerce-mongodb
```

**Stop MongoDB:**
```bash
docker stop ecommerce-mongodb
```

**Start MongoDB again:**
```bash
docker start ecommerce-mongodb
```

**Connect to MongoDB shell:**
```bash
docker exec -it ecommerce-mongodb mongosh
```

Then inside mongosh:
```javascript
use ecommerce
db.products.find()
db.reserved_stock.find()
```

## Application Endpoints

**Base URL:** `http://localhost:8080/api`

### Products
- `GET /products` - Get all products
- `GET /products/{id}` - Get product by ID

### Cart Operations (Stock Reservation)
- `POST /cart/add` - Add to cart (reserves stock)
- `PUT /cart/update` - Update quantity
- `DELETE /cart/remove/{productId}` - Remove from cart
- `DELETE /cart/clear` - Clear cart
- `POST /cart/checkout` - Checkout
- `GET /cart/stock/{productId}` - Check available stock

## What's Implemented

✅ **Product API** - Browse products (quantity hidden from frontend)
✅ **Stock Reservation** - Items added to cart reserve stock
✅ **3 MongoDB Collections:**
  - `products` - Product catalog with quantities
  - `carts` - Cart storage (ready for your integration)
  - `reserved_stock` - Temporary stock reservations

✅ **Auto-expiring Reservations** - Stock auto-releases after 30 mins
✅ **Stock Validation** - Prevents overselling
✅ **CORS Configured** - Frontend at localhost:3000 can call APIs

## Next Steps for Frontend Integration

This is a single-user system - no session management required!

1. **Call the APIs** from your Redux actions:
   - Replace `mockFetchProducts()` with API call to `/api/products`
   - Call `/api/cart/add` when adding items
   - Call `/api/cart/update` when changing quantities
   - Call `/api/cart/remove` when removing items
   - Call `/api/cart/clear` when clearing cart
   - Call `/api/cart/checkout` during checkout

2. **Stock Validation** will happen automatically on the backend

See `API_EXAMPLES.md` for detailed API examples!

## Architecture

```
Frontend (React + Redux) ←→ Backend (Spring Boot) ←→ MongoDB
     Port 3000                    Port 8080           Port 27017
```

## Troubleshooting

**Application won't start:**
- Check MongoDB is running: `docker ps | grep mongo`
- Check logs: `docker logs ecommerce-mongodb`

**Port 8080 in use:**
- Change port in `src/main/resources/application.yml`

**Can't connect to MongoDB:**
- Ensure Colima is running: `colima status`
- Restart MongoDB: `docker restart ecommerce-mongodb`

