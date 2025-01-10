import { useState } from "react"


const CreatePlaydate = () => {
    const [sports, setSports] = useState(["Basketball", "Tennis"])
    const [selectedSport, setSelectedSport] = useState('')
    const [sportTypes, setSportTypes] = useState(["Single", "Multiple", "Both"])
    const [selectedSportType, setSelectedSportType] = useState("Both")
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const [createdPlaydate, setCreatedPlaydate] = useState(null);

    const handleSubmit = async (e) =>  {
        e.preventDefault();

    const newPlaydate = {
        selectedSport,
        selectedSportType,
        location,
        date,
        time,   
    };
    
    setCreatedPlaydate(newPlaydate);
    console.log("Created Playdate:", newPlaydate, setSports, setSportTypes);
};
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="sports">Sport</label>
                <select name="sports" 
                id="sports"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                >
                <option value=''>--Select a Sport--</option>
                {sports.map((sport) => <option key={sport} >{sport}</option>)}
                </select>
                
            </div>
            <div>
                <label htmlFor="sports_type">Sport Type</label>
                {sportTypes.map((sportType) => ( 
                <div key={sportType}>
                <input 
                name="sportType"
                type="radio"
                id={sportType}
                value={sportType}
                checked={sportType === selectedSportType}
                onChange={(e) => setSelectedSportType(e.target.value)}
                required>
                
                </input>
                <label 
                htmlFor={sportType}>
                  {sportType}  
                </label>
                </div>)
               
            )}
            </div>
            <div>
                <label>Location</label>
                <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="place"
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
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Create Playdate</button>
            </div>
        </form>
        {createdPlaydate && (
        <div className="mt-4">
          <h3>Created Playdate:</h3>
          <p><strong>Sport:</strong> {createdPlaydate.selectedSport}</p>
          <p><strong>Sport Type:</strong> {createdPlaydate.selectedSportType}</p>
          <p><strong>Location:</strong> {createdPlaydate.location}</p>
          <p><strong>Date:</strong> {createdPlaydate.date}</p>
          <p><strong>Time:</strong> {createdPlaydate.time}</p>
        </div>
      )}
    </div>
  )
}

export default CreatePlaydate