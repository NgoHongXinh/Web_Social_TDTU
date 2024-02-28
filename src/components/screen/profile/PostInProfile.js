import "../../../css/post_profile.css"
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Comment from '../home/Comment.js';
import PostUser from "./post_user_notifier.js";
function PostInProfile(props){
    const { currUserInfo } = props
    const [showComment, setShowComment] = useState(false)
    const [postcodeState, setPostCode] = useState()
    function getComments(e){
        var getPostcode =  e.target.attributes.getNamedItem('postcode').value
        setPostCode(getPostcode)
        console.log("vao fnef",getPostcode, postcodeState)
    }
    console.log("vao fnef222", postcodeState)
    return (
       <div className="content-post">
            <div className="post-profile pt-3 pb-3">
                        {<PostUser usercode ={'xinhnh'}/>}
            </div>
       </div>
    )
}
export default PostInProfile