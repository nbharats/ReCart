import React, { useContext } from 'react'
import CartContext from '../context/CartContext';

function Compare() {
    const { compare, addToCart, removeFromCompare } = useContext(CartContext);

    const compareFields = [
        {
            key: "thumbnail",
            label: "Image",
            render: (value, product) => (
                <img
                    src={value}
                    alt={product.title}
                    style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain"
                    }}
                />
            )
        },
        {
            key: "title",
            label: "Product"
        },
        {
            key: "price",
            label: "Price",
            render: (value) => `$${value.toFixed(2)}`
        },
        {
            key: "rating",
            label: "Rating",
            render: (value) => <><i className="fa-solid fa-star text-info" ></i> {value}</>
        },
        {
            key: "brand",
            label: "Brand"
        },
        {
            key: "category",
            label: "Category"
        },
        {
            key: "stock",
            label: "Stock"
        },
        {
            key: "discountPercentage",
            label: "Discount",
            render: (value) => `${value}%`
        },
        {
            key: "description",
            label: "Description"
        },
        {
            key: "availabilityStatus",
            label: "Availability"
        },
        {
            key: "shippingInformation",
            label: "Shipping"
        },
        {
            key: "returnPolicy",
            label: "Return Policy"
        },
        {
            key: "warrantyInformation",
            label: "Warranty"
        },
        {
            key: "minimumOrderQuantity",
            label: "Min. Order"
        }
    ];

    return (
        <div>
            <div className="container-fluid mt-5">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <h2 className="mb-4">Compare Products</h2>

                        { compare.length === 0 
                        ? (
                            <h5>No products selected.</h5>
                        ) 
                        : (
                            <div className="table-responsive">
                                <table className="table  align-middle mx-auto" 
                                style={{
                                    maxWidth: `${180 + compare.length * 500}px`,
                                }}>
                                    <thead>
                                        <tr>
                                            <th className="text-start" style={{ minWidth: "180px" }}>
                                            Product Details
                                            </th>

                                            {compare.map((product) => (
                                            <th
                                                key={product.id}
                                                className="text-center"
                                                style={{ minWidth: "250px" }}
                                            >
                                                {product.title}
                                            </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {compareFields.map(({ key, label, render }) => (
                                            <tr key={key}>

                                                <th className="text-start fw-medium py-3">
                                                    {label}
                                                </th>

                                                {compare.map((product) => {
                                                    const value = product[key];

                                                    return (
                                                        <td
                                                            key={product.id}
                                                            className="text-center py-3"
                                                        >
                                                            {value !== undefined && value !== null
                                                                ? render
                                                                    ? render(value, product)
                                                                    : value
                                                                : "N/A"}
                                                        </td>
                                                    );
                                                })}

                                            </tr>
                                        ))}

                                        <tr>
                                            <th className="text-start py-3">
                                                Actions
                                            </th>

                                            {compare.map((product) => (
                                                <td
                                                    key={product.id}
                                                    className="text-center py-3"
                                                >
                                                    <div className="d-flex justify-content-center gap-2">

                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() =>
                                                                removeFromCompare(product.id)
                                                            }
                                                        >
                                                            Remove
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-info btn-sm"
                                                            onClick={() =>
                                                                addToCart(product)
                                                            }
                                                        >
                                                            Add to Cart
                                                        </button>

                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                            
                        )}
                    </div>
                </div>
            </div>
        </div>        
    );
}

export default Compare

