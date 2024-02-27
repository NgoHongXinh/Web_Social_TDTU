import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';
import { getAllFriendOfUser, deleteFriend } from "../../../common/callapi/friend"
import { useEffect, useState } from 'react';
import { getCookieToken } from '../../../common/functions';
import "../../../css/listfriend.css";
import "../../../css/style.css";

function FriendHome(props) {
    const {usercode} = props
    console.log("33333333333", usercode)
    const [listFriend, setListFriend] = useState()
    const token = getCookieToken()


    const callGetAllDeleteFriend = async (friendusercode) => {
        try {
            const result = await deleteFriend(token, friendusercode);
            if(result?.response_status.code === "00"){
                callGetAllFriendOfUser()
            }
        } catch (error) {
            console.error(error)
        }
    }
    function DeleteFriend(e) {
        var friendUserCode = e.target.attributes.getNamedItem('friendusercode').value;
        callGetAllDeleteFriend(friendUserCode)
      

    }
    const callGetAllFriendOfUser = async ()=> {
        var friends = []
        const result = await getAllFriendOfUser(token, usercode);
        if(result?.response_status.code==="00"){

            result?.data.list_friend_info.forEach(friend => {
                friends.push(
                <div className="card mb-3">
                    <div className="card-header">
                        <h5 className="card-title mb-0">Friends</h5>
                    </div>
                    <div className="card-body ">
                        <div className="media card-friend-home">
                            <img src={friend.picture} width={56} height={56} className="rounded-circle mr-2" alt="Chris Wood" />
                            <div className="media-body">
                                <p className="my-1"><strong>{friend.fullname}</strong></p>
                                <div className='card-btn-home'>
                                    <a className="btn btn-sm  btn-outline-primary m-1" friendusercode={friend.user_code} onClick={DeleteFriend}>Hủy kết bạn</a>
                                    <a className="btn btn-sm btn-outline-primary m-1" href="#">Nhắn tin</a>
                                </div>
                            </div>
                        </div>
                        <hr className="my-2" />
                    </div>
            </div>
                )
            })
            setListFriend(friends)
            
        }
    }
    useEffect(()=>{
        callGetAllFriendOfUser()
    }, [])
    return (
       <>
         {listFriend}
         </>
      
    )
}

export default FriendHome