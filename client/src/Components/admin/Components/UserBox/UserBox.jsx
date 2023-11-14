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
          <img src={currentUser?.img} alt="" />
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
