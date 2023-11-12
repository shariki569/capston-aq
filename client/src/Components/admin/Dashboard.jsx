import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import TextInput from '../forms/FormFields/TextInput.jsx'
import RecentPosts from '../ui/RecentPosts';
// import ChatbotRatings from '../ui/ChatbotRatings';
import RatingsComponent from '../ui/RatingsComponent';
import Feedback from './Chatbot/components/Feedback';
import UserBox from './Components/UserBox/UserBox';


const Dashboard = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='dashboard'>
      <div className='grid grid1'><UserBox/></div>
      <div className='grid grid2'>Grid 2</div>
      <div className='grid grid3'>Grid 3</div>
      <div className='grid grid4'>Grid 4</div>
      <div className='grid grid5'>Grid 5</div>
      <div className='grid grid6'>Grid 6</div>
      <div className='grid grid7'>Grid 7</div>
      <div className='grid grid8'>Grid 8</div>
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
