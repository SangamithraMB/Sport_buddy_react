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
import ChatPopup from "./ChatPopup";

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

      if (participants.participants_count >= playdateById.max_participants) {
        alert("The room is full. You cannot join at this moment.");
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
    <div className="h-screen w-screen absolute inset-0 z-0 p-8 bg-gray-500 flex justify-between items-center bg-[url(/assets/plid.jpg)] bg-cover bg-no-repeat bg-center bg-blend-overlay">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : playdateById ? (
        <div className="bg-gray-700/40 shadow-lg rounded-lg p-6 w-full max-w-[70%] flex flex-col md:flex-row bg-opacity-55 min-h-[80vh] relative z-10">
          {/* Content area */}
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-semibold text-black mb-2">
              {playdateById.title}
            </h1>
            <p className="text-lg text-gray-900 mb-2">🏅 {playdateById.sport_name}</p>
            <p className="text-lg text-gray-900 mb-2">📍 {playdateById.address}</p>
            <p className="text-lg text-gray-900 mb-4">📅 {playdateById.date}</p>

            {isCreator && (
              <button
                className="mt-4 px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigate(`/update-playdate/${playdateId}`)}
              >
                Update Playdate
              </button>
            )}

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                PlayBuddies:
              </h3>
              {participants?.participants?.length > 0 ? (
                <ul className="list-disc ml-6 text-gray-900 mb-2">
                  {participants.participants.map((participant) => (
                    <li key={participant.id}>{participant.username}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-900">No participants yet.</p>
              )}
              <p className="text-gray-900 mt-2 mb-4">
                <strong>Total Joined:</strong> {participants.participants_count} /{" "}
                {participants.max_participants}
              </p>
            </div>

            {participants.participants_count >= playdateById.max_participants && (
              <p className="text-red-500 mt-6">The room is full. You cannot join at this moment.</p>
            )}

            {isUserInRoom ? (
              <div>
                <button
                  className="mt-4 px-6 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-900 transition"
                  onClick={handlePlaydateRevoke}
                >
                  Revoke
                </button>
                {isConfettiActive && <Confetti width={width} height={height} />}
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
          <div className="flex-1 h-96 md:h-auto p-4 relative z-10">
            <MapComponent
              latitude={playdateById.latitude}
              longitude={playdateById.longitude}
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">Playdate not found.</p>
      )}

      {/* Chat Popup */}
      <div className="fixed bottom-4 right-4 w-100 shadow-lg rounded-lg overflow-hidden border bg-white z-50">
        {isUserInRoom ? (
          <ChatPopup roomId={playdateId} />
        ) : (
          <div className="bg-gray-100 text-xl text-center p-4">
            <h1>*Join Playdate to Chat</h1>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default PlaydateListById;