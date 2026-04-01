export const handleMenuNavigation = (navigate, menuKey) => {
  if (menuKey === 'home') {
    navigate('/products');
  } else if (menuKey === 'cart') {
    navigate('/cart');
  }
};

export const navigateToCart = (navigate) => {
  navigate('/cart');
};

export const navigateToProducts = (navigate) => {
  navigate('/products');
};

