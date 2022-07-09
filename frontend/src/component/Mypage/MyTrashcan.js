import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Divider,
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container,
    Link,
    styled,
} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#759F98",
        },
    },
});

function MyTrashcan() {
    return(
        <Container
            style={{
                backgroundColor: "white",
                border: "solid",
                borderColor: "white",
                borderRadius: 5,
                minWidth: "100%",
                height: "100vh",
            }}>

        </Container>

    );
}

export default MyTrashcan;
