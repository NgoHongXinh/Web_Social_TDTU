
import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import PublicRoute from './common/PublicRoute';
import { Helmet } from "react-helmet";
import LoginPage from './components/screen/loginPage/login.js'
import HomePage from './components/screen/home/home.js';
import ErrorPage from './components/screen/error/error.js';
import './App.css';
import { SocketContext, socket } from './thirdparty/socket';

function App() {
  const [currUserInfo, setCurrUserInfo] = useState()
  return (
    <SocketContext.Provider value={socket}>
    <div className='App'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>MXH TDTU</title>
      </Helmet>
      <BrowserRouter>
        <Fragment>
          <div>
            <div className='content'>
              <Routes>

                <Route element={<PublicRoute />}>
                  <Route path='/login' element={<LoginPage setCurrUserInfo={setCurrUserInfo} />} />
                </Route>

                <Route element={<PrivateRoute currUserInfo={currUserInfo} setCurrUserInfo={setCurrUserInfo} />}>
                  <Route path='/' element={<HomePage currUserInfo={currUserInfo} />} />
                  {/* <Route path='/personal/:id/*' element={<PersonalPage currUserInfo={currUserInfo} />}></Route>
                  <Route path='/account/:id/setting' element={<SettingPage currUserInfo={currUserInfo} setCurrUserInfo={setCurrUserInfo}/>}> </Route>
                  <Route path='/search/' element={<FindFriend />}> </Route>
                  <Route path='/chat' element={<ChatPage currUserInfo={currUserInfo} />}> </Route> */}
                </Route>

                <Route path='*' element={<ErrorPage />} />
              </Routes>
            </div>
          </div>
        </Fragment>
      </BrowserRouter>

    </div>
  </SocketContext.Provider>
);
}

export default App;
