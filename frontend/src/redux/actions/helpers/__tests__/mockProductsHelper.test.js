import { mockFetchProducts } from '../mockProductsHelper';

describe('mockProductsHelper', () => {
  describe('mockFetchProducts', () => {
    it('should return a promise that resolves with products array', async () => {
      const products = await mockFetchProducts();

      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should return products with correct structure', async () => {
      const products = await mockFetchProducts();

      products.forEach(product => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('image');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('rating');
      });
    });

    it('should return products with valid data types', async () => {
      const products = await mockFetchProducts();

      products.forEach(product => {
        expect(typeof product.id).toBe('number');
        expect(typeof product.name).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(typeof product.image).toBe('string');
        expect(typeof product.description).toBe('string');
        expect(typeof product.rating).toBe('number');
      });
    });

    it('should return 6 products', async () => {
      const products = await mockFetchProducts();

      expect(products).toHaveLength(6);
    });

    it('should return products with unique IDs', async () => {
      const products = await mockFetchProducts();
      const ids = products.map(p => p.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(products.length);
    });

    it('should return products with positive prices', async () => {
      const products = await mockFetchProducts();

      products.forEach(product => {
        expect(product.price).toBeGreaterThan(0);
      });
    });

    it('should return products with ratings between 0 and 5', async () => {
      const products = await mockFetchProducts();

      products.forEach(product => {
        expect(product.rating).toBeGreaterThanOrEqual(0);
        expect(product.rating).toBeLessThanOrEqual(5);
      });
    });

    it('should return products with non-empty names', async () => {
      const products = await mockFetchProducts();

      products.forEach(product => {
        expect(product.name).toBeTruthy();
        expect(product.name.length).toBeGreaterThan(0);
      });
    });

    it('should return products with valid image URLs', async () => {
      const products = await mockFetchProducts();

      products.forEach(product => {
        expect(product.image).toMatch(/^https?:\/\//);
      });
    });

    it('should return same products on multiple calls', async () => {
      const products1 = await mockFetchProducts();
      const products2 = await mockFetchProducts();

      expect(products1).toEqual(products2);
    });

    it('should resolve the promise (not reject)', async () => {
      await expect(mockFetchProducts()).resolves.toBeDefined();
    });

    it('should contain expected product names', async () => {
      const products = await mockFetchProducts();
      const productNames = products.map(p => p.name);

      expect(productNames).toContain('Wireless Headphones');
      expect(productNames).toContain('Smart Watch');
      expect(productNames).toContain('Laptop Stand');
      expect(productNames).toContain('Mechanical Keyboard');
      expect(productNames).toContain('USB-C Hub');
      expect(productNames).toContain('Wireless Mouse');
    });

    it('should contain specific product with ID 1', async () => {
      const products = await mockFetchProducts();
      const product1 = products.find(p => p.id === 1);

      expect(product1).toBeDefined();
      expect(product1.name).toBe('Wireless Headphones');
      expect(product1.price).toBe(79.99);
      expect(product1.rating).toBe(4.5);
    });

    it('should simulate async behavior with timeout', async () => {
      const startTime = Date.now();
      await mockFetchProducts();
      const endTime = Date.now();
      const elapsed = endTime - startTime;

      // Should take approximately 1000ms (allow some margin)
      expect(elapsed).toBeGreaterThanOrEqual(900);
    });
  });
});

