import React, { useContext, useEffect, useState } from 'react'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './users.scss'
import moment from 'moment'
import axios from 'axios'
import Pagination from '../../ui/Pagination/Pagination'
import { FiRefreshCw } from "react-icons/fi";
import Modal from '../../ui/Modal/Modal'
import ModalUser from './ModalUser'
import { AuthContext } from '../../../context/authContext'
import { toast } from 'sonner'


const User = () => {
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const page = Number(searchParams.get('page')) || 1
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { currentUser } = useContext(AuthContext)
  // const [page, setPage] = useState(1)
  // const [totalPages, setTotalPages] = useState(0)
  // const [limt, setLimit] = useState(10)




  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users?page=${page}`)
        setUsers(res.data.users)
        setTotalPages(res.data.totalPages)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [page])



  const openModal = (userId) => {
    const selectedUser = users.find((user) => user.id === userId)
    setShowModal(true)
    setSelectedUser(selectedUser)
  }

  const handleNext = () => {
    if (page < totalPages) {
      const nextPage = page + 1
      navigate(`?page=${nextPage}`)
    }
  }

  const handlePrev = () => {
    if (page > 1) {
      const prevPage = page - 1
      navigate(`?page=${prevPage}`)
    } // decrement page number (for previous button to work) and navigate to new page (with updated query stringp)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users/${id}`,
        {
          withCredentials: true
        })
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users`)
      setUsers(res.data.users)
      toast.error('User deleted successfully')
    } catch (err) {
      console.log(err)
    }
  }

  const handleRefresh = async () => {
    // Manually fetch the data again when the refresh button is clicked.
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users?page=${page}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <div className='title'>
        <h3>Users</h3>
      </div>
      <div className="add">
        <div className="content">
          <div className='control_container'>
            <span className='add-button'><Link to='/dashboard/users'><FiPlusCircle size={20} />Add</Link></span>
            <button onClick={handleRefresh} className='btn_flat btn-small'><FiRefreshCw size={15} /></button>
          </div>

          <div className="card d-flex justify-center">
            <table className='full-width'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Img</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  {/* <th>Description</th> */}
                  <th>Date Created</th>

                  {currentUser.Role_Name === 'Admin' && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className='center'>{user.id}</td>
                    <td className='center profile'>
                      {user.img ? <img src={user.img} alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />}
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className='center'>{user.Role_Name}</td>
                    <td className='center'>{moment(user.Date_Created).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    {currentUser.Role_Name === 'Admin' && <td>
                      <div className='crud-btn'>
                        <button onClick={() => openModal(user.id)}>View</button>
                        <button onClick={() => handleDelete(user.id)}><FiTrash2 /></button>
                      </div>
                    </td>}
                  </tr>))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} next={handleNext} prev={handlePrev} />

        </div>
      </div>

      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <ModalUser user={selectedUser} closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  )
}

export default User
