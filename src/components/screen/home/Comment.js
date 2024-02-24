import { useEffect, useState } from "react";
import { getListComment, createNewComment} from "../../../common/callapi/comment"
import {getDataApiDetailUserLogin} from "../../../common/callapi/user"
import { getCookieToken } from '../../../common/functions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
function Comment(props) {
    const { postcode } = props

    var token = getCookieToken()
    const [postCodeFromHomeComponent, setPostCodeFromHomeComponent] = useState(postcode ? postcode : "")
    const [commentState, setCommentState] = useState([])
    const [textComment, setTextComment] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [listComment, setListComment] = useState()

    const dataProfileUser = async () =>{
        try {
            const result = await getDataApiDetailUserLogin(token);
            setCurrentUser(result)
          } catch (error) {
            console.error(error)
          }
    }
    const callApicreateNewComment = async (formData) =>{
        try {
            const result = await createNewComment(token, postCodeFromHomeComponent, formData);
            console.log(result)
            if (result?.response_status.code === "00"){
                setTextComment("")
                setCommentState([...[result?.data], ...commentState])
                console.log("dddddddd")
            }
       
          } catch (error) {
            console.error(error)
          }
    }
    function handleInput(event){

        setTextComment(event.target.value)
    }
    // useEffect(()=>{
    //     console.log(textComment)
    // }, [textComment])

    function createComment(){
        var formData = new FormData();
        formData.append('content', textComment);
        // choox nayf neeus cos ảnh sẽ làm thêm 
        callApicreateNewComment(formData)

    }


    const callApiGetListComment = async (postcode) => {
        try {
            const result = await getListComment(token, postcode);
            console.log(result)
            setCommentState(result?.data.list_comment_info) 
        } catch (error) {
            console.error(error)
        }
    }

    // thay đổi nội dung danh sách comment bằng useEffect bắt sự kiệm mỗi khi commentState thay đổi giá trị 
    useEffect(()=>{
        console.log("111111111", commentState)
        
        var listComment = []
        if(commentState.lenth !== 0){
        commentState.forEach(comment => {
            listComment.push(

                    <div className="media mt-3">
                        <a className="pr-2" href="#">
                            <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" width={36} height={36} className="rounded-circle mr-2" alt="Stacie Hall" />
                        </a>
                        <div className="media-body">
                            <p className="text-muted">
                                <strong>@username</strong>: {comment.content}
                            </p>
                            <a className="text-comment">edit</a>
                            <a className="text-comment">delete</a>
                        </div>
                    </div>
  
            )
        })
        setListComment(listComment)
    }
    }, [commentState])


    useEffect(() => {
        dataProfileUser() 
        setPostCodeFromHomeComponent(postcode)
        callApiGetListComment(postcode)
    }, [postcode])
    return (
        <div>        

<div className="row">
                         <hr />
                            <div className="col-auto">
                                {/* Avatar */}
                                <div className="avatar avatar-sm">
                                    <img src={currentUser?.data.picture} width={36} height={36} className="rounded-circle mr-2" alt="img" />
                                </div>
                            </div>
                            <div className="col ml-n2">
                                {/* Input */}
                                <form className="mt-1">
                                    <label className="sr-only">Leave a comment...</label>
                                    <textarea onChange={handleInput} className="form-control form-control-flush" data-toggle="autosize" rows={1} placeholder="Leave a comment" style={{ overflow: 'hidden', overflowWrap: 'break-word', height: '50px' }} defaultValue={""} />
                                    <button type="button" onClick={createComment} className="btn"><FontAwesomeIcon icon={faPaperPlane} usercodeComment = {currentUser?.data.user_code} className='my-auto' /></button>
                                </form>
                            </div>
                            <div className="col-auto align-self-end">
                                {/* Icons input file phần bình luân */}
                                {/* <div className="input-container mb-2">
                                    <a className="text-reset mr-3" href="#!" type="file" data-toggle="tooltip" title data-original-title="Add photo">
                                        <i className="fa fa-camera" />
                                    </a>
                                    <a className="text-reset mr-3" href="#!" data-toggle="tooltip" title data-original-title="Attach file">
                                        <i className="fa fa-paperclip" />
                                    </a>
                                </div> */}
                            </div>
                        </div>
                        {listComment}
                             <hr />

        </div>

    )
}

export default Comment;