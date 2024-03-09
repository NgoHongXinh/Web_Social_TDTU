

import React, { useState, useEffect, useRef, useContext} from 'react';
import {getListConversation, getListMess, createMess} from "../../../common/callapi/chat"
import {getDataApiDetailUserLogin} from "../../../common/callapi/user"
import { SocketContext } from '../../../thirdparty/socket';
import "../../../css/chat.css";
import "../../../css/style.css";

import { getCookieToken } from '../../../common/functions';
function ChatPage() {
    const socket = useContext(SocketContext);
    const [lastConversationId, setLasConversationId] = useState()
    const [conversationInfo, setConversationInfo] = useState()
    const [messageInfo, setMessageInfo] = useState() // này đẻ lưu lại response từ backend khi vừa gọi xong api 
    const [lastMessId, setlastMessId] = useState()
    const [userLogin, setUserLogin] = useState()
    // const [firstConversationCode, setfirstConversationCode] = useState()
    const [currentConversationCode, setcurrentConversationCode] = useState()
    const [reloadListMess, setreloadListMess] = useState(true)
    const [newChatRealTime, setNewChatRealTime] = useState()

    const [message, setMessage] = useState() // sử dụng để cập nhật thay đổi mess, bao gồm code html 
    const [newMess, setNewMess] = useState() // biến dùng để handle dữ liệu nhập ở input
    const token = getCookieToken()
    const btnElement = useRef()
    const btncreate = useRef()

    // receive mess realtime
    useEffect(()=>{
        socket.on("event_chat", dataChat =>{
            setNewChatRealTime(dataChat)
        })
    }, [socket])
    useEffect(()=>{
        if(newChatRealTime?.data){
            setMessageInfo([...[newChatRealTime?.data], ...messageInfo])
        }

    }, [newChatRealTime])


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
            console.log("fffffffffffff", conversationCode)
            socket.emit("join_room", conversationCode)
            const result = await getListMess(token, conversationCode)
            if(result?.data?.list_mess_info?.length> 0){
                setMessageInfo(result?.data?.list_mess_info)
                setlastMessId(result?.data?.last_mess_id)
            }
            else{
                setMessageInfo([])
                setlastMessId("")
            }
            

        }catch(error){
            console.error(error)
        }
    }

    function handleInput(event) {
        setNewMess(event.target.value)
    }
    //ĐIỀU HƯỚNG CLICK KHI CLICK NHẦM ICON CHỨ KO CLICK VÀO BTN
    function btncreateClick(){
        btncreate.current.click()
    }

    // thiết lập nhấn enter để chat

    function getMessOfConverstation(e){
        try{
            var convercode = e.target.attributes.getNamedItem('convercode')?.value
            if(convercode !== undefined){
                setcurrentConversationCode(convercode)
                callApigetListMess(convercode)
            }
   
        }
        catch(error){
            console.error(error)
        }
 
    }
    const callGetAllConversation = async () => {
        try {
            const result = await getListConversation(token);
            if(result?.response_status.code === "00"){
                var listConversation = []
                if(result?.data.list_conversation_info?.length > 0){
                    // setfirstConversationCode(result?.data.list_conversation_info[0].conversation_code)
                    setcurrentConversationCode(result?.data.list_conversation_info[0].conversation_code)
                    for(var i =0 ; i< result?.data.list_conversation_info?.length; i++){
                        if(result?.data.list_conversation_info[i].members_obj?.length === 1){
                            listConversation.push(
                                // đổi thẻ a thành thẻ div chỗ này thì mới chạy được 
                                // <a className="list-group-item list-group-item-action p-2 list-group-item--select"  >
                                     <a className="list-group-item list-group-item-action p-2 ">
                                    <div ref={btnElement} onClick={getMessOfConverstation} convercode = {result?.data.list_conversation_info[i].conversation_code} className="d-flex align-items-start list-group--padding">
                                        {/* avatar friend chat */}
                                        <img src={result?.data.list_conversation_info[i].members_obj[0].picture} className="rounded-circle mr-1  mt-2" alt="Avatar" width={50} height={50} />
                                    
                                        <div onClick={getMessOfConverstation} convercode = {result?.data.list_conversation_info[i].conversation_code} className="pr-4 text-algin-left item-conversation">
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
    const callApiCreateNewMess = async(conversationCode, text) =>{
        try{
            const result = await createMess(token,conversationCode, text)
            setMessageInfo([...[result?.data], ...messageInfo])
            setNewMess("")// cập nhật lại mess rỗng trong input 
            callGetAllConversation()
            setreloadListMess(false)
        }
        catch(error){
            console.log(error)
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            createNewMess()
        }
      };
    //hàm để onclick tạo mới mess
    // conversationcode và newMess đều được lưu ở state nên chỉ việc lấy ra dùng
    function createNewMess(e){
        callApiCreateNewMess(currentConversationCode, newMess)
    }
    
    useEffect(()=>{
        console.log("dfdfdf")
        dataProfileUser()
        callGetAllConversation()
    }, [])
    useEffect(()=>{
        if(reloadListMess===true){
            if (currentConversationCode !== undefined){
                console.log("ghgggggggggggggggg", currentConversationCode)
                callApigetListMess(currentConversationCode)
            }
          
        }
        else{
            setreloadListMess(true)
        }

    }, [currentConversationCode])

    
    useEffect(()=>{
        var list_mess = []
        messageInfo?.slice().reverse().forEach(mess =>{
            if(mess['sender_code'] === userLogin['data']['user_code']){
                list_mess.push(

                    <div className="chat-message-right p-4">
                    <div>
                        <img src={userLogin['picture']}  className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
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
                        <img src={mess?.sender_info?.picture}  className="rounded-circle mr-1" alt="Sharon Lessman" width={40} height={40} />
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
        <div className='bg-light px-3'>
           <div className='h-100'>
           <div className="row  row-content">
                    <div className="col-3 col-lg-5 col-xl-3 conversation-content">
                        <div className="p-2 d-none d-md-block">
                            <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                                <input type="text" className="form-control my-3" placeholder="Search message..." />
                            </div>
                            </div>
                        </div>
                        {/* Danh sach cac chat */}
                        <div className='p-2 '>
                            {conversationInfo}
                        </div>
                        
                    </div>
                    {/* Khung chat  */}
                    <div className="col-9 col-lg-7 col-xl-9 chat-container">
                        <div className="py-2  d-none d-lg-block header-chat">
                            {/* Header khung chat */}
                            <div className="d-flex align-items-center p-1 ">
                                {/* avatar */}
                                <div className="position-relative">
                                    <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle m-2" alt="Sharon Lessman" width={50} height={50} />
                                </div>
                                <div className="flex-grow-1 pl-3">
                                    <strong className='front_text_white'>Sharon Lessman</strong>
                                    <div className="small front_text_white_w4"><em>Typing...</em></div>
                                </div>
                                {/* button header khung chat */}
                                <div className='m-3'>
                                    <button className="btn btn-light border ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal feather-lg"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="position-relative">
                            {/* body noi dung chat */}
                            <div className="chat-messages p-4">
                            {message}
                            </div>
                            
                        </div>
                        <div className="py-3 px-4 chat-input-content">
                            <div className="input-group">
                                <input onChange={handleInput}  type="text" className="form-control rounded" value={newMess} placeholder="Type your message"  onKeyDown={handleKeyPress}/>
                                <button onClick={createNewMess} ref={btncreate} className="btn">
                                    <svg onClick={btncreateClick} height="48" viewBox="0 0 48 48"  width="48" xmlns="http://www.w3.org/2000/svg"><path d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    );
}
export default ChatPage