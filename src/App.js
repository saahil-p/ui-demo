import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import './App.css';
import './stylesheet.css';

function App() {

  const [cartItems, setCartItems] = useState([]); 

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => 
    prevItems.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
    ); 
  };

  const clearCart = () =>{
    setCartItems([]);
  }; 

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<HomePage cartItems = {cartItems} addToCart = {addToCart} getCartCount = {getCartCount} updateQuantity = {updateQuantity} removeFromCart = {removeFromCart}/>} />
        <Route path = "/cart" element = {<CartPage cartItems = {cartItems} addToCart = {addToCart} getCartCount = {getCartCount} getCartTotal = {getCartTotal} removeFromCart = {removeFromCart} updateQuantity = {updateQuantity} clearCart = {clearCart}/>} />
      </Routes>
    </Router>
  );
}

export default App;
