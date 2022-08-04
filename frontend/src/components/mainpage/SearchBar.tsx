import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { useState } from "react";
import Api from "../../utils/customApi";

const SearchBar = () => {
  interface searchData {
    name: string;
    way: string;
  }

  const [input, setInput] = useState("");

  const searchHowTrash = async (props: string) => {
    const result = await Api.get(
      `/trash/mainpage/search-words/${props}/result`
    ).then((res) => res.data[0] as searchData);
    window.location.href = "../Howtopage"; //이걸 또 각각 새로운 페이지로 만들어야함 ${}써서
    console.log(result);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "paper") {
      searchHowTrash("cardboard");
    } else alert("그런 검색어는 없어요ㅜ");
    setInput("");
  };

  console.log(input);
  //서치바
  //

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderColor: "#759F98",
        borderRadius: 3,
        boxShadow: "1px 3px 3px #B0B09A",
        margin: "auto",
        mt: 2,
        width: "58ch",
      }}
    >
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& .MuiTextField-root": {
            width: "50ch",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="searchContent"
          name="searchContent"
          type="text"
          value={input || ""}
          onChange={(event) => setInput(event.target.value)}
          sx={{
            backgroundColor: "white",
            border: 0,
            borderRadius: 10,
            ml: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00ff0000",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00ff0000",
              },
              "&:hover fieldset": {
                borderColor: "#00ff0000",
              },
            },
          }}
        />

        <IconButton type="submit" aria-label="search">
          <SearchIcon sx={{ mt: 0.5, color: "#B0B09A" }} fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;
