import { useState, useEffect } from "react";
import { createPlaydate } from "../Services/playdateService";
import { createParticipants } from "../Services/participantsService";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { fetchSports } from "../Services/sportService";

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
        setSportsData(Array.isArray(sportsData) ? sportsData : []);
      } catch (err) {
        console.error("Sports data not fetched", err);
      }
    };
    if (user) getSports();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSport) {
      setError("Please select a sport.");
      return;
    }

    if (!title || !address || !date || !time || !maxParticipants) {
      setError("All fields are required.");
      return;
    }

    const sport = sportsData.find((sport) => sport.sport_name === selectedSport);
    if (!sport) {
      setError("Invalid sport selection.");
      return;
    }

    const playdateDate = formatDate(date);
    const newPlaydate = {
      title,
      sport_id: sport.id,
      creator_id: user.userId,
      address,
      date: `${playdateDate} ${time}:00`,
      max_participants: maxParticipants,
    };

    try {
      const created = await createPlaydate(newPlaydate);
      setCreatedPlaydate(created);
      await createParticipants(created.id, { user_id: user.userId });

    setSelectedSport("");
    setTitle("");
    setAddress("");
    setDate("");
    setTime("");
    setMaxParticipants("");
    setError(null);
    } catch (err) {
      console.error("Error creating playdate:", err);
      setError("Failed to create playdate. Please try again.");
    }
  };

  return user ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-400 px-4 bg-[url(/assets/cla.avif)] bg-blend-overlay bg-cover bg-no-repeat bg-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg border border-gray-200 bg-opacity-60">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          🎉 Create a New Playdate
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sport Selection */}
          <div >
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

          {/* Title Input */}
          <div>
            <label className="block font-medium text-gray-700">
              Title 
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Address Input */}
          <div>
            <label className="block font-medium text-gray-700">
              Address 
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block font-medium text-gray-700">
              Date 
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Time Input */}
          <div>
            <label className="block font-medium text-gray-700">
              Time 
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              min={date === new Date().toISOString().split("T")[0] ? new Date().toTimeString().slice(0, 5) : "00:00"}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Max Participants Input */}
          <div>
            <label className="block font-medium text-gray-700">
              Max Participants 
            </label>
            <input
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              required
              min="1"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform hover:scale-105"
          >
            Create Playdate
          </button>
        </form>

        {/* Success Message */}
        {createdPlaydate && (
          <div className="mt-6 bg-green-100 p-4 rounded-md text-green-700 border border-green-300">
            <h3 className="text-lg font-semibold">✅ Playdate Created Successfully!</h3>
            <p><strong>Title:</strong> {createdPlaydate.title}</p>
            <p><strong>Sport:</strong> {selectedSport}</p>
            <p><strong>Address:</strong> {createdPlaydate.address}</p>
            <p><strong>Date:</strong> {new Date(createdPlaydate.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {new Date(createdPlaydate.date).toLocaleTimeString()}</p>
            <p><strong>Max Participants:</strong> {createdPlaydate.max_participants}</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default CreatePlaydate;