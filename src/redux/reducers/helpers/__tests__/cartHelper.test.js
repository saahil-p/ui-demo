import {
  findExistingItem,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity
} from '../cartHelper';

describe('cartHelper', () => {
  describe('findExistingItem', () => {
    it('should find an existing item in the cart by productId', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 20, quantity: 1 }
      ];
      
      const result = findExistingItem(items, 2);
      
      expect(result).toEqual({ id: 2, name: 'Product 2', price: 20, quantity: 1 });
    });

    it('should return undefined if item is not found', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 }
      ];
      
      const result = findExistingItem(items, 99);
      
      expect(result).toBeUndefined();
    });

    it('should return undefined for empty cart', () => {
      const items = [];
      
      const result = findExistingItem(items, 1);
      
      expect(result).toBeUndefined();
    });
  });

  describe('addItemToCart', () => {
    it('should add new item with quantity 1 when item does not exist', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 }
      ];
      const newProduct = { id: 2, name: 'Product 2', price: 20 };
      
      const result = addItemToCart(items, newProduct);
      
      expect(result).toHaveLength(2);
      expect(result[1]).toEqual({ id: 2, name: 'Product 2', price: 20, quantity: 1 });
    });

    it('should increment quantity when item already exists', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 }
      ];
      const existingProduct = { id: 1, name: 'Product 1', price: 10 };
      
      const result = addItemToCart(items, existingProduct);
      
      expect(result).toHaveLength(1);
      expect(result[0].quantity).toBe(3);
    });

    it('should add item to empty cart', () => {
      const items = [];
      const newProduct = { id: 1, name: 'Product 1', price: 10 };
      
      const result = addItemToCart(items, newProduct);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: 1, name: 'Product 1', price: 10, quantity: 1 });
    });

    it('should not mutate the original items array', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 }
      ];
      const originalLength = items.length;
      const newProduct = { id: 2, name: 'Product 2', price: 20 };
      
      addItemToCart(items, newProduct);
      
      expect(items).toHaveLength(originalLength);
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove item from cart by productId', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 20, quantity: 1 }
      ];
      
      const result = removeItemFromCart(items, 1);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
    });

    it('should return empty array when removing last item', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 }
      ];
      
      const result = removeItemFromCart(items, 1);
      
      expect(result).toHaveLength(0);
    });

    it('should return same array when item does not exist', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 }
      ];
      
      const result = removeItemFromCart(items, 99);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('should not mutate the original items array', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 20, quantity: 1 }
      ];
      const originalLength = items.length;
      
      removeItemFromCart(items, 1);
      
      expect(items).toHaveLength(originalLength);
    });
  });

  describe('updateItemQuantity', () => {
    it('should update quantity of existing item', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 20, quantity: 1 }
      ];

      const result = updateItemQuantity(items, 1, 5);

      expect(result[0].quantity).toBe(5);
      expect(result[1].quantity).toBe(1);
    });

    it('should update quantity to 0', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 }
      ];

      const result = updateItemQuantity(items, 1, 0);

      expect(result[0].quantity).toBe(0);
    });

    it('should not update quantity for non-existent item', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 }
      ];

      const result = updateItemQuantity(items, 99, 5);

      expect(result[0].quantity).toBe(2);
    });

    it('should not mutate the original items array', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 }
      ];
      const originalQuantity = items[0].quantity;

      updateItemQuantity(items, 1, 5);

      expect(items[0].quantity).toBe(originalQuantity);
    });
  });
});

