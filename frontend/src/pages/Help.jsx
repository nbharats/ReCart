import React from "react";
import { Link } from "react-router-dom";

function Help() {
    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="display-5 text-uppercase">
                        How Can We <span className="text-info">Help?</span>
                    </h1>
                    <p className="text-muted">
                        Find answers to common questions about shopping on
                        ReCart.
                    </p>
                </div>

                <div className="row g-4">
                    <div className="col-md-6 col-lg-4">
                        <div className="bg-light p-4 h-100">
                            <h5 className="text-uppercase mb-3">
                                Shopping
                            </h5>
                            <p>
                                Browse products using categories, search,
                                sorting, and filters on the Shop page.
                            </p>

                            <Link to="/shop" className="btn btn-info">
                                Browse Products
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="bg-light p-4 h-100">
                            <h5 className="text-uppercase mb-3">
                                Cart & Checkout
                            </h5>
                            <p>
                                Add products to your cart, review your order,
                                provide your address, and complete checkout.
                            </p>

                            <Link to="/cart" className="btn btn-info">
                                View Cart
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="bg-light p-4 h-100">
                            <h5 className="text-uppercase mb-3">
                                Account
                            </h5>
                            <p>
                                Manage your account and access your orders
                                after signing in.
                            </p>

                            <Link to="/account" className="btn btn-info">
                                My Account
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="bg-light p-4 h-100">
                            <h5 className="text-uppercase mb-3">
                                Wishlist
                            </h5>
                            <p>
                                Save products you like and access them later
                                from your wishlist.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="bg-light p-4 h-100">
                            <h5 className="text-uppercase mb-3">
                                Product Comparison
                            </h5>
                            <p>
                                Compare products to help you decide which one
                                is right for you.
                            </p>

                            <Link to="/compare" className="btn btn-info">
                                Compare Products
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="bg-light p-4 h-100">
                            <h5 className="text-uppercase mb-3">
                                Still Need Help?
                            </h5>
                            <p>
                                If you cannot find what you are looking for,
                                contact us and we'll be happy to help.
                            </p>

                            <Link to="/contact" className="btn btn-info">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;