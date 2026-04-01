import { Badge, Menu } from 'antd';
import {
  HomeOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { selectCartCount } from '../../redux/selectors/cartSelectors';
import {useSelector} from 'react-redux';
import { handleMenuNavigation, navigateToCart } from './helpers/navigationHelper';

const Navbar = () => {
    const navigate = useNavigate();

    const getCartCount = useSelector(selectCartCount);

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
                defaultSelectedKeys={["home"]}
                className="navbar-menu"
                onClick={handleMenuClick}
                items={[
                    {
                        key: 'home',
                        icon: <HomeOutlined />,
                        label: 'Home',
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
