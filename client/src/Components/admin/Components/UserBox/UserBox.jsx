import { useContext } from 'react';
import { AuthContext } from '../../../../context/authContext';
import './userBox.scss';
import TextInput from '../../../forms/FormFields/TextInput';
import TimeComponent from '../../../ui/TimeComponent/TimeComponent';
import { BiSearch } from 'react-icons/bi';

const UserBox = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='userBox'>
      <div className='userBox__wrap'>
        <div className="userBox__imageWrap">
         {currentUser?.img ? ( <img src={currentUser?.img} alt="" />) : ( <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt="" />)}
        </div>
        <div className='userBox__userName'>
          <h3>Welcome Back!</h3>
          <h2>{currentUser?.username}</h2>
        </div>
      </div>

      <div className='userBox__searchBar'>
        <div className="userBox__searchIcon">
          < BiSearch size={20} />
        </div>
        <div className='userBox__search'>
          <TextInput placeholder='Search' />
        </div>

      </div>
      <div className='userBox__Time'>
        <TimeComponent />
      </div>

    </div>
  )
}

export default UserBox
