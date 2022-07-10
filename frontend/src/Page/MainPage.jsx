import * as React from "react";
import {Box,Button, Grid} from "@mui/material";
import Typography from "@mui/material/Typography"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchBar from "../component/mainpage/SearchBar";
import TrashCardView from "../component/mainpage/TrashCardView";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FirstImg  from '../../src/images/firstImg.svg';
import SecondImg from '../../src/images/secondImg.svg';
import ThirdImg from '../../src/images/thirdImg.svg';




const MainPage = () => {
  return (
    <Box textAlign={"center"} >
      <div>
        <SearchBar />
       
        <Button 
          variant="outlined" 
          sx={{ border : 1 ,borderColor :"black" ,backgroundColor: "white",width: 600,height: 300, mt:10,
            "&:hover": {
              backgroundColor: "#C3F5E7",
              borderColor: "#1F7D66",
            }, 
          }} 
          component="label"
        >

          <input type="file" hidden />
          <CloudUploadIcon sx = {{color :"#759F98" , mr : 1}} fontSize="large" />
          <Typography sx = {{color :"#759F98" }}> Upload your image!</Typography>
        </Button>

        <Box sx={{mt:15}}>
          <AutoGraphIcon fontSize="large" />
          <Typography  
              fontWeight="bold"
              variant="h5" >
            인기 쓰레기
          </Typography>
        </Box>
        <Grid
          marginTop = {3}
    
          container spacing={3}
          columns={20}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center" >
           
          <Grid item xs={5}>
            <img src={FirstImg} />
          </Grid>
          <Grid item xs={3} >
          <img src={SecondImg} />
            </Grid>
          <Grid item xs={5} >
            <img src={ThirdImg} />
          </Grid>
        </Grid>
        <Grid
          marginBottom = {20}
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center" >
              <TrashCardView />
              <TrashCardView />
              <TrashCardView /> 

          </Grid>
      </div>
    </Box>
  );
};

export default MainPage;


