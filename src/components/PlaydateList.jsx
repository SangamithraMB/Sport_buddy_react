import { useEffect, useState } from 'react';
import { fetchPlaydates } from '../Services/playdateService';

function SportList() {
  const [playdates, setPlaydates] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaydates = async () => {
      try {
        const playdatesData = await fetchPlaydates();
        setPlaydates(playdatesData); 
      } catch (err) {
        console.error("Error fetching sports:", err);
        setError("Failed to load sports")
      } finally {
        setLoading(false); 
      }
    };

    getPlaydates();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Open Playdates</h2>
      {loading ? (
        <p>Loading...</p> 
      ) : error ? (
        <p>{error}</p> 
      ) : playdates.length === 0 ? (
        <p>No users found.</p> 
      ) : (
        <ul>
          {playdates.map(playdate => (
            <li key={playdate.id}>
              {playdate.title} {playdate.address} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SportList;