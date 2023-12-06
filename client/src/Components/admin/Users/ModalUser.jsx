import React, { useEffect, useState } from 'react'
import './users.scss'
import axios from 'axios'
import { FiCheckCircle } from 'react-icons/fi'
import { toast } from 'sonner'
import moment from 'moment'
const ModalUser = ({ user, closeModal }) => {
    const [role, setRole] = useState(user?.role || '')
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const handleUpdate = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users/role/${user.id}`,
                {
                    role: role
                },
                {
                    withCredentials: true
                })
            setLoading(true)
            closeModal()
            toast.success('User updated successfully!')
        } catch (err) {
            setErr(err.response.data)
            toast.error(err.response.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let timeoutId;
        if (success) {
            timeoutId = setTimeout(() => {
                setSuccess(false);
            }, 3000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [success]);
    console.log(success)
    return (
        <div className='user__modal'>
            <div className='user__modal__header'>

                <div className='user__modal__image'>
                    <img src={user?.img || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" />
                </div>
                <div className='user__modal-name'>
                    <h2>{user?.username}</h2>
                    <p>{user?.email}</p>
                </div>
            </div>
            <div className='user__modal__status'>

                {success ?
                    <div className='success'><FiCheckCircle />{success}</div> :
                    <div className='error'>{err}</div>
                }
            </div>


            <div className='user__modal__body'>
                <div className='user__modal__info'>
                    <h3>Role:</h3>
                    <select className='select_input' value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value='1'>Admin</option>
                        <option value='2'>Staff</option>
                        <option value='3'>User</option>
                    </select>
                </div>
                <div className='user__modal__info'>
                    <h3>Date Registered: </h3>
                    <span>{moment(user?.Date_Created).format('MMMM Do YYYY, h:mm:ss a')}</span>
                </div>

            </div>
            <div className='user__modal__footer'>
                {loading ? <span className='btn btn-small btn-loading'>Loading...</span> : <span className='btn btn-small' onClick={handleUpdate}>Save</span>}
                <span className='btn btn-small btn-err' onClick={closeModal}>Cancel</span>
            </div>
        </div>
    )
}

export default ModalUser