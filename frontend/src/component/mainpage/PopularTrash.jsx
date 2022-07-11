import {Typography, Box, Grid} from "@mui/material";
import FirstImg  from '../../../src/images/firstImg.svg';
import SecondImg from '../../../src/images/secondImg.svg';
import ThirdImg from '../../../src/images/thirdImg.svg';
import TrashCardView from "../../component/mainpage/TrashCardView";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function PopularTrash(){
    return(
        <Box textAlign={"center"} >
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
        </Box>
    );
};

export default PopularTrash;