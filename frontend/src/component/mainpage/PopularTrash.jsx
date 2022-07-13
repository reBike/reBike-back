import {Typography, Box} from "@mui/material";
import FirstImg  from '../../../src/images/firstImg.svg';
import SecondImg from '../../../src/images/secondImg.svg';
import ThirdImg from '../../../src/images/thirdImg.svg';
import TrashCardView from "../../component/mainpage/TrashCardView";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


function PopularTrash(){
    return(
        <Box textAlign={"center"} >
            <Box sx={{mt:15,mb : 7}}>
                <AutoGraphIcon fontSize="large" />
                <Typography  
                    fontWeight="bold"
                    variant="h5" >
                인기 쓰레기
                </Typography>
            </Box>

            <Box  sx={{display : "flex", flexWrap : "wrap", justifyContent : "space-evenly"}}>
                <Box sx={{p:2}}>
                    <img src={FirstImg} /> 
                    <TrashCardView />
                </Box>
                <Box sx={{p:2}}>
                    <img src={SecondImg} />
                    <TrashCardView />
                </Box>
                <Box sx={{p:2}}>
                    <img src={ThirdImg} />
                    <TrashCardView /> 
                </Box>    
            </Box>
     
        </Box>
    );
};

export default PopularTrash;