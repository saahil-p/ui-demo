import React, { useState, useEffect } from 'react';
import {Modal} from "antd";

const CheckoutModal = ({visible, onConfirm, onCancel, expiryTime}) => {
    const [timeRemaining, setTimeRemaining] = useState(expiryTime);

    useEffect(() => {
        if(!visible){
            setTimeRemaining(expiryTime); 
            return;
        }

        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if(prev <= 1){
                    clearInterval(interval);
                    onCancel(); // Auto-cancel when time expires
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [visible, onCancel, expiryTime]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds/60); 
        const secs = seconds % 60; 

        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    return (
        <Modal
        title="Confirm Your Order"
        open={visible}
        onOk={onConfirm}
        onCancel={onCancel}
        okText="Confirm Order"
        cancelText="Cancel"
        closable={false}
        maskClosable={false}
        >
        <p>Your items have been reserved!</p>
        <p>Please confirm your order within: <strong>{formatTime(timeRemaining)}</strong></p>
        <p>After this time, items will be released back to inventory.</p>
        </Modal>
    );
}

export default CheckoutModal;