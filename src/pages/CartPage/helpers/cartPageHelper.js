import { Button, InputNumber, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { checkoutAsync, clearCartAsync, removeItemAsync, updateQuantityAsync, reserveForCheckoutAsync } from '../../../redux/actions/cartActions';

export const formatPrice = (price) => {
  return price.toFixed(2);
};

export const handleRemoveFromCart = (dispatch, removeItem, productId) => {
  dispatch(removeItemAsync(productId));
  message.success('Product removed from cart!');
};

export const handleUpdateQuantity = (dispatch, updateQuantity, productId, newQuantity) => {
  dispatch(updateQuantityAsync(productId, newQuantity));
  message.success('Quantity updated!');
};

export const handleClearCart = (dispatch, clearCart) => {
  dispatch(clearCartAsync());
  message.success('Cart cleared!');
};

export const handleCheckout = async (dispatch, cartItems, setShowConfirmModal) => {
  try {
    const items = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    await dispatch(reserveForCheckoutAsync(items));

    setShowConfirmModal(true);
  } catch (error) {
    message.error('Failed to reserve stock for checkout. Please try again.');
    console.error('Checkout reservation error:', error);
  }
};

export const getCartTableColumns = (dispatch, updateQuantity, removeItem) => {
  return [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (_text, record) => {
        return (
          <div className="cart-product-info">
            <img src={record.image} alt={record.name} className="cart-product-image" />
            <span className="cart-product-name">{record.name}</span>
          </div>
        );
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span className='cart-price'>{formatPrice(price)}</span>
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={99}
          value={quantity}
          onChange={(newQuantity) => handleUpdateQuantity(dispatch, updateQuantity, record.id, newQuantity)}
          className="cart-quantity-input"
        />
      )
    },
    {
      title: 'Total',
      key: 'total',
      render: (record) => {
        const total = record.price * record.quantity;
        return <span className='cart-subtotal'>{formatPrice(total)}</span>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => {
        return (
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveFromCart(dispatch, removeItem, record.id)}
            className="cart-remove-button"
          >
            Remove
          </Button>
        );
      }
    }
  ];
};

