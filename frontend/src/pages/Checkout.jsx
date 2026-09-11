import React, { useContext, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CartContext from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Checkout() {
    const navigate = useNavigate()
    const [shipToDifferent, setShipToDifferent] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");

    const { cart,clearCart, showMessage } = useContext(CartContext)

    const { token } = useAuth()

    const [billingAddress, setBillingAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address1: "",
        address2: "",
        country: "United States",
        city: "",
        state: "",
        zip: ""
    });

    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address1: "",
        address2: "",
        country: "United States",
        city: "",
        state: "",
        zip: ""
    }); 

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const shipping = cart.length > 0 ? 10 : 0;

    const total = subtotal + shipping;

    function handlebillingAddressChange(e) {
        const { name, value } = e.target;

        setBillingAddress((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleShippingChange(e) {
        const { name, value } = e.target;

        setShippingAddress((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const finalShippingAddress = shipToDifferent
    ? shippingAddress
    : billingAddress;

    const handlePlaceOrder = async (e) => {
        if (cart.length === 0) {
            showMessage("Your cart is empty", "warning");
            return;
        }

        if (
            !billingAddress.firstName ||
            !billingAddress.lastName ||
            !billingAddress.email ||
            !billingAddress.mobile ||
            !billingAddress.address1 ||
            !billingAddress.country ||
            !billingAddress.city ||
            !billingAddress.state ||
            !billingAddress.zip
        ) {
            showMessage("Please complete your billing address", "warning");
            return;
        }

        if (shipToDifferent) {
            if (
                !shippingAddress.firstName ||
                !shippingAddress.lastName ||
                !shippingAddress.email ||
                !shippingAddress.mobile ||
                !shippingAddress.address1 ||
                !shippingAddress.country ||
                !shippingAddress.city ||
                !shippingAddress.state ||
                !shippingAddress.zip
            ) {
                showMessage("Please complete your shipping address", "warning");
                return;
            }
        }

        if (!paymentMethod) {
            showMessage("Please select a payment method", "warning");
            return;
        }

        try {

            const finalShippingAddress = 
                shipToDifferent
                    ? shippingAddress
                    : billingAddress;

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/orders`,
                {
                    items: cart.map((item) => ({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity
                    })),

                    billingAddress,

                    shippingAddress: finalShippingAddress,

                    paymentMethod,

                    subtotal,
                    shipping,
                    total
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {

                const createdOrder = response.data.order

                clearCart();
                
                showMessage(
                    "Order placed successfully!",
                    "success"
                );
                
                navigate("/order-success",{
                    state: {
                        orderId: createdOrder.id
                    }
                });
            }
            
        } 
        catch (error) {
            
            console.error(
                "Order creation failed:",
                error
            );
            
            showMessage(
                "Order creation failed",
                "warning"
            );
        }
    }
    
  return (
    <div>
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-8">
                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary text-info pe-3">billingAddress Address</span>
                    </h5>

                    <div className="bg-light p-30 mb-5">
                        <div className="row">
                            <div className="col-md-6 form-group mb-3">
                                <label>First Name</label>
                                <input
                                    className="form-control"
                                    name="firstName"
                                    value={billingAddress.firstName}
                                    onChange={handlebillingAddressChange}
                                    type="text"
                                    placeholder="John"
                                />
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label>Last Name</label>
                                <input
                                    className="form-control"
                                    name="lastName"
                                    value={billingAddress.lastName}
                                    onChange={handlebillingAddressChange}
                                    type="text"
                                    placeholder="Doe"
                                />
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label>E-mail</label>
                                <input
                                    className="form-control"
                                    name="email"
                                    value={billingAddress.email}
                                    onChange={handlebillingAddressChange}
                                    type="email"
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label>Mobile No</label>
                                <input
                                    className="form-control"
                                    name="mobile"
                                    value={billingAddress.mobile}
                                    onChange={handlebillingAddressChange}
                                    type="text"
                                    placeholder="+123 456 789"
                                />
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label>Address Line 1</label>
                                <input
                                    className="form-control"
                                    name="address1"
                                    value={billingAddress.address1}
                                    onChange={handlebillingAddressChange}
                                    type="text"
                                    placeholder="123 Street"
                                />
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label>Address Line 2</label>
                                <input
                                    className="form-control"
                                    name="address2"
                                    value={billingAddress.address2}
                                    onChange={handlebillingAddressChange}
                                    type="text"
                                    placeholder="123 Street"
                                />
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label>Country</label>
                                <select 
                                    className="form-select" 
                                    // defaultValue="United States"
                                    name="country"
                                    value={billingAddress.country}
                                    onChange={handlebillingAddressChange}
                                >
                                    <option value="United States">United States</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                </select>
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label>City</label>
                                <input
                                    className="form-control"
                                    name="city"
                                    value={billingAddress.city}
                                    onChange={handlebillingAddressChange}
                                    type="text"
                                    placeholder="New York"
                                />
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label>State</label>
                                <input
                                    className="form-control"
                                    name="state"
                                    value={billingAddress.state}
                                    onChange={handlebillingAddressChange}
                                    type="text"
                                    placeholder="New York"
                                />
                            </div>

                            <div className="col-md-6 form-group mb-3">
                                <label>ZIP Code</label>
                                <input
                                    className="form-control"
                                    name="zip"
                                    value={billingAddress.zip}
                                    onChange={handlebillingAddressChange}
                                    type="text"
                                    placeholder="123"
                                />
                            </div>

                            <div className="col-md-12">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="shipto"
                                        checked={shipToDifferent}
                                        onChange={(e) => setShipToDifferent(e.target.checked)}
                                        data-bs-toggle="collapse"
                                        data-bs-target="#shipping-address"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="shipto"
                                    >
                                        Ship to different address
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="collapse mb-5" id="shipping-address">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary text-info pe-3">Shipping Address</span>
                        </h5>

                        <div className="bg-light p-30">
                            <div className="row">
                                <div className="col-md-6 form-group mb-3">
                                    <label>First Name</label>
                                    <input
                                        className="form-control"
                                        name="firstName"
                                        value={shippingAddress.firstName}
                                        onChange={handleShippingChange}
                                        type="text"
                                        placeholder="John"
                                    />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label>Last Name</label>
                                    <input
                                        className="form-control"
                                        name="lastName"
                                        value={shippingAddress.lastName}
                                        onChange={handleShippingChange}
                                        type="text"
                                        placeholder="Doe"
                                    />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label>E-mail</label>
                                    <input
                                        className="form-control"
                                        name="email"
                                        value={shippingAddress.email}
                                        onChange={handleShippingChange}
                                        type="email"
                                        placeholder="example@email.com"
                                    />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label>Mobile No</label>
                                    <input
                                        className="form-control"
                                        name="mobile"
                                        value={shippingAddress.mobile}
                                        onChange={handleShippingChange}
                                        type="text"
                                        placeholder="+123 456 789"
                                    />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label>Address Line 1</label>
                                    <input
                                        className="form-control"
                                        name="address1"
                                        value={shippingAddress.address1}
                                        onChange={handleShippingChange}
                                        type="text"
                                        placeholder="123 Street"
                                    />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label>Address Line 2</label>
                                    <input
                                        className="form-control"
                                        name="address2"
                                        value={shippingAddress.address2}
                                        onChange={handleShippingChange}
                                        type="text"
                                        placeholder="123 Street"
                                    />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label>Country</label>
                                    <select 
                                        className="form-select" 
                                        // defaultValue="United States"
                                        name="country"
                                        value={shippingAddress.country}
                                        onChange={handleShippingChange}
                                    >
                                        <option value="United States">United States</option>
                                        <option value="Afghanistan">Afghanistan</option>
                                        <option value="Albania">Albania</option>
                                        <option value="Algeria">Algeria</option>
                                    </select>
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label>City</label>
                                    <input
                                        className="form-control"
                                        name="city"
                                        value={shippingAddress.city}
                                        onChange={handleShippingChange}
                                        type="text"
                                        placeholder="New York"
                                    />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label>State</label>
                                    <input
                                        className="form-control"
                                        name="state"
                                        value={shippingAddress.state}
                                        onChange={handleShippingChange}
                                        type="text"
                                        placeholder="New York"
                                    />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <label>ZIP Code</label>
                                    <input
                                        className="form-control"
                                        name="zip"
                                        value={shippingAddress.zip}
                                        onChange={handleShippingChange}
                                        type="text"
                                        placeholder="123"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary text-info pe-3">Order Total</span>
                    </h5>

                    <div className="bg-light p-30 mb-5">
                        <div className="border-bottom">
                            <h6 className="mb-3">Products</h6>

                            {cart.map((item)=>(
                                <div key={item.id} className="d-flex justify-content-between">
                                    <p>
                                        {item.title} × {item.quantity}
                                    </p>

                                    <p>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="border-bottom pt-3 pb-2">
                            <div className="d-flex justify-content-between mb-3">
                                <h6>Subtotal</h6>
                                <h6>${subtotal.toFixed(2)}</h6>
                            </div>

                            <div className="d-flex justify-content-between">
                                <h6 className="fw-semibold">Shipping</h6>
                                <h6 className="fw-semibold">${shipping.toFixed(2)}</h6>
                            </div>
                        </div>

                        <div className="pt-2">
                            <div className="d-flex justify-content-between mt-2">
                                <h5>Total</h5>
                                <h5>${total.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary text-info pe-3">Payment</span>
                        </h5>

                        <div className="bg-light p-30">
                            <div className="form-group mb-3">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="payment"
                                        id="paypal"
                                        value={'paypal'}
                                        checked={paymentMethod==='paypal'}
                                        onChange={(e)=>setPaymentMethod(e.target.value)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="paypal"
                                    >
                                        Paypal
                                    </label>
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="payment"
                                        id="directcheck"
                                        value={'directcheck'}
                                        checked={paymentMethod==='directcheck'}
                                        onChange={(e)=>setPaymentMethod(e.target.value)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="directcheck"
                                    >
                                        Direct Check
                                    </label>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="payment"
                                        id="banktransfer"
                                        value={'banktransfer'}
                                        checked={paymentMethod==='banktransfer'}
                                        onChange={(e)=>setPaymentMethod(e.target.value)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="banktransfer"
                                    >
                                        Bank Transfer
                                    </label>
                                </div>
                            </div>

                            <h6>Selected: {paymentMethod===''?'To be checked':paymentMethod}</h6>

                            <button 
                                className="btn btn-info w-100 fw-bold py-3"
                                type='button'
                                onClick={handlePlaceOrder}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout
