import "../../../css/post_profile.css"
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Comment from '../home/Comment.js';
import { getCookieToken } from '../../../common/functions'
import PostUser from "./post_user_notifier.js";
import { getPostListUser } from "../../../common/callapi/post_service"

function PostInProfile(props) {
    const { usercode } = props;

    const [showComment, setShowComment] = useState(false)
    const [postcodeState, setPostCode] = useState()
    const [postInfo, setPostInfo] = useState()
    var token = getCookieToken()

    const callApiGetListPostUser = async () => {
        try {
            const result = await getPostListUser(token, usercode);
            console.log(result.data)
            setPostInfo(result?.data.list_post_info)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        callApiGetListPostUser()
    }, [])
    var listPost = []
    for (let i = 0; i < postInfo?.length; i++) {
        // socket.emit('join_room', postInfo[i]?.post_code)
        listPost.push(
                <div className="row d-flex align-item-center">
                {<PostUser key={postInfo[i]?._id}
                    postInfoData={postInfo[i]}
                />}
            </div>
        )
}
    return (
        <>
            {listPost}
        </>

    )
}
export default PostInProfile