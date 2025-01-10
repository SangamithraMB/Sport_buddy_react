import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import Navbar from './components/Navbar';
import CreateUser from './components/CreateUser';
import CreatePlaydate from './components/CreatePlaydate';


function App() {
  return (

    <div className='w-full h-screen bg-gray-100 relative'>
      <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<h1><strong>Welcome to Sport Buddy!</strong></h1>} />
          <Route path="/users" element={<UserList /> } />
          <Route path="/playdates" element={<CreatePlaydate />}/>
          <Route path="/add-user" element={<CreateUser />}/>
        </Routes>
      </div>
    </Router>
      
        <div 
          className="absolute top-0 right-0 m-4"> 
          <img src="src/assets/basketball_ring.png"
          alt='Basketball ring'
          className='w-32 h-32 object-contain'
          />  
        </div>
        <div 
          className="absolute bottom-0 left-0 m-4"> 
          <img src="src/assets/basketball.png"
          alt='Basketball'
          className='w-74 h-340 object-contain'
          />  
        </div>
    </div>
  );
}

export default App;