import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Box, Container, styled } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const sidebarNavItems = [
  {
    display: "내 분리수거함",
    to: "/mypage",
    section: "",
  },
  {
    display: "내 쓰레기 통계",
    to: "/mypage/myTrashChart",
    section: "started",
  },
  {
    display: "도전! 재활용",
    to: "/mypage/myChallenge",
    section: "started",
  },
  {
    display: "내 정보 변경",
    to: "/mypage/userInfo",
    section: "calendar",
  },
  {
    display: "로그아웃",
    to: "/mypage/logout",
    section: "user",
  },
];

// 전체 테마 적용
const theme = createTheme({
  palette: {
    primary: {
      main: "#B0B09A",
    },
  },
});

//네비게이션 버튼 커스텀
const MyPageNavigationBtn = styled(Button)(({}) => ({
  color: "black",
  width: 150,
  fontSize: "small",
  pt: 1,
  pb: 1,

  borderRadius: 0,
  "&:hover": {
    color: "black",
    backgroundColor: "#F7F8E9",
    borderColor: "#F7F8E9",
  },
  "&click": {
    color: "black",
    backgroundColor: "#F7F8E9",
    borderColor: "#F7F8E9",
  },
}));

//링크 밑줄 none 처리
const StyledLink = styled(Link)(({}) => ({
  textDecoration: "none",

  "&:focus, &:hover, &:visited, &:link, &:active": {
    textDecoration: "none",
  },
}));

function MyPageNavigation() {
  const location = useLocation();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        width: "100vw",
      }}
    >
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#B0B09A",
            textDecoration: "none",
            justifyContent: "center",
          }}
        >
          {sidebarNavItems.map((item, index) => (
            <StyledLink
              to={item.to}
              key={index}
              sx={{
                textDecoration: "none",
                fontSize: 30,
                color: "black",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MyPageNavigationBtn
                variant="outlined"
                sx={
                  location.pathname === item.to
                    ? {
                        textDecoration: "none",
                        color: "black",
                        backgroundColor: "#F7F8E9",
                        borderColor: "#F7F8E9",
                      }
                    : {
                        textDecoration: "none",
                        color: "#F7F8E9",
                        backgroundColor: "#B0B09A",
                        borderColor: "#B0B09A",
                      }
                }
              >
                {item.display}
              </MyPageNavigationBtn>
            </StyledLink>
          ))}
        </Box>
      </ThemeProvider>
    </Container>
  );
}

export default MyPageNavigation;
