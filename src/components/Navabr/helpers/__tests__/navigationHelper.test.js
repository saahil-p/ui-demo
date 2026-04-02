import {
  handleMenuNavigation,
  navigateToCart,
  navigateToProducts
} from '../navigationHelper';

describe('navigationHelper', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleMenuNavigation', () => {
    it('should navigate to /products when menuKey is "home"', () => {
      handleMenuNavigation(mockNavigate, 'home');

      expect(mockNavigate).toHaveBeenCalledWith('/products');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should navigate to /cart when menuKey is "cart"', () => {
      handleMenuNavigation(mockNavigate, 'cart');

      expect(mockNavigate).toHaveBeenCalledWith('/cart');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should not navigate when menuKey is unknown', () => {
      handleMenuNavigation(mockNavigate, 'unknown');

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should not navigate when menuKey is empty string', () => {
      handleMenuNavigation(mockNavigate, '');

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should not navigate when menuKey is null', () => {
      handleMenuNavigation(mockNavigate, null);

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should not navigate when menuKey is undefined', () => {
      handleMenuNavigation(mockNavigate, undefined);

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should handle case-sensitive menuKey', () => {
      handleMenuNavigation(mockNavigate, 'Home');

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('navigateToCart', () => {
    it('should navigate to /cart', () => {
      navigateToCart(mockNavigate);

      expect(mockNavigate).toHaveBeenCalledWith('/cart');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should call navigate function exactly once', () => {
      navigateToCart(mockNavigate);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should pass correct path to navigate', () => {
      navigateToCart(mockNavigate);

      expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });
  });

  describe('navigateToProducts', () => {
    it('should navigate to /products', () => {
      navigateToProducts(mockNavigate);

      expect(mockNavigate).toHaveBeenCalledWith('/products');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should call navigate function exactly once', () => {
      navigateToProducts(mockNavigate);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should pass correct path to navigate', () => {
      navigateToProducts(mockNavigate);

      expect(mockNavigate).toHaveBeenCalledWith('/products');
    });
  });
});

