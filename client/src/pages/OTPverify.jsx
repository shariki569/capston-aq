import React, { useContext, useState } from 'react'
import TextInput from '../Components/forms/FormFields/TextInput'
import { RecoveryContext } from '../context/recoveryContext'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResetPassword from './ResetPassword';


const OTPverify = () => {
    const { email, setEmail, setOtp, otp } = useContext(RecoveryContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [OTPinput, setOTPinput] = useState(['', '', '', '']);
    const [disable, setDisable] = useState(true);
    const [error, setError] = useState('');
    const [resetPasswordMode, setResetPasswordMode] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const handleSend = async () => {
        try {
            setLoading(true);

            await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/send-otp`, {
                email
            })
            // navigate('/reset-password');
            setEmailSent(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    const enteredOTP = parseInt(OTPinput.join(''));

    const handleVerify = async () => {

        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/verify-otp`,
                {
                    email,
                    otp: enteredOTP.toString(),
                }
            )

            const data = res.data;
            if (data.success) {
                setOtp(enteredOTP);
                setResetPasswordMode(true);
            } else {
                alert(data.message);
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const handleResetPassword = async () => {
        try {
            if (password !== confirmPassword) {
                setPasswordErr('Passwords do not match');
                return;
            }
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/reset-password`,
                {
                    email,
                    newPassword: password,
                    otp: enteredOTP.toString(),

                }
            )
            const data = res.data;
            if (data.success) {
                navigate('/login');
            } else {
                setError(data.message || 'Password reset failed');
            }

        }
        catch (err) {
            setError(err.message);
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className='auth'>
            <h1>Password Reset</h1>
            <div className='form'>
                <div className='form-group'>
                    {resetPasswordMode ? (
                        <ResetPassword
                            onChangePassword={(e) => setPassword(e.target.value)}
                            onChangeConfirmPassword={(e) => setConfirmPassword(e.target.value)}
                            password={password}
                            confirmPassword={confirmPassword}
                            handleSubmit={handleResetPassword}
                            err={passwordErr}
                        />
                    ) : emailSent ? (<>
                        <div className='otp-header'>
                            <h2>We have sent the code to your email {email}</h2>
                        </div>
                        <div className='otp-inputs'>
                            <div className='otp-wrapper'>
                                <TextInput
                                    type="text"
                                    onChange={(e) => setOTPinput([
                                        e.target.value,
                                        OTPinput[1],
                                        OTPinput[2],
                                        OTPinput[3]

                                    ])}
                                    containerClass='otp-input'
                                    max={1}
                                    value={OTPinput[0]}
                                />
                            </div>
                            <div className='otp-wrapper'>
                                <TextInput
                                    type="text"
                                    onChange={(e) => setOTPinput([
                                        OTPinput[0],
                                        e.target.value,
                                        OTPinput[2],
                                        OTPinput[3],

                                    ])}
                                    containerClass='otp-input'
                                    max={1}
                                    value={OTPinput[1]}
                                />
                            </div>
                            <div className='otp-wrapper'>
                                <TextInput
                                    type="text"
                                    onChange={(e) => setOTPinput([
                                        OTPinput[0],
                                        OTPinput[1],
                                        e.target.value,
                                        OTPinput[3],

                                    ])}
                                    containerClass='otp-input'
                                    max={1}
                                    value={OTPinput[2]}
                                />
                            </div>
                            <div className='otp-wrapper'>
                                <TextInput
                                    type="text"
                                    onChange={(e) => setOTPinput([
                                        OTPinput[0],
                                        OTPinput[1],
                                        OTPinput[2],
                                        e.target.value,

                                    ])}
                                    containerClass='otp-input'
                                    max={1}
                                    value={OTPinput[3]}
                                />
                            </div>
                        </div>
                        <div className='otp-footer'>
                            <p>Didn't get the code?<button>Resend</button></p>
                            {loading ?
                                <button className='btn btn-full btn-loading '>Sending...</button>
                                :
                                <button className='btn btn-full ' onClick={handleVerify}>Verify OTP</button>
                            }
                            {error && <p>{error}</p>}
                        </div>
                    </>
                    ) : (
                        <>
                            <TextInput
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                placeholder='Enter your email address'
                                label="Enter your user account's verified email address and we will send you a password reset link."
                            />
                            {/* {error && <p>{error}</p>} */}
                            <div className='form-footer'>
                                {loading ?
                                    <button className='btn btn-full btn-loading '>Sending...</button>
                                    :
                                    <button className='btn btn-full ' onClick={handleSend}>Verify Account</button>
                                }
                            </div>
                        </>
                    )}
                </div>

                <span><Link to='/login'>Go to Login</Link></span>

            </div>
        </div >
    )
}

export default OTPverify
