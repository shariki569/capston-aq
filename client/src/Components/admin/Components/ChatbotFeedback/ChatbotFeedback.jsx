import moment from "moment"
import { HiChatAlt2 } from "react-icons/hi"
import './chatbotFeedback.scss'
import { useState } from "react"
import axios from "axios"
import { MoonLoader } from "react-spinners"
import SearchInput from "../../../forms/FormFields/SearchInput"

const ChatbotFeedback = () => {
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')

  useState(() => {
    try {
      const fetchData = async () => {
        setLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback`)
        setFeedback(res.data)
        console.log(res.data)
        setLoading(false)
      }
      fetchData()
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  })

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredFeedback = feedback.filter((feedback) =>
    feedback.FeedBack_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.FeedBack_Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.Descriptions.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Number(feedback.AverageRating).toFixed(1).includes(searchTerm)
  );


  return (
    <div className='chatbot__feedback'>
      <div className='chatbot__feedbackHeader'>
        <h3 className='chatbot__title'><HiChatAlt2 size={25} /> Chatbot Feedback </h3>
        <SearchInput placeholder='Search Feedback' iconSize={20} value={searchTerm} onChange={handleSearch} />
      </div>
      <div className="chatbot__feedbackTableWrap">
        <table className='chatbot__feedbackTable'>
          <thead className="chatbot__feedbackTableHead">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Feedback Mesage</th>
              <th>Rating</th>
              <th>Date</th>
            </tr>
          </thead>

          {loading ? (
            <tr className='loading'>
              <MoonLoader size={50} color={"#03335b"} loading={loading} />
            </tr>) : (
            <tbody className="chatbot__feedbackBody">
              {filteredFeedback.map((feedback) => (
                <tr key={feedback.FeedBack_ID}>
                  <td>{feedback.FeedBack_Name}</td>
                  <td>{feedback.FeedBack_Email}</td>
                  <td>{feedback.Descriptions}</td>
                  <td>{Number(feedback.AverageRating).toFixed(1)}</td>
                  <td>{moment(feedback.FeedBack_Date).format("DD/MM/YYYY")}</td>
                </tr>
              ))}
            </tbody>
          )}

        </table>
      </div>
    </div>
  )
}

export default ChatbotFeedback
