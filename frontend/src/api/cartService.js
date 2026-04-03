import {post, put, del} from "./apiClient";

export const addToCart = async (productId, quantity) => {
    return await post("/cart/add", {productId, quantity});
}

export const updateQuantity = (productId, quantity) => {
    return put("/cart/update", {productId, quantity}).then(response => {
        return response;
    }).catch(error => {
        throw error;
    });
}

export const removeFromCart = (productId) => {
    return del(`/cart/remove/${productId}`).then(response => {
        return response;
    }).catch(error => {
        throw error;
    });
}

export const clearCart = async () => {
    return await del("/cart/clear");
}

export const checkout = async () => {
    return await post("/cart/checkout");
}

export const reserveStockForCheckout = async (items) => {
    return await post("/cart/reserve", {items});
}