import {
    ADD_ITEM, 
    REMOVE_ITEM, 
    UPDATE_QUANTITY, 
    CLEAR_CART
} from "../constants/actionTypes"

import * as cartService from "../../api/cartService";


export const addItem = (product) => ({
    type: ADD_ITEM, 
    payload: product
})


export const removeItem = (productId) => ({
    type: REMOVE_ITEM, 
    payload: productId
})

export const updateQuantity = (productId, newQuantity) => ({
    type: UPDATE_QUANTITY, 
    payload: {
        productId, 
        newQuantity
    }
})

export const clearCart = () => ({
    type: CLEAR_CART
})

export const addItemAsync = (product) => {
    return async (dispatch) => {
        try{
            await cartService.addToCart(product.id, 1);
            dispatch(addItem(product));
        }catch(error){
            console.error("Failed to add item to cart due to : ", error); 
            throw error;
        }
    }
}

export const removeItemAsync = (productId) => {
    return async (dispatch) => {
        try{
            await cartService.removeFromCart(productId); 
            dispatch(removeItem(productId));
        }catch(error){
            console.error("Failed to remove item from cart due to : ", error); 
            throw error;
        }
    }; 
}; 

export const updateQuantityAsync = (productId, newQuantity) => {
    return async (dispatch) => {
        try{
            await cartService.updateQuantity(productId, newQuantity); 
            dispatch(updateQuantity(productId, newQuantity));
        }catch(error){
            console.error("Failed to update quantity due to : ", error); 
            throw error;
        }
    };
}; 

export const clearCartAsync = () => {
    return async (dispatch) => {
        try{
            await cartService.clearCart(); 
            dispatch(clearCart());
        }catch(error){
            console.error("Failed to clear cart due to : ", error); 
            throw error;
        }
    }
}

export const reserveForCheckoutAsync = (items) => {
    return async (dispatch) => {
        try{
            const response = await cartService.reserveStockForCheckout(items);
            return response; 
        }catch(error){
            console.error("Failed to reserve stock for checkout due to : ", error);
            throw error;
        }
    }
}

export const checkoutAsync = () => {
    return async (dispatch) => {
        try{
            await cartService.checkout();
            dispatch(clearCart());
        }catch(error){
            console.error("Failed to checkout due to : ", error);
            throw error;
        }
    }
}