import moment from "moment"
import { HiChatAlt2 } from "react-icons/hi"
import './chatbotFeedback.scss'

const ChatbotFeedback = () => {
  return (
    <div className='chatbot__feedback'>
      <div className='chatbot__feedbackHeader'>
        <h3 className='chatbot__title'><HiChatAlt2 size={25} /> Chatbot Feedback </h3>

      </div>

      <table className='chatbot__feedbackTable'>
        <thead>
          <tr>
            <th>User</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3stars</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Anya</td>
            <td>This Chatbot is shite!</td>
            <td>3stars</td>
            <td>{moment(Date.now()).format('YYYY-MM')}</td>
          </tr>
          <tr>
            <td>Anya</td>
            <td>This Chatbot is shite!</td>
            <td>3stars</td>
            <td>{moment(Date.now()).format('YYYY-MM')}</td>
          </tr>
          <tr>
            <td>Anya</td>
            <td>This Chatbot is shite!</td>
            <td>3stars</td>
            <td>{moment(Date.now()).format('YYYY-MM')}</td>
          </tr>
          <tr>
            <td>Anya</td>
            <td>This Chatbot is shite!</td>
            <td>3stars</td>
            <td>{moment(Date.now()).format('YYYY-MM')}</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default ChatbotFeedback
