import { Badge, Menu } from 'antd';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectCartCount } from '../../redux/selectors/cartSelectors';
import {useSelector} from 'react-redux';
import { handleMenuNavigation, navigateToCart } from './helpers/navigationHelper';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getCartCount = useSelector(selectCartCount);

    // Determine selected key based on current path
    const getSelectedKey = () => {
        if (location.pathname === '/orders') return 'orders';
        return 'home';
    };

    const handleMenuClick = (e) => {
        handleMenuNavigation(navigate, e.key);
    };

    const handleCartClick = () => {
        navigateToCart(navigate);
    };

    return (
        <div className="navbar-container">
            <div className="navbar-logo">
                E-Shop
            </div>

            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[getSelectedKey()]}
                className="navbar-menu"
                onClick={handleMenuClick}
                items={[
                    {
                        key: 'home',
                        icon: <HomeOutlined />,
                        label: 'Home',
                    },
                    {
                        key: 'orders',
                        icon: <UnorderedListOutlined />,
                        label: 'Orders',
                    }
                ]}
            />

            <div className="navbar-actions">

                <Badge count={getCartCount} showZero>
                    <ShoppingCartOutlined
                        className="navbar-cart-icon"
                        onClick={handleCartClick}
                    />
                </Badge>
            </div>
        </div>
    );
};

export default Navbar; 
