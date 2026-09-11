import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CartContext from "../context/CartContext";

function Contact() {
    const { showMessage } = useContext(CartContext)
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.subject.trim() ||
            !formData.message.trim()
        ) {
            showMessage("Please fill in all fields.", "error");
            return;
        }

        showMessage("Your message has been sent successfully!", "success");

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <div className="container-fluid">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                <span className="bg-secondary pe-3">Contact Us</span>
            </h2>

            <div className="row px-xl-5">

                <div className="col-lg-7 mb-5">
                    <div className="bg-light p-30">
                        <h4 className="text-uppercase mb-4">
                            Get In Touch
                        </h4>

                        <p className="mb-4">
                            Have a question, feedback, or need help with your
                            order? Send us a message and we'll be happy to
                            help.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="control-group mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="control-group mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="control-group mb-3">
                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="control-group mb-3">
                                <textarea
                                    name="message"
                                    className="form-control"
                                    rows="8"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    className="btn btn-info py-2 px-4"
                                    type="submit"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-lg-5 mb-5">
                    <div className="bg-light p-30 h-100">
                        <h4 className="text-uppercase mb-4">
                            Contact Information
                        </h4>

                        <p className="mb-4">
                            We're here to help with your shopping experience.
                            You can reach out to us through the contact form
                            or explore the help section for common questions.
                        </p>

                        <div className="mb-4">
                            <h6 className="text-uppercase mb-2">
                                <i className="fa fa-question-circle text-info me-3"></i>
                                Need Help?
                            </h6>

                            <p className="mb-0">
                                Visit our Help or FAQs page for quick answers
                                to common questions.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h6 className="text-uppercase mb-2">
                                <i className="fa fa-shopping-cart text-info me-3"></i>
                                Shopping Support
                            </h6>

                            <p className="mb-0">
                                Need assistance with products, your cart, or
                                an order? Send us a message using the form.
                            </p>
                        </div>

                        <div>
                            <h6 className="text-uppercase mb-2">
                                <i className="fa fa-envelope text-info me-3"></i>
                                Message Us
                            </h6>

                            <p className="mb-0">
                                Fill out the form and submit your message.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
