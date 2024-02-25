import { useEffect, useState } from "react";
import { getListComment, createNewComment, deleteComment } from "../../../common/callapi/comment"
import { getDataApiDetailUserLogin } from "../../../common/callapi/user"
import { getCookieToken } from '../../../common/functions'
import "../../../css/home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';
import Popup from 'reactjs-popup';
function Comment(props) {
    const { postcode } = props

    var token = getCookieToken()
    const [postCodeFromHomeComponent, setPostCodeFromHomeComponent] = useState(postcode ? postcode : "")
    const [commentState, setCommentState] = useState([])
    const [textComment, setTextComment] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [listComment, setListComment] = useState()
    const [lasCommentId, setLastCommentId] = useState()


    const callApiGetListComment = async () => {
        try {
            const result = await getListComment(token, postcode);
            console.log(result)
            setLastCommentId(result?.data.last_comment_id)
            setCommentState(result?.data.list_comment_info)
        } catch (error) {
            console.error(error)
        }
    }

    const loadMoreComment = async () => {
        try {
            if(lasCommentId){
                const result = await getListComment(token, postCodeFromHomeComponent, lasCommentId);
                console.log("load more comment", result)
                setLastCommentId(result?.data.last_comment_id)
                setCommentState([...commentState, ...result?.data.list_comment_info])

            }

        } catch (error) {
            console.error(error)
        }
    }
    const callApiDeleteComment = async (commentcode) => {
        try {
            const result = await deleteComment(token, postCodeFromHomeComponent, commentcode);
            callApiGetListComment()
        } catch (error) {
            console.error(error)
        }
    }

    const dataProfileUser = async () => {
        try {
            const result = await getDataApiDetailUserLogin(token);
            setCurrentUser(result)
        } catch (error) {
            console.error(error)
        }
    }
    const callApicreateNewComment = async (formData) => {
        try {
            const result = await createNewComment(token, postCodeFromHomeComponent, formData);
            console.log(result)
            if (result?.response_status.code === "00") {
                setTextComment("")
                setCommentState([...[result?.data], ...commentState])
                console.log("dddddddd")
            }

        } catch (error) {
            console.error(error)
        }
    }
    function handleInput(event) {

        setTextComment(event.target.value)
    }

    function createComment() {
        var formData = new FormData();
        formData.append('content', textComment);
        // choox nayf neeus cos ảnh sẽ làm thêm 
        callApicreateNewComment(formData)

    }

    function handleDeleteComment(e) {
        var commentcode = e.target.attributes.getNamedItem('commentcode').value
        console.log(commentcode)
        callApiDeleteComment(commentcode)
    }

    // thay đổi nội dung danh sách comment bằng useEffect bắt sự kiệm mỗi khi commentState thay đổi giá trị 
    useEffect(() => {
        console.log("111111111", commentState?.length)

        var comments = []
        if (commentState?.length !== 0) {

            commentState.forEach(comment => {
                comments.push(


                    <div className="media mt-3 d-flex">
                        <a className="pr-2">
                            <img src={comment.created_by.picture} width={36} height={36} className="rounded-circle " alt="Stacie Hall" />
                        </a>
                        <div className="media-body mt-1 p-1">
                            <p className="text-muted">
                                <strong>{comment.created_by.fullname}</strong>
                            </p>
                            <span>
                            {comment.content}
                            </span>
                        </div>
                        <div className='mt-1 p-2'>
                                <Popup
                                    trigger={<div className='three-dot-icon '><FontAwesomeIcon icon={faEllipsisH} /> </div>}
                                    position='bottom left'
                                    on='hover'
                                    closeOnDocumentClick
                                    mouseLeaveDelay={300}
                                    mouseEnterDelay={0}
                                    contentStyle={{ padding: '0px', border: 'none' }}
                                    arrow={false}
                                >
                                    <div className='d-flex flex-column'>
                                        <a className="text-comment">edit</a>
                                        <a className="text-comment" commentcode={comment.comment_code} onClick={handleDeleteComment}>delete</a>
                                    </div>
                                </Popup>
                            </div>
                    </div>

                )
            })
            if (commentState?.length >= 10){
                comments.push(<div onClick={loadMoreComment}>hiển thị thêm </div>)
            }

        }
        setListComment(comments)
    }, [commentState])


    useEffect(() => {
        dataProfileUser()
        setPostCodeFromHomeComponent(postcode)
        callApiGetListComment()
    }, [postcode])
    return (
        <div>
            <div className="row">
                         <hr />
                            <div className="col-auto mt-2">
                                {/* Avatar */}
                                <div className="avatar avatar-sm">
                                    <img src={currentUser?.data.picture} width={36} height={36} className="rounded-circle mr-2" alt="img" />
                                </div>
                            </div>
                            <div className="col ml-n2">
                                {/* Input */}
                                <form className="input-comment mt-1">
                                    <label className="sr-only">Leave a comment...</label>
                                    <textarea onChange={handleInput} className="form-control form-control-flush" data-toggle="autosize" rows={1} placeholder="Leave a comment" style={{ overflow: 'hidden', overflowWrap: 'break-word', height: '50px' }} value={textComment} defaultValue={""} />
                                    <button type="button" onClick={createComment} className="btn"><FontAwesomeIcon  usercodeComment = {currentUser?.data.user_code} className='my-auto' />
                                    <svg height="48" viewBox="0 0 48 48"  width="48" xmlns="http://www.w3.org/2000/svg"><path d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
                                    </button>
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