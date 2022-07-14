import * as React from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";

import InputIcon from "@mui/icons-material/Input";
import { useLocation } from "react-router";

const SearchResult = () => {
  const { state } = useLocation(); //이미지 주소
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
            mt: 23,
          }}
        >
          <CardMedia
            component="img"
            width="600"
            height="300"
            image={state}
            sx={{ borderRadius: 3 }}
          />
        </Box>

        <Typography marginTop={5} fontWeight="bold" variant="h5">
          결과 : 물병
          {/* 나중에 값 넘겨 받아서 하면됨 아니면 결과값 따로 받아서 하면 될 듯 */}
        </Typography>

        <Button
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

export default SearchResult;
