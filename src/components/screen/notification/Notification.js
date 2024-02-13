import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getDataApiAllnotification } from "../../../common/callapi/notification"
import { getCookieToken } from '../../../common/functions'
function Notification() {
    const [notisState, setNotisState] = useState()
    var token = getCookieToken()
    var notis = []
    const current = new Date().getTime();
    
    useEffect(() => {

        const listNotification = async () => {
            try {
                const result = await getDataApiAllnotification(token);
                console.log(result)
                if (result?.data.list_noti_info.length > 0) {

                    result?.data.list_noti_info.forEach(noti => {
                        var timestamp = noti.created_time;
                        var created_time = new Date(timestamp).getTime();
                        const timeDBetween2datetime = current - created_time;
                        // Extract hours, minutes, and seconds from the Date object

                        const oneDayMs = 24 * 60 * 60 * 1000; // Số milliseconds trong một ngày
                        const numberOfDays = Math.floor(timeDBetween2datetime / oneDayMs);
                        
                        const seconds = Math.floor(timeDBetween2datetime / 1000);
                        const minutes = Math.floor(seconds / 60);
                        const hours = Math.floor(minutes / 60);
                        console.log(`Khoảng thời gian giữa hai thời điểm là ${hours} giờ ${minutes % 60} phút ${seconds % 60} giây.`);
                        console.log(numberOfDays, seconds, minutes, hours)
                        notis.push(
       
                            <div className='d-flex mb-2' style={{ background: "azure" }}>
                                <div className='noti-user-avata'>
                                    <img alt='user avatar' src={noti.user_guest_info.picture}></img>
                                </div>
                                <div className='noti-content'>
                                    <div><b>{noti.user_guest_info.fullname}</b>{noti.content}</div>
                                    <div className='fs-smaller text-secondary'>{current-created_time} giờ trước</div>
                                </div>
                                <div className='notification-button'>
                                    <div><FontAwesomeIcon notiid={""} icon={faCheck} color='green' onClick={""} className='p-2 cursor-pointer' /></div>
                                </div>


                            </div>
                  
                        )
                    });
                }
                setNotisState(notis)
            } catch (error) {
                console.error(error)
            }
        }
        listNotification()
    }, [])
    return (
        <div
            id='scrollableDiv'
            className='menu-popup noti-popup' style={{ width: "350px" }}
        >
            {/*Put the scroll bar always on the bottom*/}
            <InfiniteScroll
                dataLength={10}
                next={""}
                hasMore={false}
                loader={<p className='text-info'>Đang tải thông báo...</p>}
                scrollableTarget='scrollableDiv'
            >
                <div className='d-flex mb-2 noti_title' style={{ background: "white" }}>
                <h4><b> Thông báo </b> </h4>
           


                </div>

                {notisState}
            </InfiniteScroll>
        </div>
    )
}

export default Notification