import * as React from "react";
import MyPageNavigation from "../components/Mypage/MyPageNavigation";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function MyPage() {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        width: "100vw",
        maxWidth: "1920px",
      }}
    >
      <MyPageNavigation />
      <Container>
        <Outlet />
      </Container>
    </Container>
  );
}

export default MyPage;
