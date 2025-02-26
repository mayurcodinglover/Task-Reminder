import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link

const Register = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const API="https://task-reminder-zgih.onrender.com";
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    try {
      const res = await axios.post(`${API}/api/auth/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser((prevuser) => {
      return { ...prevuser, [name]: value };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Register</h1>
        <p className="text-gray-600 mt-2">Create your account to get started.</p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="name"
              id="name"
              value={user.name}
              placeholder="Enter your name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={user.email}
              type="email"
              onChange={handleChange}
              name="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={user.password}
              type="password"
              onChange={handleChange}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          </div>

          {/* Log In Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;