import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import {getDataApiProfileUser, createNewFriendRequest} from "../../../common/callApi"
import PostInProfile from "./PostInProfile"
import { getCookieToken } from '../../../common/functions';
import "../../../css/userProfile.css"
function UserProfile(props) {
    const {usercode} = useParams()
    const [chooseMenu, setChooseMenu] = useState("post") // đang chọn tab menu nào post, user, fiend, mặc định là post
    const [inforUserInCurrentPage, setUserInfoCurrentPage] = useState() // thông tin của user ở trang cá nhân hiện tại theo usercode
    const token = getCookieToken()
    const [btnFriendStatus, setBtnFriendStatus] = useState() // dùng để gắn code html của nut bấm

    const callApiRequestNewFriend = async (usercode) =>{
        try {
            const result = await createNewFriendRequest(token, usercode);
            console.log(result?.response_status)
            if(result?.response_status.code == "00"){
                setBtnFriendStatus(
                    <div className='btn btn-success d-block d-md-inline-block lift send-friend-request'>Đã gửi lời mời</div>)
            }
          } catch (error) {
            console.error(error)
          }
    }
    function RequestNewFriend(e){
        var usercodeWantToRequest = e.target.attributes.getNamedItem('usercode').value;
        console.log(usercodeWantToRequest)
        callApiRequestNewFriend(usercodeWantToRequest)

    }
    useEffect(()=>{

        const dataProfileUser = async () =>{
            try {
                const result = await getDataApiProfileUser(token, usercode);
                console.log(result)
                setUserInfoCurrentPage(result)
              } catch (error) {
                console.error(error)
              }
        }
        dataProfileUser() 
    }, [])

    // phần hiển thị nút bạn bè/ thêm bạn/ đã gửi lời mời

    useEffect(()=> {
        if(inforUserInCurrentPage?.data.is_current_login_user === false){
            if(inforUserInCurrentPage?.data.friend_status === "friend"){
                setBtnFriendStatus(
                    <div className='btn btn-success d-block d-md-inline-block lift send-friend-request'>Bạn bè</div>)
            }
            if(inforUserInCurrentPage?.data.friend_status === "not_friend"){
                setBtnFriendStatus(
                    <div usercode={inforUserInCurrentPage?.data.user_code} onClick={RequestNewFriend} className='btn btn-success d-block d-md-inline-block lift send-friend-request'>Thêm bạn bè</div>)
            }
            if(inforUserInCurrentPage?.data.friend_status === "pendding"){
                setBtnFriendStatus(
                    <div className='btn btn-success d-block d-md-inline-block lift send-friend-request'> Đã gửi lời mời</div>)
            }
        }

    }, [inforUserInCurrentPage])



    return (
        <div className='container'>

            <div className='card bg-light listcard'>
                <div className='card-body h-100'>
                    <div className='header'>
                        <img src={inforUserInCurrentPage?.data.background_picture} alt='Blog img' className='header-img-top' width='100%' height='256px'></img>

                        <div className='container-fluid'>
                            <div className='header-body mt-n5 mt-md-n6'>
                                <div className='row align-items-end'>

                                    <div className='col-auto'>
                                        <div className='avatar avatar-xxl header-avatar-top'>
                                            <img alt='user logo' src={inforUserInCurrentPage?.data.picture} width='128px' hight='128px' className='avatar-img rounded-circle border border-4 border-body'></img>
                                        </div>

                                    </div>

                                    <div className='col mb-3 ml-n3 ml-md-n2'>
                                        <h1 className='header-title'>
                                            {inforUserInCurrentPage?.data.fullname}
                                        </h1>
                                        <h6 className='header-pretitle'>
                                            Class: {inforUserInCurrentPage?.data.class_name}
                                        </h6>

                                    </div>
                                    {/*- phần btn hiện thị kêt bạn/ban bè/đã gửi lời mời và btn tin nhắn
                                        - nut xem tin nhắn nếu là ở trang người khác sẽ là nhắn tin còn trang bản thân sẽ là vào trang tin nhắn*/}
                                    <div className='col-12 col-md-auto mt-2 mt-md-0 mb-md-3'>

                                        {btnFriendStatus}
                                        <button type='button' onClick={""} className='btn btn-primary d-block d-md-inline-block lift'>
                                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-chat-square-dots-fill' viewBox='0 0 16 16'>
                                                <path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
                                            </svg> {inforUserInCurrentPage?.data.is_current_login_user !== false ? 'Xem tin nhắn' : 'Nhắn tin'}
                                        </button>

                                    </div>
                                

                                </div>
                                <div className='row align-items-center'>
                                    <ul className='nav nav-tabs nav-overflow header-tabs'>
                                        <li className='nav-item'>
                                            <Link  to={`/profile/${usercode}/post`} className={chooseMenu === 'post' ? 'active nav-link' : 'nav-link'} onClick={() => { setChooseMenu('post') }}>Bài đăng</Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link  to={`/profile/${usercode}/friend`} className={chooseMenu === 'friend' ? 'active nav-link' : 'nav-link'} onClick={() => { setChooseMenu('friend') }}>Bạn bè</Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link  to={`/profile/${usercode}/infomation`} className={chooseMenu === 'infomation' ? 'active nav-link' : 'nav-link'} onClick={() => { setChooseMenu('infomation') }}>Thông tin</Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <Routes>
                    <Route path='/post' element={<PostInProfile usercode={usercode}/>}></Route>

                    {/* <Route path='/post'     component={() =><PostCard id={idUser} />}></Route> */}
                    {/* <Route path='/friend' element={<Friend />}></Route>
                    <Route path='/infomation' element={<Infor />}></Route> */}
                </Routes>
            </div>
        </div>


    )

}
export default UserProfile
