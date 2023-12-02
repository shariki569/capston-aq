import axios from "axios";
import { useEffect, useState } from "react";

export const useAboutPageData = () => {
  const [pageData, setPageData] = useState(null);

  const fetchAboutData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/pages/`);
      setPageData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return { pageData, fetchAboutData };
};
