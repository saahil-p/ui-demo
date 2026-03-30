import { Layout, Row, Col, message } from "antd";
import { Footer, Header, Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import Navbar from './Navbar';
import ProductCard from './Product';


const HomePage = ({cartItems, addToCart, getCartCount, updateQuantity, removeFromCart})=>{
    const [products, setProducts] = useState([
    {
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
    }
  ]);

  const handleAddToCart = (product) => {
    addToCart(product);
    message.success(`${product.name} added to cart!`);
  };

  const getProductQuantityInCart = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleIncrement = (productId) => {
    const currentQuantity = getProductQuantityInCart(productId);
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId) => {
    const currentQuantity = getProductQuantityInCart(productId);

    if (currentQuantity === 1) {
      removeFromCart(productId);
      message.info('Item removed from cart');
    } else {
      updateQuantity(productId, currentQuantity - 1);
    }
  };


  return (
    <Layout className = "homepage-layout">
        <Header className = "homepage-header">
            <Navbar getCartCount = {getCartCount}/>
        </Header>

        <Content className="homepage-content">
            <div className="products-container">
                <h1 className="products-title">
                    Featured Products
                </h1>

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
            </div>
        </Content>
    </Layout>
  );
};

export default HomePage;