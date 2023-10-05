import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import DOMPurify from 'dompurify';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import moment from 'moment';
import { useAccommodations, useDeleteAccomms } from '../../../API/fetchAccommodations';
// import DataTable from '../../ui/DataTable(OnHold)';

const AccommodationMenu = () => {

  const { accomms, fetchData } = useAccommodations();
  const { deleteData } = useDeleteAccomms();

  const handleDelete = async (accommId) => {
    try {
      await deleteData(accommId, fetchData); // Pass setAccomms function to update the accommodations list
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="add">
        <div className="content">
          <span className='add-button'><Link to='/dashboard/accommodations/write'><FiPlusCircle size={20} />Add</Link></span>
          <div className="card d-flex justify-center">
            <table className='full-width'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Img</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Capacity</th>
                  <th>Price</th>
                  <th>No. of Units</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accomms.map((accomm) => (
                  <tr key={accomm.Accommodation_Id}>
                    <td className='center'>{accomm.Accommodation_Id}</td>
                    <td className='center nowrap'>{moment(accomm.Accommodation_Date).format("YYYY-MM-DD")}</td>
                    <td className='center'>{accomm.Accommodation_Title}</td>
                    <td className='center'><img src={`../../upload/${accomm.Accommodation_Img}`} alt="" /></td>
                    <td className='center'>{accomm.Accommodation_Type}</td>
                    <td className='description' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(accomm.Accommodation_Desc) }} />
                    {/* <td className='description'>  {DOMPurify.sanitize(accomm.Accommodation_Desc)}</td> */}
                    <td className='center'>{accomm.Accommodation_Cap}</td>
                    <td>{accomm.Accommodation_Price}</td>
                    <td className='center'>{accomm.Accommodation_Unit}</td>
                    <td>
                      <div className='crud-btn'>
                        <button>View</button>
                        <Link state={accomm} to={`/dashboard/accommodations/write?edit=${accomm.Accommodation_Id}`}><button>Update</button></Link>
                        <button onClick={() => handleDelete(accomm.Accommodation_Id)}><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </table>
            {/* 
            <DataTable
              columns={accommodationColumns}
              data={accomms}
              actions={accommodationActions}
            /> */}

          </div>
        </div>
      </div>
    </>
  )
}

export default AccommodationMenu
