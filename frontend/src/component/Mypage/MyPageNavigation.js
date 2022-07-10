import * as React from "react";
import MyPageNavigationButton from "./MyPageNavigationButton";

import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Button,
    Box,
    Typography,
    Container,
    Link,
    styled,
    Grid
} from "@mui/material";
import Switch from '@mui/material/Switch';



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
    "&:hover": {
        color:"white",
        backgroundColor: "#759F98",
        borderColor: "#759F98",
    },}));


function MyPageNavigation() {

    return(
        <Container style={{ borderRadius: 5, width: 200}}>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: 5
                    }}>
                    <MyPageNavigationBtn
                        variant="outlined"
                        sx={{
                            color: "black",
                            width: 150,
                            fontSize: "small",
                            pt:1,
                            pb: 1,
                        }}>
                        내 분리수거함
                    </MyPageNavigationBtn>
                    <MyPageNavigationBtn
                        variant="outlined"
                        sx={{
                            color: "black",
                            width: 150,
                            fontSize: "small",
                            pt:1,
                            pb: 1,
                        }}>
                        내 쓰레기 통계
                    </MyPageNavigationBtn>
                    <MyPageNavigationBtn
                        variant="outlined"
                        sx={{
                            color: "black",
                            width: 150,
                            fontSize: "small",
                            pt:1,
                            pb: 1,
                        }}>
                        내 정보 변경
                    </MyPageNavigationBtn>

                    <MyPageNavigationBtn
                        variant="outlined"
                        sx={{
                            color: "black",
                            width: 150,
                            fontSize: "small",                    
                            pt:1,
                            pb: 1,
                        }}>
                        로그아웃
                    </MyPageNavigationBtn>
                </Box>
            </ThemeProvider>
        </Container>
    );
}

export default MyPageNavigation;
