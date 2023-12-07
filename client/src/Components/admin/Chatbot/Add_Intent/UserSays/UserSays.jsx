import React, { useState } from 'react'
import TextInput from '../../../../forms/FormFields/TextInput'
import { BiDotsVertical, BiReply, BiSolidTrash } from 'react-icons/bi'
import './userSays.scss'
import AddIntentInputs from '../../../Components/AddIntentInputs/AddIntentInputs'
const UserSays = ({ value, handleUserSaysInput, handleAddUserSays, preview, handleRemove }) => {

    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className='addIntent__userSays'>
            <AddIntentInputs
                searchPlaceholder='Search User Says'
                label='User Says'
                value={value}
                onChange={handleUserSaysInput}
                handleButton={handleAddUserSays}
                searchValue={searchTerm}
                searchValueChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='addIntent__userSaysTableContainer'>
                <table className='addIntent__userSaysTable'>
                    <tbody>
                        {preview
                            .filter(userSay => userSay?.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((userSay, index) => (
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


