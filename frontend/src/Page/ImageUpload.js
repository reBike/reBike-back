import * as React from "react";

import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import {Box,Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from "@mui/material/IconButton";
import SearchBar from "../component/mainpage/SearchBar";
import { maxWidth } from "@mui/system";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const ImageUpload = () => {
  // const [status, setStatus] = useState("");
  // const [preview, setPreview] = useState(null);
  // const [enableDragDrop, setEnableDragDrop] = useState(true);
  // const [image, setImage] = useState(true);
  // const doNothing = (event) => event.preventDefault();

  // const btn_div = {
  //   padding: "3%",
  //   textAlign: "center",
  // };

  // const onDragEnter = (event) => {
  //   if (enableDragDrop) {
  //     setStatus("File Detected");
  //   }
  //   event.stopPropagation();
  //   event.preventDefault();
  // };

  // const onDragLeave = (event) => {
  //   if (enableDragDrop) {
  //     setStatus("");
  //   }
  //   event.preventDefault();
  // };

  // const onDragOver = (event) => {
  //   if (enableDragDrop) {
  //     setStatus("");""
  //   }
  //   event.preventDefault();
  // };

  // const onDrop = (event) => {
  //   const supportedFilesTypes = ["image/jpeg", "image/png"];
  //   const { type } = event.dataTransfer.files[0];
  //   if (supportedFilesTypes.indexOf(type) > -1) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => setPreview(e.target.result);
  //     reader.readAsDataURL(event.dataTransfer.files[0]);
  //     setImage(event.dataTransfer.files[0]);
  //   }
  //   event.preventDefault();
  // };


  return (
 
    <Box textAlign={"center"} >
      <div>
        <SearchBar />
       
        <Button variant="outlined" sx={{ border : 2 ,borderColor :"black" ,backgroundColor: "white",width: 400,height: 200, mt:5}}  component="label">
          <input type="file" hidden />
          <CloudUploadIcon sx = {{color :"#759F98" , mr : 1}} fontSize="large" />
          <Typography sx = {{color :"#759F98" }}> Upload your image!</Typography>
        </Button>

        <Box sx={{mt:20,}}>
          <AutoGraphIcon fontSize="large" />
          <Typography  
              fontWeight="bold"
              variant="h5" >
            인기 쓰레기
          </Typography>
        </Box>
      </div>

      
    </Box>
  );
};

export default ImageUpload;









        {/* <Button
          variant="contained"
    
        >
          Upload File
          <input
            type="file"
            hidden
          />
        </Button> */}