import React, { useState, useEffect, useContext} from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import {getDataApiDetailUserLogin} from "../../../common/callapi/user";
import {getCookieToken} from '../../../common/functions'
import { SocketContext } from '../../../thirdparty/socket';
import Comment from './Comment';
import Post from "./post_notifier";
import FriendHome from "./FriendHome"
import "../../../css/home.css"
import Popup from 'reactjs-popup';
import ModalPost from '../post/ModalPost';
import { LikePost } from '../../../common/callapi/post';

function HomePage(props, props2) {
    const { currUserInfo } = props
    const {postcode} =props2
    const [showComment, setShowComment] = useState(false)
    const [postcodeState, setPostCode] = useState()
    const [userLogin, setUserLogin] = useState()
    const [dataLikePost, setDataLikePost] = useState()
    var token = getCookieToken()
    const socket = useContext(SocketContext);
    
    const {close} = useParams()
    function getComments(e){
        try{        var getPostcode =  e.target.attributes.getNamedItem('postcode').value
        setShowComment(true)
        setPostCode(getPostcode)
        console.log("vao fnef",getPostcode, postcodeState)
        }
        catch(error){
            console.error(error)
        }

    }

    const calApiLikePost = async (postcode) =>{
        try {
            const likePostInfo = await LikePost(token, postcode);
            setDataLikePost(likePostInfo)
 
          } catch (error) {
            console.error(error)
          }
    }

    function handleLikePost(e){
        var getPostcode =  e.target.attributes.getNamedItem('postcode').value
        calApiLikePost(getPostcode)
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
        const dataPostList = async()=>{

        }
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
                                    <img className="mr-3 img-fluid rounded-circle mb-2" src={userLogin?.data['picture']} alt="" width={50} height={50} />
                                    
                                </div>
                                <div className="post-header-button lh-100">
                                    <h6 className="mb-0 text-white lh-100">Home</h6>
                                    <h5 className='text-white'>Hi <strong>{userLogin?.data.fullname}!</strong> Please write something in this post</h5>
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
                            <div className="content-post">
                                <div className="post-profile pt-3 pb-3">
                                            {<Post postcode ={postcode}/>}
                                </div>
                                
                            </div>
                            {/*hết trang tin*/}
                            <div className="media-body">
                                <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-delete-animal-pet-wild-domestic-256.png" width={56} height={56} className="mr-3" alt="Ashley Briggs" />
                                <h5 className="text-center lh-100">You have watched all the news</h5>
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
                            { userLogin?.data.user_code   && <FriendHome usercode = {userLogin?.data.user_code}/>}
                            <div className="card mb-3">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Friends</h5>
                                    </div>
                                    <div className="card-body ">
                                        <span>Bạn chưa có bạn hãy kết bạn thêm nhé!</span>
                                    </div>
                            </div>               
                            {/* <div className="card mb-3">
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
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HomePage;