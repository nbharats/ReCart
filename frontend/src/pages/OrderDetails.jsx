import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function OrderDetails() {

    const { id } = useParams();

    const { token } = useAuth();

    const [order, setOrder] = useState(null);

    useEffect(()=>{
        if(!token){return}

        const fetchOrder = async () => {
            try{
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/orders/${id}`, 
                    { 
                        headers: {
                             Authorization: `Bearer ${token}` 
                            } 
                    }
                )
                if(response.data.success){
                    setOrder(response.data.order)
                }
            }
            catch(error){
                console.error( "Failed to fetch order details:", error ); 
                setOrder(null);
            }
        }
        fetchOrder()
    },[token])

    if (!order) {
        return (
            <div className="container mt-5">
                <h5>Order not found.</h5>
                <small className="text-secondary">If orders are placed, please wait for a minute for backend.</small>
            </div>
        );
    }

    return (
        <div className="container-fluid mt-5">

            <div className="row px-xl-5">

                <div className="col-lg-8">

                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pe-3">
                            Order Details
                        </span>
                    </h5>

                    <div className="bg-light p-30 mb-5">

                        <div className="d-flex justify-content-between mb-3">
                            <h6>Order ID</h6>
                            <h6>#{order.id}</h6>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <h6>Date</h6>
                            <h6>
                                {new Date(order.created_at).toLocaleString()}
                            </h6>
                        </div>

                        <div className="d-flex justify-content-between">
                            <h6>Status</h6>

                            <span 
                                className={`badge ${
                                            order.status === "Cancelled"
                                                ? "bg-danger"
                                                : order.status === "Placed"
                                                ? "bg-success"
                                                : "bg-warning"
                                        }`}
                            >
                                {order.status}
                            </span>
                        </div>

                    </div>

                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pe-3">
                            Products
                        </span>
                    </h5>

                    <div className="bg-light p-30 mb-5">

                        {order.items.map((item) => (

                            <div
                                key={item.id}
                                className="d-flex justify-content-between align-items-center border-bottom py-3"
                            >

                                <div className="d-flex align-items-center">

                                    <div>
                                        <h6 className="mb-1">
                                            {item.title}
                                        </h6>

                                        <small>
                                            ${item.price.toFixed(2)}
                                            {" × "}
                                            {item.quantity}
                                        </small>
                                    </div>

                                </div>

                                <strong>
                                    ${(item.price *item.quantity).toFixed(2)}
                                </strong>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="col-lg-4">

                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pe-3">
                            Order Summary
                        </span>
                    </h5>

                    <div className="bg-light p-30 mb-5">

                        <div className="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>
                                ${order.subtotal.toFixed(2)}
                            </h6>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <h6>Shipping</h6>
                            <h6>
                                ${order.shipping.toFixed(2)}
                            </h6>
                        </div>

                        <div className="border-top pt-3">

                            <div className="d-flex justify-content-between">
                                <h5>Total</h5>
                                <h5>
                                    ${order.total.toFixed(2)}
                                </h5>
                            </div>

                        </div>

                        <div className="border-top mt-3 pt-3">

                            <div className="d-flex justify-content-between">
                                <h6>Payment</h6>
                                <h6>
                                    {order.payment_method}
                                </h6>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OrderDetails;