import React, { useEffect, useState } from "react";
import Header from "../../Components/ui/Header";
import headerImage from "../../img/Accommodation-Header.webp";

import { FiHome, FiUser } from "react-icons/fi";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import Accommodation_Items from "./Accommodation_Items";
import SEO from "../../Components/SEO/SEO";
import ScrollToTop from "../../Components/Hoc/ScrollToTop";
const Accommodation = () => {


  return (
    <>
      <SEO
        title="Accommodation | Aqua Cainta Resort"
        description="Accommodations"
        name="Aqua Cainta Resort"
        type="Accommodation"
        url="https://aquacaintaresort.netlify.app/"
        hashtag="#AquaCaintaResort"
        image={headerImage}
        quote="Accommodations"
      />
      <div className="container">

        <Header
          imageUrl={headerImage}
          title="Accommodations"
          small
        />

        <Accommodation_Items />

      </div>
    </>

  );
};

export default ScrollToTop(Accommodation);
