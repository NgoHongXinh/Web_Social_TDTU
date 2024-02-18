import axios  from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { BASE_URL, LOGIN_URL, OAUTH2_URL} from "../../../common/constant";
import {getLocalUsername, setCookieToken, setLocalUsername, removeLocalUsername, getCookieToken } from "../../../common/functions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons'
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google';
import { SocketContext } from '../../../thirdparty/socket';


// example: username.value = 'hello react'; console.log(username.value); 
const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

function LoginPage() {
    const [username, setUsername]= useState('');
    const password = useFormInput('');
    const [errMsg, setErrMsg] = useState(null);
    const [checkbox, setCheckbox] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const socket = useContext(SocketContext);
    const redirectPath = location.state?.path || '/';

    // check local storage
    useEffect(() => {
        const localUser = getLocalUsername();
        if (localUser) {
            setUsername(localUser);
            setCheckbox(true);
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('username', username);
        formData.append('password', password.value);

        try {
            const response = await axios.post(BASE_URL+"get-token", formData);
            console.log("da vao ", response)
            let expires = new Date()
            expires.setTime(expires.getTime() + (60 * 60 * 4 * 1000))

            setCookieToken(response.data.access_token, expires);
            // lưu phiện đăng nhập
            if (checkbox) {
                setLocalUsername(username);
            } else {
                removeLocalUsername();
            }
            if (getCookieToken() !== null){
                navigate(redirectPath, { replace: true });
            }
           

        } catch (err) {
            if (err.response.status === 400 || err.response.status === 401)
                setErrMsg("Tài khoản google khong phải do trường TDT cấp");
            else
                setErrMsg('Đã xảy ra lỗi. Thử lại sau!');
        }
    }

    
    const onSuccess = async (response) => {
        try {
            console.log(response, { "client_id": response['clientId'], "credential": response['credential']})
            
            const dataLoginResponse = await axios.post(BASE_URL+OAUTH2_URL,  { "client_id": response['clientId'], "credential": response['credential']})
            let expires = new Date()
            expires.setTime(expires.getTime() + (60 * 60 * 4 * 1000)) // hết hạn sau 4h 
            setCookieToken(dataLoginResponse.data.token, expires);
            navigate(redirectPath, { replace: true });

      
        } catch (err) {
            if (err.response.status === 400 || err.response.status === 401){

                setErrMsg("Tài khoản google khong phải do trường TDT cấp");
            }
       
            else
                setErrMsg('Đã xảy ra lỗi. Thử lại sau!');
        }
    }

    return (
        <GoogleOAuthProvider clientId='426416274883-i5379veh6gfj8oir6j0m6tnkmco705n0.apps.googleusercontent.com'>
        <div className='login row justify-content-center mt-5'>
            <div className='col-sm-8 col-md-6 col-xl-3'>
                <div className='login-form login-border1 border rounded'>
                    <div className='login-border2 border rounded bg-light p-3'>
                        <form className='form' onSubmit={handleSubmit}>
                            <div className='logo-network text-center w-100'>
                                <img src={""} alt='TDTU LOGO' width='128px' height='64px'></img>
                            </div>
                            <h2 className='text-center my-3 login-header'>Đăng nhập</h2>


                            <div className='form-group d-flex login-input-bar'>
                                <FontAwesomeIcon icon={farUser} className='my-auto me-2' />
                                <input type='text'
                                    name='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete='off'
                                    placeholder='Tài khoản'
                                />
                            </div>
                            <div className='form-group d-flex mt-2 mb-4 login-input-bar'>
                                <FontAwesomeIcon icon={faKey} className='my-auto me-2' />
                                <input type='password'
                                    name='password' {...password}
                                    placeholder='Mật khẩu'
                                />
                            </div>
                            <div className='text-center form-group'>
                                <button type='submit' className='login-button-submit'>ĐĂNG NHẬP</button>
                            </div>


                            <div className='form-group mt-2 me-2 d-flex justify-content-between fs-smaller'>
                                <div className='d-flex flex-row align-items-center text-secondary'>
                                    <input className='login-checkbox me-1' id='rememberCheckbox' type='checkbox' checked={checkbox} onChange={() => setCheckbox(!checkbox)} />
                                    <label htmlFor='rememberCheckbox'>Nhớ tài khoản</label>
                                </div>
                                <Link to='/forgot'>Quên mật khẩu?</Link>
                            </div>

                            <div className='form-group mt-4'>
                                <div className='div-class-login-gg border border-dark'>
                                        <GoogleLogin
                                            size="50px"
                                            width="100px"
                                            text="Đăng nhập với Google"
                                            onSuccess={(credentialResponse) => {
                                                onSuccess(credentialResponse)
                                                // console.log(credentialResponse);
                                            }}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                            />
                     
                                </div>
                            </div>

                            <div className='form-group text-center'>
                                <div className={errMsg ? 'p-2 mt-2 bg-danger text-white rounded' : 'offscreen'} aria-live='assertive'>{errMsg}</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        </GoogleOAuthProvider>
    );



}


export default LoginPage;