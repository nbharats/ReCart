import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import CartContext from "../context/CartContext";

function Orders() {

    const [orders, setOrders] = useState([]);

    const { token } = useAuth()
    const { showMessage } = useContext(CartContext)

    useEffect(()=>{
        if(!token){
            return
        }

        const fetchOrder = async () => {
            try{
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/orders`, 
                    { 
                        headers: {
                             Authorization: `Bearer ${token}` 
                            } 
                    }
                )
                if(response.data.success){
                    setOrders(response.data.orders || [])
                }
            }
            catch(error){
                console.error( "Failed to fetch order details:", error ); 
                setOrders(null);
            }
        }
        fetchOrder()

    },[token])

    async function cancelOrder(orderId){

        try { 
            const response = await axios.put( 
                `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/cancel`, 
                {}, 
                { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    } 
                } 
            ); 
            if (response.data.success) { 
                setOrders((previousOrders) => 
                    previousOrders.map((order) => 
                        order.id === orderId 
                            ? { 
                                ...order, 
                                status: "Cancelled" 
                              } 
                            : order 
                    ) 
                ); 
                showMessage( 
                    "Order cancelled successfully!", 
                    "success" ); 
            } 
        } 
        catch (error) { 
            console.error( "Order cancellation failed:", error ); 
            showMessage( 
                error.response?.data?.message || 
                "Order cancellation failed", 
                "warning" 
            ); 
        }
    }

    return (
        <div className="container-fluid mt-5">
            <div className="row px-xl-5">
                <div className="col-12">

                    <h5 className="section-title position-relative text-uppercase mb-4">
                        <span className="bg-secondary pe-3">
                            My Orders
                        </span>
                    </h5>

                    {orders.length === 0 ? (

                        <div className="bg-light p-30">
                            <h5>No orders found.</h5>

                            <p className="mb-0">
                                Your completed orders will appear here.
                            </p>
                            <small className="text-secondary">If orders are placed, please wait for a minute for backend.</small>
                        </div>

                    ) : (

                        <div className="table-responsive">
                            <table className="table table-bordered align-middle">

                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Products</th>
                                        <th>Payment</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {orders.map((order) => (

                                        <tr key={order.id}>

                                            <td>
                                                #{order.id}
                                            </td>

                                            <td>
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>
                                                {order.items.length}
                                            </td>

                                            <td>
                                                {order.payment_method}
                                            </td>

                                            <td>
                                                ${order.total.toFixed(2)}
                                            </td>

                                            <td>
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
                                            </td>

                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">

                                                    <Link
                                                        to={`/orders/${order.id}`}
                                                        className="btn btn-info btn-sm"
                                                    >
                                                        View Details
                                                    </Link>

                                                    {order.status === "Placed" && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => cancelOrder(order.id)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}

                                                </div>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>
                        </div>

                    )}

                </div>
            </div>
        </div>
    );
}

export default Orders;