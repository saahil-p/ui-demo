import { Empty, Layout, Table, Button } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import Navbar from '../../components/Navabr/Navbar';
import {useDispatch, useSelector} from "react-redux";

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/selectors/cartSelectors";
import {removeItem, updateQuantity, clearCart} from "../../redux/actions/cartActions";
import {
  getCartTableColumns,
  formatPrice,
  handleClearCart as clearCartHelper,
  handleCheckout as checkoutHelper
} from './helpers/cartPageHelper';


const CartPage = () => {

  const dispatch = useDispatch();

  const calculateTotal = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);

  const columns = getCartTableColumns(dispatch, updateQuantity, removeItem);
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
                      ${formatPrice(calculateTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="cart-actions">
                <Button
                  type="default"
                  size="large"
                  onClick={() => clearCartHelper(dispatch, clearCart)}
                  className="cart-action-button"
                >
                  Clear Cart
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => checkoutHelper(dispatch, clearCart)}
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