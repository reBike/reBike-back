import { useState, useRef, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  Link,
  CssBaseline,
  Hidden,
  Typography,
  styled,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "../../index";
import { fetchDecodeData } from "src/actions/DecodeActions";
import Logo from "../../images/header/headerLogo";

const theme = createTheme({
  palette: {
    primary: {
      main: "#737458",
    },
  },
});

function Header() {
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

  const [mouseOn, setMouseOn] = useState(false);

  const handlePopoverOpen = () => {
    setMouseOn(true);
  };
  const handlePopoverClose = () => {
    setMouseOn(false);
  };
  console.log(token);

  function deleteToken() {
    localStorage.clear();
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        style={{
          backgroundColor: "#737458",
          width: "100%",
          maxWidth: "1920px",
        }}
      >
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          marginLeft="auto"
        >
          <Link
            href="/mainpage"
            sx={{
              position: "absolute",
              left: 60,
              textDecoration: "none",
              paddingBottom: 1,
              paddingTop: 1,
            }}
          >
            <Logo />
          </Link>

          {token ? (
            // if IsLogin is true
            <div>
              {" "}
              <Button>
                <Link
                  href="/mypage"
                  sx={{
                    textDecoration: "none",
                    color: "#F7F8E9",
                    fontFamily: "Itim",
                    fontSize: 17,
                    fontStyle: "bold",
                    margin: 1,
                  }}
                >
                  mypage
                </Link>
              </Button>
              <Button>
                <Link
                  href="/mainpage"
                  onClick={deleteToken}
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  sx={{
                    textDecoration: "none",
                    color: "#F7F8E9",
                    fontSize: "small",
                    fontFamily: "Itim",
                    margin: 1,
                  }}
                >
                  {reduxToken.decodeInfo?.alias}
                </Link>
                <>
                  {mouseOn ? (
                    <Container style={{ position: "absolute", top: 80 }}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        sx={{
                          background: "white",
                          border: 1,
                          borderRadius: 1,
                          borderColor: "#F7F8E9",
                          color: "#F7F8E9",
                          fontSize: 3,
                          padding: 1,
                          width: 100,
                        }}
                      >
                        클릭해서 로그아웃
                      </Box>
                    </Container>
                  ) : (
                    Hidden
                  )}
                </>
              </Button>
            </div>
          ) : (
            // if IsLogin is false
            <Button>
              <Link
                href="/login"
                sx={{
                  textDecoration: "none",
                  fontFamily: "Itim",
                  color: "#F7F8E9",
                  margin: 1,
                  fontSize: 17,
                  fontStyle: "bold",
                }}
              >
                Login
              </Link>
            </Button>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Header;
