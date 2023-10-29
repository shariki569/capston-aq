import axios from "axios";
import { useEffect, useState } from "react";

export const useContactInfo = ( ) => {
    const [contactInfo, setContactInfo] = useState(null);

    const fetchContactData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/contacts/`);
            setContactInfo(res.data[0]);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchContactData();
    }, []);
    
    return {  contactInfo, fetchContactData };
};