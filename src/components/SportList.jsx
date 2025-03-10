import { useEffect, useState } from "react";
import { fetchSports } from "../Services/sportService";
import LiquidChrome from "./LiquidChrome"; // Import LiquidChrome

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
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      
      {/* LiquidChrome Background */}
      <div className="h-screen w-screen absolute w-full h-full z-0">
        <LiquidChrome baseColor={[0.6, 0.9, 1]} secondaryColor={[1, 0.7, 0.9]} speed={0.2} amplitude={0.7} interactive={false} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 w-full max-w-6xl text-center">
        <h2 className="text-3xl font-semibold text-black-100 mb-6">Available Sports</h2>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : sports.length === 0 ? (
          <p className="text-gray-300">No sports found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-9">
            {sports.map((sport) => (
              <div
                key={sport.id}
                className="bg-opacity-80 bg-blue-300 shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-medium text-white">{sport.sport_name}</h3>
                <p className="text-gray-200 text-sm mt-2">Type: {sport.sport_type}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SportList;