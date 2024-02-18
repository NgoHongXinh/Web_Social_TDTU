import React, { useState, useEffect,useRef } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookieToken } from '../../../common/functions'
import {getDataApiDetailUserLogin} from "../../../common/callapi/user"
import Card from 'react-bootstrap/Card';
function InfoUserInUserProfile() {
    const token = getCookieToken()
    const [currentUser, setcurrentUser] = useState()
    const btnElement = useRef()
    const navigate = useNavigate();
    useEffect(()=>{
        const dataProfileUser = async () =>{
            try {
                const userInfo = await getDataApiDetailUserLogin(token);

                setcurrentUser(userInfo)
     
              } catch (error) {
                console.error(error)
              }
        }
        dataProfileUser() 
    }, [])
    function clickBtn(){
        // <FontAwesomeIcon className="btn" onClick={clickBtn} style={{ height: "35px" }} icon="fa-pencil-alt"/>
        // <div className="btn" usercode={currentUser?.data.user_code} ref={btnElement} onClick={gotosettingPag}></div>
        // khi bấm vào icon do icon ko lấy được attribute nên sẽ sử dụng useRef để thiết lập click btn ẩn, btn này có gắn user do đó sẽ lấy được user code để chuyển trang
        console.log("vooooooooooooo")
        btnElement.current.click()
    }
    function gotosettingPag(e){
        console.log("123123",  e.target.attributes.getNamedItem('usercode'))
        var usercode =  e.target.attributes.getNamedItem('usercode').value
        navigate(`/user/${usercode}/update-info`,{ replace: true });

    }
    return (
        <>
        <br></br>
        <div className='container'>
            <div className='row'>
                <Card className="mb-4">
                    <div className="row">
                        <div className="col-4 md-4  d-flex align-items-center justify-content-center ">
                            <h4>THÔNG TIN CÁ NHÂN</h4>
                        </div>
                        <div className="col-5 md-6 justify-content-center " >
                            <Card.Body>
                                <ul style ={{margin:"10px"}} className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-start"><FontAwesomeIcon icon="fa-user" />{currentUser?.data.fullname}</li>
                                    <li className="list-group-item d-flex justify-content-start"><FontAwesomeIcon icon="fa-transgender" />{currentUser?.data.gender}</li>
                                    <li className="list-group-item d-flex justify-content-start"><FontAwesomeIcon icon="fa-phone" />{currentUser?.data.phone}</li>
                                    <li className="list-group-item d-flex justify-content-start"><FontAwesomeIcon icon="fa-birthday-cake" />{currentUser?.data.birthday}</li>
                                    <li className="list-group-item d-flex justify-content-start"><FontAwesomeIcon icon="fa-envelope" /> {currentUser?.data.username}</li>
                                    <li className="list-group-item d-flex justify-content-start"><FontAwesomeIcon icon="fas fa-graduation-cap" /> {currentUser?.data.faculty}</li>
                                    <li className="list-group-item d-flex justify-content-start"><FontAwesomeIcon icon="fa fa-history"/> {currentUser?.data.biography}</li>
                                    <li className="list-group-item d-flex justify-content-start"><FontAwesomeIcon icon="fa fa-address-book" /> {currentUser?.data.class_name}</li>
                                </ul>
                            </Card.Body>
                        </div>
                        <div className="col-3 md-3 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon className="btn" onClick={clickBtn} style={{ height: "35px" }} icon="fa-pencil-alt"/>
                            <div className="btn" hidden usercode={currentUser?.data.user_code} ref={btnElement} onClick={gotosettingPag}></div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        </>
    );
}

export default InfoUserInUserProfile;