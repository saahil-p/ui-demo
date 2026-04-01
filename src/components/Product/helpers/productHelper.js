import { message } from 'antd';

export const handleAddToCart = (dispatch, addItem, product) => {
  dispatch(addItem(product));
  message.success(`${product.name} added to cart!`);
};

export const handleIncrementQuantity = (dispatch, updateQuantity, productId, currentQuantity) => {
  dispatch(updateQuantity(productId, currentQuantity + 1));
};

export const handleDecrementQuantity = (dispatch, updateQuantity, productId, currentQuantity) => {
  if (currentQuantity > 1) {
    dispatch(updateQuantity(productId, currentQuantity - 1));
  } else {
    dispatch(updateQuantity(productId, 0));
  }
};

