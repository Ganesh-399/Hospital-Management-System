import { useEffect, useRef } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, appointmentId, amount, onPaymentSuccess, toast }) => {
    const paypalContainerRef = useRef(null);
    const paypalRendered = useRef(false);

    useEffect(() => {
        if (isOpen && !paypalRendered.current && window.paypal) {
            // Clear container
            if (paypalContainerRef.current) {
                paypalContainerRef.current.innerHTML = '';
            }

            // Render PayPal buttons
            window.paypal.Buttons({
                createOrder: async () => {
                    try {
                        const token = localStorage.getItem('token');
                        const response = await fetch(
                            `http://localhost:8080/api/appointments/${appointmentId}/pay/create`,
                            {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            }
                        );

                        if (!response.ok) {
                            throw new Error('Failed to create order');
                        }

                        const orderId = await response.text();
                        return orderId;
                    } catch (error) {
                        console.error('Create order error:', error);
                        toast.error('Failed to create payment order');
                        throw error;
                    }
                },

                onApprove: async (data) => {
                    try {
                        const token = localStorage.getItem('token');
                        const response = await fetch(
                            `http://localhost:8080/api/appointments/${appointmentId}/pay/capture?orderId=${data.orderID}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            }
                        );

                        if (!response.ok) {
                            throw new Error('Payment capture failed');
                        }

                        toast.success('Payment successful! Your appointment is confirmed.');
                        onPaymentSuccess();
                        onClose();
                    } catch (error) {
                        console.error('Capture error:', error);
                        toast.error('Payment capture failed. Please try again.');
                    }
                },

                onCancel: () => {
                    toast.warning('Payment cancelled.');
                },

                onError: (err) => {
                    console.error('PayPal error:', err);
                    toast.error('Payment failed. Please try again.');
                }
            }).render(paypalContainerRef.current);

            paypalRendered.current = true;
        }

        // Reset when modal closes
        if (!isOpen) {
            paypalRendered.current = false;
        }
    }, [isOpen, appointmentId, toast, onPaymentSuccess, onClose]);

    if (!isOpen) return null;

    return (
        <div className="payment-modal-overlay" onClick={onClose}>
            <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
                <div className="payment-modal-header">
                    <h2>💳 Complete Payment</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="payment-modal-body">
                    <div className="payment-amount">
                        <span className="amount-label">Amount to Pay</span>
                        <span className="amount-value">${amount?.toFixed(2) || '10.00'}</span>
                    </div>

                    <div className="payment-info">
                        <p>Choose your payment method below:</p>
                    </div>

                    <div className="paypal-container" ref={paypalContainerRef}>
                        <div className="paypal-loading">Loading payment options...</div>
                    </div>

                    <div className="secure-badge">
                        🔒 Secured by PayPal
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
