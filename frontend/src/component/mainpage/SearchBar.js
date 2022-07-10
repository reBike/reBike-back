import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

const SearchBar= () =>{
  return (
    <Box  sx={{
        backgroundColor : "white",
        borderColor:"#759F98",  
        border : 1,
        borderRadius : 10, margin:"auto", mt : 15,width: "58ch" }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            width: "50ch" ,
          },
        }}
        noValidate
        autoComplete="off"
      >

        <TextField  id="standard-search" type="search"  variant="outlined" 
            sx={{ 
              backgroundColor : "white", 
              border : 0,
              borderRadius : 10,
              ml : 1,
              '& .MuiOutlinedInput-root' : {
                '& fieldset': {
                  borderColor: '#00ff0000',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ff0000',
                },
                '&:hover fieldset': {
                  borderColor: '#00ff0000',
                },
              },
            }}
          />
        <IconButton type="submit" sx={{}} aria-label="search">
          <SearchIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SearchBar;