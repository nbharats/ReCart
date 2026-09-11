import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CartContext from "../context/CartContext";

function Register() {
    const navigate = useNavigate();
    const { showMessage } = useContext(CartContext)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await axios.post(
                "http://127.0.0.1:5000/api/auth/register",
                formData
            );

            showMessage(
                "Account created successfully! Please sign in.",
                "success"
            );

            navigate("/login");
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Registration failed. Please try again.";

            showMessage(message, "warning");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="bg-light p-30">
                        <h3 className="mb-4">
                            Create Account
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label>Password</label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-info w-100"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Sign Up"}
                            </button>
                        </form>

                        <p className="mt-4 mb-0 text-center">
                            Already have an account?{" "}
                            <Link className="text-info" to="/login">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;