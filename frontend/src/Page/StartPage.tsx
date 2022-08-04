import { Box, Button, Link } from "@mui/material";
import StartLogo from "../images/startLogo";
import Animation from "src/modules/Animation";
import useMoveScroll from "src/modules/UseMoveScroll";

const StartPage = () => {
  const { element, onMoveToElement } = useMoveScroll();

  return (
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
        style={{ height: "30vh" }}
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
  );
};

export default StartPage;
