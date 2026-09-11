import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

function OrderSuccess() {
    const [order, setOrder] = useState(null);

    const { token } = useAuth();
    const location = useLocation();

    const orderId = location.state?.orderId;

    useEffect(() => {

    if (!orderId || !token) {
        return;
    }

    const fetchOrder = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:5000/api/orders/${orderId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data.success) {
                    setOrder(response.data.order);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch order:",
                    error
                );
            }
        };

        fetchOrder();
    }, [token]);

    if (!order) {
        return (
            <div className="container mt-5">
                <h4>No recent order found.</h4>
            </div>
        );
    }
    

    return (
        <div className="container-fluid mt-5">
            <div className="row px-xl-5">
                <div className="col-lg-8 mx-auto">

                    <div className="bg-light p-30">

                        <div className="text-center mb-4">
                            <i className="fa fa-check-circle fa-3x text-success mb-3"></i>

                            <h2>Order Placed Successfully!</h2>

                            <p className="text-muted">
                                Thank you for your order.
                            </p>
                        </div>

                        <div className="border-bottom pb-3 mb-3">
                            <div className="d-flex justify-content-between">
                                <strong>Order ID</strong>
                                <span>{order.id}</span>
                            </div>

                            <div className="d-flex justify-content-between mt-2">
                                <strong>Payment Method</strong>
                                <span>{order.payment_method}</span>
                            </div>
                        </div>

                        <h5 className="mb-3">Ordered Products</h5>

                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="d-flex justify-content-between mb-3"
                            >
                                <div>
                                    <p className="mb-0">
                                        {item.title}
                                    </p>

                                    <small className="text-muted">
                                        Quantity: {item.quantity}
                                    </small>
                                </div>

                                <p>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}

                        <div className="border-top pt-3">

                            <div className="d-flex justify-content-between">
                                <span>Subtotal</span>
                                <span>
                                    ${order.subtotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mt-2">
                                <span>Shipping</span>
                                <span>
                                    ${order.shipping.toFixed(2)}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mt-3">
                                <h5>Total</h5>
                                <h5>
                                    ${order.total.toFixed(2)}
                                </h5>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;