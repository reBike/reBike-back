import * as React from "react";
import MyPageNavigation from "../component/Mypage/MyPageNavigation";
import MyTrashcan from "../component/Mypage/MyTrashcan";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Button,
    CssBaseline,
    Box,
    Typography,
    Container,
    Link,
    styled,
    Grid,
} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#E7F5EF",
        },
    },
});


const NaverLoginBtn = styled(Button)(({}) => ({
    backgroundColor: "white",
    "&:hover": {
        color: "#6AED64",
        backgroundColor: "#54B94E",
        borderColor: "#54B94E",
    },
}));

function MyPage(){
    return (
        <Container
            style={{
                border: "solid",
                borderColor: "#E7F5EF",
                minWidth: "100%",
                height: "100vh",
        }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    mb: 2, mt: 20
            }}>
                <MyPageNavigation />
                <Container>
                    <MyTrashcan />
                </Container>
            </Box>
        </Container>

    );
}

export default MyPage;