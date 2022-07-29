import axios from "axios";
import { API_BASE_URL } from "src/utils/constants";
import { rs } from "src/utils/types";
import { getToken, setAccessToken, setRefreshToken } from "./tokenManager";

// access_token의 만료일을 확인
const checkAccessToken = () => {
  const access_token = getToken().access;
  const token_active = true;

  if (access_token) {
    const token: rs.TokenInfo = JSON.parse(access_token);
    console.log("확인 억셋으", token);

    const nowTime = new Date().getTime();

    const tokenExpire = token.expiry;
    console.log("체크 토큰 어세스 만ㅇ료시간?", tokenExpire);
    console.log("now시간?", nowTime);

    // 만료일이 지나면 refresh 토큰 확인
    if (tokenExpire - nowTime <= 0) {
      checkRefreshToken();
    }

    return token_active;
  }
  return token_active;
};

// 리프레시 토큰을 확인
const checkRefreshToken = () => {
  const refresh_token = getToken().refresh;
  const token_active = true;

  if (refresh_token) {
    const token: rs.TokenInfo = JSON.parse(refresh_token);
    console.log("확인 맆레싀", token);

    const nowTime = new Date().getTime();
    const tokenExpire = token.expiry;
    console.log("시간?2", tokenExpire);
    console.log("now시간?2", nowTime);

    // refresh 토큰 만료일이 지나면 localStorage clear
    if (tokenExpire - nowTime <= 0) {
      localStorage.clear();
      alert("로그인이 필요합니다.");
      window.location.replace("/login");
      return;
    }

    // refresh 토큰의 만료일이 아직 안지났을때 새로운 access 토큰을 불러오는 함수
    getRefreshToken();
    return token_active;
  }
  return token_active;
};

//리프레시 토큰의 만료일이 남아 새로운 access 토큰을 받아옴
const getRefreshToken = async () => {
  const token_active = true;

  const refresh_token = getToken().refresh;
  let accessToken = getToken().access;

  if (refresh_token !== null) {
    console.log("원래 맆레시", JSON.parse(refresh_token).value);
  }

  if (refresh_token) {
    const newRe: rs.TokenInfo = JSON.parse(refresh_token);
    console.log(newRe);

    //access token 요청하는 axios
    const data = await axios
      .get(`${API_BASE_URL}/users/auth/`, {
        headers: {
          Authorization: `${newRe.value}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        localStorage.clear();
        window.alert(e);
        // window.location.replace("/login");
      });

    accessToken = data.access_token;

    console.log("새로운 억셋으", accessToken);

    localStorage.removeItem("access_token");
    if (accessToken !== null) {
      setAccessToken(accessToken);
      window.location.reload();
    }

    return token_active;
  }
};

export { checkAccessToken, checkRefreshToken, getRefreshToken };
