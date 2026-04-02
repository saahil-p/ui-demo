import { loadState, saveState } from '../localStorageHelper';

describe('localStorageHelper', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Mock console.error to avoid cluttering test output
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  describe('loadState', () => {
    it('should load and parse state from localStorage', () => {
      const mockState = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10, quantity: 2 }
          ]
        }
      };
      localStorage.setItem('reduxState', JSON.stringify(mockState));

      const result = loadState();

      expect(result).toEqual(mockState);
    });

    it('should return undefined when localStorage is empty', () => {
      const result = loadState();

      expect(result).toBeUndefined();
    });

    it('should return null when localStorage contains null', () => {
      localStorage.setItem('reduxState', null);

      const result = loadState();

      expect(result).toBeNull();
    });

    it('should return undefined and log error when JSON parsing fails', () => {
      localStorage.setItem('reduxState', 'invalid JSON');

      const result = loadState();

      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error loading the state: ',
        expect.any(Error)
      );
    });

    it('should handle complex nested state objects', () => {
      const complexState = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10.99, quantity: 2 },
            { id: 2, name: 'Product 2', price: 25.50, quantity: 1 }
          ]
        },
        products: {
          data: [],
          loading: false,
          error: null
        }
      };
      localStorage.setItem('reduxState', JSON.stringify(complexState));

      const result = loadState();

      expect(result).toEqual(complexState);
    });
  });

  describe('saveState', () => {
    it('should save state to localStorage as JSON string', () => {
      const state = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10, quantity: 2 }
          ]
        }
      };

      saveState(state);

      const savedState = localStorage.getItem('reduxState');
      expect(savedState).toBe(JSON.stringify(state));
      expect(JSON.parse(savedState)).toEqual(state);
    });

    it('should overwrite existing state in localStorage', () => {
      const oldState = {
        cart: { items: [] }
      };
      const newState = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10, quantity: 2 }
          ]
        }
      };
      localStorage.setItem('reduxState', JSON.stringify(oldState));

      saveState(newState);

      const savedState = localStorage.getItem('reduxState');
      expect(JSON.parse(savedState)).toEqual(newState);
    });

    it('should save empty state', () => {
      const emptyState = {
        cart: { items: [] }
      };

      saveState(emptyState);

      const savedState = localStorage.getItem('reduxState');
      expect(JSON.parse(savedState)).toEqual(emptyState);
    });

    it('should handle error when localStorage is unavailable', () => {
      const state = { cart: { items: [] } };
      
      // Mock localStorage.setItem to throw an error
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = jest.fn(() => {
        throw new Error('QuotaExceededError');
      });

      saveState(state);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error saving the state: ',
        expect.any(Error)
      );

      // Restore original setItem
      Storage.prototype.setItem = originalSetItem;
    });

    it('should save complex nested state objects', () => {
      const complexState = {
        cart: {
          items: [
            { id: 1, name: 'Product 1', price: 10.99, quantity: 2, metadata: { tag: 'electronics' } }
          ]
        }
      };

      saveState(complexState);

      const savedState = localStorage.getItem('reduxState');
      expect(JSON.parse(savedState)).toEqual(complexState);
    });
  });
});

