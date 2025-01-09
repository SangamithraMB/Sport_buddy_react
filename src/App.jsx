import UserList from './components/UserList';
import SportList from './components/SportList';

function App() {
  return (
    <div className='w-full h-screen bg-gray-100 relative'>
      
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
          className='w-74 h-364 object-contain'
          />  
        </div>
      <div className="text-center">
      <h1 className="text-3xl font-bold text-blue p-4">Sport Buddy App</h1>
        <UserList />
        <SportList />
      </div>
    </div>
  );
}

export default App;