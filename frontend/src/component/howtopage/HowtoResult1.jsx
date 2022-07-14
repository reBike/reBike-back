import {Grid,Box,Typography} from "@mui/material";
import * as React from "react";

const HowtoResult= () =>{
  return (
    <Grid
    container
    alignItems="center"
    justifyContent="center"
    direction="row"
    sx={{
        backgroundColor : "white",
        margin:"auto", mt : 10, width: "100ch"}}>

            <Box sx={{width:"45ch", height:"auto"}}>
                사진 넣을 공간
            </Box>
            <Box sx={{width:"54ch", height:"auto"}}>
            <Typography component="h1"
                            fontWeight="bold"
                            variant="h4" 
                            align="left" sx={{mt:5, marginLeft:1}}>
                양파망
            </Typography >

            <Typography align="left" sx={{mt:3, marginLeft:1}} fontSize="16px" fontWeight="bold">
                #양파그물망 #양파 보관망
            </Typography>

            <Typography align="left" sx={{mt:3, marginLeft:1}} fontSize="16px">
                재활용 : 가능
            </Typography>

            <Typography align="left" sx={{mt:3, marginLeft:1}} fontSize="16px">
                분류 : 비닐류
            </Typography>

            <Typography align="left" sx={{mt:5, marginLeft:1}} variant="h6" fontWeight="bold">
                버리는 방법
            </Typography>

            <Typography align="left" sx={{margin:1}}>
                aaaaaaa

            </Typography>

            <Typography align="left" sx={{mt:5, marginLeft:1}} variant="h6" fontWeight="bold">
                알아두면 좋은 점
            </Typography>

            <Typography align="left" sx={{margin:1}}>
                asdasdasd
            </Typography>
            </Box>
    </Grid>
  );
}

export default HowtoResult;