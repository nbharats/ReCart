import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

function Products({ products }) {
 
    const { addToCart, addToWishlist,addToCompare } = useContext(CartContext)
    
    return(
        <div>
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary text-info pr-3">Feautured Products</span></h2>
                <div className="row px-xl-5">
                    {products.length>0
                    ?
                    products.map((item) => (
                        <div
                            className="col-lg-3 col-md-4 col-sm-6 pb-1"
                            key={item.id}
                        >

                            <div className="product-item bg-light mb-4">

                                <div className="product-img position-relative overflow-hidden">

                                    <img
                                        className="img-fluid w-100"
                                        src={item.images[0]}
                                        alt={item.title}
                                    />

                                    <div className="product-action">
                                        <a 
                                            className='btn btn-outline-dark btn-square'
                                            onClick={()=>{ addToCart(item) }}
                                            ><i className="fa fa-shopping-cart"></i>
                                        </a>
                                        <a 
                                            className="btn btn-outline-dark btn-square"
                                            onClick={()=>{ addToWishlist(item) }}
                                        >
                                            <i className="far fa-heart"></i>
                                        </a>
                                        <a 
                                            className="btn btn-outline-dark btn-square"
                                            onClick={()=>{ addToCompare(item) }}
                                        >
                                            <i className="fa fa-sync-alt"></i>
                                        </a>
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="btn btn-outline-dark btn-square"
                                        >
                                            <i className="fa fa-search"></i>
                                        </Link>
                                    </div>

                                </div>

                                <div className="text-center py-4">

                                    <h6 className="h6 text-decoration-none text-truncate">
                                        {item.title}
                                    </h6>

                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                        <h5>${item.price}</h5>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <small
                                                key={index}
                                                className={`fa ${
                                                    index < Math.round(item.rating)
                                                        ? "fa-star"
                                                        : "fa-star-o"
                                                } text-info me-1`}
                                            ></small>
                                        ))}
                                        <small>({item.rating})</small>
                                    </div>
                                    
                                </div>

                            </div>

                        </div>
                    ))
                    :
                    <div className="row px-xl-5 pb-3">
                        <h1 className='text-center text-warning'>
                            Technical Problem.
                        </h1>
                        <span className='text-center text-secondary'>Please contact us for support</span>
                    </div>
                    }
                    <div className="col-12 text-center mt-4">
                        <Link to="/shop" className="btn btn-info">
                            Show More Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Products
