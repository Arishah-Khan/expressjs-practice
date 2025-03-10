import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Joi from "joi";

const Signup = () => {
  const navigate = useNavigate();

  // 🔹 State for Form Fields
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    address: "",
    country: "",
    city: "",
  });

  const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.empty": "Username is required",
      "string.alphanum": "Username must contain only letters and numbers",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username must be less than 30 characters",
    }),
    
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Enter a valid email address",
      }),
      password: Joi.string()
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,30}$")) 
      .required()
      .messages({
        "string.pattern.base": "Password must be 6-30 characters long and include at least one letter and one number.",
        "string.empty": "Password is required",
      }),
    
    address: Joi.string().min(5).max(100).required().messages({
      "string.empty": "Address is required",
      "string.min": "Address must be at least 5 characters long",
      "string.max": "Address must be less than 100 characters",
    }),
    country: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Country is required",
      "string.min": "Country name must be at least 2 characters long",
      "string.max": "Country name must be less than 50 characters",
    }),
    city: Joi.string().min(2).max(50).required().messages({
      "string.empty": "City is required",
      "string.min": "City name must be at least 2 characters long",
      "string.max": "City name must be less than 50 characters",
    }),
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Signup Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = signupSchema.validate(formData, { abortEarly: false });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: error.details.map((err) => `<p>${err.message}</p>`).join(""), 
      });
      return;
    }

    try {
      await axios.post("https://first-server123.up.railway.app/api/auth/signup", formData);

      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "Your account has been created! Please login.",
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="flex items-center justify-center p-10 min-h-screen bg-gray-100 ">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-[#434377] mb-4">Signup</h2>

        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          ))}

          <button type="submit" className="w-full bg-[#434377] text-white py-2 rounded-md">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
