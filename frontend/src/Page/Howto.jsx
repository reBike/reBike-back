import * as React from "react";
import {Box} from "@mui/material";
import SearchBar from "../component/mainpage/SearchBar";
import HowtoResult from "../component/mainpage/HowtoResult";


const MainPage = () => {
    return (
      <Box textAlign={"center"} >
        <div>
          <SearchBar />
          <HowtoResult/>
        </div>
      </Box>
    );
  };
  
  export default MainPage;
  
  
  