import  React, { useState } from 'react';
import "../../../css/share.css"

function ModelSharePost(props) {
    const {close,userLogin} = props 
  return (
    <div>
        {/* The Modal */}
        <div className="modal-share-container p-5 border bg-custom mt-1" >
            <div className="modal-dialog">
                <div className="modal-content">
                    
                    <div className='modal-post-header-custom'>
                        <a className='btn btn-custom ' onClick={close}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </a>
                    </div>
                    {/* Modal Header */}
                    <div className="modal-header ">
                        <h2 className="modal-title ">Chia sẻ bài viết</h2>
                        
                    </div>
                    {/* Modal body */}
                    <div className="modal-body modal-body-custom">
                        <form>
                            {/* Info nguoi share post */}
                            <div className="form-group bg-post-home--custom rounded mb-2 mt-2">
                                <label htmlFor="recipient-name" className="col-form-label">
                                    {/* {userLogin?.data.fullname} */}
                                    Ngo Hong Xinh
                                    </label>
                                {/* <input type="text" className="form-control" id="recipient-name" defaultValue="@username" /> */}
                            </div>
                            <div className="form-group">
                                <div className='rounded input-post-custom'>
                                <textarea  className="form-control" id="message-text" defaultValue="Bạn đang nghĩ gì thế?" />
                                </div>
                                
                            </div>
                           {/* bài viết dược share */}
                
                            <div className='posted-container rounded '>
                                {/* info chu bai post */}
                                <div className='p-2 header-posted bg-light'>
                                    <div className='info-user-posted'>
                                      <img src='https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png'  className="rounded-circle m-2" alt="Sharon Lessman" width={50} height={50}/>
                                      <div className='name-posted-content'>
                                        <span className=''><strong>Xinh Ngô</strong></span>
                                        <smal>5m</smal>
                                      </div>
                                    </div>
                                    <b className='text-posted'>hi! how are you?</b>
                                </div>
                                {/* hinh bai post dc share */}
                                <div className='posted-image'>
                                  <img src="http://res.cloudinary.com/darjwnxvd/image/upload/v1709994210/xinhnh2/o4koarfg7giyvjw9pqgd.jpg" class="img-fluid img-posted" alt="Unsplash"></img>
                                </div>
                            </div>
                            {/*Mục input hình ảnh, file, video*/}
                            
                        </form>
                        {/* Modal footer */}
                        <div className="modal-footer w-100">
                            <button type="button" className="btn btn-primary mt-5 btn-lg w-100">Share</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModelSharePost