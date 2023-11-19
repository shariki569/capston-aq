import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import TextInput from '../forms/FormFields/TextInput.jsx'
import RecentPosts from '../ui/RecentPosts';
// import ChatbotRatings from '../ui/ChatbotRatings';
// import RatingsComponent from '../ui/RatingsComponent';
// import Feedback from './Chatbot/components/Feedback';
import UserBox from './Components/UserBox/UserBox';
import ChatbotRating from './Components/ChatbotRating/ChatbotRating';
import ChatbotFeedback from './Components/ChatbotFeedback/ChatbotFeedback';
import TotalFeedback from './Components/ChatbotFeedback/TotalChatbotFeedback/TotalFeedback';


const Dashboard = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='dashboard'>
      <div className='grid grid1'><UserBox/></div>
      <div className='grid grid2'><ChatbotRating/></div>
      <div className='grid grid3'><TotalFeedback/></div>
      <div className='grid grid4'></div>
      <div className='grid grid5'></div>
      <div className='grid grid6'><ChatbotFeedback/></div>
      <div className='grid grid7'></div>
      <div className='grid grid8'></div>
      {/* <div className='dashboard__user'>
        <div className='dashboard__imageWrap'>
          <img src={currentUser?.img} alt="" />
        </div>
        <div className='dashboard__userName'>
          <h3>Welcome</h3>
          <h2>{currentUser?.username}</h2>
        </div>
        <div className='dashboard__searchBar'>
          <TextInput placeholder='Search' />
        </div>
      </div> */}
      {/* <div className="dashboard"></div> */}
      {/* <div className='dashboard_PostSection'>
        <RecentPosts />
      </div> */}
      {/* <div className='dashboard_ChatbotSection'>
        <RatingsComponent />
        <Feedback/>
      </div> */}
    </div>

  )
}

export default Dashboard
