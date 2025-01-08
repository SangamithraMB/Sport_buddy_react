import UserList from './components/UserList';
import SportList from './components/SportList';

function App() {
  return (
    <div className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBqG5u3QHbkq7W2_cZygxKL7vMHhsMP4NUKw&s')] bg-cover bg-center h-64 w-full">
      <h1 className=" flex center text-3xl font-bold underline">Sport Buddy App</h1>
      <UserList />
      <SportList />
    </div>
  );
}

export default App;