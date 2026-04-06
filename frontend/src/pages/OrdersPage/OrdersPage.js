import { useState, useEffect } from 'react';
import { Layout, Empty, Spin, Row } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import Navbar from '../../components/Navabr/Navbar';
import OrderCard from '../../components/Order/OrderCard';
import { getAllOrders } from '../../api/orderService';
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

          {/* Loading State */}
          {loading && (
            <div className="loading-spinner-container">
              <Spin className="loading-spinner" tip="Loading orders..." />
            </div>
          )}

          {/* Empty State */}
          {!loading && orders.length === 0 && (
            <Empty
              description="No orders found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}

          {/* Orders Grid */}
          {!loading && orders.length > 0 && (
            <Row gutter={[24, 24]}>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default OrdersPage;