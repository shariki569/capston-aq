import moment from 'moment'
import React from 'react'
import { HiChatAlt2 } from "react-icons/hi";
const Feedback = () => {
  return (
    <div className='chatbot__feedback'>
      <div className='chatbot__header'>
        <h3 className='chatbot__title'><HiChatAlt2 size={25}/> Chatbot Feedback </h3>

      </div>

      <table className='chatbot__feedbackTable'>
        <thead>
          <tr>
            <th>UserId</th>
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
            <td>{moment(Date.now()).format('YYYY-mm')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Feedback
