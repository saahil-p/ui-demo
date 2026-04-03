export const findExistingItem = (items, productId) => {
  return items.find(item => item.id === productId);
};

export const addItemToCart = (items, product) => {
  const existingItem = findExistingItem(items, product.id);

  if (existingItem) {
    return items.map(item => 
      item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    );
  } else {
    return [...items, { ...product, quantity: 1 }];
  }
};

export const removeItemFromCart = (items, productId) => {
  return items.filter(item => item.id !== productId);
};

export const updateItemQuantity = (items, productId, newQuantity) => {
  return items.map(item => 
    item.id === productId 
      ? { ...item, quantity: newQuantity } 
      : item
  );
};

