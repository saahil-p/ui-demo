# E-Commerce Product Service Backend

Spring Boot application with MongoDB for managing products, carts, and stock reservations.

## Features

- **Product Management**: REST APIs for browsing products
- **Stock Reservation System**: Reserve stock when items are added to cart
- **Three MongoDB Collections**:
  - `products`: Store product information with quantity
  - `carts`: Store cart data (ready for frontend integration)
  - `reserved_stock`: Manage temporary stock reservations

## Prerequisites

- Java 17 or higher
- MongoDB 4.4+ running on `localhost:27017`
- Gradle (uses wrapper, no installation needed)

## Quick Start

### 1. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or using Homebrew (macOS)
brew services start mongodb-community
```

### 2. Run the Application

```bash
cd backend
./gradlew bootRun
```

The application will start on `http://localhost:8080`

### 3. Access the APIs

Base URL: `http://localhost:8080/api`

## API Endpoints

### Products

- `GET /api/products` - Get all products (quantity field excluded from response)
- `GET /api/products/{id}` - Get product by ID

### Cart & Stock Reservation

**Note:** This is a single-user system. No session ID management is required.

- `POST /api/cart/add` - Add item to cart (reserves stock)
  ```json
  {
    "productId": 1,
    "quantity": 2
  }
  ```

- `PUT /api/cart/update` - Update cart item quantity
  ```json
  {
    "productId": 1,
    "quantity": 3
  }
  ```

- `DELETE /api/cart/remove/{productId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart
- `POST /api/cart/checkout` - Checkout (finalizes purchase)
- `GET /api/cart/stock/{productId}` - Get available stock for a product

## Stock Reservation Logic

1. **Add to Cart**: When a user adds an item, stock is reserved in the `reserved_stock` collection
2. **Update Quantity**: Releases old reservation and creates new one
3. **Remove/Clear Cart**: Releases reserved stock back to available pool
4. **Checkout**: Marks reservations as CHECKED_OUT and reduces actual product quantity
5. **Auto-Expiry**: Reservations expire after 30 minutes (MongoDB TTL index)

## Data Seeding

The application automatically seeds the database with 6 sample products on startup:
- Wireless Headphones (50 units)
- Smart Watch (30 units)
- Laptop Stand (75 units)
- Mechanical Keyboard (40 units)
- USB-C Hub (60 units)
- Wireless Mouse (100 units)

To disable auto-seeding, comment out the `@Component` annotation in `DataSeeder.java`.

## Frontend Integration

The backend provides a single-user cart system with:
- Stock validation on add/update operations
- Reserved stock tracking
- Checkout endpoint ready for integration

### Frontend Integration Steps:

1. Call `/api/cart/add` when user adds items
2. Call `/api/cart/update` when quantity changes
3. Call `/api/cart/remove` when removing items
4. Call `/api/cart/clear` when clearing cart
5. Call `/api/cart/checkout` during checkout process
6. Implement cart state persistence in your frontend Redux store

## Configuration

Edit `src/main/resources/application.yml`:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/ecommerce
      database: ecommerce
server:
  port: 8080
```

## CORS Configuration

CORS is configured to allow requests from `http://localhost:3000` (React frontend).

To change this, edit `WebConfig.java`:

```java
.allowedOrigins("http://localhost:3000")
```

## Build for Production

```bash
./gradlew build
java -jar build/libs/product-service-1.0.0.jar
```

## MongoDB Collections Schema

### Products Collection
```json
{
  "_id": "ObjectId",
  "productId": 1,
  "name": "Product Name",
  "price": 99.99,
  "image": "https://...",
  "description": "Description",
  "rating": 4.5,
  "quantity": 50,
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

### Reserved Stock Collection
```json
{
  "_id": "ObjectId",
  "productId": 1,
  "sessionId": "session-123",
  "quantity": 2,
  "status": "RESERVED",
  "createdAt": "2024-01-01T00:00:00",
  "expiresAt": "2024-01-01T00:30:00"
}
```

## Troubleshooting

**MongoDB Connection Error**: Ensure MongoDB is running on port 27017

**Port 8080 already in use**: Change the port in `application.yml`

**Validation errors**: Check request payload matches the expected format

