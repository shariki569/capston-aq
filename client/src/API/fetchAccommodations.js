import axios from "axios";
import { useEffect, useState } from "react";

//Get a single Accommodation data
export const useSingleAccommData = () => {
  const [accomm, setAccomm] = useState({});
  const accommId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/accommodations/${accommId}`);
        setAccomm(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [accommId]);

  return { accomm };
};
// //Get all the Accommodation data
export const useAccommodations = (type = "") => {
  const [accomms, setAccomms] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/accommodations/${type}`);
      setAccomms(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  return { accomms, fetchData }; // Return fetchData from the hook
};

export const useDeleteAccomms = () => {
  const deleteData = async (accommId, updateAccomm) => {
    try {
      await axios.delete(`/api/accommodations/${accommId}`);
      // Update the accommodations list after deletion
      updateAccomm((prevAccomms) =>
        prevAccomms.filter((accomm) => accomm.Accommodation_Id !== accommId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return { deleteData };
};


export const useRandomAccommodation = (type = "", currentAccommodationId = "") => {
  const [randomAccommodation, setRandomAccommodation] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/accommodations/?type=${type}`);
      const accommodations = res.data;
      const filteredAccommodations = currentAccommodationId
      ? accommodations.filter(accomm => accomm.Accommodation_Id !== currentAccommodationId)
      : accommodations;

    // Select a random accommodation from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredAccommodations.length);
    const randomAccommodation = filteredAccommodations[randomIndex];
    setRandomAccommodation(randomAccommodation);
      
    } catch (err) {
      console.log(err);
    }
  };
 

  useEffect(() => {
    fetchData();
  }, [type, currentAccommodationId]);

  return randomAccommodation;
};