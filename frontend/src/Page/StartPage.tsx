import { useState, useEffect, useRef } from "react";
import { Box, Button, Link } from "@mui/material";
import lottie from "lottie-web";
import Main from "../images/mainBacl";

const MainPageLottie = () => {
  //lottie
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: element.current as HTMLDivElement,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("../images/mainLottie.json"),
    });
  }, []);
  return <Box ref={element} style={{ height: 300 }}></Box>;
};

const StartPage = () => {
  return (
    <Box
      display="flex"
      textAlign={"center"}
      style={{
        position: "absolute",
        backgroundColor: "white",
        zIndex: 100,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Main />
      <Box
        position={"absolute"}
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignSelf="center"
        zIndex={90}
      >
        <MainPageLottie />
        <Link
          href="/mainpage"
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignSelf="center"
          style={{ margin: "auto", textDecoration: "none", fontWeight: "bold" }}
        >
          <Button>메인 페이지로 간드앙</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default StartPage;
