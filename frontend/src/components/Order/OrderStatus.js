const OrderStatus = ({ status }) => {
  return (
    <span 
      className={`order-status-badge order-status-${status.toLowerCase()}`}
    >
      {status}
    </span>
  );
};

export default OrderStatus;