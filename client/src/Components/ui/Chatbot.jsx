import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'
import TextArea from "../forms/FormFields/TextArea";
import DOMPurify from 'dompurify';
import { BiHappy } from "react-icons/bi";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import FeedbackForm from './FeedbackForm/FeedbackForm';
import { FiUsers } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";

const Chatbot = () => {

  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const messagePanelRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      sender: 'Bot',
      text: "Hi, I'm a chatbot in Aqua Cainta. How may I help?",
    }
  ]);


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
  const openForm = (e) => {
    e.preventDefault();
    setShowFeedbackForm(!showFeedbackForm);
    setShowOptions(false);
  }

  const handleOption = (e) => {
    e.preventDefault();
    setShowOptions(!showOptions);
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

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);

    if (showFeedbackForm) {
      setShowFeedbackForm(false);
    }

  }


  const handleFeedbackOpen = () => {
    toggleChatbot();

    // Open the feedback form after a delay (adjust the delay as needed)
    setTimeout(() => {
      setShowFeedbackForm(true);
    }, 800);
  };


  return (
    <div className='chatbot-container'>
      {showChatbot && <div className="chatbot-inbox">
        <div className="chatbot-header">
          <div className="chatbot-title">
            <h3>AquaBot</h3>
          </div>
          <div className="chatbot-buttons">
            <button className='send btn-options' onClick={handleOption}><BiDotsVerticalRounded size={20} color='white' /></button>
            <button className='send btn-options' onClick={toggleChatbot}><FiX size={20} color='white' /></button>
            {showOptions &&
              <div className='chatbot-options'>
                <button className='send' onClick={openForm}><BiHappy size={20} />Provide Feedback</button>
                <button className='send'> <RiMessengerLine size={20} /> Use Messenger</button>
              </div>
            }
          </div>
        </div>


        <div className="chatbot-panel" ref={messagePanelRef}>
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
        {showFeedbackForm &&
          <div className="feedback-form">
            <FeedbackForm {...{ handleClose: () => setShowFeedbackForm(false) }} />
          </div>
        }
        <div className="chatbot-input">
          <TextArea
            placeholder="Type a message..."
            value={input}
            onChange={changeValue}
            onKeyDown={handleEnter}
          />
          <button className='send' onClick={sendMessage} disabled={!input.trim()}><FiSend size={22} /></button>
        </div>
      </div>}
      {!showChatbot && <ChatbotButton click={toggleChatbot} />}
      {!showFeedbackForm && <FeedBackButton click={handleFeedbackOpen} />}
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

const FeedBackButton = ({ click }) => {

  return (
    <span className='feedback-button' onClick={click}>
      <FiUsers /> Give us a feedback

    </span>
  )
}