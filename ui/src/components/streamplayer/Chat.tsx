import { useUser } from '@/AuthProvider';
import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

// interface ChatRoomProps {
//   streamId: string;
// }

interface Message {
  roomId: string;
  message: string;
  username:string;
}

const Chat = ({streamId}:{streamId:string}) => {

    const user  = useUser()
    if(!user){
        return(<>Loading...</>)
    }
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  //const streamId = "1234"
  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    // Join the chat room for the current stream
    newSocket.emit('joinRoom', streamId);

    // Listen for incoming messages
    newSocket.on('message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Close the socket connection when component unmounts
      newSocket.close();
    };
  }, [streamId]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      const msgPayload: Message = { roomId: streamId, message,username:user.username };
      socket.emit('chatMessage', msgPayload);
      setMessage(''); // Clear the input after sending
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
