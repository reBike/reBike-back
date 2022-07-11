import * as React from "react";
import MyPageNavigation from "../component/Mypage/MyPageNavigation";
import { Box, Container} from "@mui/material";
import { Outlet } from "react-router-dom";



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
                    <Outlet />
                </Container>
            </Box>
        </Container>

    );
}

export default MyPage;