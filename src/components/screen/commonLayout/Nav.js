import { NavLink, useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import {getDataApiDetailUserLogin} from "../../../common/callapi/user"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {getCookieToken} from '../../../common/functions'
import { getDataApiNumberNotification } from "../../../common/callapi/notification"
import Popup from 'reactjs-popup';
import Notification from '../notification/Notification';
import { SocketContext } from '../../../thirdparty/socket';
import "../../../css/Nav.css"

function NavBar() {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState()
    const [nameOfUserWantToFind, setNameUserWantToFind] = useState()
    var token = getCookieToken()
    const [numberNotiNotRead, setNumberNotiNotRead] = useState(0)
    const socket = useContext(SocketContext);
    const numberNoti = async () =>{
        try {
            const userInfo = await getDataApiNumberNotification(token);
            setNumberNotiNotRead(userInfo?.data.number_noti_not_read)
          } catch (error) {
            console.error(error)
          }
    }
    useEffect(()=>{
        const dataProfileUser = async () =>{
            try {
                const userInfo = await getDataApiDetailUserLogin(token);

                setUserLogin(userInfo)
                console.log("111111111", userLogin, socket.id)
                socket.emit("new_user_connect", userInfo?.data.user_code);
     
              } catch (error) {
                console.error(error)
              }
        }
        dataProfileUser() 
        numberNoti()
    }, [])
    useEffect(()=>{
        socket.on("send_noti", (data) => {
            console.log("fffffffffffffffffff", data, numberNotiNotRead)
            numberNoti()
        });
    }, [socket])
    
    function finUserByName(event){
        event.preventDefault();
        if (nameOfUserWantToFind?.length > 0)
            navigate(`/find-user/?name=${nameOfUserWantToFind}`,{ replace: true });
    }
    console.log(numberNotiNotRead)
    return (
        <>
            <div className='bg-top-color'></div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='d-flex justify-content-between w-100 mx-5'>
                    <NavLink to='/' className='navbar-brand'>
                        <img src={""} alt='TDTU logo' width='52px' height='26px'></img>
                    </NavLink>

                    <form className='d-flex rounded-pill px-3 search-bar' onSubmit={finUserByName}>
                        <input type='text' className='search-input py-2' placeholder='Tìm kiếm bạn bè...' onChange={(event) => {setNameUserWantToFind(event.target.value)}}></input>
                        <button type="submit" className="btn"><FontAwesomeIcon icon={faSearch} className='my-auto' /></button>
                    </form>

                    <div className='d-flex flex-row my-auto'>
                    <Popup
                        trigger={
                            <div>
                            <div className='noti-style'>
                           <div className='style-number-noti'>{numberNotiNotRead}</div> 
                      
                              <svg
                                viewBox="0 0 24 24"
                                className="r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                                width='30px'
                                fill="#122C34"
                              >
                                <g>
                                  <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        }
            
                        position='bottom right'
                    >
                        <Notification
                        setNumberNotiNotRead= {setNumberNotiNotRead}
                            // loadingNotiList={loadingNotiList}
                            // setNotificationInfo={setNotificationInfo}
                            // lenNotification={lenNotification}
                            // noifiInfos={notificationInfos}
                            // numberNotiNotChecked={numberNotiNotChecked}
                            // setNumberNotiNotChecked={setNumberNotiNotChecked}
                        />

                    </Popup>
                        <Popup
                            trigger={
                                <div>
                                    <img src={userLogin?.data['picture']} className='rounded-circle nav-avatar' alt='avatar'></img>
                                </div>
                            }
                            position='bottom center'
                        >
                            <div className='menu-popup d-flex flex-column'>
                                <button type='button' className='btn btn-light mb-2'><Link className='btn-link-text' to={`'/user/${""}/update-info`}>Sửa thông tin cá nhân</Link></button>
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