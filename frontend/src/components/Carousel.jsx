import React from 'react'
import { Link } from 'react-router-dom';

function Carousel() {

  return (
    <div>
        <div className="container-fluid mb-3">
            
            <div className="row px-xl-5">
                <div className="col-lg-8">
                    <div
                        id="header-carousel"
                        className="carousel slide carousel-fade mb-30 mb-lg-0"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#header-carousel"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            ></button>

                            <button
                                type="button"
                                data-bs-target="#header-carousel"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                            ></button>

                            
                        </div>

                        <div className="carousel-inner">
                            <div
                                className="carousel-item active position-relative"
                                style={{ height: "430px" }}
                            >
                                <img
                                className="position-absolute w-100 h-100"
                                src="img/carousel-1.jpg"
                                alt="Men Fashion"
                                style={{ objectFit: "cover" }}
                                />

                                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3" style={{ maxWidth: "1000px" }}>
                                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                                        Men Fashion
                                        </h1>

                                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                                        Explore stylish everyday essentials and modern looks for every occasion.
                                        </p>

                                        <Link
                                            to="/shop?category=mens-shirts"
                                            className="btn btn-outline-light py-2 px-4"
                                        >
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        <div
                            className="carousel-item position-relative"
                            style={{ height: "430px" }}
                        >
                            <img
                            className="position-absolute w-100 h-100"
                            src="img/carousel-2.jpg"
                            alt="Women Fashion"
                            style={{ objectFit: "cover" }}
                            />

                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{ maxWidth: "1000px" }}>
                                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                                    Women Fashion
                                    </h1>

                                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                                    Discover trending styles, elegant essentials, and everyday fashion.
                                    </p>

                                    <Link
                                        to="/shop?category=womens-jewellery"
                                        className="btn btn-outline-light py-2 px-4"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </div>

                        
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    
                    <div
                        className="product-offer mb-30"
                        style={{ height: "200px" }}
                    >
                        <img
                            src="img/offer-1.jpg"
                            alt="Explore Our Collection"
                        />

                        <div className="offer-text text-white">
                            <h6>DISCOVER MORE</h6>

                            <h3>Explore Our Collection</h3>

                            <p className="text-white mb-3">
                                Discover popular products from our collection.
                            </p>

                            <Link
                                to="/shop"
                                className="btn btn-info"
                            >
                                Explore Now
                            </Link>
                        </div>
                    </div>
                    
                    <div
                        className="product-offer mb-30"
                        style={{ height: "200px" }}
                    >
                        <img
                            src="img/offer-2.jpg"
                            alt="Find Your Favorites"
                        />

                        <div className="offer-text text-white">
                            <h6>SHOP YOUR WAY</h6>

                            <h3>Find Your Favorites</h3>

                            <p className="text-white mb-3">
                                Browse products across different categories.
                            </p>

                            <Link
                                to="/shop"
                                className="btn btn-info"
                            >
                                View Products
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
    
        </div>
    </div>
  )
}

export default Carousel
