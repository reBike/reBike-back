import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { rs } from "src/utils/types";
import { checkAccessToken } from "./checkToken";
import { getToken } from "./tokenManager";

interface Props {
  authAble: boolean;
}

export function AuthRouter({ authAble }: Props) {
  useEffect(() => {
    (async () => {
      // 토큰이 로컬 스토리지에 없으면 로그아웃 상태이게끔
      // checkAccessToken 에서 확인을 해줌
      checkAccessToken();

      if (authAble === true) {
        const token = getToken().access;
        console.log("원래 토큰", token);
        if (!token) {
          window.location.replace("/login");
          alert("로그인이 필요합니다.");
        }
      }
    })();
  }, []);
  return <Outlet />;
}

export default AuthRouter;
