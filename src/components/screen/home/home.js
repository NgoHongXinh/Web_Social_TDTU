import React, { useState, useEffect, useContext} from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import {getDataApiDetailUserLogin} from "../../../common/callapi/user";
import {getCookieToken} from '../../../common/functions'
import { SocketContext } from '../../../thirdparty/socket';
import Comment from './Comment';
import "../../../css/home.css"
import Popup from 'reactjs-popup';
import ModalPost from '../post/ModalPost';

function HomePage(props) {
    const { currUserInfo } = props
    const [showComment, setShowComment] = useState(false)
    const [postcodeState, setPostCode] = useState()
    const [userLogin, setUserLogin] = useState()
    var token = getCookieToken()
    const socket = useContext(SocketContext);
    
    const {close} = useParams()
    function getComments(e){
        var getPostcode =  e.target.attributes.getNamedItem('postcode').value
        setPostCode(getPostcode)
        console.log("vao fnef",getPostcode, postcodeState)
    }
    console.log("vao fnef222", postcodeState)
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
    }, [])
    return (
        <>
            {/*main*/}
            <div className="home-container">
                
                {/*media objects (dòng trạng thái)*/}
                <div className="container p-0">
                    <div className="row home-post-content">
                        <div className="col-12 col-lg-8">
                            {/*Đăng tin*/}
                            <div className="d-flex align-items-center p-3 my-3 text-black-50 bg-primary rounded box-shadow">
                                <div className="p-3">
                                    <img className="mr-3" src={userLogin?.data['picture']} alt="" width={50} height={50} />
                                    <p className="mb-0 text-center"><strong>{userLogin?.data.fullname}</strong></p>
                                </div>
                                <div className="post-header-button lh-100">
                                    <h6 className="mb-0 text-white lh-100">Home</h6>
                                    <h5>Please write something in this post</h5>
                                    {/* Button to Open the Modal */}

                                    <Popup modal
                                        trigger={
                                        <button type="button" className="btn btn-danger">
                                            Post 
                                        </button>}
                                    >
                                    {close => <ModalPost close={close}/>}
                                    </Popup>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body h-100">
                                    <div className="media">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" width={56} height={56} className="rounded-circle mr-3" alt="Ashley Briggs" />
                                        <div className="media-body">
                                            <small className="float-right text-navy">5m ago</small>
                                            <p className="mb-2"><strong>@username</strong></p>
                                            <p>Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
                                                vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.</p>
                                            {/*hình ảnh được upload*/}
                                            <div className="row no-gutters mt-1">
                                                <div className="col-6">
                                                    <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="img-fluid pr-1" alt="Unsplash" />
                                                </div>
                                                <div className="col-6">
                                                    <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="img-fluid pl-1" alt="Unsplash" />
                                                </div>
                                            </div>
                                            <small className="text-muted">Today 7:51 pm</small><br />{/*time real dòng trạng thái*/}
                                            {/*nút like*/}
                                            <a href="#" className="btn btn-sm btn-danger mt-1 m-1">
                                                <i className="fa fa-heart-o" /> Like</a>
                                            {/*nút bình luận*/}
                                            <div onClick={getComments} postcode = "18b5863c-5390-4e26-9e32-2b37fd58b7f8" className="btn btn-sm btn-danger mt-1 m-1"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-chat-dots bi-sm" viewBox="0 0 16 16">
                                                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                <path d="M2.165 15.803l.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                                            </svg>
                                            comment
                                            </div>
                                            {/*dòng bình luận*/}
                                            <Comment postcode={postcodeState} />
                                            {/* {showComment &&  } */}
                                            {/* */}
                                        </div>
                                    </div>
                                    {/*hết trang tin*/}
                                    <div className="media-body">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-delete-animal-pet-wild-domestic-256.png" width={56} height={56} className="mr-3" alt="Ashley Briggs" />
                                        <h5 className="text-center lh-100">You have watched all the news</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*cột thông báo trnang thái*/}
                        <div className="col-12 col-lg-4 home-info mt-3">
                            <div className="card mb-3">
                                <div className="card-body text-center">
                                    <img src={userLogin?.data['picture']} alt="Chris Wood" className="img-fluid rounded-circle mb-2" width={128} height={128} />
                                    <div>
                                        <Link className='card-title text-decoration-none mb-0' to={`/profile/${userLogin?.data.user_code}/post/`} state={{ "usercode":userLogin?.data.user_code }}> {userLogin?.data.fullname}</Link>
                                    </div>
                                </div>
                            </div>
                            {/* friendlist */}
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Friends</h5>
                                </div>
                                <div className="card-body ">
                                    <div className="media card-friend-home">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" width={56} height={56} className="rounded-circle mr-2" alt="Chris Wood" />
                                        <div className="media-body">
                                            <p className="my-1"><strong>@username</strong></p>
                                            <div className='card-btn-home'>
                                                <a className="btn btn-sm btn-outline-primary m-1" href="#">Unfriend</a>
                                                <a className="btn btn-sm btn-outline-primary m-1" href="#">Chat</a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-2" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HomePage;