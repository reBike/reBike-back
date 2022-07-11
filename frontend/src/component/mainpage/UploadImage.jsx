import {Button,Typography,Box, Link} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function UploadImage(){
    return(
      <Box>
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
        <Box>
          <Button
            variant="contained"
            sx={ { "&:hover": {
 
              backgroundColor: "#4F6B66",
 
          },mt : 2,width : 80, height : 30 ,fontWeight: 'bold' ,mb : 2,color:'white',backgroundColor : "#759F98"}}
          >
            <Link href="/mainpage/resultpage" sx={{textDecoration: "none",fontSize : 12, color : "white",}}>
                    결과보기 
            </Link>       
          </Button>
        </Box>
      </Box>
    );
};

export default UploadImage;