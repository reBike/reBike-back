import { Grid, Box, Typography } from "@mui/material";
import * as React from "react";
import constants from "../../utils/constants";
import { useState, useEffect } from "react";

interface trashType {
  kind: string;
  tag: string;
  method1: string;
  method2: string;
  method3: string;
  warning: string;
}

const HowtoResult = (props: any) => {
  const [resTrash, setResTrash] = useState<trashType | undefined>();

  console.log(props.kind);
  console.log(props.imgURL);

  useEffect(() => {
    if (props.kind === "BIODEGRADABLE") {
      //props 대신 imgkind
      setResTrash(constants.BIODEGRADABLE);
    }
    if (props.kind === "GLASS") {
      setResTrash(constants.GLASS);
    }
    if (props.kind === "CARDBOARD") {
      setResTrash(constants.CARDBOARD);
    }
    if (props.kind === "METAL") {
      setResTrash(constants.METAL);
    }
    if (props.kind === "PAPER") {
      setResTrash(constants.PAPER);
    }
    if (props.kind === "PLASTIC") {
      setResTrash(constants.PLASTIC);
    }
  }, [props.kind]);

  return (
    <Grid
      width={810}
      sx={{
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: "1px 3px 4px #B0B09A",
        mt: 10,
      }}
    >
      <Box sx={{ margin: 2 }}>
        <Typography
          component="h1"
          fontWeight="bold"
          variant="h4"
          align="center"
          sx={{ mt: 5, fontFamily: "Nanum1" }}
        >
          {resTrash?.kind}
          <br />
        </Typography>

        <Typography
          align="center"
          sx={{ mt: 3, fontFamily: "Nanum1" }}
          fontSize="16px"
          fontWeight="bold"
        >
          {resTrash?.tag}
          <br />
          <br />
        </Typography>

        <Typography
          align="center"
          sx={{ mt: 3, fontFamily: "Nanum1" }}
          fontSize="16px"
        ></Typography>

        <Typography
          align="center"
          sx={{ mt: 5, fontFamily: "Nanum1" }}
          variant="h6"
          fontWeight="bold"
        >
          버리는 방법
        </Typography>

        <Typography align="center" sx={{ margin: 1, fontFamily: "Nanum1" }}>
          {resTrash?.method1}
          <br />
          <br />
          {resTrash?.method2}
          <br />
          <br />
          {resTrash?.method3}
          <br />
          <br />
        </Typography>

        <Typography
          align="center"
          sx={{ mt: 5, fontFamily: "Nanum1" }}
          variant="h6"
          fontWeight="bold"
        >
          알아두면 좋은 점
        </Typography>

        <Typography
          align="center"
          sx={{ margin: 1, marginBottom: 5, fontFamily: "Nanum1" }}
        >
          {resTrash?.warning}
        </Typography>
      </Box>
    </Grid>
  );
};

export default HowtoResult;
