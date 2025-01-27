import { useContext, useEffect, useState } from 'react';
import { fetchParticipants } from '../Services/participantsService';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

function UserList() {
  const {user} = useContext(AuthContext);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const participantData = await fetchParticipants();
        setParticipants(participantData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError('Failed to fetch user data, please try again later.');
      } finally {
        setLoading(false); 
      }
    };

    getUsers();
  }, []);

  return user ? (
    <div className="p-4">
      <h2 className="text-xl mb-4">Users</h2>

      {loading ? (
        <p>Loading...</p> 
      ) : error ? (
        <p>{error}</p> 
      ) : participants.length === 0 ? (
        <p>No users found.</p> 
      ) : (
        <ul>
          {participants.map(participant => (
            <li key={participant.id}>
              {participant.first_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : <Navigate to="/login"/>;
}

export default UserList;