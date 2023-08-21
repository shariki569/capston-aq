import React, { useEffect, useState } from 'react'
import dummyImg from '../../../img/Large-cottage.webp'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import DOMPurify from 'dompurify';
import { FiPlusCircle } from 'react-icons/fi';

const AccommodationMenu = () => {
  
  const [accomms, SetAccomms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/accommodations`);
        SetAccomms(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [])

  const handleDelete = async (accommId) => {
    try {
      await axios.delete(`/api/accommodations/${accommId}`)
      // Update the accommodations list after deletion
      SetAccomms(accomms.filter((accomm) => accomm.Accommodation_Id !== accommId))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="add">
        <div className="content">
          <span className='add-button'><Link to='/dashboard/accommodation-menu/write'><FiPlusCircle size={20}/>Add</Link></span>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Img</th>
                <th>Accomm_Type</th>
                <th>Description</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Units</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accomms.map((accomm) => (
                <tr key={accomm.Accommodation_Id}>
                  <td>{accomm.Accommodation_Id}</td>
                  <td>{accomm.Accommodation_Title}</td>
                  <td><img src={`../../upload/${accomm.Accommodation_Img}`} alt="" /></td>
                  <td>{accomm.Accommodation_Type}</td>
                  <td className='description' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(accomm.Accommodation_Desc) }}></td>
                  <td>{accomm.Accommodation_Cap}</td>
                  <td>{accomm.Accommodation_Price}</td>
                  <td>{accomm.Accommodation_Unit}</td>
                  <td>
                    <div className='crud-btn'>
                      <button>View</button>
                      <Link state={accomm} to={`/dashboard/accommodation-menu/write?edit=${accomm.Accommodation_Id}`}><button>Update</button></Link>
                      <button onClick={() => handleDelete(accomm.Accommodation_Id)}>Delete</button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AccommodationMenu
