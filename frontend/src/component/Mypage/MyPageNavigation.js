import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button,Box,Typography,Container,styled } from "@mui/material";
import { Link, Route, useLocation } from 'react-router-dom';

const sidebarNavItems = [
    {
        display: '내 분리수거함',
        to: '/mypage',
        section: ''
    },
    {
        display: '내 쓰레기 통계',
        to: '/mypage/myTrashChart',
        section: 'started'
    },
    {
        display: '내 정보 변경',
        to: '/mypage/userInfo',
        section: 'calendar'
    },
    {
        display: '로그아웃',
        to: '/mypage/logout',
        section: 'user'
    },
]

const theme = createTheme({
    palette: {
        primary: {
            main: "#E7F5EF",
        },
    },
});

const MyPageNavigationBtn = styled(Button)(({}) => ({
    backgroundColor: "white",
    borderColor: "white",
    color: "black",
    width: 150,
    fontSize: "small",
    pt:1,
    pb: 1,
    "&:hover": {
        color:"white",
        backgroundColor: "#759F98",
        borderColor: "#759F98",
    },
    "&click":{
        color:"white",
        backgroundColor: "#759F98",
        borderColor: "#759F98",
    }
}));


function MyPageNavigation() {
    const sidebarRef = React.useRef();

    const location = useLocation();

    React.useEffect(() => {
        console.log(location);
      }, [ location ])

    return(
        <Container style={{ borderRadius: 5, width: 200}}>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: 5,
                        textDecoration: "none"
                    }}>
                        <div ref={sidebarRef}>
                            {
                            sidebarNavItems.map((item, index) => (
                                <MyPageNavigationBtn
                                    variant="outlined"
                                    sx={
                                        location.pathname===item.to
                                        ? { 
                                            color:"white",
                                            backgroundColor: "#759F98",
                                            borderColor: "#759F98",
                                            
                                            }
                                        :{
                                            textDecoration: "none",
                                            color:"black",
                                            backgroundColor: "white",
                                            borderColor: "white",
                                            
                                        }}>
                                    <Link to={item.to} key={index}
                                        sx={{textDecoration: "none",fontSize : 30, color : "black"}}>
                                            {item.display}
                                    </Link>
                                </MyPageNavigationBtn>
                            ))}
                        </div>
                </Box>
            </ThemeProvider>
        </Container>
    );
}

export default MyPageNavigation;
