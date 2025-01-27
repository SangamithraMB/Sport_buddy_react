import { useEffect, useState } from "react";
import { fetchPlaydates } from "../Services/playdateService";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PlaydateList() {
  const { user } = useAuth();
  const [playdates, setPlaydates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlaydates = async () => {
      try {
        const playdatesData = await fetchPlaydates();
        setPlaydates(playdatesData);
      } catch (err) {
        console.error("Error fetching sports:", err);
        setError("Failed to load playdates");
      } finally {
        setLoading(false);
      }
    };
    if(user)
    getPlaydates();
  }, [user]);

  return user ? (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🏆 Open Playdates
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : playdates.length === 0 ? (
        <p className="text-center text-gray-600">No playdates available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playdates.map((playdate) => (
            <div
              key={playdate.id}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {playdate.title}
              </h3>
              <p className="text-gray-600 mt-1">🏅 {playdate.sport_name}</p>
              <p className="text-gray-600 mt-1">📍 {playdate.address}</p>
              <p className="text-gray-600 mt-1">📅 {playdate.date}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={() => navigate(`/open-playdates/${playdate.id}`)}
              >
                View Playdate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default PlaydateList;
