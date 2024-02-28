import { useEffect, useState } from "react";
import { getPostListHome } from "../../../common/callapi/post_service"
import { getCookieToken } from '../../../common/functions'
import Comment from './Comment';
import { LikePost } from '../../../common/callapi/post';
function Post(props) {
    const { postInfoData } = props
    const [listImage, setListImage] = useState([])
    const [showComment, setShowComment] = useState(false)
    const [postcodeState, setPostCode] = useState()
    const [dataLikePost, setDataLikePost] = useState()
    var token = getCookieToken()
    const calApiLikePost = async (postcode) => {
        try {
            const likePostInfo = await LikePost(token, postcode);
            setDataLikePost(likePostInfo)

        } catch (error) {
            console.error(error)
        }
    }

    function handleLikePost(e) {
        var getPostcode = e.target.attributes.getNamedItem('postcode').value
        calApiLikePost(getPostcode)
    }
    function getComments(e) {
        setShowComment(true)
        console.log("da vo")
        var getPostcode = e.target.attributes.getNamedItem('postcode').value
        setPostCode(getPostcode)
        console.log("vao fnef", getPostcode, postcodeState)
    }
    console.log("vao fnef222", postcodeState)

    useEffect(() => {
        var images = []
        if(postInfoData.images.length > 0){
            postInfoData.images.forEach(image => {
                images.push(
                    <div className="col-6">
                        <img src={image} className="img-fluid pr-1" alt="Unsplash" />
                    </div>
    
                )
            })
            setListImage(images)
        }
  
    }, [])

    return (
        <div className="card">
        <div className="card-body h-100">
            <div className="media">
                <img src={postInfoData.created_by.picture} width={56} height={56} className="rounded-circle mr-3" alt="Ashley Briggs" />
                <div className="media-body">
                    <small className="float-right text-navy">5m ago</small>
                    <p className="mb-2"><strong>{postInfoData.created_by.fullname}</strong></p>
                    <p>{postInfoData.content}</p>
                    {/*hình ảnh được upload*/}
                    <div className="row no-gutters mt-1">
                    {listImage}
                    </div>
                    <small className="text-muted">Today 7:51 pm</small><br />{/*time real dòng trạng thái*/}
                    <div className='like-number'>
                        <span>
                            Đã có {dataLikePost?.data.like_number} lượt thích
                        </span>
                    </div>
                    {/*nút like*/}
                    <div onClick={handleLikePost} postcode={postInfoData.post_code} className="btn btn-sm btn-danger mt-1 m-1">
                        <i className="fa fa-heart-o" /> Like</div>
                    {/*nút bình luận*/}

                    <div onClick={getComments} postcode={postInfoData.post_code} className="btn btn-sm btn-danger mt-1 m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-chat-dots bi-sm" viewBox="0 0 16 16">
                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            <path d="M2.165 15.803l.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                        </svg>

                        comment
                    </div>

                    {/*dòng bình luận*/}
                    {showComment && <Comment postcode={postInfoData.post_code} />}
                    {/* {showComment &&  } */}
                    {/* */}
                </div>
            </div>
            {/*hết trang tin*/}
            {/* <div className="media-body">
                <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-delete-animal-pet-wild-domestic-256.png" width={56} height={56} className="mr-3" alt="Ashley Briggs" />
                <h5 className="text-center lh-100">You have watched all the news</h5>
            </div> */}
        </div>
        </div>
    );
}
export default Post;