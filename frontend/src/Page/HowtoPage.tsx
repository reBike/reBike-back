import * as React from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import ExplanationTrash from "../components/howtopage/ExplanationTrash";

import { ReduxModule } from "../modules/ReduxModule";
import { useSelector } from "react-redux";
import { RootReducerType } from "../index";
import ReduxImgApi from "../modules/ReduxImgApi";

interface trashType {
  type: string;
}

const HowtoPage = () => {
  const itemID = useSelector((state: RootReducerType) => state.ImgIDReducer);
  const userIdToRedux = ReduxModule().decodeInfo?.id;

  const reduxKindAndImg = ReduxImgApi(itemID, userIdToRedux);

  return (
    <Box textAlign={"center"}>
      <div>
        <SearchBar />
        <Box
          sx={{
            borderRadius: 3,
            border: 1,
            borderColor: "black",
            backgroundColor: "white",
            width: 600,
            height: 300,
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 7,
          }}
        >
          <img src={reduxKindAndImg.imgUrl as string} />
        </Box>

        {reduxKindAndImg.trashKinds?.map((item: string, index: any) => (
          <ExplanationTrash
            key={index}
            kind={item}
            imgURL={reduxKindAndImg.imgUrl}
          />
        ))}
      </div>
    </Box>
  );
};

export default HowtoPage;
