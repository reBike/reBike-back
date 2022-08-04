import * as React from "react";
import { useState, useEffect } from "react";

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
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "../../src/index";
import { fetchDecodeData } from "src/actions/DecodeActions";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B0B09A",
    },
  },
});

function Login() {
  const token = localStorage.getItem("access_token");

  const dispatch = useDispatch();

  const reduxToken = useSelector(
    (state: RootReducerType) => state.DecodeReducer
  );

  useEffect(() => {
    if (token) {
      console.log("header.js useEffect");
      dispatch(fetchDecodeData(token as string));
    } else {
      console.log("header.js not token");
    }
  }, []);
  return (
    <Container
      style={{
        backgroundColor: "#F7F8E9",
        minWidth: "100%",
        height: "40vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                color="#737458"
                fontWeight="bold"
                variant="h4"
                fontFamily={"Itim"}
              >
                Hi, {reduxToken.decodeInfo?.alias} !
              </Typography>
            </Box>
            <Link
              href="/mainpage"
              style={{
                textDecoration: "none",
                fontSize: 15,
                color: "#B0B09A",
                fontFamily: "Itim",
                margin: 10,
              }}
            >
              go to mainpage &gt;
            </Link>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  );
}

export default Login;
