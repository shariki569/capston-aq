import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiAlertCircle, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import moment from 'moment';
import { useAccommodations, useDeleteAccomms } from '../../../API/fetchAccommodations';
import { toast } from 'sonner';
import Modal from '../../ui/Modal/Modal';
// import DataTable from '../../ui/DataTable(OnHold)';

const AccommodationMenu = () => {
  const { accomms, fetchData } = useAccommodations();
  const { deleteData } = useDeleteAccomms();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAccomm, setSelectedAccomm] = useState(null);

  const handleDelete = async () => {
    try {
      if (selectedAccomm && selectedAccomm.Accommodation_Id) {
        await deleteData(selectedAccomm.Accommodation_Id);
        
        toast.error(`Accommodation ${selectedAccomm.Accommodation_Title} has been deleted`);
      } else {
        console.error("Invalid accommodation data");
      }

    } catch (err) {
      console.log(err);
      toast.error(`Error deleting ${selectedAccomm.Accommodation_Title}`);
    } finally {
      setOpenDialog(false); // Close the confirmation dialog

    }
  };

  const handleClose = () => {
    setOpenDialog(!openDialog);
  }

  const handleSelection = (accommodationId) => {
    if (accommodationId) {
      // Existing accommodation, perform update
      const selectedAccomm = accomms.find((accomm) => accomm.Accommodation_Id === accommodationId);
      setSelectedAccomm(selectedAccomm);
    } else {
      // No accommodationId, indicating a new accommodation is being added
      setSelectedAccomm(null);
    }
    setOpenDialog(true);
  };
  useEffect(() => {
    fetchData();
  }, [accomms])

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
                  {/* <th>Description</th> */}
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
                    <td className='center'><img src={accomm.Accommodation_Img?.startsWith('http') ? accomm.Accommodation_Img : `../../upload/${accomm.Accommodation_Img}`} alt="" /></td>
                    <td className='center'>{accomm.Accommodation_Type}</td>
                    {/* <td className='description' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(accomm.Accommodation_Desc) }} /> */}
                    {/* <td className='description'>  {DOMPurify.sanitize(accomm.Accommodation_Desc)}</td> */}
                    <td className='center'>{accomm.Accommodation_Cap}</td>
                    <td>{accomm.Accommodation_Price}</td>
                    <td className='center'>{accomm.Accommodation_Unit}</td>
                    <td>
                      <div className='crud-btn'>
                        <Link state={accomm} to={`/dashboard/accommodations/write?edit=${accomm.Accommodation_Id}`}><button>Edit</button></Link>
                        <button
                          onClick={() => handleSelection(accomm.Accommodation_Id)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </table>
            {openDialog && (
              <Modal
                closeModal={handleClose}
                dialogMsg={`Are you sure you want to delete?`}
                symbol={<FiAlertCircle size={30} color='red' />}
              >
                <h2 className='confirm-msg'>
                  {selectedAccomm?.Accommodation_Title}
                </h2>
                <div className='group-btn'>
                  <span
                    className={`btn btn-small btn-right ${selectedAccomm?.Accommodation_Id ? '' : 'disabled'}`}
                    onClick={() => handleDelete(selectedAccomm?.Accommodation_Id)}
                  >
                    Yes
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

export default AccommodationMenu
