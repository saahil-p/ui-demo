import {
    ADD_ITEM,
    REMOVE_ITEM,
    UPDATE_QUANTITY,
    CLEAR_CART
} from "../constants/actionTypes"
import {
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity
} from "./helpers/cartHelper";


const initialState = {
    items : []
};


function cartReducer(state = initialState, action){
    switch(action.type){
        case ADD_ITEM:
            return{
                ...state,
                items: addItemToCart(state.items, action.payload)
            };

        case REMOVE_ITEM:
            return{
                ...state,
                items: removeItemFromCart(state.items, action.payload)
            };

        case UPDATE_QUANTITY:{
            const {productId, newQuantity} = action.payload;

            return {
                ...state,
                items: updateItemQuantity(state.items, productId, newQuantity)
            };
        }

        case CLEAR_CART:
            return{
                ...state,
                items: []
            };

        default:
            return state;

    }
}

export default cartReducer; 
