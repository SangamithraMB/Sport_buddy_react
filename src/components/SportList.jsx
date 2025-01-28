import { useEffect, useState } from "react";
import { fetchSports } from "../Services/sportService";

function SportList() {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSports = async () => {
      try {
        const sportsData = await fetchSports();
        setSports(sportsData);
      } catch (err) {
        console.error("Error fetching sports:", err);
        setError("Failed to load sports");
      } finally {
        setLoading(false);
      }
    };

    getSports();
  }, []);

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-cover bg-center relative"
         style={{ backgroundImage: "url('/assets/match.avif')" }}>
      
      <div className="absolute inset-0 bg-white opacity-80"></div>

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 relative z-10">
        Available Sports
      </h2>

      {loading ? (
        <p className="text-center text-gray-800 relative z-10">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 relative z-10">{error}</p>
      ) : sports.length === 0 ? (
        <p className="text-center text-gray-700 relative z-10">No sports found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-9 max-w-6xl mx-auto relative z-10">
          {sports.map((sport) => (
            <div
              key={sport.id}
              className="bg-green shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-medium text-gray-800">{sport.sport_name}</h3>
              <p className="text-gray-600 text-sm mt-2">Type: {sport.sport_type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SportList;