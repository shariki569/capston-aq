import React, { useState } from 'react'
import TextInput from '../../../../forms/FormFields/TextInput'
import { BiDotsVertical, BiReply, BiSolidTrash } from 'react-icons/bi'
import './userSays.scss'
import AddIntentInputs from '../../../Components/AddIntentInputs/AddIntentInputs'
const UserSays = ({value, handleUserSaysInput, handleAddUserSays, preview, handleRemove}) => {
    // const [userSaysInput, setUserSaysInput] = useState('');
    // const [userSaysPreview, setUserSaysPreview] = useState([]);

    // const handleUserSaysInput = (e) => {
    //     setUserSaysInput(e.target.value);
    // };

    // const handleAddUserSays = () => {
    //     if (userSaysInput.trim() !== '') {
    //         setUserSaysPreview((prevUserSays) => [...prevUserSays, userSaysInput.trim()]);
    //         setUserSaysInput('');
    //     }
    // };

    // const handleRemoveUserSays = (index) => {
    //     const updatedUserSays = [...userSaysPreview];
    //     updatedUserSays.splice(index, 1);
    //     setUserSaysPreview(updatedUserSays);
    // };
  
    return (
        <div className='addIntent__userSays'>
            <AddIntentInputs
                searchPlaceholder='Search User Says'
                label='User Says'
                value={value}
                onChange={handleUserSaysInput}
                handleButton={handleAddUserSays}
            />
            <div className='addIntent__userSaysTableContainer'>
                <table className='addIntent__userSaysTable'>
                    <tbody>
                        {/* {tempUserSays.map((tempUserSay, index) => (
                            <tr key={index}>
                                <td>{tempUserSay}</td>
                                <td className='addIntent__intentDots'>
                                    <BiSolidTrash size={20} />
                                </td>
                            </tr>
                        ))} */}
                        {preview && preview.map((userSay, index) => (
                            <tr key={index}>
                                <td>{userSay}</td>
                                <td className='addIntent__userSaysDelete'>
                                    <BiSolidTrash size={20} onClick={() => handleRemove(index)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default UserSays


// {/* <div className='addIntent__userSays'>
// <AddIntentInputs
//     searchPlaceholder='Search User Says'
//     label='User Says'
//     value={userSaysInput}
//     onChange={handleUserSaysInput}
//     handleButton={handleAddUserSays}
// />
// <div className='addIntent__userSaysTableContainer'>
//     <table className='addIntent__userSaysTable'>
//         <tbody>
//             {/* {tempUserSays.map((tempUserSay, index) => (
//                 <tr key={index}>
//                     <td>{tempUserSay}</td>
//                     <td className='addIntent__intentDots'>
//                         <BiSolidTrash size={20} />
//                     </td>
//                 </tr>
//             ))} */}
//             {userSaysPreview.map((userSay, index) => (
//                 <tr key={index}>
//                     <td>{userSay}</td>
//                     <td className='addIntent__intentDots'>
//                         <BiSolidTrash size={20} onClick={() => handleRemoveUserSays(index)} />
//                     </td>
//                 </tr>
//             ))}
//         </tbody>
//     </table>
// </div>

// </div> */}