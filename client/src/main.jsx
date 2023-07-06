import React from 'react'
import ReactDOM  from 'react-dom/client'
import App from './App';
import { AuthContextProvder } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContextProvder>
            <App />
        </AuthContextProvder>
    </React.StrictMode>
);

// export default main
