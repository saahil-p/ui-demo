# Backend Changes Summary - Deferred Stock Reservation & Order Management

## Overview
Stock reservation has been moved from cart operations to the checkout confirmation phase. Stock is now reserved for 5 minutes only when the user clicks "Proceed to Checkout" instead of being reserved for 30 minutes when items are added to the cart.

**Important Notes:**
- This is a single-user system. All `sessionId` references have been removed from the reservation schema and logic.
- The system now uses status-based queries to manage reservations globally.
- After successful checkout, orders are automatically created and stored in the `orders` collection.

## Changes Made

### 1. ReservedStock Model (`model/ReservedStock.java`)
**Removed:**
- `sessionId` field - No longer needed for single-user system

**Updated:**
- Constructor signatures now exclude `sessionId`:
  ```java
  public ReservedStock(Long productId, Integer quantity)
  public ReservedStock(Long productId, Integer quantity, int expiryMinutes)
  ```
- Allows creating reservations with flexible TTL (e.g., 5 minutes for checkout, 30 minutes for other scenarios)

### 2. ReservedStockRepository (`repository/ReservedStockRepository.java`)
**Removed:**
- `findBySessionIdAndStatus()` method - No longer needed for single-user system

**Uses:**
- `findByStatus()` - Global query for all reservations with a given status
- `findByProductIdAndStatus()` - Query for specific product reservations

### 3. ReservedStockService (`service/ReservedStockService.java`)
**Removed:**
- `SINGLE_USER_ID` constant - Session management not needed for single-user system
- All session-based queries replaced with status-based or product-based queries

**Updated Methods:**
- `reserveStock()` - Creates reservations without sessionId
- `reserveStockForCheckout()` - Reserves stock with custom expiry (5 minutes), no sessionId
- `releaseStock()` - Uses `findByProductIdAndStatus()` instead of session filtering
- `releaseAllStock()` - Uses `findByStatus(RESERVED)` to find all active reservations
- `checkoutReservations()` - Now returns `Order` object after creating order from reservations
  - Uses `findByStatus(RESERVED)` to find all reservations
  - Creates order via `OrderService` after marking reservations as checked out
- All log messages updated to remove "for single user" references

**Added Dependency:**
- `OrderService` - Injected to create orders after checkout

### 4. Order Model (`model/Order.java`)
**Created:**
- New MongoDB document for storing completed orders
- Fields:
  - `id` - MongoDB generated ID
  - `items` - List of `OrderItem` (productId, name, price, quantity, subtotal)
  - `totalAmount` - Total order amount
  - `status` - Order status (PENDING, COMPLETED, CANCELLED, FAILED)
  - `createdAt` - Timestamp when order was created
  - `completedAt` - Timestamp when order was completed
- **Note:** This is a single-user system, no userId field needed

### 5. OrderRepository (`repository/OrderRepository.java`)
**Created:**
- MongoDB repository for Order entity
- Methods:
  - `findByStatus()` - Get orders by status

### 6. OrderService (`service/OrderService.java`)
**Created:**
- Service layer for order management
- Key method: `createOrderFromReservations(List<ReservedStock> reservations)`
  - Converts checked-out reservations to order items
  - Fetches product details for each item
  - Calculates subtotals and total amount
  - Creates and saves order to database
  - Returns created Order
- Additional methods:
  - `getAllOrders()` - Get all orders
  - `getOrdersByStatus()` - Get orders by status
  - `getOrderById()` - Get specific order

### 7. OrderController (`controller/OrderController.java`)
**Created:**
- REST controller for order-related operations
- Endpoints:
  - **GET /orders** - Get all orders (for Orders tab in UI)
    - Returns complete list of all orders with details
    - Response: Array of Order objects
  - **GET /orders/{orderId}** - Get specific order by ID
    - Returns 404 if order not found
  - **GET /orders/status/{status}** - Get orders by status
    - Status values: PENDING, COMPLETED, CANCELLED, FAILED
    - Returns 400 for invalid status

### 8. ReserveCartRequest DTO (`dto/ReserveCartRequest.java`)
**Created:**
- New DTO for cart reservation requests
- Contains list of `CartItemRequest` objects with productId and quantity
- Includes validation annotations

### 9. CartController (`controller/CartController.java`)

#### Added New Endpoint:
**POST /cart/reserve**
- Called when user clicks "Proceed to Checkout"
- Reserves all cart items for 5 minutes
- Returns expiry timestamp and duration
- Request body:
  ```json
  {
    "items": [
      {"productId": 1, "quantity": 2},
      {"productId": 2, "quantity": 1}
    ]
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Stock reserved for checkout",
    "expiresAt": "2024-01-01T12:05:00",
    "expiryMinutes": 5
  }
  ```

#### Modified Endpoints (Removed Stock Reservation):
1. **POST /cart/add** - No longer reserves stock when adding items
2. **PUT /cart/update** - No longer updates reservations when quantity changes
3. **DELETE /cart/remove** - No longer releases stock when removing items
4. **DELETE /cart/clear** - No longer releases all stock when clearing cart

#### Updated Endpoint:
- **POST /cart/checkout** - Now returns order information in response
  - Finalizes purchase and reduces product quantities
  - Creates order record in database
  - Response includes `orderId`, `totalAmount`, and `orderStatus`
  - Response format:
    ```json
    {
      "success": true,
      "message": "Checkout successful",
      "orderId": "65a1b2c3d4e5f6789abc0def",
      "totalAmount": 149.99,
      "orderStatus": "COMPLETED"
    }
    ```

#### Unchanged Endpoints:
- **GET /cart/stock/{productId}** - Still returns available stock

## New Flow

### Before (Old System):
```
1. User adds item to cart → Stock reserved for 30 minutes
2. User updates quantity → Reservation updated
3. User removes item → Stock released
4. User checks out → Stock moved to CHECKED_OUT, quantity reduced
```

### After (New System):
```
1. User adds item to cart → No reservation (just cart state)
2. User updates quantity → No reservation change
3. User removes item → No stock release needed
4. User clicks "Proceed to Checkout" → Stock reserved for 5 minutes
5. User confirms order → Stock moved to CHECKED_OUT, quantity reduced, ORDER CREATED
6. User cancels OR 5 minutes expire → Stock auto-released by MongoDB TTL
```

**New: Order Creation on Checkout**
After successful checkout, the system now:
1. Creates an `Order` document in the `orders` collection
2. Includes all purchased items with details (name, price, quantity, subtotal)
3. Calculates and stores total amount
4. Sets order status to `COMPLETED`
5. Records creation and completion timestamps
6. Returns order information to the frontend

## Benefits
1. **Reduced stock locking**: Stock not tied up while users browse and modify carts
2. **Better inventory availability**: Other users can purchase while someone has items in cart
3. **User decision window**: 5-minute window ensures stock for checkout confirmation
4. **Automatic cleanup**: MongoDB TTL handles expired reservations

## Testing
Test the new flow with these curl commands:

```bash
# 1. Add items to cart (no reservation)
curl -X POST http://localhost:8080/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'

# 2. Reserve stock for checkout (5-minute expiry)
curl -X POST http://localhost:8080/api/cart/reserve \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"productId": 1, "quantity": 2}
    ]
  }'

# 3. Complete checkout
curl -X POST http://localhost:8080/api/cart/checkout
```

## Migration Notes
- **Frontend must be updated** to call `/cart/reserve` before showing checkout confirmation
- Cart operations (add/update/remove) still work but don't affect stock reservations
- Existing reservations in database will continue to work with their original TTL

