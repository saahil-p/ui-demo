import { message } from 'antd';
import {
  formatPrice,
  handleRemoveFromCart,
  handleUpdateQuantity,
  handleClearCart,
  handleCheckout
} from '../cartPageHelper';

// Mock antd message
jest.mock('antd', () => ({
  message: {
    success: jest.fn()
  }
}));

describe('cartPageHelper', () => {
  let mockDispatch;
  let mockRemoveItem;
  let mockUpdateQuantity;
  let mockClearCart;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockRemoveItem = jest.fn((id) => ({ type: 'REMOVE_ITEM', payload: id }));
    mockUpdateQuantity = jest.fn((id, qty) => ({ type: 'UPDATE_QUANTITY', payload: { productId: id, newQuantity: qty } }));
    mockClearCart = jest.fn(() => ({ type: 'CLEAR_CART' }));
    jest.clearAllMocks();
  });

  describe('formatPrice', () => {
    it('should format price with 2 decimal places', () => {
      expect(formatPrice(10)).toBe('10.00');
      expect(formatPrice(10.5)).toBe('10.50');
      expect(formatPrice(10.99)).toBe('10.99');
    });

    it('should handle zero price', () => {
      expect(formatPrice(0)).toBe('0.00');
    });

    it('should handle large prices', () => {
      expect(formatPrice(999.99)).toBe('999.99');
      expect(formatPrice(1234.567)).toBe('1234.57');
    });

    it('should round prices correctly', () => {
      expect(formatPrice(10.994)).toBe('10.99');
      expect(formatPrice(10.995)).toBe('10.99'); // toFixed truncates, doesn't round
      expect(formatPrice(10.996)).toBe('11.00');
    });

    it('should handle negative prices', () => {
      expect(formatPrice(-10.5)).toBe('-10.50');
    });

    it('should handle very small decimals', () => {
      expect(formatPrice(0.01)).toBe('0.01');
      expect(formatPrice(0.001)).toBe('0.00');
    });
  });

  describe('handleRemoveFromCart', () => {
    it('should dispatch removeItem action with productId', () => {
      const productId = 5;

      handleRemoveFromCart(mockDispatch, mockRemoveItem, productId);

      expect(mockRemoveItem).toHaveBeenCalledWith(productId);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'REMOVE_ITEM',
        payload: productId
      });
    });

    it('should show success message', () => {
      handleRemoveFromCart(mockDispatch, mockRemoveItem, 1);

      expect(message.success).toHaveBeenCalledWith('Product removed from cart!');
    });

    it('should call dispatch exactly once', () => {
      handleRemoveFromCart(mockDispatch, mockRemoveItem, 1);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleUpdateQuantity', () => {
    it('should dispatch updateQuantity action with productId and newQuantity', () => {
      const productId = 3;
      const newQuantity = 7;

      handleUpdateQuantity(mockDispatch, mockUpdateQuantity, productId, newQuantity);

      expect(mockUpdateQuantity).toHaveBeenCalledWith(productId, newQuantity);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_QUANTITY',
        payload: { productId: 3, newQuantity: 7 }
      });
    });

    it('should show success message', () => {
      handleUpdateQuantity(mockDispatch, mockUpdateQuantity, 1, 5);

      expect(message.success).toHaveBeenCalledWith('Quantity updated!');
    });

    it('should handle quantity update to 0', () => {
      handleUpdateQuantity(mockDispatch, mockUpdateQuantity, 2, 0);

      expect(mockUpdateQuantity).toHaveBeenCalledWith(2, 0);
    });

    it('should call dispatch exactly once', () => {
      handleUpdateQuantity(mockDispatch, mockUpdateQuantity, 1, 3);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleClearCart', () => {
    it('should dispatch clearCart action', () => {
      handleClearCart(mockDispatch, mockClearCart);

      expect(mockClearCart).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CLEAR_CART'
      });
    });

    it('should show success message', () => {
      handleClearCart(mockDispatch, mockClearCart);

      expect(message.success).toHaveBeenCalledWith('Cart cleared!');
    });

    it('should call dispatch exactly once', () => {
      handleClearCart(mockDispatch, mockClearCart);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleCheckout', () => {
    it('should dispatch clearCart action', () => {
      handleCheckout(mockDispatch, mockClearCart);

      expect(mockClearCart).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CLEAR_CART'
      });
    });

    it('should show success message', () => {
      handleCheckout(mockDispatch, mockClearCart);

      expect(message.success).toHaveBeenCalledWith('Checkout successful!');
    });

    it('should call dispatch exactly once', () => {
      handleCheckout(mockDispatch, mockClearCart);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
});

