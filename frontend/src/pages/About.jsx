import React from "react";

function About() {
    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h1 className="display-5 text-uppercase mb-4">
                            About <span className="text-info">ReCart</span>
                        </h1>

                        <p className="mb-4">
                            Welcome to ReCart, your simple and convenient online
                            shopping destination. We bring a wide range of
                            products together in one place so you can browse,
                            compare, and shop with ease.
                        </p>

                        <p className="mb-4">
                            ReCart is designed to provide a smooth shopping
                            experience with easy product discovery, shopping
                            cart management, wishlist, product comparison, and
                            secure checkout.
                        </p>

                        <p className="mb-0">
                            Our goal is to make online shopping simple,
                            organized, and enjoyable.
                        </p>
                    </div>

                    <div className="col-lg-6 mt-5 mt-lg-0">
                        <div className="bg-light p-5">
                            <h4 className="text-uppercase mb-4">
                                Why Choose ReCart?
                            </h4>

                            <div className="mb-3">
                                <h6 className="text-uppercase mb-2">
                                    Wide Product Selection
                                </h6>
                                <p className="mb-0">
                                    Explore products across different
                                    categories.
                                </p>
                            </div>

                            <div className="mb-3">
                                <h6 className="text-uppercase mb-2">
                                    Easy Shopping
                                </h6>
                                <p className="mb-0">
                                    Add products to your cart and manage your
                                    purchases easily.
                                </p>
                            </div>

                            <div>
                                <h6 className="text-uppercase mb-2">
                                    Convenient Experience
                                </h6>
                                <p className="mb-0">
                                    Search, compare, wishlist, and checkout
                                    from one place.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;