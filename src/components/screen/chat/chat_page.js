import React, { useState, useEffect, useContext} from 'react';
import {getListConversation, getListMess} from "../../../common/callapi/chat"
import {getDataApiDetailUserLogin} from "../../../common/callapi/user"
import "../../../css/chat.css"
import { getCookieToken } from '../../../common/functions';
function ChatPage() {
    const [lastConversationId, setLasConversationId] = useState()
    const [conversationInfo, setConversationInfo] = useState()
    const [messageInfo, setMessageInfo] = useState()
    const [lastMessId, setlastMessId] = useState()
    const [userLogin, setUserLogin] = useState()
    const [firstConversationCode, setfirstConversationCode] = useState()
    const [message, setMessage] = useState()
    const token = getCookieToken()
    const dataProfileUser = async () => {
        try {
            const userInfo = await getDataApiDetailUserLogin(token);
            setUserLogin(userInfo)

        } catch (error) {
            console.error(error)
        }
    }

    const callApigetListMess = async (conversationCode) =>{
        try{
            const result = await getListMess(token, conversationCode)
            if(result?.data?.list_mess_info?.length> 0){
                setMessageInfo(result?.data?.list_mess_info)
                setlastMessId(result?.data?.last_mess_id)
            }
            

        }catch(error){
            console.error(error)
        }
    }
    const callGetAllConversation = async () => {
        try {
            const result = await getListConversation(token);
            if(result?.response_status.code === "00"){
                var listConversation = []
                if(result?.data.list_conversation_info?.length > 0){
                    setfirstConversationCode(result?.data.list_conversation_info[0].conversation_code)
                    for(var i =0 ; i< result?.data.list_conversation_info?.length; i++){
                        if(result?.data.list_conversation_info[i].members_obj?.length === 1){
                            listConversation.push(
                                <a href="#" className="list-group-item list-group-item-action p-2 list-group-item--select">
                                    <div className="d-flex align-items-start">
                                        {/* avatar friend chat */}
                                        <img src={result?.data.list_conversation_info[i].members_obj[0].picture} className="rounded-circle mr-1" alt="Christina Mason" width={40} height={40} />
                                    
                                        <div className="pr-3 text-algin-left">
                                            {result?.data.list_conversation_info[i].members_obj[0].fullname}
    
                                            {result.data.list_conversation_info[i].online ? <div className="small text-primary chat-online"><span> online</span></div> : <div className="small text-secondary chat-offline">Offline<span/> </div>}
                                        
                                        
                                        </div>
                                    </div>
                                </a>
                            )
                        }
        
        
                    setConversationInfo(listConversation)
                }
            }
        }
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=>{
        dataProfileUser()
        callGetAllConversation()
    }, [])
    useEffect(()=>{
        callApigetListMess(firstConversationCode)
    }, [firstConversationCode])

    
    useEffect(()=>{
        var list_mess = []
        messageInfo?.slice().reverse().forEach(mess =>{
            if(mess['sender_code'] === userLogin['data']['user_code']){
                list_mess.push(
                <div className="chat-message-right p-4">
                    <div>
                        <img src={userLogin['picture']}className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:33 am</div>
                    </div>
                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                        <span>
                            {mess.text}
                        </span>
                    </div>
                </div>
                )
            }
            else{
                list_mess.push(
                <div className="chat-message-left pb-4">
                <div>
                    <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle mr-1" alt="Sharon Lessman" width={40} height={40} />
                    <div className="text-muted small text-nowrap mt-2">2:36 am</div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                {mess.text}
                </div>
            </div>
                )
            }
        }
        )
        setMessage(list_mess)
    }, [messageInfo])

    return (
        <div className='chat-container'>
            <div className='container'>
                <div className="card">
                    <div className="row g-0">
                        <div className="col-12 col-lg-5 col-xl-3 border-right">
                            <div className="p-2 d-none d-md-block">
                                <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <input type="text" className="form-control my-3" placeholder="Search message..." />
                                </div>
                                </div>
                            </div>
                            {/* Danh sach cac chat */}
                            <div className='p-2'>
                                {conversationInfo}
                                {/* <a href="#" className="list-group-item list-group-item-action p-2 list-group-item--select">
                                    <div className="d-flex align-items-start">
                     
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle mr-1" alt="Christina Mason" width={40} height={40} />
                                    
                                        <div className="pr-3 text-algin-left">
                                            Christina Mason
                                            <div className="small text-secondary chat-offline"><span/> Offline</div>
                                        </div>
                                    </div>
                                </a> */}
                                {/* item friend chat */}
                                {/* <a href="#" className="list-group-item list-group-item-action border-0 p-2">
                                    <div className="d-flex align-items-start">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle" alt="Jennifer Chang" width={40} height={40} />
                                        <div className="text-align-left m-1">
                                            Jennifer Chang
                                            <div className="small text-primary chat-online">
                                                <span>
                                                    online
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a> */}
                            </div>
                            <hr className="d-block d-lg-none mt-1 mb-0" />
                        </div>
                        {/* Khung chat  */}
                        <div className="col-12 col-lg-7 col-xl-9 ">
                            <div className="py-2 px-4 border-bottom d-none d-lg-block">
                                {/* Header khung chat */}
                                <div className="d-flex align-items-center p-1">
                                    {/* avatar */}
                                    <div className="position-relative">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle mr-1" alt="Sharon Lessman" width={40} height={40} />
                                    </div>
                                    <div className="flex-grow-1 pl-3">
                                        <strong>Sharon Lessman</strong>
                                        <div className="text-muted small"><em>Typing...</em></div>
                                    </div>
                                    {/* button header khung chat */}
                                    <div>
                                        <button className="btn btn-light border">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal feather-lg"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="position-relative">
                                {/* body noi dung chat */}
                                <div className="chat-messages p-4">
                                    {message}
                                    {/* <div className="chat-message-right p-4">
                                        <div>
                                            <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
                                            <div className="text-muted small text-nowrap mt-2">2:33 am</div>
                                        </div>
                                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                            <span>
                                            Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
                                            </span>
                                        </div>
                                    </div> */}
                                
                                    {/* <div className="chat-message-left pb-4">
                                        <div>
                                            <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle mr-1" alt="Sharon Lessman" width={40} height={40} />
                                            <div className="text-muted small text-nowrap mt-2">2:36 am</div>
                                        </div>
                                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                            Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.
                                            Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
                                        </div>
                                    </div> */}
                    
                                </div>
                            </div>
                            <div className="flex-grow-0 py-3 px-4 border-top">
                                <div className="input-group">
                                <input type="text" className="form-control" placeholder="Type your message" />
                                <button className="btn">
                                    <svg height="48" viewBox="0 0 48 48"  width="48" xmlns="http://www.w3.org/2000/svg"><path d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChatPage