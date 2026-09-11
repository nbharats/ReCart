import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import CartContext from "../context/CartContext";

function Navbar() {

    const { products, cart, wishlist } = useContext(CartContext);
    const [showCategories, setShowCategories] = useState(false);
    
    const categories = [...new Set(
        products.map((product) => product.category)
    )];

    return (
        <div className="container-fluid bg-dark mb-30">

            <div className="row px-xl-5">

                <div className="col-lg-3 d-none d-lg-block position-relative">

                    <button
                        type="button"
                        className="btn d-flex align-items-center justify-content-between bg-info w-100"
                        onClick={() => setShowCategories(!showCategories)}
                        style={{
                            height: "65px",
                            padding: "0 30px",
                            borderRadius: "0"
                        }}
                    >

                        <h6 className="text-dark m-0">
                            <i className="fa fa-bars me-2"></i>
                            Categories
                        </h6>

                        <i
                            className={`fa ${
                                showCategories
                                    ? "fa-angle-up"
                                    : "fa-angle-down"
                            } text-dark`}
                        ></i>

                    </button>

                    {showCategories && (

                        <nav
                            className="position-absolute navbar navbar-light align-items-start p-3 bg-light shadow"
                            id="navbar-vertical"
                            style={{
                                width: "900px",
                                zIndex: 999,
                                top: "65px",
                                left: "0"
                            }}
                        >

                            <div className="row row-cols-3 row-cols-md-4 w-100 g-0">

                                {categories.map((category) => (

                                    <div
                                        className="col"
                                        key={category}
                                    >

                                        <Link
                                            to={`/shop?category=${category}`}
                                            className="nav-link text-dark"
                                            onClick={() => setShowCategories(false)}
                                        >
                                            {category.toUpperCase()}
                                        </Link>

                                    </div>

                                ))}

                            </div>

                        </nav>

                    )}

                </div>

                <div className="col-lg-9">

                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 py-lg-0 px-0">

                        <Link
                            to="/"
                            className="text-decoration-none d-block d-lg-none"
                        >

                            <span className="h1 text-uppercase text-dark bg-light px-2">
                                Re
                            </span>

                            <span className="h1 text-uppercase text-light bg-info px-2 ms-n1">
                                Cart
                            </span>

                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                            aria-controls="navbarCollapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >

                            <span className="navbar-toggler-icon"></span>

                        </button>

                        <div
                            className="collapse navbar-collapse justify-content-between"
                            id="navbarCollapse"
                        >

                            <div className="navbar-nav me-auto py-0">

                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `nav-item nav-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    Home
                                </NavLink>

                                <NavLink
                                    to="/shop"
                                    className={({ isActive }) =>
                                        `nav-item nav-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    Shop
                                </NavLink>

                                <NavLink
                                    to="/compare"
                                    className={({ isActive }) =>
                                        `nav-item nav-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    Compare
                                </NavLink>

                                <NavLink
                                    to="/checkout"
                                    className={({ isActive }) =>
                                        `nav-item nav-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    Checkout
                                </NavLink>

                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `nav-item nav-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    Contact
                                </NavLink>

                            </div>

                            <div className="navbar-nav ms-auto py-0 d-none d-lg-block">

                                <Link
                                    to="/wishlist"
                                    className="btn px-0"
                                >

                                    <i className="fas fa-heart text-info"></i>

                                    <span
                                        className="badge text-light border border-light rounded-circle"
                                        style={{
                                            paddingBottom: "3px"
                                        }}
                                    >
                                        {wishlist.length}
                                    </span>

                                </Link>

                                <Link
                                    to="/cart"
                                    className="btn px-0 ms-3"
                                >

                                    <i className="fas fa-shopping-cart text-info"></i>

                                    <span
                                        className="badge text-light border border-light rounded-circle"
                                        style={{
                                            paddingBottom: "3px"
                                        }}
                                    >
                                        {cart.length}
                                    </span>

                                </Link>

                            </div>

                        </div>

                    </nav>

                </div>

            </div>

        </div>
    );
}

export default Navbar;