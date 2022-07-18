import {Box, TextField, IconButton,styled} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {useState} from "react";
import { Link } from 'react-router-dom'

const SearchBar= () =>{
  const handleSubmit = (e) => {
    e.preventDefault();
  const data = new FormData(e.currentTarget);
    const searchData = {
      things: data.get('things')
    };
    const {things} = searchData;
    if (things === "A") window.location.href = "../Howto";
    else window.location.href = "/mainpage";
  }

  return (
    <Box  sx={{
        backgroundColor : "white",
        borderColor:"#759F98",  
        border : 1,
        borderRadius : 10, margin:"auto", mt : 15,width: "58ch" }}>
      <Box 
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& .MuiTextField-root": {
            width: "50ch" ,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
            id="things"
            name="things"
            sx={{backgroundColor : "white", 
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
          <SearchIcon sx={{mt:0.5}} fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SearchBar;