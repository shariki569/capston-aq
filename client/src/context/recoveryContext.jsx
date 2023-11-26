import React, { createContext, useState } from 'react'

export const RecoveryContext = createContext();

export const RecoveryProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    

    return (
        <RecoveryContext.Provider value={{ email, setEmail, otp, setOtp }}>
            {children}
        </RecoveryContext.Provider>
    )
}