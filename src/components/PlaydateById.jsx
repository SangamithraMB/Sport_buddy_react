import { useContext, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { fetchPlaydatesById } from "../Services/playdateService";
import {
  fetchParticipants,
  createParticipants,
  deleteParticipants,
} from "../Services/participantsService";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import MapComponent from "./MapComponent";
import { useNavigate } from "react-router-dom";

function PlaydateListById() {
  const { width, height } = useWindowSize();
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { playdateId } = useParams();
  const [playdateById, setPlaydatesById] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUserInRoom, setIsUserInRoom] = useState(false);

  useEffect(() => {
    const getPlaydateById = async () => {
      try {
        const playdatesDataById = await fetchPlaydatesById(playdateId);
        setPlaydatesById(playdatesDataById);
      } catch (err) {
        console.error("Error fetching playdate:", err);
      } finally {
        setLoading(false);
      }
    };

    if (playdateId) getPlaydateById();
  }, [playdateId]);

  useEffect(() => {
    const getParticipants = async () => {
      try {
        const participantData = await fetchParticipants(playdateId);
        setParticipants(participantData);

        setIsUserInRoom(
          participantData?.participants?.some((p) => p.id === user?.userId)
        );
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    if (playdateId) getParticipants();
  }, [playdateId, user]);

  const handlePlaydateJoin = async () => {
    try {
      if (!user?.userId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      const newParticipant = await createParticipants(playdateId, {
        user_id: user.userId,
      });
      setParticipants((prevParticipants) => ({
        ...prevParticipants,
        participants: [...prevParticipants.participants, newParticipant],
        participants_count: prevParticipants.participants_count + 1,
      }));
      const updatedParticipants = await fetchParticipants(playdateId);
      setParticipants(updatedParticipants);
      setIsUserInRoom(true);
      setIsConfettiActive(true);
      const timer = setTimeout(() => {
        setIsConfettiActive(false);
      }, 10000);
      return () => clearTimeout(timer);

    } catch (error) {
      console.error("Error adding participant:", error);
      alert("Failed to join. Please try again.");
    }
  };

  const handlePlaydateRevoke = async () => {
    try {
      if (!user?.userId) {
        alert("User ID not found. Please log in again.");
        return;
      }
      await deleteParticipants(playdateId, user.userId);
      setParticipants((prevParticipants) => ({
        ...prevParticipants,
        participants: prevParticipants.participants.filter(
          (p) => p.id !== user.userId
        ),
        participants_count: Math.max(
          prevParticipants.participants_count - 1,
          0
        ),
      }));
      setIsUserInRoom(false);
    } catch (error) {
      console.error("Error removing participant:", error);
      alert("Failed to revoke. Please try again.");
    }
  };

  const isCreator = playdateById?.creator_id === user?.userId;

  return user ? (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : playdateById ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl flex">
          {/* Content area */}
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              {playdateById.title}
            </h1>
            <p className="text-lg text-gray-600">
              🏅 {playdateById.sport_name}
            </p>
            <p className="text-lg text-gray-600">📍 {playdateById.address}</p>
            <p className="text-lg text-gray-600">📅 {playdateById.date}</p>

            {isCreator &&  (
              <button className="mt-4 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
              onClick={() => navigate(`/update-playdate/${playdateId}`)
              }>
               Update Playdate </button>
            )}

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800">
                Participants:
                {console.log("Participants List:", participants.participants)}
              </h3>
              {participants?.participants?.length > 0 ? (
                <ul className="list-disc ml-6 text-gray-700">
                  {participants.participants.map((participant) => (
                    <li key={participant.id}>{participant.username}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No participants yet.</p>
              )}
              <p className="text-gray-700 mt-2">
                <strong>Total Joined:</strong> {participants.participants_count}{" "}
                / {participants.max_participants}
              </p>
            </div>

            {isUserInRoom ? (
              <div>
                <button
                  className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                  onClick={handlePlaydateRevoke}
                >
                  Revoke
                </button>
               {isConfettiActive && <Confetti width={width} height={height} /> }
              </div>
            ) : (
              <button
                className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                onClick={handlePlaydateJoin}
              >
                Join Playdate
              </button>
            )}
          </div>

          {/* Map area */}
          <div className="flex-1 h-96 p-4">
            <MapComponent
              latitude={playdateById.latitude}
              longitude={playdateById.longitude}
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">Playdate not found.</p>
      )}
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default PlaydateListById;
