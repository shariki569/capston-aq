import axios from 'axios';
import React, { useState } from 'react'
import Header from '../../Components/ui/Header';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        const userMessage = { text: input, sender: 'user' };
        setMessages([...messages, { text: input, sender: 'user' }]);
        setInput('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/chatbotRoute`, { input });
            const botMessage = { text: response.data.answer, sender: 'bot' };
            setMessages([...messages, userMessage, botMessage]);
            console.log(response.data.answer);
        } catch (err) {
            console.error('Error processing input:', err);
        }
    };

    return (
        <>
            <Header title='Chatbot Test' />
            <div className='wrapper_!'>
                <div className='chatbot-inbox full-width h-60'>
                    {messages.map((message, index) => (
                        <p key={index}>
                            <strong>{message.sender}:</strong> {message.text}
                        </p>
                    ))}
                </div>
                <div className='chatbot-input full-width'>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>


        </>
    );
}


export default Chatbot
