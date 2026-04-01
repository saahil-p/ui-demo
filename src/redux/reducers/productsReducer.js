import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE
} from "../constants/actionTypes"; 

const initialState = {
    data : [], 
    loading: false, 
    error: null
};

function productsReducer(state = initialState, action){
    switch(action.type){
        case FETCH_PRODUCTS_REQUEST: {
            return {
                ...state, 
                loading: true, 
                error: null
            }; 
        }

        case FETCH_PRODUCTS_SUCCESS: {
            return {
                ...state, 
                loading:false,  
                error:null, 
                data: action.payload
            };
        }; 

        case FETCH_PRODUCTS_FAILURE: {
            return {
                ...state, 
                loading: false, 
                error: action.payload, 
                data: []
            }; 
        }; 

        default: 
            return state; 
    }
}

export default productsReducer; 

