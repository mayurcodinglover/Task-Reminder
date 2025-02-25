import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export const Task = () => {
    const [task, settask] = useState({
        title: "",
        time: "",
    });
    const [tasks, settasks] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch tasks from the server
    const fetchtask = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("No token found. Please log in first.");
            navigate("/login"); // Redirect to login if no token
            return;
        }

        try {
            const response = await axios.get("http://localhost:5000/api/tasks/get", {
                headers: {
                    auth: `Bearer ${token}`,
                },
            });
            if (response.data) {
                settasks(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    useEffect(() => {
        fetchtask();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        settask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Add a new task
    const handleAdd = async () => {
        if (task.title && task.time) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("No token found. Please log in first.");
                    navigate("/login"); // Redirect to login if no token
                    return;
                }

                const res = await axios.post(
                    "http://localhost:5000/api/tasks/add",
                    {
                        title: task.title,
                        time: task.time,
                    },
                    {
                        headers: {
                            auth: `Bearer ${token}`,
                        },
                    }
                );

                settask({ title: "", time: "" }); // Reset input fields
                if (res.data) {
                    alert(res.data.message);
                    fetchtask(); // Refresh the task list
                }
            } catch (error) {
                console.error("Failed to add task:", error.response ? error.response.data : error.message);
            }
        } else {
            alert("Please fill both title and time.");
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from localStorage
        navigate("/login"); // Redirect to the login page
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Title and Logout Button */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Task Lists</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>

            {/* Add Task Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Enter Task"
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="time"
                        name="time"
                        id="time"
                        value={task.time}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add Task
                    </button>
                </div>
            </div>

            {/* Task Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 text-left">User ID</th>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((t, i) => (
                            <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                                <td className="p-3">{t.userId}</td>
                                <td className="p-3">{t.title}</td>
                                <td className="p-3">{t.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};