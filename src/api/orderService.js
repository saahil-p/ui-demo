import {get} from "./apiClient";

export const getAllOrders = async () => {
    return await get("/orders");
}

export const getOrderById = async (orderId) => {
    return await get(`/orders/${orderId}`); 
}