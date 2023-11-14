import React, { useEffect, useState } from 'react'
import './intents.scss'
import moment from 'moment'
import axios from 'axios';
import { BiEdit, BiSearch, BiTrash } from 'react-icons/bi'
import TextInput from '../../../forms/FormFields/TextInput'
import { BiDotsVertical } from "react-icons/bi";
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


  return (
    <div className='chatbot__intentContainer'>
      <div className="chatbot__searchIcon">
        {/* < BiSearch size={20} /> */}
        <TextInput placeholder='Search' value={searchTerm} onChange={handleSearch} />

      </div>
      <table className='chatbot__intentTable'>
        <thead>
          <tr>
            <th>Intent</th>
            <th>Utterances</th>
            <th>Answers</th>
          </tr>
        </thead>
        <tbody>
          {filteredIntents.map((intent) => (
            <tr key={intent.IntentID}>
              <td>{intent.IntentName}</td>
              <td>{intent.total_utterances}</td>
              <td>{intent.total_answers}</td>
              <td className='chatbot__intentDots'>
                <BiDotsVertical size={20} onClick={() => toggleOpen(intent.IntentID)} />
                {openOptions === intent.IntentID && (
                  <div className='chatbot__intentOptions'>
                    <li><BiEdit/>Edit</li>
                    <li><BiTrash/>Delete</li>
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
