import * as React from "react";
import { Box, Grid, Typography, Link, Modal, Backdrop } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import ExplanationTrash from "../components/howtopage/ExplanationTrash";
import { ReduxModule } from "../modules/ReduxModule";
import { useSelector } from "react-redux";
import { RootReducerType } from "../index";
import ReduxImgApi from "../modules/ReduxImgApi";
import { useLocation } from "react-router";
import constants from "../utils/constants";
import { useEffect, useState } from "react";

interface TypeChallenge {
  state: {
    challenge_id: string;
    challenge_content: string;
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const HowtoPage = () => {
  const itemID = useSelector((state: RootReducerType) => state.ImgIDReducer);
  const userIdToRedux = ReduxModule().decodeInfo?.id;

  const reduxKindAndImg = ReduxImgApi(itemID, userIdToRedux);
  console.log(userIdToRedux);
  console.log(itemID);

  const { state } = useLocation() as TypeChallenge;

  console.log("state가 뭔대ㅔ요 ... ", state);
  //❌

  const [challengeText, setChallengeText] = useState("");
  const [challengeImgURL, setChallengeImgURL] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //❌

  useEffect(() => {
    if (state.challenge_id !== "NONE") {
      handleOpen();
      console.log("challenge가 뭔데요 ...", state.challenge_id);
      const x = state.challenge_id; // 형변환
      console.log("x가 뭔대ㅔ요 ... ", x);
      var y: number = +x;
      console.log("y가 뭔데요 ㅠㅠ", y);
      setChallengeImgURL(constants.CHALLENGE[y].imgT);
      setChallengeText(constants.CHALLENGE[y].test);
    }
  }, []);

  //none이 아니면 state.challenge를 인덱스로 state.challenge_content 를 갯수로

  return (
    <Box textAlign={"center"}>
      <div>
        <SearchBar />
        <Box
          sx={{
            borderRadius: 3,
            backgroundColor: "white",
            width: 700,
            height: 350,
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "1px 3px 3px #B0B09A",
            mt: 7,
            mb: 10,
          }}
        >
          <img
            style={{ width: 600, height: 320 }}
            src={reduxKindAndImg.imgUrl as string}
          />
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{ fontSize: 50, mt: 10, fontFamily: "Itim", color: "#737458" }}
          >
            How to recycle?
          </Typography>
          {reduxKindAndImg.trashKinds?.map((item: string, index: any) => (
            <ExplanationTrash
              key={index}
              kind={item}
              imgURL={reduxKindAndImg.imgUrl}
            />
          ))}

          <Link
            href="/mypage"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "Itim",
              padding: 100,
              color: "#737458",
              fontSize: 30,
            }}
          >
            {" "}
            Go To Mypage{" 👉"}{" "}
          </Link>

          {/* //❌ */}
          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 700,
            }}
          >
            <Box sx={style}>
              <Typography
                id="modal-title"
                variant="h4"
                fontWeight="bold"
                component="h1"
                sx={{ mb: 3, color: "#737458", fontFamily: "Itim" }}
              >
                도전 과제 달성 !!
              </Typography>
              <div style={{ marginTop: 15, marginBottom: 30 }}>
                <img width={200} height={200} src={challengeImgURL}></img>
              </div>

              <Typography>{challengeText}</Typography>
            </Box>
          </Modal>

          {/* //❌ */}
        </Grid>
      </div>
    </Box>
  );
};

export default HowtoPage;
