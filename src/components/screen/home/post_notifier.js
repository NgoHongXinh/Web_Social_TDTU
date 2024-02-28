import { useEffect, useState } from "react";
import {getPostListHome} from "../../../common/callapi/post_service"
import { getCookieToken } from '../../../common/functions'
import { LikePost } from '../../../common/callapi/post';
import Comment from './Comment';
function Post(props) {
    const { postcode } = props
    var token = getCookieToken()
    const [postCodeFromHomeComponent, setPostCodeFromHomeComponent] = useState(postcode ? postcode : "")
    const [postState, setpostState] = useState([])
    const [postList, setPostList] = useState()
    const [showComment, setShowComment] = useState(false)
    const [dataLikePost, setDataLikePost] = useState()
    const [postcodeState, setPostCode] = useState()
    const callApiGetListPostHome = async () => {
        try {
            const result = await getPostListHome(token);
            console.log(result)
            setpostState(result?.data.list_post_info)
        } catch (error) {
            console.error(error)
        }
    }
    function getComments(e){
        try{        var getPostcode =  e.target.attributes.getNamedItem('postcode').value
        setShowComment(true)
        setPostCode(getPostcode)
        console.log("vao fnef",getPostcode, postcodeState)
        }
        catch(error){
            console.error(error)
        }

       
    }
    const calApiLikePost = async (postcode) =>{
        try {
            const likePostInfo = await LikePost(token, postcode);
            setDataLikePost(likePostInfo)
 
          } catch (error) {
            console.error(error)
          }
    }
    // const callApiGetListPostUser = async () => {
    //     try {
    //         const result = await getPostListUser(token, usercode);
    //         console.log(result)
    //         setpostState(result?.data)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    function handleLikePost(e){
        var getPostcode =  e.target.attributes.getNamedItem('postcode').value
        calApiLikePost(getPostcode)
    }

    useEffect(()=>{
        console.log("post list",postState.length)
        var postshome =[]
        if (postState?.length !== 0) {
            postState.forEach(post => {
                postshome.push(
                    <div className="card post-card h-100">
                        <div className="media">
                            <div className="avatar-user-post">
                                <img src={ post.created_by.picture} 
                                    width={56} height={56} className="rounded-circle mr-3" alt="Ashley Briggs" />
                            </div>
                            <div className="media-body post-user">
                                <small className="float-right text-navy">5m ago</small>
                                <p className="mb-2"><strong>{post.created_by.fullname}</strong></p>
                                <p>{post.content}</p>
                                {/*hình ảnh được upload*/}
                                <div className="row no-gutters mt-1">
                                    <div className="col-6">
                                        <img src={post.images[0]} className="img-fluid pr-1" alt="Unsplash" />
                                    </div>
                                    {/* <div className="col-6">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="img-fluid pl-1" alt="Unsplash" />
                                    </div> */}
                                </div>
                                {/*time real dòng trạng thái*/}

                                <small className="text-muted">Today 7:51 pm</small><br />
                                {/*time real dòng trạng thái*/}
                                <div className='like-number'>
                                    <span>
                                    Đã có {dataLikePost?.data.like_number} lượt thích
                                    </span>
                                </div>
                                {/*nút like*/}
                                <div  onClick={handleLikePost} postcode = "18aad068-3023-47b0-abcb-5deb4028bfc6" className="btn btn-sm btn-danger mt-1 m-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                    </svg>
                                </div>
                        
                                {/* nút bình luận */}
                                <div onClick={getComments} postcode = {post.post_code} className="btn btn-sm btn-danger mt-1 m-1"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-chat-dots bi-sm" viewBox="0 0 16 16">
                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                        <path d="M2.165 15.803l.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                                    </svg>
                                </div>
                                {/*dòng bình luận*/}
                    {showComment &&  <Comment postcode={postcodeState} />}
                                {/* {showComment &&  */}
                            </div>
                        </div>
                    </div>
                )
            });
        }
        setPostList(postshome)
    },[postState])
    useEffect(() => {
        // dataProfileUser()
        // setPostCodeFromHomeComponent(postcode)
        callApiGetListPostHome()
    }, [postcode])
    return (
        
                    <>
                    {postList}
                    
                    
                    </>
        
    );
}
export default Post;
