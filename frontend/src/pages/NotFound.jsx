import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="bg-light text-center p-5">
                            <h1
                                className="display-1 text-info mb-3"
                                style={{ fontWeight: "700" }}
                            >
                                404
                            </h1>

                            <h2 className="text-uppercase mb-3">
                                Page Not Found
                            </h2>

                            <p className="text-muted mb-4">
                                The page you're looking for doesn't exist or
                                may have been moved.
                            </p>

                            <Link
                                to="/"
                                className="btn btn-info py-2 px-4"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;