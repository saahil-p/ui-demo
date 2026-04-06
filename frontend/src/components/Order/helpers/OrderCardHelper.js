
export const formatPrice = (price) => {
  return price.toFixed(2);
};


export const getOrderIdDisplay = (orderId) => {
  return orderId.substring(0, 8);
};


export const getStatusClassName = (status) => {
  return `order-status-badge order-status-${status.toLowerCase()}`;
};