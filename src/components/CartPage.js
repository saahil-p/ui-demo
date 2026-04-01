import { Empty, InputNumber, Layout, message, Table, Button } from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"; 

import {
  selectCartItems, 
  selectCartTotal, 
  selectCartCount
} from "../redux/selectors/cartSelectors"; 
import {removeItem, updateQuantity, clearCart} from "../redux/actions/cartActions";


const CartPage = () => {

  const dispatch = useDispatch(); 

  const calculateTotal = useSelector(selectCartTotal); 
  const cartItems = useSelector(selectCartItems); 

  const getCartTotal = useSelector(selectCartTotal);
  
  const getCartCount = useSelector(selectCartCount);


  const handleRemoveFromCart = (productId) => {
    dispatch(removeItem(productId)); 
    message.success('Product removed from cart!');
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity(productId, newQuantity));
    message.success('Quantity updated!');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    message.success('Cart cleared!');
  };

  const handleCheckout = () => {
    //dummy implementation for now
    dispatch(clearCart()); 
    message.success('Checkout successful!');
  };

  const columns = [
    {
      title : 'Product', 
      dataIndex : 'name', 
      key : 'name',
      render : (text, record) => {
        return (
          <div className="cart-product-info">
            <img src={record.image} alt={record.name} className="cart-product-image" />
            <span className="cart-product-name">{record.name}</span>
          </div>
        );
      }
    }, 
    {
      title:'Price', 
      dataIndex : 'price', 
      key:'price', 
      render : (price) => <span className = 'cart-price'>{price.toFixed(2)}</span>
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
          onChange={(newQuantity) => handleUpdateQuantity(record.id, newQuantity)}
          className="cart-quantity-input"
        />
      )
    },
    {
        title: 'Total',
        key: 'total', 
        render : (record) => {
          const total = record.price * record.quantity;
          return <span className = 'cart-subtotal'>{total.toFixed(2)}</span>;
        }
    },
    {
      title : 'Action',
      key : 'action',
      render : (record) => {
        return (
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveFromCart(record.id)}
            className="cart-remove-button"
          >
            Remove
          </Button>
        );
      }
    }
  ]
  return (
    <Layout className = "cart-layout">
      <Header className = "cart-header">
        <Navbar />
      </Header>

      <Content className = "cart-content">
        <div className = "cart-container">
          <h1 className = "cart-title">
            Shopping Cart
          </h1>

          {cartItems.length === 0? (
            <Empty description = "Your cart is empty" className = "cart-empty"/>
          ):(
            <>
              <Table
                dataSource={cartItems}
                columns={columns}
                pagination={false}
                className="cart-table"
              />
              <div className="cart-summary">
                <div className="cart-summary-content">
                  <div className="cart-summary-row">
                    <span>Total:</span>
                    <span className="cart-summary-value">
                      ${calculateTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="cart-actions">
                <Button
                  type="default"
                  size="large"
                  onClick={handleClearCart}
                  className="cart-action-button"
                >
                  Clear Cart
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleCheckout}
                  className="cart-action-button"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </Content>

    </Layout>
  );
};

export default CartPage; 