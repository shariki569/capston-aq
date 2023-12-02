import React, { useEffect, useState } from 'react'
import { deleteFacility, useFacilities } from '../../../API/fetchFacilities'
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import moment from 'moment';
import Modal from '../../ui/Modal/Modal';
import { toast } from 'sonner';

const Facilities = () => {
  const { facilities, fetchFacilities } = useFacilities();
  const { deleteData } = deleteFacility();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState(null);


  const handleDelete = async () => {
    try {
      toast.error(`Facility ${selectedFacilities.Fac_Title} has been deleted`);
      handleClose();
      await deleteData(selectedFacilities?.Fac_Id);
    } catch (err) {
      console.error(err);
      toast.error(`Error deleting ${selectedFacilities.Fac_Title}`);
    } finally {
      fetchFacilities();
    }
  };

  const handleSelection = (facId) => {
    if (facId) {
      // Existing accommodation, perform update
      const selectedFacility = facilities.find((fac) => fac.Fac_Id === facId);
      setSelectedFacilities(selectedFacility);
    } else {
      // No accommodationId, indicating a new accommodation is being added
      setSelectedFacilities(null);
    }
    setOpenDialog(true);
  };

  
  const handleClose = () => {
    setOpenDialog(false);
  }

  useEffect(() => {
    fetchFacilities();
  }, [facilities]);

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
                    <td className='center'><img src={facility.Featured_Image?.startsWith('http') ? facility.Featured_Image : `../../upload/${facility.Featured_Image}`} alt="" /></td>
                    <td className='description'>{facility.Fac_Desc}</td>
                    <td>{moment(facility.Fac_Date).format("YYYY-MM-DD")}</td>
                    <td className='center'>
                      <div className='crud-btn'>

                        <Link state={facility} to={`/dashboard/facilities/write?edit=${facility.Fac_Id}`}><button>Edit</button></Link>
                        <button onClick={() => handleSelection(facility.Fac_Id)}><FiTrash2 /></button>

                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
            {openDialog && (
              <Modal
                closeModal={handleClose}
                dialogMsg={`Are you sure you want to delete?`}
                symbol={<FiAlertCircle size={30} color='red' />}
              >
                <h2 className='confirm-msg'>
                  {selectedFacilities?.Fac_Title}
                </h2>
                <div className='group-btn'>
                  <span
                    className={`btn btn-small btn-right ${selectedFacilities?.Fac_Id ? '' : 'disabled'}`}
                    onClick={() => handleDelete(selectedFacilities?.Fac_Id)}
                  >Yes
                  </span>
                  <span className='btn btn-err btn-small' onClick={handleClose}>No</span>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Facilities
