import { Badge, Menu, Input } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const Navbar = ({getCartCount}) => {
    const navigate = useNavigate();


    const handleMenuClick = (e) => {
        if (e.key === 'home') {
            navigate('/');
        } else if (e.key === 'cart') {
            navigate('/cart');
        }
    };

    const handleCartClick = () => {
        navigate('/cart');
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

                <Badge count={getCartCount()} showZero>
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
