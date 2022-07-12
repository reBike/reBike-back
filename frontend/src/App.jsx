import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Page/Login";
import MyPage from "./Page/MyPage";
import MainPage from "./Page/MainPage";
import Header from "./component/Header";
import Register from "./Page/Register";

import {ReactComponent as GreenBack } from './images/greenBack.svg'
import MyTrashcan from "./component/Mypage/MyTrashcan";
import MyTrashChart from "./component/Mypage/MyTrashChart";
import ChangeInfo from "./component/Mypage/ChangeInfo";
import SearchResult from "./component/mainpage/SearchResult";


function App() {
    return (
        <div>
            <div style={{position: 'absolute',float: "right", zIndex: -100, top: 0, right: 0}}>
                <GreenBack />
            </div>
            <Router>
            <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/mainpage" element={<MainPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/mainpage/resultpage" element={<SearchResult/>}/>
                    <Route path="/mypage" element={<MyPage />}>
                        <Route index element={<MyTrashcan />} />
                        <Route path='/mypage/myTrashChart' element={<MyTrashChart />} />
                        <Route path='/mypage/userInfo' element={<ChangeInfo />} />
                        <Route path='/mypage/logout' element={<MyTrashcan />} />
                    </Route>
                    

                </Routes>
            </Router>
        </div>
        
    );
}

export default App;
