import React, { useContext, useState } from 'react'
import CartContext from '../context/CartContext';
import { Link, useSearchParams } from 'react-router-dom';

function Shop() {

    const { products, addToCart, addToWishlist,addToCompare } = useContext(CartContext);

    const [currentPage, setCurrentPage] = useState(1);

    const [productsPerPage, setProductsPerPage] = useState(12);

    const [sortBy, setSortBy] = useState("latest");

    const [priceRange, setPriceRange] = useState("all");

    const [viewMode, setViewMode] = useState("grid");

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory  = searchParams.get('category')

    const searchTerm = searchParams.get("search") || "";

    const filteredProducts = products.filter((product) => {

        if (
            searchTerm &&
            !product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !product.category.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return false;
        }

        if (
            selectedCategory &&
            product.category !== selectedCategory
        ) {
            return false;
        }

        if (priceRange === "all") {
            return true;
        }

        if (priceRange === "0-100") {
            return product.price >= 0 && product.price < 100;
        }

        if (priceRange === "100-200") {
            return product.price >= 100 && product.price < 200;
        }

        if (priceRange === "200-300") {
            return product.price >= 200 && product.price < 300;
        }

        if (priceRange === "300-400") {
            return product.price >= 300 && product.price < 400;
        }

        if (priceRange === "400-500") {
            return product.price >= 400 && product.price <= 500;
        }
        
        if (priceRange === "500-1000") {
            return product.price >= 500 && product.price <= 1000;
        }
        
        if (priceRange === "1000+") {
            return product.price >= 1000 ;
        }

        return true;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {

        if (sortBy === "latest") {
            return b.id - a.id;
        }

        if (sortBy === "popularity") {
            return (b.reviews?.length || 0) -
                   (a.reviews?.length || 0);
        }

        if (sortBy === "rating") {
            return b.rating - a.rating;
        }

        return 0;
    });

    const categories = [
        ...new Set(
            products.map((product) => product.category)
        )
    ];

    const categoryProducts = selectedCategory
        ? products.filter(
            (product) =>
                product.category === selectedCategory
        )
        : products;

    const totalPages = Math.ceil(
        sortedProducts.length / productsPerPage
    );

    const lastIndex = currentPage * productsPerPage;

    const firstIndex = lastIndex - productsPerPage;

    const currentProducts = sortedProducts.slice(
        firstIndex,
        lastIndex
    );

  return (
    <div>
        <div className="container-fluid">
            <div className="row px-xl-5">

                <div className="col-lg-3 col-md-4">

            
                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pe-3">Filter by price</span>
                    </h5>

                    <div className="bg-light p-4 mb-30">
                        <form>
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="price-all"
                                    checked={priceRange === "all"}
                                    onChange={() => {
                                        setPriceRange("all");
                                        setCurrentPage(1);
                                    }}
                                />

                                <label className="form-check-label" htmlFor="price-all">
                                    All Price
                                </label>

                                {(priceRange === 'all')
                                ?
                                    <span 
                                        className={`badge border font-weight-normal text-info`}
                                    >
                                        {categoryProducts.length}
                                    </span>
                                : ''
                                }
                            </div>

                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="price-1"
                                    checked={priceRange === "0-100"}
                                    onChange={() => {
                                        setPriceRange("0-100");
                                        setCurrentPage(1);
                                    }}
                                />

                                <label className="form-check-label" htmlFor="price-1">
                                    $0 - $100
                                </label>

                                {(priceRange === '0-100')
                                ?
                                    <span 
                                        className={`badge border font-weight-normal text-info`}
                                    >
                                        {categoryProducts.filter(
                                            (product) =>
                                                product.price >= 0 &&
                                                product.price <= 100
                                        ).length}
                                    </span>
                                : ''
                                }
                            </div>

                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="price-2"
                                    checked={priceRange === "100-200"}
                                    onChange={() => {
                                        setPriceRange("100-200");
                                        setCurrentPage(1);
                                    }}
                                />

                                <label className="form-check-label" htmlFor="price-2">
                                    $100 - $200
                                </label>

                                {(priceRange === '100-200')
                                ?
                                    <span 
                                        className={`badge border font-weight-normal text-info`}
                                    >
                                        {categoryProducts.filter(
                                            (product) =>
                                                product.price >= 100 &&
                                                product.price <= 200
                                        ).length}
                                    </span>
                                : ''
                                }
                            </div>

                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="price-3"
                                    checked={priceRange === "200-300"}
                                    onChange={() => {
                                        setPriceRange("200-300");
                                        setCurrentPage(1);
                                    }}
                                />

                                <label className="form-check-label" htmlFor="price-3">
                                    $200 - $300
                                </label>

                                {(priceRange === '200-300')
                                ?
                                    <span 
                                        className={`badge border font-weight-normal text-info`}
                                    >
                                        {categoryProducts.filter(
                                            (product) =>
                                                product.price >= 200 &&
                                                product.price <= 300
                                        ).length}
                                    </span>
                                : ''
                                }
                            </div>

                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="price-4"
                                    checked={priceRange === "300-400"}
                                    onChange={() => {
                                        setPriceRange("300-400");
                                        setCurrentPage(1);
                                    }}
                                />

                                <label className="form-check-label" htmlFor="price-4">
                                    $300 - $400
                                </label>

                                {(priceRange === '300-400')
                                ?
                                    <span 
                                        className={`badge border font-weight-normal text-info`}
                                    >
                                        {categoryProducts.filter(
                                            (product) =>
                                                product.price >= 300 &&
                                                product.price <= 400
                                        ).length}
                                    </span>
                                : ''
                                }
                            </div>
                        
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="price-4"
                                    checked={priceRange === "400-500"}
                                    onChange={() => {
                                        setPriceRange("400-500");
                                        setCurrentPage(1);
                                    }}
                                />

                                <label className="form-check-label" htmlFor="price-4">
                                    $400 - $500
                                </label>

                                {(priceRange === '400-500')
                                ?
                                    <span 
                                        className={`badge border font-weight-normal text-info`}
                                    >
                                        {categoryProducts.filter(
                                            (product) =>
                                                product.price >= 400 &&
                                                product.price <= 500
                                        ).length}
                                    </span>
                                : ''
                                }
                            </div>
                        
                            <div className="form-check d-flex align-items-center justify-content-between mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="price-4"
                                    checked={priceRange === "500-1000"}
                                    onChange={() => {
                                        setPriceRange("500-1000");
                                        setCurrentPage(1);
                                    }}
                                />

                                <label className="form-check-label" htmlFor="price-4">
                                    $500 - $1000
                                </label>

                                {(priceRange === '500-1000')
                                ?
                                    <span 
                                        className={`badge border font-weight-normal text-info`}
                                    >
                                        {categoryProducts.filter(
                                            (product) =>
                                                product.price >= 500 &&
                                                product.price <= 1000
                                        ).length}
                                    </span>
                                : ''
                                }
                            </div>
                        
                            <div className="form-check d-flex align-items-center justify-content-between">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="price-5"
                                    checked={priceRange === "1000+"}
                                    onChange={() => {
                                        setPriceRange("1000+");
                                        setCurrentPage(1);
                                    }}
                                />

                                <label className="form-check-label" htmlFor="price-5">
                                    $1000 and Above
                                </label>

                                {(priceRange === '1000+')
                                ?
                                    <span 
                                        className={`badge border font-weight-normal text-info`}
                                    >
                                        {categoryProducts.filter(
                                            (product) =>
                                                product.price >= 1000
                                        ).length}
                                    </span>
                                : ''
                                }
                            </div>

                        </form>
                    </div>
                

                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pe-3">
                            Filter by category
                        </span>
                    </h5>

                    <div className="bg-light p-4 mb-30">

                        <form>

                            <div className="form-check d-flex align-items-center justify-content-between mb-3">

                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="category-all"
                                    checked={!selectedCategory}
                                    onChange={() => {
                                        setSearchParams({});
                                        setPriceRange("all");
                                        setCurrentPage(1);
                                    }}
                                />

                                <label
                                    className="form-check-label"
                                    htmlFor="category-all"
                                >
                                    All Category
                                </label>

                                {!selectedCategory 
                                ?
                                <span className="badge border font-weight-normal text-info">
                                    {products.length}
                                </span>
                                :''
                                }

                            </div>


                            {categories.length>0
                            ?
                            categories.map((category) => {

                                const categoryCount = products.filter(
                                    (product) => product.category === category
                                ).length;

                                return (

                                    <div
                                        className="form-check d-flex align-items-center justify-content-between mb-3"
                                        key={category}
                                    >

                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`category-${category}`}
                                            checked={selectedCategory === category}
                                            onChange={() => {

                                                setSearchParams({
                                                    category: category
                                                });

                                                setPriceRange("all");
                                                setCurrentPage(1);

                                            }}
                                        />

                                        <label
                                            className="form-check-label"
                                            htmlFor={`category-${category}`}
                                        >
                                            {category}
                                        </label>

                                        {selectedCategory === category
                                        ?
                                        <span className="badge border font-weight-normal text-info">
                                            {categoryCount}
                                        </span>
                                        : ''}

                                    </div>

                                );

                            })
                            :
                            <div className="row px-xl-5 pb-3">
                                <h1 className='text-center text-warning'>
                                    Technical Problem.
                                </h1>
                                <span className='text-center text-secondary'>Please contact us for support</span>
                            </div>
                            }

                        </form>

                    </div>

                </div>

                <div className="col-lg-9 col-md-8">
                    <div className="row pb-3">

                        <div className="col-12 pb-1">
                            <div className="d-flex align-items-center justify-content-between mb-4">

                                <div>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${
                                            viewMode === "grid"
                                                ? "btn-info"
                                                : "btn-light"
                                        }`}
                                        onClick={() => setViewMode("grid")}
                                        aria-label="Grid view"
                                    >
                                        <i className="fa fa-th-large"></i>
                                    </button>

                                    <button
                                        type="button"
                                        className={`btn btn-sm ms-2 ${
                                            viewMode === "list"
                                                ? "btn-info"
                                                : "btn-light"
                                        }`}
                                        onClick={() => setViewMode("list")}
                                        aria-label="List view"
                                    >
                                        <i className="fa fa-bars"></i>
                                    </button>
                                </div>

                                <div className="ms-2">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-light dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Sorting
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">

                                            <li>
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setSortBy("latest");
                                                        setCurrentPage(1);
                                                    }}
                                                >
                                                    Latest
                                                </button>
                                            </li>

                                            <li>
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setSortBy("popularity");
                                                        setCurrentPage(1);
                                                    }}
                                                >
                                                    Popularity
                                                </button>
                                            </li>

                                            <li>
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setSortBy("rating");
                                                        setCurrentPage(1);
                                                    }}
                                                >
                                                    Best Rating
                                                </button>
                                            </li>

                                        </ul>
                                    </div>

                                    <div className="btn-group ms-2">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-light dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Showing
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">
                                            
                                            <li>
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setProductsPerPage(10);
                                                        setCurrentPage(1);
                                                    }}
                                                >
                                                    12
                                                </button>
                                            </li>

                                            <li>
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setProductsPerPage(20);
                                                        setCurrentPage(1);
                                                    }}
                                                >
                                                    21
                                                </button>
                                            </li>

                                            <li>
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setProductsPerPage(30);
                                                        setCurrentPage(1);
                                                    }}
                                                >
                                                    30
                                                </button>
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                        {currentProducts.length > 0 ? (
                            currentProducts.map((item) => {
                            return (
                                <div
                                    className={
                                        viewMode === "grid"
                                            ? "col-lg-4 col-md-4 col-sm-6 pb-1"
                                            : "col-12 pb-1"
                                    }
                                    key={item.id}
                                >
                                    <div
                                        className={
                                            viewMode === "grid"
                                                ? "product-item bg-light mb-4"
                                                : "product-item bg-light mb-4 d-flex align-items-center"
                                        }
                                    >
                                        
                                        <div
                                            className="product-img position-relative overflow-hidden"
                                            style={
                                                viewMode === "list"
                                                    ? {
                                                        width: "250px",
                                                        height: "250px",
                                                        flexShrink: 0
                                                    }
                                                    : undefined
                                            }
                                        >
                                            <img
                                                className={
                                                    viewMode === "list"
                                                        ? "img-fluid w-100 h-100"
                                                        : "img-fluid w-100"
                                                }
                                                src={item.images[0]}
                                                alt={item.title}
                                            />

                                            
                                            {viewMode === "grid" && (
                                                <div className="product-action">
                                                    <a
                                                        className="btn btn-outline-dark btn-square"
                                                        onClick={() => {
                                                            addToCart(item);
                                                        }}
                                                    >
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>
                                                    <a
                                                        className="btn btn-outline-dark btn-square"
                                                        onClick={() => {
                                                            addToWishlist(item);
                                                        }}
                                                    >
                                                        <i className="far fa-heart"></i>
                                                    </a>
                                                    <a
                                                        className="btn btn-outline-dark btn-square"
                                                        onClick={() => {
                                                            addToCompare(item);
                                                        }}
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
                                            )}
                                        </div>

                                        <div
                                            className={
                                                viewMode === "grid"
                                                    ? "text-center py-4"
                                                    : "text-start p-4 flex-grow-1"
                                            }
                                        >
                                            <h6
                                                className="h6 text-decoration-none text-truncate"

                                            >
                                                {item.title}
                                            </h6>

                                            <div
                                                className={
                                                    viewMode === "grid"
                                                        ? "d-flex align-items-center justify-content-center mt-2"
                                                        : "d-flex align-items-center mt-2"
                                                }
                                            >
                                                <h5>${item.price}</h5>
                                            </div>

                                            <div
                                                className={
                                                    viewMode === "grid"
                                                        ? "d-flex align-items-center justify-content-center mb-1"
                                                        : "d-flex align-items-center mb-1"
                                                }
                                            >
                                                {Array.from(
                                                    { length: 5 },
                                                    (_, index) => (
                                                        <small
                                                            key={index}
                                                            className={`fa ${
                                                                index < Math.round(item.rating)
                                                                    ? "fa-star"
                                                                    : "fa-star-o"
                                                            } text-info me-1`}
                                                        ></small>
                                                    )
                                                )}

                                                <small>({item.rating})</small>
                                            </div>
                                        </div>

                                        {viewMode === "list" && (
                                            <div className="d-flex flex-row mr-5 p-2">
                                                <a
                                                    className="btn btn-outline-dark btn-square mb-2 mr-3"
                                                    onClick={() => {
                                                        addToCart(item);
                                                    }}
                                                >
                                                    <i className="fa fa-shopping-cart"></i>
                                                </a>

                                                <a
                                                    className="btn btn-outline-dark btn-square mb-2 mr-3"
                                                    onClick={() => {
                                                        addToWishlist(item);
                                                    }}
                                                >
                                                    <i className="far fa-heart"></i>
                                                </a>

                                                <a
                                                    className="btn btn-outline-dark btn-square mb-2 mr-3"
                                                    onClick={() => {
                                                        addToCompare(item);
                                                    }}
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
                                        )}

                                    </div>
                                </div>
                            );
                        })
                        ) : (
                            <div className="col-12">
                                <div className="bg-light p-5 text-center">
                                    <i className="fa fa-search fa-3x text-info mb-4"></i>

                                    <h3 className="mb-3">
                                        No Products Found
                                    </h3>

                                    <p className="text-muted mb-4">
                                        We couldn't find any products matching
                                        your selected filters.
                                    </p>

                                    <button
                                        type="button"
                                        className="btn btn-info px-4"
                                        onClick={() => {
                                            setPriceRange("all");
                                            setSearchParams({});
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                </div>

                <div className="col-12">
                    <nav aria-label="Product pagination">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage===1?'disabled':''}`}>
                                <button
                                    className='page-link'
                                    onClick={()=>{setCurrentPage(currentPage-1)}}
                                    disabled={currentPage===1}
                                >
                                    Previous
                                </button>
                            </li>

                            {Array.from({ length : totalPages}, (_, index) =>(
                                <li
                                    key={index + 1}
                                    className={`page-item ${ currentPage === index +1 ? 'active' : ''}`}
                                >
                                    <button className='page-link' onClick={()=>{setCurrentPage(index+1)}}>{index + 1}</button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage===totalPages?'disabled':''}`}>
                                <button
                                    className='page-link'
                                    onClick={()=>{setCurrentPage(currentPage+1)}}
                                    disabled={currentPage===totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>


            </div>
        </div>

    </div>
  )
}

export default Shop
