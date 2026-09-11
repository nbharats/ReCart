import React from 'react'

function Featured() {
  return (
    <div>
        <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                    className="d-flex align-items-center bg-light mb-4"
                    style={{ padding: "30px" }}
                >
                    <h1 className="fa fa-check text-info m-0 me-3"></h1>
                    <h5 className="fw-semibold m-0">Quality Product</h5>
                </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                    className="d-flex align-items-center bg-light mb-4"
                    style={{ padding: "30px" }}
                >
                    <h1 className="fa fa-shipping-fast text-info m-0 me-2"></h1>
                    <h5 className="fw-semibold m-0">Free Shipping</h5>
                </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                    className="d-flex align-items-center bg-light mb-4"
                    style={{ padding: "30px" }}
                >
                    <h1 className="fas fa-exchange-alt text-info m-0 me-3"></h1>
                    <h5 className="fw-semibold m-0">14-Day Return</h5>
                </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                    className="d-flex align-items-center bg-light mb-4"
                    style={{ padding: "30px" }}
                >
                    <h1 className="fa fa-phone-volume text-info m-0 me-3"></h1>
                    <h5 className="fw-semibold m-0">24/7 Support</h5>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured
