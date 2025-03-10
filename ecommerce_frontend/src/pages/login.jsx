import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Joi from "joi";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Enter a valid email",
      }),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,30}$"))
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base": "Password must have at least one letter and one number",
      }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = loginSchema.validate(formData, { abortEarly: false });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: error.details.map((err) => err.message).join("\n"),
      });
      return;
    }

    try {
      const { data } = await axios.post("https://first-server123.up.railway.app/api/auth/login", formData, {
        withCredentials: true, 
      });

      Cookies.set("jwt", data.token, { expires: 7 });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now logged in!",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-[#434377] mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* 🔹 Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* 🔹 Login Button */}
          <button type="submit" className="w-full bg-[#434377] text-white py-2 rounded-md">
            Login
          </button>
        </form>

        {/* 🔹 Signup Link */}
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
