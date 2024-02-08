import { NavLink, useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import {getDataApiDetailUserLogin} from "../../../common/callapi/user"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {getCookieToken} from '../../../common/functions'
import Popup from 'reactjs-popup';
import "../../../css/Nav.css"

function NavBar() {
    const [nameUser, setNameUser] =  useState()
    const [userLogin, setUserLogin] = useState()
    var token = getCookieToken()
    console.log(token)
    useEffect(()=>{

        const dataProfileUser = async () =>{
            try {
                const result = await getDataApiDetailUserLogin(token);
                console.log(result)
                setUserLogin(result)
              } catch (error) {
                console.error(error)
              }
        }
        dataProfileUser() 
    }, [])
    return (
        <>
            <div className='bg-top-color'></div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='d-flex justify-content-between w-100 mx-5'>
                    <NavLink to='/' className='navbar-brand'>
                        <img src={""} alt='TDTU logo' width='52px' height='26px'></img>
                    </NavLink>

                    <form className='d-flex rounded-pill px-3 search-bar' onSubmit={""}>
                        <input type='text' className='search-input py-2' placeholder='Tìm kiếm bạn bè...' onChange={(e) => { setNameUser(e.target.value) }}></input>
                        <button type="submit" className="btn"><FontAwesomeIcon icon={faSearch} className='my-auto' /></button>
                    </form>

                    <div className='d-flex flex-row my-auto'>
                        <Popup
                            trigger={
                                <div>
                                    <img src={userLogin?.data['picture']} className='rounded-circle nav-avatar' alt='avatar'></img>
                                </div>
                            }
                            position='bottom center'
                        >
                            <div className='menu-popup d-flex flex-column'>
                                <button type='button' className='btn btn-light mb-2'><Link className='btn-link-text' to={`/account/${""}/setting`}>Sửa thông tin cá nhân</Link></button>
                                <button type='button' className='btn btn-light' onClick={""}>Đăng xuất</button>
                            </div>
                        </Popup>
                        <Link className='ms-2 text-dark fw-bold text-decoration-none' to={`/profile/${userLogin?.data.user_code}/post/`} state={{ "usercode":userLogin?.data.user_code }}> {userLogin?.data.fullname}</Link>
                    </div>
                </div>


            </nav>
        </>
    );
}
export default NavBar