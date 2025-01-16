import { useState, useEffect } from "react";
import { createPlaydate } from "../Services/playdateService";
import { fetchSports } from "../Services/SportService";

const CreatePlaydate = () => {
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
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
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
    getSports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sport = sportsData.find(
      (sport) =>
        sport.sport_name === selectedSport
    );
    const sportId = sport ? sport.id : null;

    if (!sportId) {
      setError("Please select a valid sport.");
      return;
    }

    const playdateDate = formatDate(date)
    console.log(playdateDate)
    const newPlaydate = {
      title,
      sport_id: sportId,
      creator_id: 1,
      address,
      date: `${playdateDate} ${time}:00`,
      max_participants: maxParticipants,
    };

    try {
      const created = await createPlaydate(newPlaydate);
      setCreatedPlaydate(created);
      console.log("Playdate created successfully:", created);
    } catch (err) {
      console.error("Error creating playdate:", err);
      setError("Failed to create playdate. Please try again.");
    }
  };
  return (
    <div>
      <h2>Create a New Playdate</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sports">Sport</label>
          <select
            name="sports"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            <option value="">--Select a Sport--</option>
            {sportsData && sportsData.length > 0 ? (
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
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Max Participants</label>
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Create Playdate
          </button>
        </div>
      </form>
       {createdPlaydate && (
        <div className="mt-4">
          <h3>Playdate Created Successfully!</h3>
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
  );
};

export default CreatePlaydate;
