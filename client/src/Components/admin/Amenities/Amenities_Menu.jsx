import React from 'react'
import { useAmenities, useDeleteAmenity } from '../../../API/fetchAmenities'
import { Link } from 'react-router-dom'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'

const Amenities_Menu = () => {
    const { amenities, fetchData } = useAmenities()
    const { deleteData } = useDeleteAmenity();

    const handleDelete = async (amenityId) => {
        try {
            await deleteData(amenityId, fetchData);
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <>
            <div className="add">
                <div className="content">
                    <span className='add-button'><Link to='/dashboard/amenities/' ><FiPlusCircle size={20} />Add</Link></span>
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
                                            <td className='center'><img src={`../../upload/${amenity.Amenity_Img}`} alt="" /></td>
                                            <td className='center'>{amenity.Amenity_Title}</td>
                                            <td>
                                                <div className='crud-btn'>
                                                    <button>View</button>
                                                    <Link state={amenity} to={`/dashboard/accommodations/write?edit=${amenity.Amenity_Id}`}><button>Update</button></Link>
                                                    <button onClick={() => handleDelete(amenity.Amenity_Id)}><FiTrash2 /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Amenities_Menu
