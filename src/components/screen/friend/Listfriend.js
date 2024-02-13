import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';
import { getAllFriendOfUser, deleteFriend } from "../../../common/callapi/friend"
import { useEffect, useState } from 'react';
import { getCookieToken } from '../../../common/functions';
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
                            <Card className='personal-friend' style={{ borderTop: "none", borderRadius: "none", width: '80%' }}>
                                <div className='row no-gutters'>
                                    <div className='col-4 md-4'>
                                        <img src={result.data[i].picture} className='card-img ms-2' alt='...' style={{ height: '100%', width: '50%' }}></img>
                                    </div>
                                    <div className='col-6 md-6 d-flex align-items-center'>
                                        <Card.Body>
                                            <h5><Card.Text><Link to={`/personal/${result.data[i].user_code}/post`} className='text-name-friend' state={{ 'usercode': result.data[i].user_code }}>{result.data[i].fullname}</Link></Card.Text></h5>
                                        </Card.Body>
                                    </div>
                                    <div className='col-2 md-2'>
                                        <div>
                                            <Popup
                                                trigger={<div className='three-dot-icon position-absolute top-50 end-0 translate-middle-y'><FontAwesomeIcon icon={faEllipsisH} /> </div>}
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
                            </Card>
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
        <>
            <br></br>
            <div className='container'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <Card className='personal-friend' style={{ borderRadius: "none", width: '80%' }}>
                        <div className='col-6 md-6 d-flex align-items-center'>
                            <Card.Body>
                                <h4><Card.Text className='tag-name text-info'>Bạn bè</Card.Text></h4>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
                {elementFriend}

            </div>
        </>
    )
}

export default ListFriend