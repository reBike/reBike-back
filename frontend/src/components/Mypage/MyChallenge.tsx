import { useState, useEffect } from "react";
import { Typography, Container, Box, listClasses } from "@mui/material";
import { rs } from "src/utils/types";
import Api from "../../utils/customApi";
import UserChallenge from "../Mypage/UserChallenge";
import BadgeBack from "../../images/challenges/challengeBack";

interface Contentlist {
  list: Array<rs.Challenge>;
}

const trashlist: Contentlist = {
  list: [
    {
      challenge_number: 1,
      type: false,
    },
    {
      challenge_number: 2,
      type: false,
    },
    {
      challenge_number: 3,
      type: false,
    },
    {
      challenge_number: 4,
      type: false,
    },
    {
      challenge_number: 5,
      type: false,
    },
  ],
};

function MyBadge() {
  const [myChallenge, setMyChallenge] = useState<rs.Challenge[]>();
  const fetchMyChallenge = async () => {
    const result = await Api.get(
      "/trash/mypage/users/2c762f6e-b369-4985-96f9-29ccb4f9fc34/challenges"
    ).then((res) => res.data as rs.Challenge[]);
    const challengeList = result;

    const temptList: rs.Challenge[] = trashlist.list?.map((trashlist: any) => {
      challengeList?.map((getlist: any) => {
        if (getlist?.challenge_number === trashlist.challenge_number) {
          trashlist.type = true;
        }
        return getlist;
      });
      return trashlist;
    });
    setMyChallenge(temptList);
    return temptList;
  };
  useEffect(() => {
    fetchMyChallenge();
  }, [myChallenge]);
  console.log("여기선 뭐가", trashlist.list);

  return (
    <Container
      style={{
        border: "solid",
        borderRadius: 5,
        borderColor: "transparent",
        minWidth: "100%",
        height: "100vh",
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
          height: "100vh",
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
          {trashlist &&
            trashlist?.list?.map((list: rs.Challenge, index: any) => (
              <UserChallenge
                num={list.challenge_number}
                type={list.type}
                key={index}
              />
            ))}
        </Box>
      </Container>
    </Container>
  );
}

export default MyBadge;
