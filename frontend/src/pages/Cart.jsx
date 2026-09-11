import React, { useContext } from 'react'
import CartContext from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {

    const { cart, increaseQuantity, decreaseQuantity,removeFromCart} = useContext(CartContext);

    const subtotal = cart.reduce(
        (total,item)=> total + item.price * item.quantity,0
    )

    const shipping = cart.length > 0 ? 10 : 0;

    

  return (
    <div>
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-8 table-responsive mb-5">
                    {cart.length === 0 ? (
                        <div className="text-center py-5">
                            <h4>Your cart is empty</h4>
                            <p>Add some products to continue shopping.</p>
                        </div>
                    ) : (
                        // existing cart table
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>

                            <tbody className="align-middle">
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td className="align-middle">
                                            <img
                                                src={item.thumbnail || item.images?.[0]}
                                                alt={item.title}
                                                style={{ width: "50px" }}
                                            />{" "}
                                            {item.title}
                                        </td>

                                        <td className="align-middle">${item.price}</td>

                                        <td className="align-middle">
                                            <div
                                                className="input-group quantity mx-auto"
                                                style={{ width: "100px" }}
                                            >
                                                <button
                                                    className="btn btn-sm btn-info btn-minus"
                                                    type="button"
                                                    onClick={()=>decreaseQuantity(item.id)}
                                                >
                                                    <i className="fa fa-minus"></i>
                                                </button>

                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm bg-secondary border-0 text-center"
                                                    readOnly
                                                    value={item.quantity}
                                                />

                                                <button
                                                    className="btn btn-sm btn-info btn-plus"
                                                    type="button"
                                                    onClick={()=>increaseQuantity(item.id)}
                                                >
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </div>
                                        </td>

                                        <td className="align-middle">${(item.price * item.quantity).toFixed(2)}</td>

                                        <td className="align-middle">
                                            <button
                                                className="btn btn-sm btn-danger"
                                                type="button"
                                                onClick={()=>removeFromCart(item.id)}
                                            >
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    
                </div>

                <div className="col-lg-4">
                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pe-3">Cart Summary</span>
                    </h5>

                    <div className="bg-light p-30 mb-5">
                        <div className="border-bottom pb-2">
                            <div className="d-flex justify-content-between mb-3">
                                <h6>Subtotal</h6>
                                <h6>${subtotal.toFixed(2)}</h6>
                            </div>

                            <div className="d-flex justify-content-between">
                                <h6 className="fw-semibold">Shipping</h6>
                                <h6 className="fw-semibold">${shipping}</h6>
                            </div>
                        </div>

                        <div className="pt-2">
                            <div className="d-flex justify-content-between mt-2">
                                <h5>Total</h5>
                                <h5>${(subtotal + shipping).toFixed(2)}</h5>
                            </div>

                            <Link to={'/checkout'}>
                                <button
                                    className="btn btn-info w-100 fw-bold my-3 py-3"
                                    type="button"
                                >
                                    Proceed To Checkout
                                </button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart
