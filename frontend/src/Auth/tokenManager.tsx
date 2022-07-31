import axios from "axios";
import { rs } from "src/utils/types";
import { decodeToken } from "./tokenGetter";

// 받아온 토큰을 만료일을 설정해 로컬 스토리지에 저장
const setAccessToken = (accessToken: string) => {
  console.log("잘 들r어왔나?", accessToken);
  const today = new Date();
  const accessExpires = new Date().setTime(today.getTime() + 1000 * 60 * 30); // 만료 30분

  // const accessExpires = new Date();

  // accessExpires.setTime(today.getTime() + 1000 * 60 * 30); // 30 minute

  // decodeToken(accessToken);
  console.log("만료시간 ac", accessExpires);

  const accessStorage: rs.TokenInfo = {
    value: accessToken,
    expiry: accessExpires,
  };
  localStorage.setItem("access_token", JSON.stringify(accessStorage));
};

const setRefreshToken = (refreshtoken: string) => {
  console.log("잘 들r어왔나?", refreshtoken);
  const today = new Date();
  // const refreshExpires = new Date().setTime(
  //   today.getTime() + 1000 * 60 * 60 * 24 * 14
  // );
  const refreshExpires = new Date().setTime(
    today.getTime() + 1000 * 60 * 24 * 14
  );

  // const refreshExpires = new Date();

  // refreshExpires.setTime(today.getTime() + 1000 * 60 * 60 * 24 * 7); // 7 day

  // decodeToken(accessToken);
  console.log("만료시간 re", refreshExpires);

  const refreshStorage = {
    value: refreshtoken,
    expiry: refreshExpires,
  };
  localStorage.setItem("refresh_token", JSON.stringify(refreshStorage));
};
// 로컬 스토리지에 있는 토큰을 확인
const getToken = () => {
  const access = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");

  return { access, refresh };
};

const getAccess = () => {
  const stringAccess = getToken().access;
  console.log(stringAccess);
  if (stringAccess !== null) {
    const access: rs.TokenInfo = JSON.parse(stringAccess);
    return access;
  }

  return;
};

// 로컬 스토리지에 있는 토큰을 clear
const deleteToken = (clearToken: string) => {
  localStorage.removeItem(clearToken);
  window.location.replace("/mainpage");
};

export { setAccessToken, setRefreshToken, getToken, getAccess, deleteToken };
