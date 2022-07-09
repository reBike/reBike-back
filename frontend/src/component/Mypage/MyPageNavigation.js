import * as React from "react";
import MyPageNavigationButton from "./MyPageNavigationButton";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Button,
    Box,
    Typography,
    Container,
    Link,
    styled,
    Grid
} from "@mui/material";


const theme = createTheme({
    palette: {
        primary: {
            main: "#E7F5EF",
        },
    },
});

const MyPageNavigationBtn = styled(Button)(({}) => ({
    backgroundColor: "white",
    borderColor: "#E7F5EF",
    "&:hover": {
        backgroundColor: "#E7F5EF",
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

                    }}>
                    <MyPageNavigationBtn
                        sx={{
                            color: "black",
                            fontWeight: "bold",
                            width: 150,
                            borderColor: "#E7F5EF",
                            pt:1,
                            pb: 1,
                        }}>
                        내 분리수거함
                    </MyPageNavigationBtn>
                    <MyPageNavigationBtn
                        sx={{
                            color: "black",
                            fontWeight: "bold",
                            width: 150,
                            mt: 2,
                            mb: 2,
                            pt:1,
                            pb: 1,
                        }}>
                        내 쓰레기 통계
                    </MyPageNavigationBtn>
                    <MyPageNavigationBtn
                        sx={{
                            color: "black",
                            fontWeight: "bold",
                            width: 150,
                            pt:1,
                            pb: 1,
                        }}>
                        내 정보 변경
                    </MyPageNavigationBtn>

                    <MyPageNavigationBtn
                        sx={{
                            color: "black",
                            fontWeight: "bold",
                            width: 150,
                            mt: 40,
                            mb: 2,
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
