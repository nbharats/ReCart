import React from 'react'
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Account() {
    const { user, logout } = useAuth();

    return (
        <div className="container-fluid py-5">
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <div className="bg-light p-5">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h2 className="mb-0">
                                    My Account
                                </h2>

                                <button
                                    className="btn btn-danger"
                                    onClick={logout}
                                >
                                    Logout
                                </button>

                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <strong>Name</strong>

                                    <p className="mb-0">
                                        {user?.name || "N/A"}
                                    </p>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <strong>Email</strong>

                                    <p className="mb-0">
                                        {user?.email || "N/A"}
                                    </p>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <strong>User ID</strong>

                                    <p className="mb-0">
                                        {user?.id || "N/A"}
                                    </p>

                                </div>

                            </div>

                            <hr />

                            <div className="mt-4">

                                <Link
                                    to="/orders"
                                    className="btn btn-info me-2"
                                >
                                    My Orders
                                </Link>

                                <Link
                                    to="/shop"
                                    className="btn btn-secondary"
                                >
                                    Continue Shopping
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Account;
