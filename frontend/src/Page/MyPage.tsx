import * as React from "react";
import MyPageNavigation from "../components/Mypage/MyPageNavigation";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function MyPage() {
  return (
    <Container
      style={{
        border: "solid",
        borderColor: "white",
        minWidth: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mb: 20,
          mt: 20,
        }}
      >
        <MyPageNavigation />
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Container>
  );
}

export default MyPage;
