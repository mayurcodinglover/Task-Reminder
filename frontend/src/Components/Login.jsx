import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [login, setlogin] = useState({
        email: "",
        password: "",
    });
    const navigate=useNavigate();
    const API="https://task-reminder-zgih.onrender.com";
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            const res=await axios.post(`${API}/api/auth/login`,{
                email:login.email,
                 password:login.password      
             });
     
             const token=res.data.token;
             localStorage.setItem("token",token);
             console.log("Log in successfull Token stored ",token); 
            navigate('/Task');
        } catch (error) {
            console.error("Log in Failed",error.response?error.response.data:error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setlogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
            {/* Title */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Login</h1>
            </div>

            {/* Login Form */}
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={login.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={login.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};