import { message } from 'antd';
import { addItemAsync, removeItemAsync, updateQuantityAsync } from '../../../redux/actions/cartActions';

export const handleAddToCart = (dispatch, addItem, product) => {
  dispatch(addItemAsync(product));
  message.success(`${product.name} added to cart!`);
};

export const handleIncrementQuantity = (dispatch, updateQuantity, productId, currentQuantity) => {
  dispatch(updateQuantityAsync(productId, currentQuantity + 1));
};

export const handleDecrementQuantity = (dispatch, updateQuantity, productId, currentQuantity) => {
  if (currentQuantity > 1) {
    dispatch(updateQuantityAsync(productId, currentQuantity - 1));
  } else {
    dispatch(removeItemAsync(productId));
  }
};

