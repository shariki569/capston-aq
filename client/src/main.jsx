import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { HelmetProvider } from 'react-helmet-async';


ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
        <AuthContextProvider>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </AuthContextProvider>
    </React.StrictMode>


);

// export default main
