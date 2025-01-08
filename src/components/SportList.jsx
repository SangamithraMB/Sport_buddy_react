import { useState } from 'react';

function SportList() {
  const [sports, setSports] = useState([]);
  const [formData, setFormData] = useState({ sport_name: '', sport_type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSport = { ...formData, id: Date.now() };
    setSports([...sports, newSport]);
    setFormData({ sport_name: '', sport_type: '' });
  };

  const handleDelete = (id) => {
    setSports(sports.filter(sport => sport.id !== id));
  };

  return (
    <div>
      <h2>Sports</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="sport_name" 
          placeholder="Sport Name" 
          value={formData.sport_name} 
          onChange={handleInputChange} 
          required 
        />
        <select name="sport_type" value={formData.sport_type} onChange={handleInputChange} required>
          <option value="">Select Type</option>
          <option value="TEAM">Team</option>
          <option value="INDIVIDUAL">Individual</option>
          <option value="BOTH">Both</option>
        </select>
        <button type="submit">Add Sport</button>
      </form>

      <ul>
        {sports.map(sport => (
          <li key={sport.id}>
            <strong>{sport.sport_name}</strong> ({sport.sport_type}) 
            <button onClick={() => handleDelete(sport.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SportList;