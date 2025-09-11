import { useEffect, useState } from "react";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

function CustomerDashboard() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(`${api}/api/case/getmycase/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCases(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [token,user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Customer Dashboard
      </h1>

    
      {loading ? (
        <p className="text-center text-gray-500">Loading cases...</p>
      ) : cases.length === 0 ? (
        <p className="text-center text-gray-500">No cases found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div
              key={c._id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {c.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{c.description}</p>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  c.status === "open"
                    ? "bg-green-200 text-green-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      )}

    
      <div className="mt-8 flex justify-center">
        <a
          href="/caseform"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Create New Case
        </a>
      </div>
    </div>
  );
}

export default CustomerDashboard;
