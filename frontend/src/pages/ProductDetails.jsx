import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CartContext from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        products,
        addToCart,
        addToWishlist,
        addToCompare,
        showMessage,
    } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const foundProduct = products.find(
            (item) => String(item.id) === String(id)
        );

        setProduct(foundProduct || null);
        setSelectedImage(0);
        setQuantity(1);
    }, [id, products]);

    const previousImage = () => {
        if (!product?.images?.length) return;

        setSelectedImage((current) => {
            if (current === 0) {
                return product.images.length - 1;
            }

            return current - 1;
        });
    };


    const nextImage = () => {
        if (!product?.images?.length) return;

        setSelectedImage((current) => {
            if (current === product.images.length - 1) {
                return 0;
            }

            return current + 1;
        });
    };

    const decreaseQuantity = () => {
        setQuantity((current) => Math.max(1, current - 1));
    };


    const increaseQuantity = () => {
        if (!product) return;

        setQuantity((current) =>
            Math.min(product.stock, current + 1)
        );
    };

    const handleAddToCart = () => {
        if (product.stock <= 0) {
            showMessage("This product is currently out of stock.", "error");
            return;
        }

        addToCart(product, quantity);
        showMessage(`${quantity} item(s) added to cart.`, "success");
    };

    const handleAddToWishlist = () => {
        if (!product) return;

        addToWishlist(product);
        showMessage(
            `${product.title} added to wishlist.`,
            "success"
        );
    };

    const handleAddToCompare = () => {
        if (!product) return;

        addToCompare(product);
        showMessage(
            `${product.title} added to compare.`,
            "success"
        );
    };

    if (products.length === 0) {
        return (
            <div className="container-fluid py-5 text-center">
                <h4>Loading product...</h4>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container-fluid py-5 text-center">

                <h2 className="mb-3">
                    Product Not Found
                </h2>

                <p className="text-muted mb-4">
                    The product you're looking for doesn't exist
                    or is no longer available.
                </p>

                <Link
                    to="/shop"
                    className="btn btn-info py-2 px-4"
                >
                    Back to Shop
                </Link>

            </div>
        );
    }

    const originalPrice =
        product.discountPercentage > 0
            ? product.price /
              (1 - product.discountPercentage / 100)
            : product.price;


    const totalPrice = product.price * quantity;

    const roundedRating = Math.round(product.rating);

    const isOutOfStock = product.stock <= 0;

    const isLowStock =
        product.stock > 0 && product.stock <= 10;


    return (
        <div className="container-fluid">

            <div className="row px-xl-5">


                <div className="col-lg-6 mb-5">

                    <div className="row">

                        <div className="col-12">

                            <div
                                className="bg-light d-flex align-items-center justify-content-center position-relative"
                                style={{
                                    minHeight: "500px",
                                    overflow: "hidden",
                                }}
                            >

                                <button
                                    type="button"
                                    className="btn btn-light position-absolute start-0 ms-3"
                                    style={{ zIndex: 2 }}
                                    onClick={previousImage}
                                    aria-label="Previous image"
                                >
                                    <i className="fa fa-angle-left fa-2x"></i>
                                </button>

                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.title}
                                    className="img-fluid"
                                    style={{
                                        maxHeight: "470px",
                                        maxWidth: "90%",
                                        objectFit: "contain",
                                    }}
                                />

                                <button
                                    type="button"
                                    className="btn btn-light position-absolute end-0 me-3"
                                    style={{ zIndex: 2 }}
                                    onClick={nextImage}
                                    aria-label="Next image"
                                >
                                    <i className="fa fa-angle-right fa-2x"></i>
                                </button>

                            </div>

                        </div>

                        <div className="col-12 mt-3">

                            <div className="d-flex gap-2 flex-wrap">

                                {product.images.map((image, index) => (

                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() =>
                                            setSelectedImage(index)
                                        }
                                        className={`p-1 bg-light ${
                                            selectedImage === index
                                                ? "border border-info"
                                                : "border"
                                        }`}
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                        }}
                                        aria-label={`View image ${
                                            index + 1
                                        }`}
                                    >

                                        <img
                                            src={image}
                                            alt={`${product.title} ${
                                                index + 1
                                            }`}
                                            className="img-fluid w-100 h-100"
                                            style={{
                                                objectFit: "contain",
                                            }}
                                        />

                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6 mb-5">

                    <div className="h-100">

                        <span className="text-info text-uppercase">
                            {product.category}
                        </span>

                        <h1 className="text-uppercase mt-2 mb-3">
                            {product.title}
                        </h1>

                        <div className="d-flex align-items-center mb-3">

                            <div className="text-info me-2">

                                {Array.from(
                                    { length: 5 },
                                    (_, index) => (
                                        <span key={index}>
                                            {index < roundedRating
                                                ? "★"
                                                : "☆"}
                                        </span>
                                    )
                                )}

                            </div>

                            <span className="text-muted">
                                {product.rating} / 5
                            </span>

                        </div>

                        <div className="d-flex align-items-center mb-3">

                            <h2 className="mb-0">
                                ${product.price.toFixed(2)}
                            </h2>

                            {product.discountPercentage > 0 && (
                                <>
                                    <del className="text-muted ms-3">
                                        ${originalPrice.toFixed(2)}
                                    </del>

                                    <span className="badge bg-info ms-3">
                                        {product.discountPercentage.toFixed(
                                            0
                                        )}
                                        % OFF
                                    </span>
                                </>
                            )}

                        </div>

                        <p className="mb-4">
                            {product.description}
                        </p>

                        <div className="border-top border-bottom py-3 mb-4">

                            <div className="row mb-2">

                                <div className="col-4">
                                    <strong>Brand</strong>
                                </div>

                                <div className="col-8 text-muted">
                                    {product.brand || "N/A"}
                                </div>

                            </div>


                            <div className="row mb-2">

                                <div className="col-4">
                                    <strong>Category</strong>
                                </div>

                                <div className="col-8 text-muted">
                                    {product.category}
                                </div>

                            </div>


                            <div className="row">

                                <div className="col-4">
                                    <strong>Availability</strong>
                                </div>

                                <div className="col-8">

                                    {isOutOfStock ? (
                                        <span className="text-danger">
                                            Out of Stock
                                        </span>
                                    ) : isLowStock ? (
                                        <span className="text-warning">
                                            Only {product.stock} left
                                        </span>
                                    ) : (
                                        <span className="text-success">
                                            In Stock
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                        {!isOutOfStock && (
                            <div className="d-flex align-items-center mb-4">

                                <strong className="me-3">
                                    Quantity:
                                </strong>

                                <div className="input-group quantity">

                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                    >
                                        <i className="fa fa-minus"></i>
                                    </button>

                                    <span
                                        className="form-control text-center"
                                        style={{
                                            maxWidth: "60px",
                                        }}
                                    >
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={increaseQuantity}
                                        disabled={
                                            quantity >= product.stock
                                        }
                                    >
                                        <i className="fa fa-plus"></i>
                                    </button>

                                </div>

                            </div>
                        )}

                        {!isOutOfStock && (
                            <p className="mb-4">

                                <strong>
                                    Total:
                                </strong>{" "}

                                <span className="text-info fw-bold">
                                    ${totalPrice.toFixed(2)}
                                </span>

                            </p>
                        )}

                        <div className="d-flex flex-wrap gap-2 mb-4">

                            <button
                                type="button"
                                className="btn btn-info py-3 px-4"
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                            >
                                <i className="fa fa-shopping-cart me-2"></i>
                                Add To Cart
                            </button>


                            <button
                                type="button"
                                className="btn btn-outline-info py-3 px-4"
                                onClick={handleAddToWishlist}
                            >
                                <i className="fa fa-heart me-2"></i>
                                <span className="text-dark">Wishlist</span>
                            </button>


                            <button
                                type="button"
                                className="btn btn-outline-info py-3 px-4"
                                onClick={handleAddToCompare}
                            >
                                <i className="fa fa-exchange-alt me-2"></i>
                                <span className="text-dark">Compare</span>
                            </button>

                        </div>

                        <button
                            type="button"
                            className="btn btn-link text-info p-0"
                            onClick={() => navigate("/shop")}
                        >
                            <i className="fa fa-arrow-left me-2"></i>
                            <span className="text-dark">Continue Shopping</span>
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;