import React, { useEffect, useState, } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useSearchParams, Link } from 'react-router-dom';
import { getDataApiFindUser } from '../../../common/callapi/user'
import { getCookieToken } from '../../../common/functions'

function FindUser() {
    var token = getCookieToken()
    const [searchParams, setSearchParams] = useSearchParams()
    const [allUser, setAllUser] = useState([])
    var nameInSearchParam = searchParams.get('name')

    useEffect(() => {
        var listUser = []
        const dataUserFound = async () => {
            try {
                const result = await getDataApiFindUser(token,nameInSearchParam);
                console.log(result?.data)
                if (result?.data.length > 0) {
                    for (var i = 0; i < result.data.length; i++) {
                        listUser.push(  
                            <div className='row d-flex justify-content-center align-items-center'>
                            <Card className='flex-row' style={{ borderRadius: "none", width: '60%' }}>
                                <div className='my-auto'>
                                    <img src={result.data[i].picture} className='rounded-circle card-img' alt='avatar'></img>
                                </div>
                                <div className='my-auto flex-grow-1'>
                                    <h5><Link className='text-dark fw-bold text-decoration-none' to={`/personal/${result.data[i].user_code}/post/`} state={{ 'usercode': "" }}>{result.data[i].fullname}</Link></h5>
                                </div>
                                <div className='my-auto me-2'><Button usercode={result.data[i].user_code} onClick={""}>Kết bạn</Button></div>
                            </Card>
                            <p></p>
                        </div>
                        )
                    }
                }
                else{
                    listUser.push( <div className='row d-flex justify-content-center align-items-center'>Không tìm thấy người dùng này</div>)
                }
                setAllUser(listUser)
            } catch (error) {
                console.error(error)
            }
        }
        dataUserFound()
    }, [nameInSearchParam])
    // console.log(allUser)
    return (
        <div className='container find-user'>
            <br></br>
            {allUser}
    


        </div>
    )
}

export default FindUser