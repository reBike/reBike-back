import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
    Typography,
    Container,
    styled,
    TextField,
    Box,
    Link,
    Button
} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#759F98",
        },
    },
});

const UserInfoChange = styled(TextField)(({}) => ({
    "&:hover": {
        color: "#759F98",
    },
    "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
            borderColor: "#759F98",
        },
    },
}));


function ChangeInfo() {

    return(
        <Container
            style={{
                border: "solid",
                borderRadius: 5,
                borderColor:"transparent",
                minWidth: "100%",
                height: "100vh",
            }}>
                <ThemeProvider theme={theme}>
                    <Typography
                        color="black"
                        fontWeight="bold"
                        sx={{mt: 1.2,
                            mb: 1,
                            fontSize: "medium"}}>
                        내 정보 변경
                    </Typography>
                   
                <Container
                    style={{
                        backgroundColor: "white",
                        border: "solid",
                        borderRadius: 5,
                        borderColor: "white",
                        justifyContent: "center",
                        height: "100vh",
                        paddingTop: 50}}>

                    <Box
                            component="form"
                            color="info.contrastText"
                            noValidate
                            sx={{ 
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                width: 300,
                                margin: "auto"}}
                            
                        >
                            <UserInfoChange
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <UserInfoChange
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <UserInfoChange
                                margin="normal"
                                required
                                fullWidth
                                name="nickname"
                                label="nickname"
                                type="nickname"
                                id="nickname"
                                autoComplete="current-nickname"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    height: 50,
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                            >
                                변경하기
                            </Button>
                    </Box>                                              
                </Container>
            </ThemeProvider>
        </Container>

    );
}

export default ChangeInfo;
