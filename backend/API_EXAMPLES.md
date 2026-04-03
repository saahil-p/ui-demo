# API Testing Examples

Use these curl commands to test the API endpoints.

**Note:** This is a single-user system. No session ID management is required.

## Products API

### Get All Products
```bash
curl -X GET http://localhost:8080/api/products
```

### Get Product by ID
```bash
curl -X GET http://localhost:8080/api/products/1
```

## Cart & Stock Reservation API

### Add Item to Cart (Reserve Stock)
```bash
curl -X POST http://localhost:8080/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

### Update Cart Item Quantity
```bash
curl -X PUT http://localhost:8080/api/cart/update \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 5
  }'
```

### Remove Item from Cart
```bash
curl -X DELETE "http://localhost:8080/api/cart/remove/1"
```

### Clear Entire Cart
```bash
curl -X DELETE "http://localhost:8080/api/cart/clear"
```

### Checkout
```bash
curl -X POST "http://localhost:8080/api/cart/checkout"
```

### Get Available Stock for Product
```bash
curl -X GET http://localhost:8080/api/cart/stock/1
```

## Testing Flow

### Scenario 1: Complete Purchase Flow

1. **Get all products**
```bash
curl -X GET http://localhost:8080/api/products
```

2. **Add item to cart**
```bash
curl -X POST http://localhost:8080/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

3. **Check available stock** (should be reduced by 2)
```bash
curl -X GET http://localhost:8080/api/cart/stock/1
```

4. **Update quantity**
```bash
curl -X PUT http://localhost:8080/api/cart/update \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 3
  }'
```

5. **Checkout**
```bash
curl -X POST "http://localhost:8080/api/cart/checkout"
```

### Scenario 2: Cart Abandonment

1. **Add items to cart**
```bash
curl -X POST http://localhost:8080/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 2,
    "quantity": 1
  }'
```

2. **Clear cart** (releases stock)
```bash
curl -X DELETE "http://localhost:8080/api/cart/clear"
```

3. **Verify stock released**
```bash
curl -X GET http://localhost:8080/api/cart/stock/2
```

### Scenario 3: Insufficient Stock Error

1. **Try to add more items than available**
```bash
curl -X POST http://localhost:8080/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 1000
  }'
```

Expected response: 400 Bad Request with error message

## Validation Testing

### Invalid Product ID
```bash
curl -X POST http://localhost:8080/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 999,
    "quantity": 1
  }'
```

Expected response: 404 Not Found

### Invalid Quantity (negative)
```bash
curl -X POST http://localhost:8080/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": -1
  }'
```

Expected response: 400 Bad Request with validation error

### Missing Required Fields
```bash
curl -X POST http://localhost:8080/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 1
  }'
```

Expected response: 400 Bad Request with validation error

## MongoDB Queries (for verification)

After running the API calls, you can verify the data in MongoDB:

```bash
# Connect to MongoDB
mongosh

# Use the database
use ecommerce

# View all products
db.products.find().pretty()

# View reserved stock
db.reserved_stock.find().pretty()

# View carts
db.carts.find().pretty()

# Check specific product quantity
db.products.find({productId: 1}, {name: 1, quantity: 1})

# Check reservations for a session
db.reserved_stock.find({sessionId: "test-session-123"})

# Count total reserved quantity for a product
db.reserved_stock.aggregate([
  { $match: { productId: 1, status: "RESERVED" } },
  { $group: { _id: "$productId", total: { $sum: "$quantity" } } }
])
```

