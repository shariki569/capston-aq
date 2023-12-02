import React, { useEffect, useState } from 'react'
import './intents.scss'
import moment from 'moment'
import axios from 'axios';
import { BiEdit, BiSearch, BiTrash } from 'react-icons/bi'
import TextInput from '../../../forms/FormFields/TextInput'
import { BiDotsVertical } from "react-icons/bi";
import SearchInput from '../../../forms/FormFields/SearchInput';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
const Intents = () => {

  const [intents, setIntents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [openOptions, setOpenOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const intentData = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/chatbotRoute/intents`)
        setIntents(intentData.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])


  const toggleOpen = (intentId) => {
    setOpenOptions(prevOpenOptions =>
      prevOpenOptions === intentId ? null : intentId
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredIntents = intents.filter((intent) =>
    intent.IntentName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDelete = (intentId) => {
    axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/chatbotRoute/intents/${intentId}`)
    setIntents((prevIntents) => prevIntents.filter((intent) => intent.IntentID !== intentId))
    toast.error('Intent Deleted')
  }

  return (
    <div className='chatbot__intentContainer'>
      <SearchInput placeholder='Search Intent' value={searchTerm} onChange={handleSearch} />
      <table className='chatbot__intentTable'>
        <thead>
          <tr>
            {/* <th></th> */}
            <th>Intent</th>
            <th>Utterances</th>
            <th>Answers</th>
          </tr>
        </thead>
        <tbody>
          {filteredIntents.map((intent) => (
            <tr key={intent.IntentID}>
              {/* <td><input type="checkbox" name="intent" /></td> */}
              <td>{intent.IntentName}</td>
              <td>{intent.total_utterances}</td>
              <td>{intent.total_answers}</td>
              <td className='chatbot__intentDots'>
                <BiDotsVertical size={20} onClick={() => toggleOpen(intent.IntentID)} />
                {openOptions === intent.IntentID && (
                  <div className='chatbot__intentOptions'>
                    <Link className='chatbot__intentView' state={intent} to={`/dashboard/chatbot/add-intent?edit=${intent.IntentID}`}><BiEdit />View</Link>
                    <li onClick={() => handleDelete(intent.IntentID)}><BiTrash />Delete</li>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Intents
