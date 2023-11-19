// import { useNavigate } from "react-router-dom";
// import axios from "axios"

// const axiosWithInterceptor = axios.create();

// export default function useAxiosWithInterceptor() {
//   const navigate = useNavigate();

//   axiosWithInterceptor.interceptors.request.use((config) => {
//     const token = document.cookie.split(';').find(row => row.startsWith('access_token')).split('=')[1];
//     if (!token) {
//       navigate('/login');
//     }
//     return config;
//   });

//   return axiosWithInterceptor;
// }