import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Comment from './Comment'

function HomePage(props) {
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
        <div>
            {/*main*/}
            <div className="container">
                {/* The Modal */}
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title">Your Post</h4>
                                <button type="button" className="close" data-dismiss="modal">×</button>
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                        <input type="text" className="form-control" id="recipient-name" defaultValue="@username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Message:</label>
                                        <textarea className="form-control" id="message-text" defaultValue="" />
                                    </div>
                                    {/*Mục input hình ảnh, file, video*/}
                                    <div>
                                        <div className="input-group">
                                            <div>
                                                <i className="bi bi-file-earmark-richtext" />
                                                <label htmlFor="image_uploads">Choose images to upload (PNG, JPG, JPEG)</label>
                                                <input className="fa fa-image icon" type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple aria-hidden="true" />
                                            </div>
                                            <div>
                                                <label htmlFor="file_uploads">Choose files to upload</label>
                                                <input className="fa fa-file icon" type="file" id="file_uploads" multiple aria-hidden="true" />
                                            </div>
                                            <div className="preview">
                                            </div>
                                        </div>
                                    </div></form>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Posted</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*media objects (dòng trạng thái)*/}
                <div className="container p-0">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            {/*Đăng tin*/}
                            <div className="d-flex align-items-center p-3 my-3 text-black-50 bg-primary rounded box-shadow">
                                <div className="p-3">
                                    <img className="mr-3" src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" alt="" width={50} height={50} />
                                    <p className="mb-0 text-center"><strong>@username</strong></p>
                                </div>
                                <div className="lh-100">
                                    <h6 className="mb-0 text-white lh-100">Home</h6>
                                    <h5>Please write something in this post</h5>
                                    {/* Button to Open the Modal */}

                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#myModal">
                                        Post
                                    </button>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body h-100">
                                    <div className="media">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" width={56} height={56} className="rounded-circle mr-3" alt="Ashley Briggs" />
                                        <div className="media-body">
                                            <small className="float-right text-navy">5m ago</small>
                                            <p className="mb-2"><strong>@username</strong></p>
                                            <p>Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
                                                vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.</p>
                                            {/*hình ảnh được upload*/}
                                            <div className="row no-gutters mt-1">
                                                <div className="col-6">
                                                    <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="img-fluid pr-1" alt="Unsplash" />
                                                </div>
                                                <div className="col-6">
                                                    <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="img-fluid pl-1" alt="Unsplash" />
                                                </div>
                                            </div>
                                            <small className="text-muted">Today 7:51 pm</small><br />{/*time real dòng trạng thái*/}
                                            {/*nút like*/}
                                            <a href="#" className="btn btn-sm btn-danger mt-1">
                                                <i className="fa fa-heart-o" /> Like</a>
                                            {/*nút bình luận*/}
                                            <div onClick={getComments} postcode = "18b5863c-5390-4e26-9e32-2b37fd58b7f8" className="btn btn-sm btn-danger mt-1"> comment</div>
                                            {/*dòng bình luận*/}
                                            <Comment postcode={postcodeState} />
                                            {/* {showComment &&  } */}
                                            {/* */}
                                        </div>
                                    </div>
                                    <hr />
                                    {/*hết trang tin*/}
                                    <div className="media-body">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-delete-animal-pet-wild-domestic-256.png" width={56} height={56} className="mr-3" alt="Ashley Briggs" />
                                        <h5 className="text-center lh-100">You have watched all the news</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*cột thông báo trnangj thái*/}
                        <div className="col-12 col-lg-4">
                            <div className="card mb-3">
                                <div className="card-body text-center">
                                    <img src=" https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" alt="Chris Wood" className="img-fluid rounded-circle mb-2" width={128} height={128} />
                                    <h4 className="card-title mb-0">@username</h4>
                                    <div className="text-muted mb-2">infor</div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <div className="card-actions float-right">
                                        <div className="dropdown show">
                                            <a href="#" data-toggle="dropdown" data-display="static">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal align-middle"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">detail</a>
                                                <a className="dropdown-item" href="#">delete</a>
                                                <a className="dropdown-item" href="#">chat</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*friends*/}
                                    <h5 className="card-title mb-0">Friends</h5>
                                </div>
                                <div className="card-body">
                                    <div className="media">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" width={56} height={56} className="rounded-circle mr-2" alt="Chris Wood" />
                                        <div className="media-body">
                                            <p className="my-1"><strong>@username</strong></p>
                                            <a className="btn btn-sm btn-outline-primary" href="#">Unfriend</a>
                                        </div>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="media">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" width={56} height={56} className="rounded-circle mr-2" alt="Carl Jenkins" />
                                        <div className="media-body">
                                            <p className="my-1"><strong>@username</strong></p>
                                            <a className="btn btn-sm btn-outline-primary" href="#">Unfriend</a>
                                        </div>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="media">
                                        <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" width={56} height={56} className="rounded-circle mr-2" alt="Stacie Hall" />
                                        <div className="media-body">
                                            <p className="my-1"><strong>@username</strong></p>
                                            <a className="btn btn-sm btn-outline-primary" href="#">Unfriend</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage;