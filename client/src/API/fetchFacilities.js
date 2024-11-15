import axios from "axios";
import { useEffect, useState } from "react";



export const useFacilities = () => {
    const [facilities, setFacilities] = useState([]);
    
    const fetchFacilities = async () => {
        try {
            const res = await axios.get('/api/facilities');
            setFacilities(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        fetchFacilities();
    }, []);
    
    return { facilities, fetchFacilities };
}


export const deleteFacility = () => {
    const deleteData = async (facId, updateFacility) => {
        try {
            await axios.delete(`/api/facilities/${facId}`);
            updateFacility((prevFacilities) =>
                prevFacilities.filter((fac) => fac.Fac_Id !== facId)
            );
        } catch (err) {
            console.log(err);
        }
    }
    
    return {deleteData};
  }