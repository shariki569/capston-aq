import React from 'react'
import { deleteFacility, useFacilities } from '../../../API/fetchFacilities'
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import moment from 'moment';

const Facilities = () => {
  const { facilities, fetchFacilities } = useFacilities();
  const { deleteData } = deleteFacility();
 
  const handleDelete = async (facId) => {
    try {
      await deleteData(facId, fetchFacilities);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="add">
        <div className="content">
          <span className='add-button'><Link to='/dashboard/facilities/write'><FiPlusCircle size={20} />Add</Link></span>
          <div className="card d-flex justify-center">
            <table className='full-width'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Img</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {facilities.map((facility) => (
                  <tr key={facility.Fac_Id}>
                    <td className='center'>{facility.Fac_Id}</td>
                    <td className='center'>{facility.Fac_Title}</td>
                    <td className='center'><img src={ `/upload/${facility.Featured_Image}`} alt="" /></td>
                    <td className='description'>{facility.Fac_Desc}</td>
                    <td>{moment(facility.Fac_Date).format("YYYY-MM-DD")}</td>
                    <td className='center'>
                      <div className='crud-btn'>
                        <button>View</button>
                        <Link state={facility} to={`/dashboard/facilities/write?edit=${facility.Fac_Id}`}><button>Edit</button></Link>
                        <button onClick={() => handleDelete(facility.Fac_Id)}><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  )
}

export default Facilities
