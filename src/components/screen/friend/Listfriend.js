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
import { CardHeader } from 'react-bootstrap';
function ListFriend(props) {
    const { usercode } = props
    const token = getCookieToken()
    const [elementFriend, setElementFriend] = useState()

    const callGetAllFriendOfUser = async () => {
        var cardRow = []
        try {
            const result = await getAllFriendOfUser(token, usercode);
            if (result.data.length > 0) {
                for (var i = 0; i < result.data.length; i++) {
                    cardRow.push(
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='friend_card'>
                                <div className='friend_card_avatar'>
                                    <div className='avatar_img'>
                                        <img src={result.data[i].picture} className='card-img ms-2'></img>
                                    </div>
                                    <div className='col-6 md-6 d-flex align-items-center'>
                                        <Card.Body>
                                            <h5><Card.Text><Link to={`/personal/${result.data[i].user_code}/post`} className='text-name-friend' state={{ 'usercode': result.data[i].user_code }}>{result.data[i].fullname}</Link></Card.Text></h5>
                                        </Card.Body>
                                    </div>
                                    <div className='col-2 md-2'>
                                        <div>
                                            <Popup
                                                trigger={<div className='three-dot-icon '><FontAwesomeIcon icon={faEllipsisH} /> </div>}
                                                position='right top'
                                                on='hover'
                                                closeOnDocumentClick
                                                mouseLeaveDelay={300}
                                                mouseEnterDelay={0}
                                                contentStyle={{ padding: '0px', border: 'none' }}
                                                arrow={false}
                                            >
                                                <div type='button' className='btn btn-warning' friendusercode={result.data[i].user_code} onClick={DeleteFriend}>Hủy kết bạn</div>
                                            </Popup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                setElementFriend(cardRow)
            }
            else {
                cardRow.push(
                    <div className='text-secondary fs-4'>Bạn chưa có người bạn nào, hãy kết bạn thêm nhé</div>)
                // console.log("váo ")
                // setListFriendUser([])
                setElementFriend(cardRow)
            }

        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        callGetAllFriendOfUser()


    }, [])
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



    return (
            <div className='container friend_profile_container'>
                <div className='row d-flex justify-content-center align-items-center w-100'>
                    <Card className='listfriend_title'>
                        <Card.Header className='front_text_title'>Friends</Card.Header>
                        
                        <Card.Body>
                            <div className='listfriend_content'>
                                {elementFriend}
                            </div>

                        </Card.Body>
                    </Card>

                </div>

            </div>
    )
}

export default ListFriend