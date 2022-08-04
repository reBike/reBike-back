import { Box, TextField, IconButton, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { useState, useEffect } from "react";
import Api from "../../utils/customApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ranklist: { kind: string; image: string }[] = [
    {
        kind: "GLASS",
        image: `https://i.ibb.co/g9rSyFX/31-OEv-Rve-V3-L-SY450.jpg`,
    },
    {
        kind: "BIODEGRADABLE",
        image: `https://i.ibb.co/0MHvQZr/2022-07-30-11-23-56.png`,
    },
    {
        kind: "CARDBOARD",
        image: `https://i.ibb.co/jHTxfbS/17457488-1837243389875287-7962009710514097503-n.jpg`,
    },
    {
        kind: "PAPER",
        image: `https://i.ibb.co/7XPdFc5/2558-B64255-CF58-B833.jpg`,
    },
    {
        kind: "METAL",
        image: `https://i.ibb.co/tsjSswc/2022-07-30-11-26-27.png`,
    },
    {
        kind: "PLASTIC",
        image: `https://i.ibb.co/xLm0vv2/2022-07-30-11-20-36.png`,
    },
];

const SearchBarBox = styled(Box)(({}) => ({
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "1px 3px 3px #B0B09A",
    margin: "auto",
    marginTop: "250px",
    width: "58ch",
}));

const SearchBarTextField = styled(TextField)(({}) => ({
    width: "50ch",
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
}));

const SearchBar = () => {
    const [input, setInput] = useState("");
    let navigate = useNavigate();

    const onSubmit = (input: string) => {
        axios
            .post(`http://localhost:8080/api/search/`, { value: input })
            .then((response) => {
                let trashIMG = "";
                for (let j = 0; j < 6; j++) {
                    if (ranklist[j].kind === response.data.result[0]) {
                        trashIMG = ranklist[j].image;
                    }
                }
                navigate(`/defaulthowpage`, {
                    state: {
                        needKind: response.data.result[0],
                        needImages: trashIMG,
                    },
                });
            });
    };


    return (
        <SearchBarBox>
            <Box
                component="form"
                onSubmit={(e: any) => {
                    e.preventDefault();
                    onSubmit(input);
                }}
            >
                <SearchBarTextField
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon
                        sx={{ mt: 0.5, color: "#B0B09A" }}
                        fontSize="large"
                    />
                </IconButton>
            </Box>
        </SearchBarBox>
    );
};

export default SearchBar;
