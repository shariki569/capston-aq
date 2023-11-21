import React, { useCallback, useEffect, useRef, useState } from 'react'
import './chatBox.scss'
import { BiBot } from "react-icons/bi";
import Chatbot from '../../../ui/Chatbot';
import TextArea from '../../../forms/FormFields/TextArea';
import { FiSend } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import axios from 'axios';
const Chatbox = () => {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'Bot',
      text: "Hi, Admin you wanna train me today?",
    }
  ])
  const [loading, setLoading] = useState(false);
  const messagePanelRef = useRef(null);




  const sendMessage = async () => {

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

  const handleTrain = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/chatbotRoute/train`);
      alert('Training complete!');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const handleEnter = async (e) => {
    if (!e.shiftKey && e.keyCode === 13) {
      e.preventDefault();
      if (input.trim() !== '') {
        return sendMessage();
      }

    }
  }

  const changeValue = useCallback((e) => {
    setInput(e.target.value);
  }, [])

  useEffect(() => {
    if (messagePanelRef.current) {
      messagePanelRef.current.scrollTop = messagePanelRef.current.scrollHeight;
    }
  }, [messages])



  return (
    <div className='chatbox__container'>
      <div className='chatbox__header'>
        <div className='chatbox__train'>
          {loading ? <button className='btn btn-loading'><h3>Training...</h3></button> : <button className='btn'>
            <h3 onClick={handleTrain}><BiBot size={20} />Train</h3>
          </button>
          }
        </div>
      </div>
      <div className='chatbot__container'>
        <div className='chatbot-panel' ref={messagePanelRef}>
          {messages.map((message, index) => (
            <p className={`message ${message.sender}`} key={index}>
              {message.sender === 'Bot' ? (<span dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(message.text),
              }}></span>) : (
                <span>{message.text}</span>
              )}
            </p>
          ))}

        </div>
        <div className="chatbot__input">
          <TextArea
            placeholder="Type a message..."
            value={input}
            onChange={changeValue}
            onKeyDown={handleEnter}
          />
          <button className='send send-admin' onClick={sendMessage}><FiSend size={22} /></button>
        </div>
      </div>
    </div>
  )
}

export default Chatbox
