import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, UserCog, CheckCircle2 } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setIsLoading(true);

    // fake processing
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg("Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <UserCog className="w-6 h-6 text-gray-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-700">
            Keelean Admin
          </h3>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Create New Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="text-sm text-gray-700 block mb-2">
              New Password
            </label>
            <div className="flex items-center border rounded-lg px-3">
              <Lock size={16} className="text-gray-400" />
              <input
                type="password"
                className="w-full px-3 py-2 outline-none"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-700 block mb-2">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg px-3">
              <Lock size={16} className="text-gray-400" />
              <input
                type="password"
                className="w-full px-3 py-2 outline-none"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-gray-700 text-white rounded-lg font-medium disabled:opacity-60"
          >
            {isLoading ? "Saving..." : "Set Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}