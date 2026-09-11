import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import CartContext from "../context/CartContext";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const { showMessage } = useContext(CartContext)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
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

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/auth/login",
                formData
            );

            const data = response.data;

            login(data.access_token, data.user);

            showMessage("Login successful! Welcome back.", "success");

            const from = location.state?.from?.pathname || "/";

            navigate(from, {
                replace: true,
            });
        } catch (error) {

            const message =
                error.response?.data?.message ||
                "Login failed. Please check your email and password.";

            setError(message);

            showMessage(message, "warning");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7">
                        <div className="bg-light p-5">
                            <h2 className="text-center mb-4">
                                Login
                            </h2>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

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
                                        ? "Logging in..."
                                        : "Login"}
                                </button>
                            </form>

                            <p className="text-center mt-4 mb-0">
                                Don't have an account?{" "}
                                <Link className="text-info" to="/register">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;