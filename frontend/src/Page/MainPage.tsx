import * as React from "react";
import { Box, Link } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import UploadImage from "../components/mainpage/UploadImage";
import PopularTrash from "../components/mainpage/PopularTrash";
import { useRef, useEffect } from "react";
import lottie from "lottie-web";
import StartPage from "./StartPage";
import StartLogo from "../images/startLogo";
import Animation from "src/modules/Animation";
import useMoveScroll from "src/modules/UseMoveScroll";

const MainLottie = () => {
  //lottie
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: element.current as HTMLDivElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../images/mainbike.json"),
    });
  }, []);
  return <Box ref={element} style={{ marginTop: 30, height: 180 }}></Box>;
};

const MainPage = () => {
  const { element, onMoveToElement } = useMoveScroll();

  return (
    <Box textAlign={"center"}>
      <div>
        <Box
          textAlign={"center"}
          style={{
            backgroundImage: "url(ggu.jpg)",
            backgroundPosition: "center",
            width: "100wh",
            height: "100vh",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            display={"flex"}
            textAlign={"center"}
            style={{ height: "30vh", width: "30wh" }}
            flexDirection="column"
            margin={"auto"}
          >
            <StartLogo />

            <Link
              onClick={onMoveToElement}
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                fontFamily: "IrishGrover",
                color: "white",
              }}
            >
              <Animation />
            </Link>
          </Box>
        </Box>
        {/* <StartPage /> */}
        <div ref={element}></div>

        <MainLottie />
        <SearchBar />
        <UploadImage />
        <PopularTrash />
      </div>
    </Box>
  );
};

export default MainPage;
