import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import './App.css';
import './stylesheet.css';
import {Provider} from 'react-redux'; 
import store from "./redux/store/store";

function App() {
  
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/products" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
