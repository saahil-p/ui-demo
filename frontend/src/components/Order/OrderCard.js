import { Card, Col } from 'antd';
import { formatDate } from '../../pages/OrdersPage/helpers/ordersPageHelper';
import { formatPrice } from './helpers/OrderCardHelper';
import OrderItem from './OrderItem';
import OrderStatus from './OrderStatus';

const OrderCard = ({ order }) => {
  return (
    <Col xs={24} sm={12} md={8} lg={6} key={order.id}>
      <Card className="order-card">
        <div className="order-card-header">
          <div className="order-info-label">
            Order #{order.id.substring(0, 8)}
          </div>
          <div className="order-info-label">
            {formatDate(order.createdAt)}
          </div>
        </div>

        <div className="order-items-list">
          {order.items.map((item, index) => (
            <OrderItem 
              key={`${order.id}-${item.productId}-${index}`}
              item={item}
            />
          ))}
        </div>

        <div className="order-card-footer">
          <OrderStatus status={order.status} />
          <span className="order-total">
            ${formatPrice(order.totalAmount)}
          </span>
        </div>
      </Card>
    </Col>
  );
};

export default OrderCard;