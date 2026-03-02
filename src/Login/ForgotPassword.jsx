import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, UserCog, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    // simple email validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter valid email");
      return;
    }

    setError("");
    setIsLoading(true);

    // fake send
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg("Reset link sent to your email");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
            <UserCog className="w-6 h-6 text-gray-700" />
          </div>
          <h3 className="text-gray-600 font-bold text-xl">
            Keelean Admin
          </h3>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Forgot Password?
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your registered email to receive a reset link
        </p>

        <form onSubmit={submit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-700 block mb-2">
              Email
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-gray-300">
              <div className="px-3">
                <Mail size={16} className="text-gray-400" />
              </div>
              <input
                type="email"
                className="w-full px-3 py-2 text-gray-700 placeholder-gray-400 bg-white focus:outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          {/* Success */}
          {successMsg && (
            <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
              <CheckCircle2 size={16} />
              {successMsg}
            </div>
          )}

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-gray-600 text-white font-medium disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 018-8v8z"
                  fill="currentColor"
                  className="opacity-75"
                />
              </svg>
            ) : (
              "Send Reset Link"
            )}
          </motion.button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          <button
            onClick={() => navigate("/login")}
            className="hover:underline text-gray-700"
          >
            Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}