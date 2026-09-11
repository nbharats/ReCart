import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from 'react-router-dom';

function Categories({ categories }) {

  return (
    <div>
        <div className="container-fluid pt-5">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                <span className="bg-secondary text-info pe-3">Categories</span>
            </h2>

            <div className="row px-xl-5 pb-3">

                {categories.length>0
                ?
                categories.map((category) => (

                    <div
                        className="col-lg-3 col-md-4 col-sm-6 pb-1"
                        key={category.name}
                    >

                        <Link
                            className="text-decoration-none"
                            to={`/shop?category=${category.name}`}
                        >

                            <div className="cat-item img-zoom d-flex align-items-center mb-4">

                                <div
                                    className="overflow-hidden"
                                    style={{
                                        width: "100px",
                                        height: "100px"
                                    }}
                                >

                                    <img
                                        className="img-fluid"
                                        src={category.image}
                                        alt={category.name}
                                    />

                                </div>

                                <div className="flex-fill ps-3">

                                    <h6 className='text-primary'>{category.name.toUpperCase()}</h6>

                                    <small className="text-body">
                                        {category.count} Products
                                    </small>
                                </div>


                            </div>

                        </Link>

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

            </div>

        </div>
    </div>
  )
}

export default Categories
