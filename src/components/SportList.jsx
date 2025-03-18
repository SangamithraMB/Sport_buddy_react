import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSports } from "../Services/sportService";

function SportList() {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleSportClick = (sportName) => {
    navigate(`/open-playdates?sport=${encodeURIComponent(sportName)}`);
  };

  return (
    <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-[url('/assets/sport.jpg')] bg-cover bg-center flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-white opacity-80"></div>
      {/* Content */}
      <div className="relative z-10 p-6 w-full max-w-6xl text-center">
        <h2 className="text-3xl font-semibold text-black-100 mb-6">Discover Your Sport</h2>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : sports.length === 0 ? (
          <p className="text-gray-900">No sports found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-9">
            {sports.map((sport) => (
              <div
                key={sport.id}
                className="bg-gray-800/40 shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={() => handleSportClick(sport.sport_name)}
              >
                <h3 className="text-xl font-medium text-gray-900">{sport.sport_name}</h3>
                <p className="text-gray-900 text-sm mt-2">Type: {sport.sport_type}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SportList;