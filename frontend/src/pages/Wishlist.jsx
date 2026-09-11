import React, { useContext } from 'react'
import CartContext from '../context/CartContext'

function Wishlist() {

    const { wishlist, addToCart, removeFromWishList } = useContext(CartContext);

  return (
    <div>
        <div className="container fluid">
            <div className="row px-xl-5">

                <div className="col-12">
                    <h2 className="mb-4">My Wishlist</h2>

                    { wishlist.length === 0 
                    ? (
                        <div><h5>Your wishlist is empty.</h5></div>
                    ) 
                    : (
                        <div className="row">
                            {wishlist.map((item) => (

                                <div
                                    className="col-lg-4 col-md-6 col-sm-6 pb-1"
                                    key={item.id}
                                >
                                    <div className="product-item bg-light mb-4">

                                        <div className="product-img position-relative overflow-hidden">
                                            <img
                                                className="img-fluid w-100"
                                                src={item.thumbnail || item.images?.[0]}
                                                alt={item.title}
                                            />

                                        </div>
                                        <div className="text-center py-4">

                                            <h6 className="text-truncate">
                                                {item.title}
                                            </h6>

                                            <h5>
                                                ${item.price}
                                            </h5>

                                            <button
                                                className="btn btn-info btn-sm me-2"
                                                type="button"
                                                onClick={() => addToCart(item)}
                                            >
                                                <i className="fa fa-shopping-cart me-1"></i>
                                                Add to Cart
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                type="button"
                                                onClick={() => removeFromWishList(item.id)}
                                            >
                                                <i className="fa-solid fa-heart-circle-xmark"></i>
                                                Remove from Wishlist
                                            </button>

                                        </div>

                                    </div>
                                </div>

                            ))}
                        </div>
                    )}

                </div>

            </div>
        </div>      
    </div>
  )
}

export default Wishlist
