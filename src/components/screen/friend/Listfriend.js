import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';
import { getAllFriendOfUser } from "../../../common/callApi"
import { useEffect, useState } from 'react';
import { getCookieToken } from '../../../common/functions';
function ListFriend(props) {
    const { usercode } = props
    const token = getCookieToken()
    const [listFriendUser, setListFriendUser] = useState()
    useEffect(() => {
        const callGetAllFriendOfUser = async () => {
            try {
                const result = await getAllFriendOfUser(token, usercode);
                console.log(result)
                setListFriendUser(result.data)
            } catch (error) {
                console.error(error)
            }
        }
        callGetAllFriendOfUser()

    }, [])
    console.log(listFriendUser)
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
                {listFriendUser && listFriendUser.map(friend => (
                    <div className='row d-flex justify-content-center align-items-center'>
                        <Card className='personal-friend' style={{ borderTop: "none", borderRadius: "none", width: '80%' }}>
                            <div className='row no-gutters'>
                                <div className='col-4 md-4'>
                                    <img src={friend.picture} className='card-img ms-2' alt='...'></img>
                                </div>
                                <div className='col-6 md-6 d-flex align-items-center'>
                                    <Card.Body>
                                        <h5><Card.Text><Link to={`/personal/${friend.user_code}/post`} className='text-name-friend' state={{ 'usercode': friend.user_code }}>{friend.fullname}</Link></Card.Text></h5>
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
                                            <div type='button' className='btn btn-warning' friendid={""} onClick={""}>Hủy kết bạn</div>
                                        </Popup>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}

            </div>
        </>
    )
}

export default ListFriend