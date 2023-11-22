import React, { useState } from 'react'
import './addIntent.scss'
import { BiArrowFromRight, BiDotsVertical, BiSolidSave } from "react-icons/bi";
import TextInput from '../../../forms/FormFields/TextInput';
import UserSays from './UserSays/UserSays';
import ChatResponse from './ChatResponse/ChatResponse';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { MoonLoader} from 'react-spinners';
const AddIntent = () => {
  
  const state = useLocation().state
  const [addIntent, setAddIntent] = useState({
    intentTitle: state?.IntentName || '',
    userSays: '',
    userSaysPreview: state?.utterances || [],
    chatResponse: '',
    chatResponsePreview: state?.answers || [],
    loading: false,
    error: null,
  });

  

  const handleClick = async (e) => {
    e.preventDefault();
    setAddIntent((prevIntent) => ({
      ...prevIntent,
      loading: true,
    }))
    try {
      state ? await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/chatbotRoute/intents/${state.IntentID}`, {
        Intent: addIntent.intentTitle,
        Utterances: addIntent.userSaysPreview,
        Answers: addIntent.chatResponsePreview,
      })
      : await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/chatbotRoute/intents`, {
        Intent: addIntent.intentTitle,
        Utterances: addIntent.userSaysPreview,
        Answers: addIntent.chatResponsePreview,
      });
    } catch (err) {
      console.log(err, 'cannot post');
      {
        setAddIntent((prevIntent) => ({
          ...prevIntent,
          error: err.response.data,
        }));
      }
    } finally {
      setAddIntent((prevIntent) => ({
        ...prevIntent,
        loading: false,
      }));
       
      
    }
  }
  const handleAddChatResponse = () => {
    if (addIntent.chatResponse.trim() !== '') {
      setAddIntent((prevIntent) => ({
        ...prevIntent,
        chatResponse: '',
        chatResponsePreview: [...prevIntent.chatResponsePreview, addIntent.chatResponse.trim()],
      }));
    }
  }

  const handleAddUserSays = () => {
    if (addIntent.userSays.trim() !== '') {
      setAddIntent((prevIntent) => ({
        ...prevIntent,
        userSays: '',
        userSaysPreview: [...prevIntent.userSaysPreview, addIntent.userSays.trim()],
      }));
    }
  };


  const handleRemoveUserSays = (index) => {
    const updatedUserSays = [...addIntent.userSaysPreview];
    updatedUserSays.splice(index, 1);
    setAddIntent((prevIntent) => ({
      ...prevIntent,
      userSaysPreview: updatedUserSays,
    }));
  };

  const handleRemoveChatResponse = (index) => {
    const updatedChatResponse = [...addIntent.chatResponsePreview];
    updatedChatResponse.splice(index, 1);
    setAddIntent((prevIntent) => ({
      ...prevIntent,
      chatResponsePreview: updatedChatResponse,
    }));
  }



  return (
    <div className='addIntent__container'>
      <div className='addIntent__header'>
        <Link to='/dashboard/chatbot' className='back-btn'><BiArrowFromRight size={25} /></Link>
        <h2>Add Intent</h2>
        {addIntent.loading ? (
          <button disabled={true} className={`${addIntent.loading ? 'btn' : 'btn-loading'}`}>
            <h3><MoonLoader color='#faf7f7' size={23}/>Saving</h3>
          </button>
        ) : (
          <button onClick={handleClick} className='btn'>
            <h3><BiSolidSave size={20} />Save Intent</h3>
          </button>
        )}
        {addIntent.error && (
          <div className='error'>{addIntent.error.message}</div>
        )}
      </div>
      <div className='addIntent__forms'>
        <TextInput
          value={addIntent.intentTitle}
          onChange={(e) => setAddIntent({ ...addIntent, intentTitle: e.target.value })}
          placeholder='Enter Intent Name'
          label='Intent Name'
          err
        />
        {/* <UserSays value={addIntent.userSays} onAddUserSays={handleAddUserSays} /> */}
        <UserSays
          value={addIntent.userSays}
          handleUserSaysInput={(e) => setAddIntent({ ...addIntent, userSays: e.target.value })}
          handleAddUserSays={handleAddUserSays}
          preview={addIntent.userSaysPreview}
          handleRemove={handleRemoveUserSays}
        />
        <ChatResponse
          value={addIntent.chatResponse}
          handleChatResponseInput={(e) => setAddIntent({ ...addIntent, chatResponse: e.target.value })}
          handleAddChatResponse={handleAddChatResponse}
          preview={addIntent.chatResponsePreview}
          handleRemove={handleRemoveChatResponse}
        />
      </div>



    </div>
  )
}

export default AddIntent  
