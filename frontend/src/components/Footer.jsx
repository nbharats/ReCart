import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

function Footer() {

    const { showMessage } = useContext(CartContext)

    const [email, setEmail] = useState("");

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            showMessage("Please enter your email address.", "error");
            return;
        }

        showMessage(
            "Thank you for subscribing to the ReCart newsletter!",
            "success"
        );

        setEmail("");
    };

    return (
        <div className="container-fluid bg-dark text-secondary mt-5 pt-5">

            <div className="row px-xl-5 pt-5">

                <div className="col-lg-4 col-md-12 mb-5 pe-3 pe-xl-5">

                    <h5 className="text-secondary text-uppercase mb-4">
                        Get In Touch
                    </h5>

                    <p className="mb-4">
                        ReCart is a modern e-commerce platform designed to
                        provide a simple and convenient online shopping
                        experience. Browse products, manage your cart,
                        compare items, and place orders with ease.
                    </p>

                    <p className="mb-2">
                        <i className="fa fa-shopping-bag text-info me-3"></i>
                        ReCart Online Store
                    </p>

                    <p className="mb-2">
                        <i className="fa fa-envelope text-info me-3"></i>
                        Customer Support
                    </p>

                    <p className="mb-0">
                        <i className="fa fa-clock text-info me-3"></i>
                        Available Online
                    </p>

                </div>


                <div className="col-lg-8 col-md-12">

                    <div className="row">

                        <div className="col-md-4 mb-5">

                            <h5 className="text-secondary text-uppercase mb-4">
                                Quick Shop
                            </h5>

                            <div className="d-flex flex-column justify-content-start">

                                <Link
                                    className="text-secondary mb-2"
                                    to="/"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    Home
                                </Link>

                                <Link
                                    className="text-secondary mb-2"
                                    to="/shop"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    Our Shop
                                </Link>

                                <Link
                                    className="text-secondary mb-2"
                                    to="/cart"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    Shopping Cart
                                </Link>

                                <Link
                                    className="text-secondary mb-2"
                                    to="/compare"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    Compare
                                </Link>

                                <Link
                                    className="text-secondary"
                                    to="/contact"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    Contact Us
                                </Link>

                            </div>

                        </div>


    
                        <div className="col-md-4 mb-5">

                            <h5 className="text-secondary text-uppercase mb-4">
                                My Account
                            </h5>

                            <div className="d-flex flex-column justify-content-start">

                                <Link
                                    className="text-secondary mb-2"
                                    to="/account"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    My Account
                                </Link>

                                <Link
                                    className="text-secondary mb-2"
                                    to="/orders"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    My Orders
                                </Link>

                                <Link
                                    className="text-secondary mb-2"
                                    to="/wishlist"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    Wishlist
                                </Link>

                                <Link
                                    className="text-secondary mb-2"
                                    to="/checkout"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    Checkout
                                </Link>

                                <Link
                                    className="text-secondary mb-2"
                                    to="/help"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    Help
                                </Link>

                                <Link
                                    className="text-secondary"
                                    to="/faqs"
                                >
                                    <i className="fa fa-angle-right me-2"></i>
                                    FAQs
                                </Link>

                            </div>

                        </div>


    
                        <div className="col-md-4 mb-5">

                            <h5 className="text-secondary text-uppercase mb-4">
                                Newsletter
                            </h5>

                            <p>
                                Subscribe to receive updates about new
                                products and the latest from ReCart.
                            </p>

                            <form onSubmit={handleNewsletterSubmit}>

                                <div className="input-group">

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Your Email Address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />

                                    <button
                                        className="btn btn-info"
                                        type="submit"
                                    >
                                        Sign Up
                                    </button>

                                </div>

                            </form>


        
                            <h6 className="text-secondary text-uppercase mt-4 mb-3">
                                Follow Us
                            </h6>

                            <div className="d-flex">

                                <button
                                    type="button"
                                    className="btn btn-info btn-square me-2"
                                    onClick={() =>
                                        showMessage(
                                            "Social media links will be available soon.",
                                            "info"
                                        )
                                    }
                                    aria-label="Twitter"
                                >
                                    <i className="fab fa-twitter"></i>
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-info btn-square me-2"
                                    onClick={() =>
                                        showMessage(
                                            "Social media links will be available soon.",
                                            "info"
                                        )
                                    }
                                    aria-label="Facebook"
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-info btn-square me-2"
                                    onClick={() =>
                                        showMessage(
                                            "Social media links will be available soon.",
                                            "info"
                                        )
                                    }
                                    aria-label="LinkedIn"
                                >
                                    <i className="fab fa-linkedin-in"></i>
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-info btn-square"
                                    onClick={() =>
                                        showMessage(
                                            "Social media links will be available soon.",
                                            "info"
                                        )
                                    }
                                    aria-label="Instagram"
                                >
                                    <i className="fab fa-instagram"></i>
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div
                className="row border-top mx-xl-5 py-4"
                style={{ borderColor: "rgba(255,255,255,.1)" }}
            >

                <div className="col-md-6 px-xl-0">

                    <p className="mb-md-0 text-center text-md-start text-secondary">
                        &copy; 2026{" "}
                        <span className="text-info">
                            ReCart
                        </span>
                        . All Rights Reserved.
                    </p>

                </div>


                <div className="col-md-6 px-xl-0 text-center text-md-end">

                    <img
                        className="img-fluid"
                        src="img/payments.png"
                        alt="Accepted payment methods"
                    />

                </div>

            </div>

        </div>
    );
}

export default Footer;