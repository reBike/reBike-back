import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
    Grid,
    Typography,
    Container,
    Box,
} from "@mui/material";
import ChangePassWord from "./Change_password";
import ChangeNickName from "./Change_nickname";

const theme = createTheme({
    palette: {
        primary: {
            main: "#737458",
        },
    },
});


function ChangeInfo() {

    return (
        <Container
            style={{
                border: "solid",
                borderRadius: 5,
                borderColor: "transparent",
                minWidth: "100%",
                height: "90vh",
                marginTop: 20,
            }}>
            <ThemeProvider theme={theme}>
                <Typography
                    color="black"
                    fontWeight="bold"
                    sx={{
                        mt: 1.2,
                        mb: 1,
                        fontSize: "medium"
                    }}>

                </Typography>

                <Grid container
                    style={{
                        backgroundColor: "white",
                        border: "solid",
                        borderRadius: 5,
                        borderColor: "white",
                        justifyContent: "center",
                        height: "60vh",
                        paddingTop:50,
                        boxShadow: "1px 3px 3px #B0B09A",
                    }} sx={{ mt: 5 }}>
                    <Grid item xs={5}>
                        <Box>
                            <ChangeNickName />
                        </Box>
                    </Grid>
                    <Grid item xs={1}
                    style={{justifyContent:"center"}}>
                        <div style={{
                            borderLeft: '3px',
                            height: '90%',
                            width: 1,
                            backgroundColor: '#E4E4D9',
                            margin: "auto"
                        }}></div>
                    </Grid>
                    <Grid item xs={5}>
                        <Box>
                            <ChangePassWord />
                        </Box>
                    </Grid>

                </Grid>
        </ThemeProvider>
        </Container >
        
    );
}

export default ChangeInfo;
