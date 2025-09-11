import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API_URL;

function CasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

 
  useEffect(() => {
    if (!token || role === "customer") {
      navigate("/login");
    }
  }, [token, role, navigate]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(`${api}/api/case`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCases(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch cases");
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [token]);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${api}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  if (role === "admin") {
    fetchUsers();
  }
}, [token, role]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue-700 text-xl">Loading cases...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        All Cases
      </h2>

      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded mb-4 text-center">
          {error}
        </p>
      )}

      {cases.length === 0 ? (
        <p className="text-center text-gray-600">No cases found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {c.title}
              </h3>
              <p className="text-gray-700 mb-2">{c.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                Priority: <span className="font-medium">{c.priority}</span>
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Status: <span className="font-medium">{c.status || "Open"}</span>
              </p>
              <p className="text-sm text-gray-500">
                Customer ID: <span className="font-medium">{c.customer}</span>
              </p>
                
                
    {role === "admin" && (
      <div className="mt-3">
        <select
          defaultValue=""
          onChange={(e) => handleAssignUser(c._id, e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="" disabled>
            Assign user
          </option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
      </div>
    )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CasesPage;
