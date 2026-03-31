import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE
} from "./actionTypes"

export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST
}); 

export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
});

const mockFetchProducts = () => {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const products = [{
      id: 1,
      name: 'Wireless Headphones',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
      description: 'High-quality wireless headphones with noise cancellation',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
      description: 'Feature-rich smartwatch with fitness tracking',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Laptop Stand',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
      description: 'Ergonomic aluminum laptop stand',
      rating: 4.3
    },
    {
      id: 4,
      name: 'Mechanical Keyboard',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop',
      description: 'RGB mechanical keyboard with custom switches',
      rating: 4.8
    },
    {
      id: 5,
      name: 'USB-C Hub',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=200&fit=crop',
      description: 'Multi-port USB-C hub with HDMI and SD card reader',
      rating: 4.4
    },
    {
      id: 6,
      name: 'Wireless Mouse',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop',
      description: 'Ergonomic wireless mouse with precision tracking',
      rating: 4.6
    }]; 

    resolve(products);
        },1000);
    });
};


export const fetchProducts = () =>{
    return async(dispatch) =>{
        dispatch(fetchProductsRequest());
    }

    try{
        const products = await mockFetchProducts(); 

        dispatch(fetchProductsSuccess(products));
    }
    catch(error){
        dispatch(fetchProductsFailure(error));
    }
}