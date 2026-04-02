import { message } from 'antd';
import {
  handleAddToCart,
  handleIncrementQuantity,
  handleDecrementQuantity
} from '../productHelper';

// Mock antd message
jest.mock('antd', () => ({
  message: {
    success: jest.fn()
  }
}));

describe('productHelper', () => {
  let mockDispatch;
  let mockAddItem;
  let mockUpdateQuantity;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockAddItem = jest.fn((product) => ({ type: 'ADD_ITEM', payload: product }));
    mockUpdateQuantity = jest.fn((id, qty) => ({ type: 'UPDATE_QUANTITY', payload: { productId: id, newQuantity: qty } }));
    jest.clearAllMocks();
  });

  describe('handleAddToCart', () => {
    it('should dispatch addItem action with product', () => {
      const product = {
        id: 1,
        name: 'Test Product',
        price: 29.99,
        description: 'Test description'
      };

      handleAddToCart(mockDispatch, mockAddItem, product);

      expect(mockAddItem).toHaveBeenCalledWith(product);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_ITEM',
        payload: product
      });
    });

    it('should show success message with product name', () => {
      const product = {
        id: 1,
        name: 'Wireless Headphones',
        price: 79.99
      };

      handleAddToCart(mockDispatch, mockAddItem, product);

      expect(message.success).toHaveBeenCalledWith('Wireless Headphones added to cart!');
    });

    it('should call dispatch exactly once', () => {
      const product = { id: 1, name: 'Test', price: 10 };

      handleAddToCart(mockDispatch, mockAddItem, product);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleIncrementQuantity', () => {
    it('should dispatch updateQuantity with incremented value', () => {
      const productId = 1;
      const currentQuantity = 5;

      handleIncrementQuantity(mockDispatch, mockUpdateQuantity, productId, currentQuantity);

      expect(mockUpdateQuantity).toHaveBeenCalledWith(productId, 6);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_QUANTITY',
        payload: { productId: 1, newQuantity: 6 }
      });
    });

    it('should increment from 0 to 1', () => {
      const productId = 2;
      const currentQuantity = 0;

      handleIncrementQuantity(mockDispatch, mockUpdateQuantity, productId, currentQuantity);

      expect(mockUpdateQuantity).toHaveBeenCalledWith(productId, 1);
    });

    it('should call dispatch exactly once', () => {
      handleIncrementQuantity(mockDispatch, mockUpdateQuantity, 1, 3);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleDecrementQuantity', () => {
    it('should dispatch updateQuantity with decremented value when quantity > 1', () => {
      const productId = 1;
      const currentQuantity = 5;

      handleDecrementQuantity(mockDispatch, mockUpdateQuantity, productId, currentQuantity);

      expect(mockUpdateQuantity).toHaveBeenCalledWith(productId, 4);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_QUANTITY',
        payload: { productId: 1, newQuantity: 4 }
      });
    });

    it('should set quantity to 0 when current quantity is 1', () => {
      const productId = 1;
      const currentQuantity = 1;

      handleDecrementQuantity(mockDispatch, mockUpdateQuantity, productId, currentQuantity);

      expect(mockUpdateQuantity).toHaveBeenCalledWith(productId, 0);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_QUANTITY',
        payload: { productId: 1, newQuantity: 0 }
      });
    });

    it('should set quantity to 0 when current quantity is 0', () => {
      const productId = 1;
      const currentQuantity = 0;

      handleDecrementQuantity(mockDispatch, mockUpdateQuantity, productId, currentQuantity);

      expect(mockUpdateQuantity).toHaveBeenCalledWith(productId, 0);
    });

    it('should call dispatch exactly once', () => {
      handleDecrementQuantity(mockDispatch, mockUpdateQuantity, 1, 5);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('should handle decrement from quantity 2 to 1', () => {
      const productId = 3;
      const currentQuantity = 2;

      handleDecrementQuantity(mockDispatch, mockUpdateQuantity, productId, currentQuantity);

      expect(mockUpdateQuantity).toHaveBeenCalledWith(productId, 1);
    });
  });
});

