import * as React from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import UploadImage from "../components/mainpage/UploadImage";
import PopularTrash from "../components/mainpage/PopularTrash";
import Footer from "../components/common/Footer";

const MainPage = () => {
  return (
    <Box textAlign={"center"}>
      <div>
        <SearchBar />
        <UploadImage />
        <PopularTrash />
      </div>
      <Footer />
    </Box>
  );
};

export default MainPage;
