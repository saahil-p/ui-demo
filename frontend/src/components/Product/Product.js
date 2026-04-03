import { Button, Card, Rate, Space } from 'antd';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateQuantity } from '../../redux/actions/cartActions';
import { selectProductsQuantity } from '../../redux/selectors/cartSelectors';
import {
  handleAddToCart as addToCartHelper,
  handleIncrementQuantity,
  handleDecrementQuantity
} from './helpers/productHelper';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(selectProductsQuantity(product.id));
  const isInCart = cartQuantity > 0;

  const handleAddToCart = () => {
    addToCartHelper(dispatch, addItem, product);
  };

  const handleIncrement = () => {
    handleIncrementQuantity(dispatch, updateQuantity, product.id, cartQuantity);
  };

  const handleDecrement = () => {
    handleDecrementQuantity(dispatch, updateQuantity, product.id, cartQuantity);
  };

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
              onClick={handleDecrement}
              className="quantity-btn"
            />
            <span className="quantity-display">{cartQuantity}</span>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={handleIncrement}
              className="quantity-btn"
            />
          </div>
        ) : (
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
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