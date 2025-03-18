import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import Chat from "./Chat";
import PropTypes from "prop-types"; // Add this line

const ChatPopup = ({ roomId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Chat</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900">
              <X size={20} />
            </button>
          </div>
          <Chat roomId={roomId} />
        </div>
      )}
    </div>
  );
};

ChatPopup.propTypes = {
  roomId: PropTypes.string.isRequired, 
};

export default ChatPopup;