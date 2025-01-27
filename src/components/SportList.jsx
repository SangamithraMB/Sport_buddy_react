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
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Available Sports</h2>
      
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : sports.length === 0 ? (
        <p className="text-center text-gray-500">No sports found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sports.map((sport) => (
            <div 
              key={sport.id} 
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
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