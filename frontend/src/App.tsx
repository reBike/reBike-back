import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Page/Login";
import LoginSuccess from "./Page/LoginSuccess";
import MyPage from "./Page/MyPage";
import MainPage from "./Page/MainPage";
import Header from "./components/common/Header";
import Register from "./Page/Register";
import HowtoPage from "./Page/HowtoPage";
import ErrorPage from "./components/common/ErrorPage";
import DefaultHowPage from "./Page/DefaultHowPage";

import GreenBack from "./images/greenBack";
import MyTrashcan from "./components/Mypage/MyTrashcan";
import MyTrashChart from "./components/Mypage/MyTrashChart";
import MyChallenge from "./components/Mypage/MyChallenge";
import ChangeInfo from "./components/Mypage/ChangeInfo";
import UploadResult from "./components/mainpage/UploadResult";
import AuthRouter from "./Auth/AuthRouter";
import StartPage from "./Page/StartPage";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div style={{ backgroundColor: "#F7F8E9" }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/welcome" element={<LoginSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/errorpage" element={<ErrorPage />} />

          <Route element={<AuthRouter authAble={false} />}>
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/mainpage/resultpage" element={<UploadResult />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/howtopage" element={<HowtoPage />} />
            <Route path="/defaulthowpage" element={<DefaultHowPage />} />
          </Route>

          {/* mypage 에 접근 못하게 라우팅 */}
          <Route element={<AuthRouter authAble={true} />}>
            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<MyTrashcan />} />
              <Route path="/mypage/myTrashChart" element={<MyTrashChart />} />
              <Route path="/mypage/myChallenge" element={<MyChallenge />} />
              <Route path="/mypage/userInfo" element={<ChangeInfo />} />
              <Route path="/mypage/logout" element={<ChangeInfo />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
