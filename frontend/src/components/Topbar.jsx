import React, { useContext, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CartContext from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Topbar() {


    const { cart, wishlist } = useContext(CartContext)

    const { user, isAuthenticated, logout } = useAuth()

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");   

    const handleSearch = (e) => {
        e.preventDefault();

        const search = searchTerm.trim();

        if (!search) {
            navigate("/shop");
            return;
        }

        navigate(`/shop?search=${encodeURIComponent(search)}`);
    };

  return (
    <div>
        <div className="container-fluid">
            <div className="row bg-info py-1 px-xl-5">
                <div className="col-lg-6 d-none d-lg-block">
                    <div className="d-inline-flex align-items-center h-100">
                        <Link className="text-decoration-none text-body me-3" to="/about">
                            About
                        </Link>

                        <Link className="text-decoration-none text-body me-3" to="/contact">
                            Contact
                        </Link>

                        <Link className="text-decoration-none text-body me-3" to="/help">
                            Help
                        </Link>

                        <Link className="text-decoration-none text-body me-3" to="/faqs">
                            FAQs
                        </Link>
                    </div>
                </div>

                <div className="col-lg-6 text-center text-lg-end">
                    <div className="d-inline-flex align-items-center">
                        <div className="btn-group">

                            <button
                                type="button"
                                className="btn btn-sm btn-light dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                {isAuthenticated
                                    ? `Hello, ${user?.name || "User"}`
                                    : "My Account"}
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">

                                    {!isAuthenticated ? (
                                        <>
                                            <Link to="/login" className="dropdown-item">
                                                Sign In
                                            </Link>

                                            <Link to="/register" className="dropdown-item">
                                                Sign Up
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/account"
                                                className="dropdown-item"
                                            >
                                                My Account
                                            </Link>

                                            <Link
                                                to="/orders"
                                                className="dropdown-item"
                                            >
                                                My Orders
                                            </Link>

                                            <button
                                                type="button"
                                                className="dropdown-item"
                                                onClick={logout}
                                            >
                                                Logout
                                            </button>
                                        </>
                                    )}

                            </ul>

                        </div>

                        
                    </div>

                    <div className="d-inline-flex align-items-center d-block d-lg-none">
                        <Link
                            to="/wishlist"
                            className="btn px-0 ms-2"
                        >
                            <i className="fas fa-heart text-dark"></i>

                            <span
                                className="badge text-dark border border-dark rounded-circle"
                                style={{ paddingBottom: "2px" }}
                            >
                                {wishlist.length}
                            </span>
                        </Link>

                        <Link
                            to="/cart"
                            className="btn px-0 ms-2"
                        >
                            <i className="fas fa-shopping-cart text-dark"></i>

                            <span
                                className="badge text-dark border border-dark rounded-circle"
                                style={{ paddingBottom: "2px" }}
                            >
                                {cart.length}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                <div className="col-lg-4">
                    <Link
                        to="/"
                        className="text-decoration-none"
                    >
                        <span className="h1 text-uppercase text-info bg-dark px-2">
                            Re
                        </span>

                        <span className="h1 text-uppercase text-dark bg-info px-2">
                            Cart
                        </span>
                        
                    </Link>
                </div>

                <div className="col-lg-4 col-6 text-start">
                    <form onSubmit={handleSearch}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search for products"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="input-group-text bg-transparent text-info border-0"
                            >
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="col-lg-4 col-6 text-end">
                    <p className="m-0">Customer Service</p>
                    <h6 className="m-0 text-info">We're here to help</h6>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Topbar
