import { useEffect, useState } from 'react';
import { fetchUsers } from '../Services/userService';
import { useAuth } from './AuthContext';
import { createChat } from '../Services/chatService';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [receiver, setReceiver] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('sent');
  const [createdChat, setCreatedChat] = useState(null);

  // Format date function
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(Array.isArray(userData) ? userData : []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch user data, please try again later.');
      }
    };
    if (user) getUsers();
  }, [user]);

  // Handle sending message
  const handleSendMessage = async () => {
    setError(''); // Clear previous errors

    if (!receiver) {
      setError('Please select a user to send the message.');
      return;
    }

    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    if (!date || !time) {
      setError('Please select a valid date and time.');
      return;
    }

    const chatDate = formatDate(date);
    const newChat = {
      receiver_id: receiver,
      sender_id: user?.userId,
      message: message,
      date: `${chatDate} ${time}:00`,
      status: status,
    };

    try {
      const created = await createChat(newChat);
      setCreatedChat(created);
      console.log('Chat created successfully:', created);

      // Reset form fields after successful submission
      setReceiver('');
      setMessage('');
      setDate('');
      setTime('');
      setStatus('sent');
    } catch (err) {
      console.error('Error creating chat:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <h2>Send Message</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>To:</label>
        <select
          name="To"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">--Select a user--</option>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name}
              </option>
            ))
          ) : (
            <option value="">Loading users...</option>
          )}
        </select>
      </div>

      <div>
        <label>Message:</label>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      <button type="button" onClick={handleSendMessage}>
        Send
      </button>
      {createdChat && (
          <div className="mt-6 bg-green-100 p-4 rounded-md text-green-700 border border-green-300">
            <h3 className="text-lg font-semibold">✅ chat Created Successfully!</h3>
            <p><strong>Title:</strong> {createdChat.message}</p>
          </div>
        )}
    </>
  );
};

export default SendMessage;