import { Button, Card, Rate, Space } from 'antd';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react';

const { Meta } = Card;

const ProductCard = ({ product, onAddToCart, cartQuantity, onIncrement, onDecrement }) => {
  const isInCart = cartQuantity > 0;

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.image}
          className="product-card-cover"
        />
      }
      actions={[
        isInCart ? (
          <div className="quantity-controls">
            <Button
              type="primary"
              shape="circle"
              icon={<MinusOutlined />}
              onClick={() => onDecrement(product.id)}
              className="quantity-btn"
            />
            <span className="quantity-display">{cartQuantity}</span>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => onIncrement(product.id)}
              className="quantity-btn"
            />
          </div>
        ) : (
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => onAddToCart(product)}
            className="product-card-add-button"
          >
            Add to Cart
          </Button>
        )
      ]}
    >
      <Meta
        title={product.name}
        description={
          <Space direction="vertical" className="product-card-meta-content">
            <div className="product-card-description">{product.description}</div>
            <Rate disabled defaultValue={product.rating} allowHalf className="product-card-rating" />
            <div className="product-card-price">
              ${product.price}
            </div>
          </Space>
        }
      />
    </Card>
  );
};

export default ProductCard;