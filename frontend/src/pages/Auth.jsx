import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/api";

const Auth = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await login(formData);
      localStorage.setItem("token", response.data.access_token);
      if (response.data.user.is_admin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        
        {/* Back to Home Button */}
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigate("/")} 
            className="text-blue-400 hover:text-blue-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
