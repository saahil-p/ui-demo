export const selectCartItems = (state) => state.cart.items; 

export const selectCartCount = (state) => state.cart.items.reduce((total, items) => total + items.quantity, 0); 

export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectProductsQuantity = (productId) => (state) => {
    const item = state.cart.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
}

export const selectProducts = (state) => state.products.data; 

export const selectProductsLoading = (state) => state.products.loading; 

export const selectProductsError = (state) => state.products.error;


