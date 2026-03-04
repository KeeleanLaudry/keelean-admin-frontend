// src/Login/AdminLogin.jsx
import React, { useState } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  LogIn,
} from "lucide-react";
import { FaWindows } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../Api/authapi";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();
const [adminLogin, { isLoading: apiLoading }] = useAdminLoginMutation();
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});

  if (!validateForm()) return;

  try {
    const res = await adminLogin(formData).unwrap();

    // ✅ store token
    localStorage.setItem("token", res.access);

    setLoginSuccess(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    setErrors({
      general: "Invalid email or password"
    });
  }
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-700 uppercase">
              Admin
            </h2>
          </div>

          {/* Success */}
          {loginSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-green-700 font-medium text-sm">
                  Login successful! Redirecting...
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    errors.email
                      ? "text-red-500"
                      : formData.email
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@gmail.com"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 ${
                    errors.email
                      ? "border-red-300"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3 h-3 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 mr-1" />
                      Show
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    errors.password
                      ? "text-red-500"
                      : formData.password
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 ${
                    errors.password
                      ? "border-red-300"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between mb-8">
              <label className="flex items-center text-sm text-gray-700">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
            disabled={apiLoading}
              className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 ${
                apiLoading
                  ? "bg-gray-400 text-white"
                  : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white"
              }`}
            >
              {apiLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Social */}
          <div className="my-8 relative">
            <div className="border-t"></div>
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-sm text-gray-500">
              or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-gray-700"
            >
              <SiGoogle size={18} />
              Google
            </button>

            <button
              type="button"
              className="p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-gray-700"
            >
              <FaWindows size={18} />
              Microsoft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;