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
        console.error("Error fetching playdates:", err);
        setError("Failed to load playdates");
      } finally {
        setLoading(false);
      }
    };
    if (user) getPlaydates();
  }, [user]);

  return user ? (
    <div className="p-8 bg-blue-100 min-h-screen bg-[url(/assets/court.avif)] bg-blend-overlay ">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto relative z-10 opacity-70">
          {playdates.map((playdate) => (
            <div
              key={playdate.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 border border-gray-200 flex flex-col justify-between h-full"
            >
              {/* Playdate Details */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {playdate.title}
                </h3>
                <p className="text-gray-600">🏅 {playdate.sport_name}</p>
                <p className="text-gray-600">📍 {playdate.address}</p>
                <p className="text-gray-600">📅 {playdate.date}</p>
              </div>

              {/* View Playdate Button */}
              <button
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105 self-start"
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