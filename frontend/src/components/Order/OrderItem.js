const OrderItem = ({ item }) => {
  return (
    <div className="order-item-row">
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
  );
};

export default OrderItem;