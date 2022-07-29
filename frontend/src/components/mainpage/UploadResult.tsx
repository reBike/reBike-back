import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import InputIcon from "@mui/icons-material/Input";
import { useLocation } from "react-router";
import { rs } from "src/utils/types";
import { useNavigate } from "react-router-dom";

const UploadResult = () => {
  const { state } = useLocation() as rs.TrashResult;

  const navigate = useNavigate();

  const onClickHowto = () => {
    navigate(`/howto`, {
      state: {
        trashkind: "BIODEGRADABLE", //이거 업로드 api 되면 거기서 받아온 값 넣어 줘야함 답 : state.trashname
        //img : state.imgSrc
      },
    });
  };

  return (
    <Box textAlign={"center"}>
      <div>
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
            mt: 23,
          }}
        >
          {/* <img src={state.imgSrc as string} /> ⭕️api되면 풀기 */}
        </Box>

        <Typography marginTop={5} fontWeight="bold" variant="h5">
          {/* {state.trashName === "BIODEGRADABLE" && <p>결과 : 음식물 쓰레기</p>}
          {state.trashName === "CARDBOARD" && <p>결과 : 일반 쓰레기</p>}
          {state.trashName === "GLASS" && <p>결과 : 유리</p>}
          {state.trashName === "METAL" && <p>결과 : 캔</p>}
          {state.trashName === "PAPER" && <p>결과 : 종이</p>}
          {state.trashName === "PLASTIC" && <p>결과 : 플라스틱</p>} ⭕️api되면 풀기*/}
        </Typography>

        <Button
          onClick={onClickHowto}
          sx={{
            backgroundColor: "white",
            color: "#759F98",
            border: 2,
            borderRadius: 2,
            margin: "auto",
            mt: 6,
            width: "50ch",
          }}
        >
          <Typography
            sx={{ color: "black" }}
            fontSize={17}
            marginRight={2}
            fontWeight="bold"
          >
            쓰레기 올바르게 버리는 방법
          </Typography>
          <InputIcon fontSize="medium" sx={{ color: "black" }} />
        </Button>
      </div>
    </Box>
  );
};

export default UploadResult;
