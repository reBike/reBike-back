import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Link,
  styled,
  Switch,
} from "@mui/material";
import MultiActionAreaCard from "./MultiActionAreaCard";
import Api from "../../utils/customApi";
import lottie from "lottie-web";
import MoreIcon from "../../images/moreIcon";
import { rs } from "src/utils/types";
import { getAccess } from "src/Auth/tokenManager";
import { ReduxModule } from "../../modules/ReduxModule";
import { alpha } from "@mui/material/styles";
import { isAutoSave, changeAutoSave } from "../../utils/autoSaveToggle";

interface Props {
  trashlist?: Array<rs.Trash>;
}
const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#93C85B",
    "&:hover": {
      backgroundColor: alpha("#DAEEC5", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#D9D9D9",
  },
}));

const GetNoTrashLottie = () => {
  //lottie
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: element.current as HTMLDivElement,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("../../images/noTrashLottie.json"),
    });
  }, []);
  return <Box ref={element} style={{ height: 300 }}></Box>;
};

function MyTrashcan(props: Props) {
  const what: any = getAccess();
  const userIdtoRedux = ReduxModule().decodeInfo?.id;
  //=============MyTrashCan API================
  const [trashes, setTrashes] = useState(props.trashlist);
  const [more, setMore] = useState(false);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);

  const fetchMyTrash = async () => {
    await Api.get(`/trash/users/${userIdtoRedux}/pages/${page}`, {
      headers: {
        Authorization: `${what.value}`,
      },
    }).then((res) => {
      if (res.data) {
        const newArray = trashes ? [...trashes, ...res.data] : res.data;
        setTrashes(newArray);
        setLast(false);
      } else {
        setLast(true);
      }
    });
  };

  const changePage = () => {
    if (!more) return setMore(true);
    return setPage(page + 1);
  };

  useEffect(() => {
    if (what !== "") {
      fetchMyTrash();
    }
  }, [page]);

  useEffect(() => {
    console.log(trashes);
  }, [trashes]);

  //=============MyTrashCan API================
  const isSaved = isAutoSave();
  const [checked, setChecked] = useState(true);
  isSaved.then((e) => {
    setChecked(e.user_autosave);
  });

  const switchHandler = (event: any) => {
    setChecked(event.target.checked);
    changeAutoSave(checked);
  };

  return (
    <Container
      style={{
        border: "solid",
        borderRadius: 8,
        borderColor: "transparent",
        minWidth: "100%",
        marginTop: 20,
      }}
    >
      {" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",

          alignContent: "center",
        }}
      >
        <Typography
          color="black"
          sx={{ mt: 0.8, fontSize: 15, fontFamily: "Itim" }}
        >
          auto save
        </Typography>
        <GreenSwitch checked={checked} onChange={switchHandler} />
      </Box>
      <Container
        style={{
          borderRadius: 8,
          backgroundColor: "white",
          boxShadow: "1px 3px 3px #B0B09A",
        }}
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          {trashes && Object.keys(trashes)?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: 10,
              }}
            >
              <GetNoTrashLottie />
              <Typography
                sx={{ margin: 5 }}
                justifyContent="center"
                textAlign="center"
              >
                <Link
                  href="/mainpage"
                  sx={{
                    margin: 5,
                    fontSize: 18,
                    fontFamily: "Itim",
                    color: "#737458",
                    textDecoration: "none",
                  }}
                >
                  fill your ReBIKE &gt;
                </Link>
              </Typography>
            </Box>
          ) : (
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  paddingTop: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {trashes &&
                  Object.values(trashes)?.map((item: rs.Trash, index: any) => (
                    <MultiActionAreaCard
                      image={item.image}
                      id={item.id}
                      key={index}
                    />
                  ))}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ margin: 5 }}
              >
                {last ? (
                  <Box style={{ color: "#737458", fontFamily: "Itim" }}></Box>
                ) : (
                  <Button
                    onClick={changePage}
                    style={{ color: "#737458", fontFamily: "Itim" }}
                  >
                    more
                    <MoreIcon />
                  </Button>
                )}
              </Box>
            </div>
          )}
        </Box>
      </Container>
    </Container>
  );
}

export default MyTrashcan;
