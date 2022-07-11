import * as React from "react";
import {Box} from "@mui/material";
import SearchBar from "../component/mainpage/SearchBar";
import UploadImage from "../component/mainpage/UploadImage";
import PopularTrash from "../component/mainpage/PopularTrash";



const MainPage = () => {
  return (
    <Box textAlign={"center"} >
      <div>
        <SearchBar />
        <UploadImage />
        <PopularTrash />
      </div>
    </Box>
  );
};

export default MainPage;


