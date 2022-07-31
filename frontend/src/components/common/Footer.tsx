import { useState, useRef, useEffect } from "react";
import { Button, Container, CssBaseline, Box, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GitLogo from "../../images/header/gitLogo";

function Footer() {
  return (
    <Container
      style={{
        width: "100vw",
        maxWidth: "1920px",
        backgroundColor: "#737458",
        padding: 0,
        marginTop: 70,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#B0B09A",
          width: "100vw",
        }}
      >
        <Box sx={{ paddingTop: 2 }}>
          <div
            style={{
              fontFamily: "IrishGrover",
              color: "white",
              fontSize: 20,
              paddingBottom: 2,
            }}
          >
            ReBike
          </div>
          <div style={{ color: "white", fontSize: 10 }}>
            <div>FrontEnd</div>
            <div>이채현</div>
            <div>이정우</div>
            <div>진호병</div>
            <div>-</div>
            <div>BackEnd</div>
            <div>김용민</div>
            <div>김유림</div>
            <div>박성빈</div>
          </div>
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: 8,
            marginLeft: 20,
          }}
        >
          <GitLogo />
          <a
            target={"_blank"}
            href="https://github.com/HowTrash"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 10,
              paddingLeft: 3,
            }}
          >
            https://github.com/HowTrash
          </a>
        </div>
      </div>
      <div style={{ paddingTop: 50 }}></div>
    </Container>
  );
}

export default Footer;
