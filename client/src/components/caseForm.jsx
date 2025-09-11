import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API_URL;

function CreateCase() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"))
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${api}/api/case`,
        { title, description,customer:user._id,priority },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/dashboard"); 
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Create New Case
        </h2>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Case Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter case title"
            />
          </div>

        
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              rows="4"
              placeholder="Enter case description"
            ></textarea>
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

        
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
              Submit Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCase;
