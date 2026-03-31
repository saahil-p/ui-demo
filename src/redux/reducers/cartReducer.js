import {
    ADD_ITEM, 
    REMOVE_ITEM, 
    UPDATE_QUANTITY, 
    CLEAR_CART
} from "../actions/actionTypes"


const initialState = {
    items : []
}; 


function cartReducer(state = initialState, action){
    switch(action.type){
        case ADD_ITEM:{
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if(existingItem){
                return{
                    ...state, 
                    items: state.items.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + 1} : item)
                };
            }
            else{
                return{
                    ...state, 
                    items: [...state.items, {...action.payload, quantity: 1}]
                };
            }
        }

        case REMOVE_ITEM:
            return{
                ...state, 
                items: state.items.filter(item => item.id !== action.payload)
            };

        case UPDATE_QUANTITY:{
            const {productId, newQuantity} = action.payload; 

            return {
                ...state, 

                items: state.items.map(item => item.id === productId ? {...item, quantity: newQuantity} : item)
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
