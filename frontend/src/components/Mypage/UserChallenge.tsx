import { useState, useEffect } from "react";
import { Box, Card, Container, Hidden, Typography } from "@mui/material";
import { rs } from "src/utils/types";
import constants from "../../utils/constants";

interface Props {
  num: number;
  type?: boolean;
}

export default function UserChallenge({ num = 1, type }: Props) {
  const [whatChallenge, setWhatChallenge] = useState<rs.ChallengeInfo>();
  useEffect(() => {
    constants.CHALLENGE.filter((item) => {
      if (item.id === num) {
        setWhatChallenge(item);
        return item;
      }
      return whatChallenge;
    });
  });

  return type ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <img src={whatChallenge?.imgT} alt="008" style={{ width: 250 }} />
      <Typography color="black" sx={{ mt: 1, mb: 1, fontSize: "small" }}>
        {whatChallenge?.test}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <img src={whatChallenge?.imgF} alt="008" style={{ width: 250 }} />
      <Typography color="#898989" sx={{ mt: 1, mb: 1, fontSize: "small" }}>
        아직 달성하지 않은 도전과제예요.
      </Typography>
    </Box>
  );
}
