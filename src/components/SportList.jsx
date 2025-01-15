import { useEffect, useState } from 'react';
import { fetchSports } from '../Services/sportService';

function SportList() {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect');
    const getSports = async () => {
      try {
        const sportsData = await fetchSports();
        setSports(sportsData); 
      } catch (err) {
        console.error("Error fetching sports:", err);
        setError("Failed to load sports")
      } finally {
        setLoading(false); 
      }
    };

    getSports().then(n => console.log('asdf',n));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Sports</h2>
      {loading ? (
        <p>Loading...</p> 
      ) : error ? (
        <p>{error}</p> 
      ) : sports.length === 0 ? (
        <p>No users found.</p> 
      ) : (
        <ul>
          {sports.map(sport => (
            <li key={sport.id}>
              {sport.sport_name} {sport.sport_type} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SportList;