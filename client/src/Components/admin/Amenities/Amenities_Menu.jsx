import React, { useContext, useState } from 'react'
import { useAmenities, useDeleteAmenity } from '../../../API/fetchAmenities'
import { Link } from 'react-router-dom'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import Modal from '../../ui/Modal/Modal'
import Amenity_Add from './Amenity_Add'
import { toast } from 'sonner'
import { FiAlertCircle } from "react-icons/fi";
import { AuthContext } from '../../../context/authContext'
const Amenities_Menu = () => {
    const { amenities, fetchData } = useAmenities()
    const [openModal, setOpenModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAmenity, setSelectedAmenity] = useState(null);
    const { deleteData } = useDeleteAmenity();
    const { currentUser } = useContext(AuthContext);

    const handleDelete = async () => {
        try {
            if (selectedAmenity && selectedAmenity.Amenity_Id) {
                await deleteData(selectedAmenity.Amenity_Id);
                toast.error(`${selectedAmenity.Amenity_Title} has been deleted`);
            } else {
                console.error("Invalid amenity data");
            }
        } catch (err) {
            console.log(err);
            toast.error("Error deleting amenity");
        } finally {
            fetchData();
            setOpenDialog(false); // Close the confirmation dialog
        }
    };

    const handleDialog = (amenityId) => {
        handleSelection(amenityId, setOpenDialog);
    }

    const handleSelection = (amenityId, setOpenFunction) => {
        if (amenityId) {
            // Existing amenity, perform update
            const selectedAmenity = amenities.find((amenity) => amenity.Amenity_Id === amenityId);

            setSelectedAmenity(selectedAmenity);
        } else {
            // No amenityId, indicating a new amenity is being added
            setSelectedAmenity(null);
        }
        setOpenFunction(true);
    }

    const handleOpen = (amenityId) => {
        handleSelection(amenityId, setOpenModal);
    }
    const handleClose = () => {
        setOpenModal(false)
    }


    return (
        <>
            <div className="add">
                <div className="content">
                    <span className='add-button' onClick={handleOpen}> <FiPlusCircle size={20} />Add</span>
                    <div className="card d-flex justify-center">
                        <table className='full-width'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Icon</th>
                                    <th>Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    amenities.map((amenity) => (
                                        <tr key={amenity.Amenity_Id}>
                                            <td className='center'>{amenity.Amenity_Id}</td>
                                            <td className='center'><img src={amenity.Amenity_Img.startsWith(`http`) ? amenity.Amenity_Img : `../../upload/${amenity.Amenity_Img}`} alt="" /></td>
                                            <td className='center'>{amenity.Amenity_Title}</td>
                                            <td>
                                                <div className='crud-btn'>

                                                    <button onClick={() => handleOpen(amenity.Amenity_Id)}><span>Edit</span></button>
                                                {currentUser.Role_Name === 'Admin' &&   <button onClick={() => handleDialog(amenity.Amenity_Id)}><FiTrash2 /></button>}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {openModal &&
                        <Modal
                            open={openModal}
                            closeModal={handleClose}
                            handleOpen={handleOpen}
                        >
                            <Amenity_Add fetchData={selectedAmenity} close={handleClose} refreshData={fetchData}/>
                        </Modal>
                    }

                    {openDialog &&
                        <Modal
                            closeModal={handleDialog}
                            dialogMsg={`Are you sure you want to delete ${selectedAmenity?.Amenity_Title}?`}
                            symbol={<FiAlertCircle size={30} color='red' />}
                        >
                            <div className='group-btn'>
                                <span className={`btn btn-small btn-right ${selectedAmenity?.Amenity_Id ? '' : 'disabled'}`} onClick={() => handleDelete(selectedAmenity?.Amenity_Id)}>Yes</span>
                                <span className='btn btn-err btn-small' onClick={handleDialog}>No</span>
                            </div>
                        </Modal>

                    }
                </div>
            </div>
        </>
    )
}

export default Amenities_Menu
