import * as React from "react";
import {Box} from "@mui/material";
import SearchBar from "../component/mainpage/SearchBar";
import HowtoResult1 from "../component/howtopage/HowtoResult1";


const Howto = () => {
    return (
      <Box textAlign={"center"} >
        <div>
          <SearchBar />
          <HowtoResult1/>
        </div>
      </Box>
    );
  };
  
  export default Howto;