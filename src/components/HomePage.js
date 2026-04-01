import { Layout, Row, Col, message, Alert, Spin } from "antd";
import { Footer, Header, Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import ProductCard from './Product';
import{
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectCartItems
} from "../redux/selectors/cartSelectors";
import {addItem, updateQuantity, removeItem} from "../redux/actions/cartActions"
import {fetchProducts} from "../redux/actions/productActions";
import {useDispatch, useSelector} from "react-redux";


const HomePage = ()=>{

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const cartItems = useSelector(selectCartItems);

  useEffect(() =>{
    dispatch(fetchProducts());
  }, [dispatch]);


  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    message.success(`${product.name} added to cart!`);
  };

  const getProductQuantityInCart = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleIncrement = (productId) => {
    const currentQuantity = getProductQuantityInCart(productId);
    dispatch(updateQuantity(productId, currentQuantity + 1));
  };

  const handleDecrement = (productId) => {
    const currentQuantity = getProductQuantityInCart(productId);

    if (currentQuantity === 1) {
      dispatch(removeItem(productId));
      message.info('Item removed from cart');
    } else {
      dispatch(updateQuantity(productId, currentQuantity - 1));
    }
  };


  return (
    <Layout className = "homepage-layout">
        <Header className = "homepage-header">
            <Navbar />
        </Header>

        <Content className="homepage-content">
            <div className="products-container">
                <h1 className="products-title">
                    Featured Products
                </h1>

                {loading && (
                  <div className = "loading-spinner-container">
                    <Spin className = "loading-spinner" tip = "Loading products....." />
                  </div>
                )}

                {error && (
                  <div className = "loading-products-error">
                    <Alert message = "Error Loading Products" type = "error" showIcon/>
                  </div>
                )}


                {!loading && !error && (
                <Row gutter={[24, 24]}>
                    {products.map(product => (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <ProductCard
                                product={product}
                                onAddToCart={handleAddToCart}
                                cartQuantity={getProductQuantityInCart(product.id)}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                            />
                        </Col>
                    ))}
                </Row>
                )}
            </div>
        </Content>
    </Layout>
  );
};

export default HomePage;