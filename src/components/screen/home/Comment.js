import { useEffect, useState } from "react";
import { getListComment } from "../../../common/callapi/comment"
import { getCookieToken } from '../../../common/functions'
function Comment(props) {
    const { postcode } = props

    var token = getCookieToken()
    const [postCodeFromHomeComponent, setPostCodeFromHomeComponent] = useState(postcode ? postcode : "")
    const [commentState, setCommentState] = useState()
    var listComment = []
    const callApiGetListComment = async (postcode) => {
        try {
            const result = await getListComment(token, postcode);
            result?.data.list_comment_info.forEach(comment => {
                listComment.push(
                    <div>
                        <div className="media mt-3">
                            <a className="pr-2" href="#">
                                <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" width={36} height={36} className="rounded-circle mr-2" alt="Stacie Hall" />
                            </a>
                            <div className="media-body">
                                <p className="text-muted">
                                    <strong>@username</strong>: Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices
                                    mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                </p>
                                <a className="text-comment">edit</a>
                                <a className="text-comment">delete</a>
                            </div>
                        </div>
                        <hr />
                        {/*dòng comment line trang tin*/}
                        <div className="row">
                            <div className="col-auto">
                                {/* Avatar */}
                                <div className="avatar avatar-sm">
                                    <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" width={36} height={36} className="rounded-circle mr-2" alt="Stacie Hall" />
                                </div>
                            </div>
                            <div className="col ml-n2">
                                {/* Input */}
                                <form className="mt-1">
                                    <label className="sr-only">Leave a comment...</label>
                                    <textarea className="form-control form-control-flush" data-toggle="autosize" rows={1} placeholder="Leave a comment" style={{ overflow: 'hidden', overflowWrap: 'break-word', height: '50px' }} defaultValue={""} />
                                </form>
                            </div>
                            <div className="col-auto align-self-end">
                                {/* Icons input file phần bình luân */}
                                <div className="input-container mb-2">
                                    <a className="text-reset mr-3" href="#!" type="file" data-toggle="tooltip" title data-original-title="Add photo">
                                        <i className="fa fa-camera" />
                                    </a>
                                    <a className="text-reset mr-3" href="#!" data-toggle="tooltip" title data-original-title="Attach file">
                                        <i className="fa fa-paperclip" />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            })
            setCommentState(listComment)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        console.log("vaof nef ")
        setPostCodeFromHomeComponent(postcode)
        callApiGetListComment(postcode)
    }, [postcode])
    console.log(commentState)
    return (
        <>        {commentState}
        </>

    )
}

export default Comment;