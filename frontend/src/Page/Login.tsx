import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Api from "src/utils/customApi";
import { rs } from "src/utils/types";
import { setAccessToken, setRefreshToken } from "src/Auth/tokenManager";
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
} from "@mui/material";
import { decodeToken } from "src/Auth/tokenGetter";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B0B09A",
    },
  },
});

function Login() {
  const userInfo = [] as unknown as rs.UserAuth;

  const [saveInfo, setSaveInfo] = useState<rs.UserAuth>(userInfo);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      event,
      name: data.get("name"),
      password: data.get("password"),
    });

    const userLogin = async () => {
      const result = await Api.post(`/users/auth`, {
        name: data.get("name"),
        password: data.get("password"),
      }).then((res) => res.data as rs.UserAuth);
      setSaveInfo(result);
      console.log("받아온 결과1", result);
      console.log("받아온 결과2", result.refresh_token);

      if (result.access_token !== null) {
        setAccessToken(result.access_token,false);
        setRefreshToken(result.refresh_token,false);
        alert("로그인 성공♻️");

        // checkAccessToken();
        // checkRefreshToken();
        decodeToken(result.access_token);
        window.location.replace("/login/welcome");
      } else {
        alert("아이디와 비밀번호를 다시 확인해주세요.");
        // Handle error.
        console.log("An error occurred:", result);
      }
    };
    userLogin();
  };
  return (
    <Container
      style={{
        backgroundColor: "#F7F8E9",
        minWidth: "100%",
        maxHeight: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ mb: 25, mt: 20 }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
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
              Do you have any account?
            </Typography>
            <Link
              href="/register"
              style={{
                textDecoration: "none",
                fontSize: 15,
                color: "#B0B09A",
                fontFamily: "Itim",
                margin: 15,
              }}
            >
              join us &gt;
            </Link>
            <Box
              component="form"
              color="info.contrastText"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userId"
                label="ID"
                name="name"
                autoComplete="name"
                autoFocus
                sx={{ borderRadius: 5, textAlign: "center" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="PW"
                type="password"
                id="password"
                autoComplete="current-password"
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
                  fontFamily: "Itim",
                  borderRadius: 5,
                  backgroundColor: "#B0B09A",
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  );
}

export default Login;
