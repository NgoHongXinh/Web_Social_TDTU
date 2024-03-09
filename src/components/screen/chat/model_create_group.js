import React, { useState, useEffect, useRef, useContext} from 'react';
import "../../../css/chat.css";
export default function ModelCreateGroupChat(props) {
    const {close,userLogin} = props 
    return(
        <div>
        {/* The Modal */}
        <div className="modal-post-container p-5 border bg-custom mt-1 h-100" >
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h4 className="modal-title text-white">Tạo Nhóm Chat</h4>
                    </div>
                    {/* Modal body */}
                    <div className="modal-body">
                        <form>
                            {/* list friend chon add vào group */}
                           <div>
                           <div className='m-2 list-item-add'>
                                <a className='btn btn-header-chat-custom p-2 m-1 align-item-center'>
                                    Xinh
                                    {/* icon xoas */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </a>
                                <a className='btn btn-header-chat-custom p-2 m-1 align-item-center'>
                                    Như
                                    {/* icon xoas */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </a>
                                <a className='btn btn-header-chat-custom p-2 m-1 align-item-center'>
                                    Anh
                                    {/* icon xoas */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </a>
                               
                            </div>
                            <div className="list-friend-group">
                                <div className="list-group-add-item  p-2">
                                            <div className="d-flex align-items-center list-group--padding">
                                                {/* avatar friend chat */}
                                                <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle mr-1  mt-2" alt="Avatar" width={50} height={50} />
                                            
                                                <div className="m-2 text-algin-center">
                                                    <span>Ngo Hong Xinh</span>
                                                </div>
                                                

                                            </div>
                                            {/* button chọn add vao nhóm */}
                                            <button className='btn btn-danger btn-sm'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="list-group-add-item  p-2">
                                            <div className="d-flex align-items-center list-group--padding">
                                                {/* avatar friend chat */}
                                                <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle mr-1  mt-2" alt="Avatar" width={50} height={50} />
                                            
                                                <div className="m-2 text-algin-left">
                                                    <span>Ngo Hong Xinh</span>
                                                </div>
                                                

                                            </div>
                                            {/* button chọn add vao nhóm */}
                                            <button className='btn btn-danger btn-sm'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                    
                                        <div className="list-group-add-item  p-2">
                                            <div className="d-flex align-items-center list-group--padding">
                                                {/* avatar friend chat */}
                                                <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle mr-1  mt-2" alt="Avatar" width={50} height={50} />
                                            
                                                <div className="m-2 text-algin-left">
                                                    <span>Ngo Hong Xinh</span>
                                                </div>
                                                

                                            </div>
                                            {/* button chọn add vao nhóm */}
                                            <button className='btn btn-danger btn-sm'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="list-group-add-item  p-2">
                                            <div className="d-flex align-items-center list-group--padding">
                                                {/* avatar friend chat */}
                                                <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle mr-1  mt-2" alt="Avatar" width={50} height={50} />
                                            
                                                <div className="m-2 text-algin-left">
                                                    <span>Ngo Hong Xinh</span>
                                                </div>
                                                

                                            </div>
                                            {/* button chọn add vao nhóm */}
                                            <button className='btn btn-danger btn-sm'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="list-group-add-item  p-2">
                                            <div className="d-flex align-items-center list-group--padding">
                                                {/* avatar friend chat */}
                                                <img src="https://cdn1.iconfinder.com/data/icons/animals-95/300/cat-circle-animal-pet-wild-domestic-256.png" className="rounded-circle mr-1  mt-2" alt="Avatar" width={50} height={50} />
                                            
                                                <div className="m-2 text-algin-left">
                                                    <span>Ngo Hong Xinh</span>
                                                </div>
                                                

                                            </div>
                                            {/* button chọn add vao nhóm */}
                                            <button className='btn btn-danger btn-sm'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                </div>
                           </div>
                        </form>
                        {/* Modal footer */}
                        <div className="modal-footer p-3">
                            <button type="button" className="btn btn-secondary m-1" data-dismiss="modal"  onClick={close}>Close</button>
                            <button type="button"  className="btn btn-success m-1">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
