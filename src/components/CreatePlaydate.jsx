import { useState, useEffect } from "react";
import { createPlaydate } from "../Services/playdateService";
import { createParticipants } from "../Services/participantsService";
import { fetchSports } from "../Services/SportService";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const CreatePlaydate = () => {
  const { user } = useAuth();
  const [sportsData, setSportsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

  const [createdPlaydate, setCreatedPlaydate] = useState(null);
  const [error, setError] = useState(null);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    const getSports = async () => {
      try {
        const sportsData = await fetchSports();
        console.log("Fetched sports data:", sportsData);
        setSportsData(Array.isArray(sportsData) ? sportsData : []);
      } catch (err) {
        console.log("Sports data not fetched", err);
      }
    };
    if(user)
    getSports();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sport = sportsData.find(
      (sport) => sport.sport_name === selectedSport
    );
    const sportId = sport ? sport.id : null;

    if (!sportId) {
      setError("Please select a valid sport.");
      return;
    }

    const playdateDate = formatDate(date);
    console.log(playdateDate);
    const newPlaydate = {
      title,
      sport_id: sportId,
      creator_id: user.userId,
      address,
      date: `${playdateDate} ${time}:00`,
      max_participants: maxParticipants,
    };

    try {
      const created = await createPlaydate(newPlaydate);
      setCreatedPlaydate(created);
      console.log("Playdate created successfully:", created);
      const playdateId = created.id
      const participantsData = {
        "user_id": user.userId
      };
      await createParticipants(playdateId, participantsData);
    } catch (err) {
      console.error("Error creating playdate:", err);
      setError("Failed to create playdate. Please try again.");
    }
  };

  return user ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create a New Playdate
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sports" className="block font-medium text-gray-700">
              Sport
            </label>
            <select
              name="sports"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">--Select a Sport--</option>
              {sportsData.length > 0 ? (
                sportsData.map((sport) => (
                  <option key={sport.id} value={sport.sport_name}>
                    {sport.sport_name}
                  </option>
                ))
              ) : (
                <option value="">Loading sports...</option>
              )}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Max Participants
            </label>
            <input
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Create Playdate
          </button>
        </form>

        {createdPlaydate && (
          <div className="mt-6 bg-green-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-green-700">
              Playdate Created Successfully!
            </h3>
            <p>
              <strong>Title:</strong> {createdPlaydate.title}
            </p>
            <p>
              <strong>Sport:</strong> {selectedSport}
            </p>
            <p>
              <strong>Address:</strong> {createdPlaydate.address}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(createdPlaydate.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(createdPlaydate.date).toLocaleTimeString()}
            </p>
            <p>
              <strong>Max Participants:</strong>{" "}
              {createdPlaydate.max_participants}
            </p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
  
};

export default CreatePlaydate;
