import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Page/Login";
import MyPage from "./Page/MyPage";
import MainPage from "./Page/MainPage";

import Header from "./component/Header";
import {ReactComponent as GreenBack } from './images/greenBack.svg'
import ResultPage from "./Page/ResultPage";

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
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/resultpage" element={<ResultPage />} />
                </Routes>
            </Router>
        </div>
        
    );
}

export default App;



