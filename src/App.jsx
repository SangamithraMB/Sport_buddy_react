import { Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import Navbar from './components/Navbar';
import CreateUser from './components/CreateUser';
import CreatePlaydate from './components/CreatePlaydate';
import SportList from './components/SportList';
import PlaydateList from './components/PlaydateList';
import PlaydateListById from './components/PlaydateById';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import { AuthProvider } from './components/AuthProvider';
import ProtectedPage from './components/ProtectedPage';
import UpdatePlaydate from './components/UpdatePlaydate';

function App() {
  return (
    <div className="w-full h-screen bg-gray-100 relative">
      <AuthProvider>
      <Navbar />
      <div className="container mx-auto p-4">
       <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/sports" element={<SportList />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/open-playdates/:playdateId" element={<PlaydateListById />} />
          <Route path="/update-playdate/:playdateId" element={<UpdatePlaydate />} />
          <Route path="/open-playdates" element={<PlaydateList />} />
          <Route path="/playdates" element={<CreatePlaydate />} />
          <Route path="/add-user" element={<CreateUser />} />
        </Routes>
      </div>
      </AuthProvider>
    </div>
  );
}

export default App;