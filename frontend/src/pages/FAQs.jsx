import React from "react";

function FAQs() {
    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="display-5 text-uppercase">
                        Frequently Asked{" "}
                        <span className="text-info">Questions</span>
                    </h1>

                    <p className="text-muted">
                        Find answers to some commonly asked questions about
                        ReCart.
                    </p>
                </div>

                <div className="accordion" id="faqAccordion">

                    <div className="accordion-item mb-3">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faqOne"
                            >
                                How can I browse products?
                            </button>
                        </h2>

                        <div
                            id="faqOne"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                                You can browse products from the Shop page.
                                You can also use categories, search, sorting,
                                and price filters to find products.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item mb-3">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faqTwo"
                            >
                                Do I need an account to shop?
                            </button>
                        </h2>

                        <div
                            id="faqTwo"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                                You can browse products without an account.
                                Features such as checkout and order history
                                require you to be logged in.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item mb-3">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faqThree"
                            >
                                Can I add products to my wishlist?
                            </button>
                        </h2>

                        <div
                            id="faqThree"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                                Yes. You can use the wishlist option on
                                supported product cards to save products for
                                later.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item mb-3">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faqFour"
                            >
                                Can I compare products?
                            </button>
                        </h2>

                        <div
                            id="faqFour"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                                Yes. Products can be added to the Compare
                                section so you can view their details
                                side-by-side.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item mb-3">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faqFive"
                            >
                                Where can I see my previous orders?
                            </button>
                        </h2>

                        <div
                            id="faqFive"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                                After logging in, you can access your Order
                                History from your account.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FAQs;