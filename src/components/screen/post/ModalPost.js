import React, { useState } from 'react'
import { createPost } from '../../../common/callapi/post_service';
import { getCookieToken } from '../../../common/functions'

export default function ModalPost(props) {
    const {close,userLogin, setLastPostId, setPostInfo, setpostState} = props 
    const [textPost, setTextPost] = useState("")
    const [postImages, setPostImages] = useState();
    const [postVideo, setpostVideo] = useState([]);
    var token = getCookieToken()

    function handleInput(event) {
        console.log(event.target.value)
        setTextPost(event.target.value)
    }
    const changeImage  = (e) => {
        const files = Array.from(e.target.files);
        setPostImages(files);

    };
    const changeVideo  = (e) => {
        const video = e.target.files[0];
        setpostVideo(video);

    };
    const callApiCreateNewPost = async (formdata) =>{
        try {
            const newPost = await createPost(token, formdata);
            console.log(newPost)
        } catch (error) {
            console.error(error)
        }
    }
    const createNewPost = ()=>{
        console.log("voaf")
        console.log("sdfsdfdf", postImages)
        var formData = new FormData();
        formData.append('content', textPost);
        if(postImages?.length > 0 ){
            postImages.forEach((image, index) => {
                formData.append(`images_upload`, image);
              });
        }
        formData.append('video_upload', postVideo);
        callApiCreateNewPost(formData)
        window.location.reload(true);
        close()
    
    }
  return (
    <div>
        {/* The Modal */}
        <div className="modal-post-container p-5 border bg-primary mt-1" >
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h4 className="modal-title text-white">Tạo bài viết</h4>
                    </div>
                    {/* Modal body */}
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label text-white">{userLogin?.data.fullname}</label>
                                {/* <input type="text" className="form-control" id="recipient-name" defaultValue="@username" /> */}
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label text-white">Message:</label>
                                <textarea onChange = {handleInput} className="form-control" id="message-text" defaultValue="" />
                            </div>
                            {/*Mục input hình ảnh, file, video*/}
                            <div>
                                <div className="input-group m-2">
                                    <div>
                                        <i className="bi bi-file-earmark-richtext" />
                                        <label htmlFor="image_uploads" className='text-white'>Choose images to upload (PNG, JPG, JPEG)</label>
                                        {/* <input hidden onChange={onImageChange} type='file' id='input-img' accept='image/*'></input> */}
                                        <input onChange={changeImage} className="fa fa-image icon text-white" type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple aria-hidden="true" />
                                    </div>
                                    <div>
                                        <label htmlFor="file_uploads" className='text-white'>Choose video to upload</label>
                                        <input  onChange={changeVideo} className="fa fa-file icon text-white" type="file" id="file_uploads" aria-hidden="true" />

                                    </div>
                                    <div className="preview">
                                    </div>
                                </div>
                            </div></form>
                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary m-1" data-dismiss="modal"  onClick={close}>Close</button>
                            <button type="button" onClick={createNewPost} className="btn btn-danger m-1">Posted</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
