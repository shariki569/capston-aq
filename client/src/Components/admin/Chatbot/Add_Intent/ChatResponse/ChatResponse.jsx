import React, { useState } from 'react'
import TextInput from '../../../../forms/FormFields/TextInput'
import { BiSolidTrash } from 'react-icons/bi'
import './chatResponse.scss'
import AddIntentInputs from '../../../Components/AddIntentInputs/AddIntentInputs'
const ChatResponse = ({ value, handleChatResponseInput, handleAddChatResponse, preview, handleRemove }) => {
   
    return (
        <div className='addIntent__responses'>
            <AddIntentInputs
                value={value}
                onChange={handleChatResponseInput}
                onClick={handleAddChatResponse}
                label='Chatbot Responses'
                searchPlaceholder='Search Response'
                handleButton={handleAddChatResponse}
            />
            <div className='addIntent__responsesTableContainer'>
                <table className='addIntent__userSaysTable'>
                    <tbody>
                        {
                            preview && preview.map((response, index) => (
                                <tr key={index}>
                                    <td>{response}</td>
                                    <td className='addIntent__chatResponseTrash'><BiSolidTrash size={20} onClick={() => handleRemove(index)}/></td>
                                </tr>
                            ))
                        }
                
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ChatResponse