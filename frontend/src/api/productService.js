import {get} from "./apiClient"; 

export const productService = {
    async getAllProducts(){
        return await get("/products"); 
    },

    async getProductById(productId){
        return get(`/products/${productId}`);
    },
};

