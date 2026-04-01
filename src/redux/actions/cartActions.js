import {
    ADD_ITEM, 
    REMOVE_ITEM, 
    UPDATE_QUANTITY, 
    CLEAR_CART
} from "../constants/actionTypes"


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