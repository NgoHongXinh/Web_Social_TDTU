function HomePage(props){
    const { currUserInfo } = props
   

    return(
        <div>
            {/*main*/}
            <main role="main" className="container">
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
                                    <a href="#" className="btn btn-sm btn-danger mt-1"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-chat-dots bi-sm" viewBox="0 0 16 16">
                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                        <path d="M2.165 15.803l.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                                    </svg> comment</a>
                                    {/*dòng bình luận*/}
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
                                        <textarea className="form-control form-control-flush" data-toggle="autosize" rows={1} placeholder="Leave a comment" style={{overflow: 'hidden', overflowWrap: 'break-word', height: '50px'}} defaultValue={""} />
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
            </main>
        </div>
    );
}
export default HomePage;