import { useState, useEffect } from 'react';
import { Layout, Empty, Spin, Row, Col, Card } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import Navbar from '../../components/Navabr/Navbar';
import { getAllOrders } from '../../api/orderService';
import { formatDate } from './helpers/ordersPageHelper';
import "../../stylesheet.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      console.log('Fetched orders:', data);
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="homepage-layout">
      <Header className="homepage-header">
        <Navbar />
      </Header>

      <Content className="homepage-content">
        <div className="products-container">
          <h1 className="products-title">Order History</h1>

          {loading && (
            <div className="loading-spinner-container">
              <Spin className="loading-spinner" tip="Loading orders..." />
            </div>
          )}

          {!loading && orders.length === 0 && (
            <Empty
              description="No orders found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}

          {!loading && orders.length > 0 && (
            <Row gutter={[24, 24]}>
              {orders.map((order) => (
                <Col xs={24} sm={12} md={8} lg={6} key={order.id}>
                  <Card className="order-card">
                    <div className="order-card-header">
                      <div className="order-info-label">Order #{order.id.substring(0, 8)}</div>
                      <div className="order-info-label">{formatDate(order.createdAt)}</div>
                    </div>

                    <div className="order-items-list">
                      {order.items.map((item, index) => (
                        <div key={`${order.id}-${item.productId}-${index}`} className="order-item-row">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="order-item-thumbnail"
                          />
                          <div className="order-item-info">
                            <div className="order-item-name">{item.name}</div>
                            <div className="order-item-qty">Qty: {item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-card-footer">
                      <span className={`order-status-badge order-status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                      <span className="order-total">${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default OrdersPage;

