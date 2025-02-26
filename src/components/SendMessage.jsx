import { useEffect, useState } from 'react';
import { fetchUsers } from '../Services/userService';
import { useAuth } from './AuthContext';
import { createChat } from '../Services/chatService';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [receiver, setReceiver] = useState('');
  const [status, setStatus] = useState('sent');
  const [createdChat, setCreatedChat] = useState(null);

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

  const handleSendMessage = async () => {
    setError('');
    if (!receiver) {
      setError('Please select a user to send the message.');
      return;
    }
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleString('en-GB')
      .replace(/\//g, '-')
      .replace(',', '');

    const newChat = {
      receiver_id: receiver,
      sender_id: user?.userId,
      message,
      message_type: 'TEXT',
      date: formattedDate,
      status,
    };

    try {
      const created = await createChat(newChat);
      setCreatedChat(created);
      console.log('Chat created successfully:', created);
      setReceiver('');
      setMessage('');
      setStatus('sent');
    } catch (err) {
      console.error('Error creating chat:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Send Message</h2>

      {error && <p className="text-red-600">{error}</p>}

      <div className="mb-4">
        <label className="block font-medium mb-1">To:</label>
        <select
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">--Select a user--</option>
          {users.length > 0 ? (
            users.map((u) => (
              <option key={u.id} value={u.id}>{u.first_name}</option>
            ))
          ) : (
            <option value="">Loading users...</option>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={handleSendMessage}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Send
      </button>

      {createdChat && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md">
          <h3 className="font-semibold">✅ Message Sent Successfully!</h3>
          <p><strong>Message:</strong> {createdChat.message}</p>
        </div>
      )}
    </div>
  );
};

export default SendMessage;
