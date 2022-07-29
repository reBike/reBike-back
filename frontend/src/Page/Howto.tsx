import * as React from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import HowtoResult1 from "../components/howtopage/HowtoResult1";
import constants from "../utils/constants";
import { useLocation } from "react-router";

const Howto = () => {
  const { state }: any = useLocation();
  console.log(state.trashkind);

  return (
    <Box textAlign={"center"}>
      <div>
        <SearchBar />
        <HowtoResult1 props={state.trashkind} />
      </div>
    </Box>
  );
};

export default Howto;
