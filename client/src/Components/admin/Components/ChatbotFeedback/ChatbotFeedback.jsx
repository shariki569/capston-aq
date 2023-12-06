import moment from "moment"
import { HiChatAlt2 } from "react-icons/hi"
import './chatbotFeedback.scss'
import { useEffect, useState } from "react"
import axios from "axios"
import { MoonLoader } from "react-spinners"
import SearchInput from "../../../forms/FormFields/SearchInput"
import { BiDotsVertical, BiEdit, BiTrash } from "react-icons/bi"
import Modal from "../../../ui/Modal/Modal"
import StarRating from "../../../ui/FeedbackForm/StarRating/StarRating"
import { AiOutlineReload } from "react-icons/ai";
import { toast } from "sonner"

const ChatbotFeedback = () => {
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')
  const [openOption, setOpenOption] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false)
  const [status, setStatus] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback`)
        setFeedback(res.data)
        setLoading(false)
      } catch (err) {

        setLoading(false)
      }
    }
    fetchData()
  }, [])


  const handleUpdate = async (feedbackId) => {
    try {
      await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback/${selectedFeedback.FeedBack_ID}`, {
        Status: status,
      }, {
        withCredentials: true
      })
      closeModal();
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback`);
      setFeedback(res.data); // Update the feedback state with the new data
      setLoading(false);
    } catch (err) {
      setError(err.response.data)

    } finally {
      setLoading(false)
      toast.success('Feedback updated successfully')
    }
  }

  const handleDelete = async (feedbackId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback/${feedbackId}`, {
        withCredentials: true,
      })
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback`);
      setFeedback(res.data); // Update the feedback state with the new data
      setOpenOption(null)
      setLoading(false);
      toast.success('Feedback deleted successfully')
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  useEffect(() => {
    // When selectedFeedback changes, update the status state
    setStatus(selectedFeedback?.FeedBack_Status || '');
  }, [selectedFeedback]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const toggleOpen = (feedbackId) => {
    setOpenOption(prevOpenOptions =>
      prevOpenOptions === feedbackId ? null : feedbackId
    )
  }


  const filteredFeedback = feedback.filter((feedback) =>
    feedback.FeedBack_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.FeedBack_Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.Descriptions?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Number(feedback.AverageRating)?.toFixed(1).includes(searchTerm)
  );

  const openModal = (feedbackId) => {
    const selectedFeedback = filteredFeedback.find((feedback) => feedback.FeedBack_ID === feedbackId)
    setModalOpen(true)
    setSelectedFeedback(selectedFeedback)
    toggleOpen(false)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

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
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          {loading ? (
            <tbody className='loading'>
              <tr>
                <td>
                  <MoonLoader size={50} color={"#03335b"} loading={loading} />
                </td>
              </tr>
            </tbody>) : (

            <tbody className="chatbot__feedbackBody">
              {filteredFeedback && filteredFeedback.map((feedback) => (
                <tr key={feedback.FeedBack_ID}>
                  <td className="small">{feedback.FeedBack_Name}</td>
                  <td>{feedback.FeedBack_Email}</td>
                  <td className='description'><p className="ellipsis">{feedback.Descriptions}</p></td>
                  <td>{Number(feedback.AverageRating).toFixed(1)}</td>
                  <td>{moment(feedback.FeedBack_Date).format("DD/MM/YYYY")}</td>
                  <td ><span className={`status ${feedback.FeedBack_Status.toLowerCase()}`}>{feedback.FeedBack_Status}</span></td>
                  <td className="dots"> <BiDotsVertical size={20} onClick={() => toggleOpen(feedback.FeedBack_ID)} />
                    {openOption === feedback.FeedBack_ID && (
                      <div className="dots-menu">
                        <li onClick={() => openModal(feedback.FeedBack_ID)}><BiEdit />View</li>
                        <li onClick={() => handleDelete(feedback.FeedBack_ID)}><BiTrash />Delete</li>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}

        </table>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <div className="chatbot__feedbackModal">
            {/* <button className='dismiss'>X</button> */}
            <div className="chatbot__feedbackModalHeader">
              <h3>Feedback Details -</h3>
              <div className="chatbot__feedbackModalStatus">
                <h4>Status:</h4>
                <select className="status " value={status} onChange={(e) => { setStatus(e.target.value) }}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div> {error && <p className="error">{error}</p>}</div>
            <div className="chatbot__feedbackModalContent">
              <span>Name: {selectedFeedback.FeedBack_Name}</span>
              <span>Email: {selectedFeedback.FeedBack_Email}</span>
              <span className="rating">Rating: <StarRating readOnly={true} totalStars={5} starsSelected={selectedFeedback.AverageRating} /></span>
              <span>Date: {moment(selectedFeedback.FeedBack_Date).format("DD/MM/YYYY")}</span>
              <span>Message: {selectedFeedback.Descriptions}</span>
            </div>
            <div className="chatbot__feedbackModalFooter">
              <span className="btn btn-small" onClick={handleUpdate}>Update</span>
              <span className="btn btn-small btn-err" onClick={closeModal}>Cancel</span>
            </div>
          </div>
        </Modal>
      )}
    </div >
  )
}

export default ChatbotFeedback
