import React from 'react'

export default function ModalPost({close}) {
  return (
    <div>
        {/* The Modal */}
        <div className="modal-post-container p-5 border bg-primary mt-1" >
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h4 className="modal-title text-white">Your Post</h4>
                    </div>
                    {/* Modal body */}
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label text-white">Recipient:</label>
                                <input type="text" className="form-control" id="recipient-name" defaultValue="@username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label text-white">Message:</label>
                                <textarea className="form-control" id="message-text" defaultValue="" />
                            </div>
                            {/*Mục input hình ảnh, file, video*/}
                            <div>
                                <div className="input-group m-2">
                                    <div>
                                        <i className="bi bi-file-earmark-richtext" />
                                        <label htmlFor="image_uploads" className='text-white'>Choose images to upload (PNG, JPG, JPEG)</label>
                                        <input className="fa fa-image icon text-white" type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple aria-hidden="true" />
                                    </div>
                                    <div>
                                        <label htmlFor="file_uploads" className='text-white'>Choose files to upload</label>
                                        <input className="fa fa-file icon text-white" type="file" id="file_uploads" multiple aria-hidden="true" />
                                    </div>
                                    <div className="preview">
                                    </div>
                                </div>
                            </div></form>
                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary m-1" data-dismiss="modal"  onClick={close}>Close</button>
                            <button type="submit" className="btn btn-danger m-1">Posted</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
