import { useEffect, useState } from "react";
import { fetchPlaydates } from "../Services/playdateService";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PlaydateList() {
  const { user } = useAuth();
  const [playdates, setPlaydates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedSport = searchParams.get("sport") || "";

  useEffect(() => {
    const getPlaydates = async () => {
      try {
        const playdatesData = await fetchPlaydates();
        setPlaydates(() => {
          return selectedSport
          ? playdatesData.filter((pd) => {

console.log("pd.sportId", pd, selectedSport);
            return pd.sport_name.toLowerCase() === selectedSport.toLowerCase() })
          : playdatesData;
        });

      } catch (err) {
        console.error("Error fetching playdates:", err);
        setError("Failed to load playdates");
      } finally {
        setLoading(false);
      }
    };
    if (user) getPlaydates();
  }, [user]);

  // Filter playdates based on selected sport


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return user ? (
    <div className="h-screen w-screen absolute inset-0 z-0 bg-blue-100 pt-20">
      {/* Background Image with Overlay */}
      <div className="h-full w-full absolute inset-0 z-0 bg-[url('/assets/playdateid.jpg')] bg-overlay bg-cover bg-center">
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-black drop-shadow-lg mb-10">
        Play. Connect. Repeat.
        </h2>

        {loading ? (
          <p className="text-center text-white text-lg animate-pulse">
            Loading...
          </p>
        ) : error ? (
          <p className="text-center text-red-400 text-lg font-semibold">
            {error}
          </p>
        ) : playdates.length === 0 ? (
          <p className="text-center text-black text-lg">No playdates available.</p>
        ) : (
          <Slider {...settings}>
            {playdates.map((playdate) => (
              <div
                key={playdate.id}
                className=" bg-gray-800/40 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300 border border-gray-200 flex flex-col justify-between h-full transform hover:scale-[1.02] mx-2"
              >
                {/* Playdate Details */}
                <div className="w-96 h-64 p-6">
                  <h3 className="text-2xl font-semibold text-black mb-2">
                    {playdate.title}
                  </h3>
                  <p className="text-gray-900 flex items-center gap-2">
                    🏅 <span>{playdate.sport_name}</span>
                  </p>
                  <p className="text-gray-900 flex items-center gap-2">
                    📍 <span>{playdate.address}</span>
                  </p>
                  <p className="text-gray-900 flex items-center gap-2">
                    📅 <span>{playdate.date}</span>
                  </p>
                </div>

                {/* View Playdate Button */}
                <button
                  className="mt-4 px-5 py-3 bg-gradient-to-r from-gray-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-gray-900 transition transform hover:scale-105 self-start shadow-md"
                  onClick={() => navigate(`/open-playdates/${playdate.id}`)}
                >
                  View Playdate
                </button>
              </div>
            ))}
          </Slider>
        )}
        <div className="mt-6 w-full flex justify-center">
        <button
          className="bg-gray-800 hover:bg-black text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
          onClick={() => navigate("/playdates")}
        >
          + Create New Playdate
        </button>
      </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default PlaydateList;
