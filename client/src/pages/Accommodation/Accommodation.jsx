import React, { useEffect, useState } from "react";
import Header from "../../Components/ui/Header";
import headerImage from "../../img/Accommodation-Header.webp";

import { FiHome, FiUser } from "react-icons/fi";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import Accommodation_Items from "./Accommodation_Items";
const Accommodation = () => {



  // const type = useLocation().search;



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`/api/accommodations/${type}`);
  //       setAccomms(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [type]);



  return (
    <div className="container">
      <Header
        imageUrl={headerImage}
        title="Accomodations"
        state=""
      />

      <Accommodation_Items />

    </div>
  );
};

export default Accommodation;
