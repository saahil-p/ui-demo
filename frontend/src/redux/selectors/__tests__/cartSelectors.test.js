import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  selectProductsQuantity,
  selectProducts,
  selectProductsLoading,
  selectProductsError
} from '../cartSelectors';

describe('cartSelectors', () => {
  describe('selectCartItems', () => {
    it('should select cart items from state', () => {
      const state = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10, quantity: 2 },
            { id: 2, name: 'Product 2', price: 20, quantity: 1 }
          ]
        }
      };

      const result = selectCartItems(state);

      expect(result).toEqual(state.cart.items);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when cart is empty', () => {
      const state = {
        cart: {
          items: []
        }
      };

      const result = selectCartItems(state);

      expect(result).toEqual([]);
    });
  });

  describe('selectCartCount', () => {
    it('should calculate total quantity of all items in cart', () => {
      const state = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10, quantity: 2 },
            { id: 2, name: 'Product 2', price: 20, quantity: 3 },
            { id: 3, name: 'Product 3', price: 30, quantity: 1 }
          ]
        }
      };

      const result = selectCartCount(state);

      expect(result).toBe(6); // 2 + 3 + 1
    });

    it('should return 0 when cart is empty', () => {
      const state = {
        cart: {
          items: []
        }
      };

      const result = selectCartCount(state);

      expect(result).toBe(0);
    });

    it('should handle cart with single item', () => {
      const state = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10, quantity: 5 }
          ]
        }
      };

      const result = selectCartCount(state);

      expect(result).toBe(5);
    });
  });

  describe('selectCartTotal', () => {
    it('should calculate total price of all items in cart', () => {
      const state = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10, quantity: 2 },
            { id: 2, name: 'Product 2', price: 20, quantity: 3 }
          ]
        }
      };

      const result = selectCartTotal(state);

      expect(result).toBe(80); // (10 * 2) + (20 * 3)
    });

    it('should return 0 when cart is empty', () => {
      const state = {
        cart: {
          items: []
        }
      };

      const result = selectCartTotal(state);

      expect(result).toBe(0);
    });

    it('should handle decimal prices correctly', () => {
      const state = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10.99, quantity: 2 },
            { id: 2, name: 'Product 2', price: 25.50, quantity: 1 }
          ]
        }
      };

      const result = selectCartTotal(state);

      expect(result).toBeCloseTo(47.48); // (10.99 * 2) + (25.50 * 1)
    });

    it('should handle single item in cart', () => {
      const state = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 15, quantity: 3 }
          ]
        }
      };

      const result = selectCartTotal(state);

      expect(result).toBe(45);
    });
  });

  describe('selectProductsQuantity', () => {
    it('should return quantity for existing product', () => {
      const state = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10, quantity: 5 },
            { id: 2, name: 'Product 2', price: 20, quantity: 3 }
          ]
        }
      };

      const selector = selectProductsQuantity(1);
      const result = selector(state);

      expect(result).toBe(5);
    });

    it('should return 0 for non-existent product', () => {
      const state = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10, quantity: 5 }
          ]
        }
      };

      const selector = selectProductsQuantity(99);
      const result = selector(state);

      expect(result).toBe(0);
    });

    it('should return 0 when cart is empty', () => {
      const state = {
        cart: {
          items: []
        }
      };

      const selector = selectProductsQuantity(1);
      const result = selector(state);

      expect(result).toBe(0);
    });

    it('should return correct quantity for different products', () => {
      const state = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10, quantity: 2 },
            { id: 2, name: 'Product 2', price: 20, quantity: 7 }
          ]
        }
      };

      const selector1 = selectProductsQuantity(1);
      const selector2 = selectProductsQuantity(2);

      expect(selector1(state)).toBe(2);
      expect(selector2(state)).toBe(7);
    });
  });

  describe('selectProducts', () => {
    it('should select products data from state', () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 }
      ];
      const state = {
        products: {
          data: mockProducts,
          loading: false,
          error: null
        }
      };

      const result = selectProducts(state);

      expect(result).toEqual(mockProducts);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no products', () => {
      const state = {
        products: {
          data: [],
          loading: false,
          error: null
        }
      };

      const result = selectProducts(state);

      expect(result).toEqual([]);
    });
  });

  describe('selectProductsLoading', () => {
    it('should return true when products are loading', () => {
      const state = {
        products: {
          data: [],
          loading: true,
          error: null
        }
      };

      const result = selectProductsLoading(state);

      expect(result).toBe(true);
    });

    it('should return false when products are not loading', () => {
      const state = {
        products: {
          data: [],
          loading: false,
          error: null
        }
      };

      const result = selectProductsLoading(state);

      expect(result).toBe(false);
    });
  });

  describe('selectProductsError', () => {
    it('should return error when there is an error', () => {
      const error = 'Failed to fetch products';
      const state = {
        products: {
          data: [],
          loading: false,
          error: error
        }
      };

      const result = selectProductsError(state);

      expect(result).toBe(error);
    });

    it('should return null when there is no error', () => {
      const state = {
        products: {
          data: [],
          loading: false,
          error: null
        }
      };

      const result = selectProductsError(state);

      expect(result).toBeNull();
    });
  });
});

