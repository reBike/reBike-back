import * as React from "react";
import { Typography, Container, Box } from "@mui/material";
import BadgeBack from "../../images/challengeBack";

function MyBadge() {
  return (
    <Container
      style={{
        border: "solid",
        borderRadius: 5,
        borderColor: "transparent",
        minWidth: "100%",
        height: "80vh",
      }}
    >
      <Typography
        color="black"
        fontWeight="bold"
        sx={{ mt: 1.2, mb: 1, fontSize: "medium" }}
      >
        내 도전! 재활용
      </Typography>
      <Container
        style={{
          borderRadius: 8,
          backgroundColor: "white",
          height: "50vh",
        }}
        sx={{ mt: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <BadgeBack />
          <BadgeBack />
          <BadgeBack />
          <BadgeBack />
          <BadgeBack />
        </Box>
      </Container>
    </Container>
  );
}

export default MyBadge;
