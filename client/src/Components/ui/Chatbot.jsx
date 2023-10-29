import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'
import TextArea from "../forms/FormFields/TextArea";
import DOMPurify from 'dompurify';
const Chatbot = () => {

  const [messages, setMessages] = useState([
    {
      sender: 'Bot',
      text: "Hi, I'm a chatbot in Aqua Cainta. How may I help?",
    }
  ]);
  const [input, setInput] = useState('');
  const messagePanelRef = useRef(null);

  const [showChatbot, setShowChatbot] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') {
      return;
    }

    const userMessage = { sender: 'User', text: input, };
    setMessages([{ sender: 'User', text: input }, ...messages]);
    setInput('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/chatbotRoute`, { input });
      const botMessage = { text: response.data.answer, sender: 'Bot' };
      setMessages([...messages, userMessage, botMessage]);
    
    } catch (err) {
      console.error('Error processing input:', err);
    }
  };

  const handleEnter = async (e) => {
    if (!e.shiftKey && e.keyCode === 13) {
      e.preventDefault();
      if(input.trim() !== '') {
        return sendMessage();
      }
     
    }
  }

  useEffect(() => {
    if (messagePanelRef.current) {
      messagePanelRef.current.scrollTop = messagePanelRef.current.scrollHeight;
    }
  }, [messages])

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  }

  return (
    <div className='chatbot-container'>

      {showChatbot && <div className="chatbot-inbox">
        <div className="chatbot-header">
          <button onClick={toggleChatbot}><FiX size={20} color='white' /></button>
        </div>
        <div className="chatbot-panel" ref={messagePanelRef}>
          {messages.map((message, index) => (
            <p className={`message ${message.sender}`} key={index}>
              <span className='sender'>{message.sender}</span>
              {message.sender === 'Bot' ? (<span dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(message.text),
              }}></span>) : (
                <span>{message.text}</span>
              )}
            </p>
          ))}
        </div>
        <div className="chatbot-input">
          <TextArea
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
      
          />
          <button className='send' onClick={sendMessage}><FiSend size={22} /></button>
        </div>

      </div>}
      {!showChatbot && <ChatbotButton click={toggleChatbot} />}
    </div>
  )
}

export default Chatbot





const ChatbotButton = ({ click }) => {
  return (
    <span className='chatbot-button' onClick={click}>
      <FiMessageCircle size={30} color='white' />
    </span>
  )
}