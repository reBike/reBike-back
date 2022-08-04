import * as React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import ExplanationTrash from "../components/howtopage/ExplanationTrash";

import { useLocation } from 'react-router-dom';

const HowtoPage = () => {

  const item = useLocation();
  const itemform = item?.state as any;

  const itemImage = itemform.needImages;
  const itemKind = itemform.needKind;

  return (
    <Box textAlign={"center"}>
      <div>
        <SearchBar />
        <Box
          sx={{
            borderRadius: 3,
            backgroundColor: "white",
            width: 700,
            height: 350,
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "1px 3px 3px #B0B09A",
            mt: 7,
            mb: 10,
          }}>
          <img src={itemImage} style={{ maxWidth: 500, maxHeight: 250 }} />

        </Box>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{ fontSize: 50, mt: 10, fontFamily: "Itim", color: "#737458" }}
          >
            How to recycle?
          </Typography>
          <ExplanationTrash
            kind={itemKind}
          />

          <Link
            href="/mainpage"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "Itim",
              padding: 100,
              color: "#737458",
              fontSize: 30,
            }}
          >
            {" "}
            Go To Mainpage{" 👉"}{" "}
          </Link>
        </Grid>
      </div>
    </Box>
  );
};

export default HowtoPage;
