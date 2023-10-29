import axios from "axios";
import { useEffect, useState } from "react";


export const useAmenities = () => {
    const [amenities, setAmenities] = useState([]);
    const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/amenities`);
            setAmenities(res.data);
        } catch (error) {
            
        }
    }
    useEffect(()  => {
        fetchData()
    }, []);

    return {amenities, fetchData};
}   

export const useDeleteAmenity = () => {
    const deleteData = async (amenityId, updateAmenity) => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/amenities/${amenityId}`)
            updateAmenity((prevAmenity) => prevAmenity.filter((amenity) => amenity.Amenity_Id !== amenityId))
        } catch (error) {
            console.log(error)
        }
    }
     return {deleteData}
}
