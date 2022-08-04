import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  CardActionArea,
  styled,
  Box,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import useScrollFadeIn from '../../actions/useScrollFadeIn';

interface BaseContent {
  kind: string;
  images: any;
}

const StyledBox =
{
  border: 0,
  backgroundColor: "white",
  borderColor: "#759F98",
  borderRadius: 5,
  boxShadow: "1px 3px 3px #B0B09A",
  margin: "auto",
  mt: 5
};

const styledTypo = {
  fontSize: 40, component: "div", mt: 5, fontFamily: "Itim", color: "#737458"
};

const trashlist: BaseContent[] = [
  {
    kind: "",
    images: ``,
  },
  {
    kind: "",
    images: ``,
  },
  {
    kind: "",
    images: ``,
  },
];

const ranklist: BaseContent[] = [
  {
    kind: "GLASS",
    images: `https://i.ibb.co/g9rSyFX/31-OEv-Rve-V3-L-SY450.jpg`,
  },
  {
    kind: "BIODEGRADABLE",
    images: `https://i.ibb.co/0MHvQZr/2022-07-30-11-23-56.png`,
  },
  {
    kind: "CARDBOARD",
    images: `https://i.ibb.co/jHTxfbS/17457488-1837243389875287-7962009710514097503-n.jpg`,
  },
  {
    kind: "PAPER",
    images: `https://i.ibb.co/7XPdFc5/2558-B64255-CF58-B833.jpg`,
  },
  {
    kind: "METAL",
    images: `https://i.ibb.co/tsjSswc/2022-07-30-11-26-27.png`,
  },
  {
    kind: "PLASTIC",
    images: `https://i.ibb.co/xLm0vv2/2022-07-30-11-20-36.png`,
  },
];

function MultiActionAreaCard() {
  let navigate = useNavigate();

  const [firstData, setFirstData] = useState<BaseContent | null>(null);
  const [secondData, setSecondData] = useState<BaseContent | null>(null);
  const [thridData, setThirdData] = useState<BaseContent | null>(null);

  axios
    .get("http://localhost:8080/API/trash/statistics/ranking")
    .then((response) => {
      for (let i = 0; i < 3; i++) {
        trashlist[i].kind = response.data[i].kind;
        for (let j = 0; j < 6; j++) {
          if (ranklist[j].kind === trashlist[i].kind) {
            trashlist[i].images = ranklist[j].images;
          }
        }
      }


      setFirstData(trashlist[0]);
      setSecondData(trashlist[1]);
      setThirdData(trashlist[2]);
    })
    .catch((error) => {
      console.log("error", error.response);
    });

  return (
    <Grid container
      sx={{ display: "flex", direction: "column", flexWrap: "wrap" }}
    >
      <Grid item
        sx={{ p: 2, width: "100%", justifyContent: "flex-start" }}
      >
        <Typography
          sx={{ fontSize: 40, mt: 10, fontFamily: "Itim", color: "#737458" }}
        >1st
        </Typography>
        <Box  {...useScrollFadeIn('up', 1, 0.1)}>
          <Box style={StyledBox} sx={{ width: 800 }}>
            <CardActionArea sx={{ borderRadius: 5 }} >
              <CardMedia component="img" height="500" width="450" image={firstData?.images} sx={{ borderRadius: 5 }} />
              <Typography
                style={styledTypo}
              >
                {firstData?.kind}
              </Typography>
            </CardActionArea>
          </Box>
          <Button
            variant="text"
            onClick={() => {
              navigate(`/defaulthowpage`, {
                state: {
                  needKind: firstData?.kind,
                  needImages: firstData?.images,
                },
              });
            }}
            sx={{ mt: 3, margin: "auto", fontFamily: "Itim", color: "#737458", fontSize: 20 }}
          >
            How to Recycle this {firstData?.kind}??
          </Button>
        </Box>
      </Grid>

      <Grid item
        sx={{ p: 2, width: "100%", marginLeft: "10cm", justifyContent: "flex-end" }}>
        <Typography
          sx={{ fontSize: 40, mt: 10, fontFamily: "Itim", color: "#737458" }}
        >2nd
        </Typography>
        <Box   {...useScrollFadeIn('left', 1, 0.1)}>
          <Box style={StyledBox} sx={{ width: 650 }}>
            <CardActionArea sx={{ borderRadius: 5 }}>
              <CardMedia component="img" height="500" width="450" image={secondData?.images} sx={{ borderRadius: 5 }} />
              <Typography
                style={styledTypo}
              >
                {secondData?.kind}
              </Typography>
            </CardActionArea>
          </Box>

          <Button
            variant="text"
            onClick={() => {
              navigate(`/defaulthowpage`, {
                state: {
                  needKind: secondData?.kind,
                  needImages: secondData?.images,
                },
              });
            }}
            sx={{ mt: 3, margin: "auto", fontFamily: "Itim", color: "#737458", fontSize: 20 }}
          >
            How to Recycle this {secondData?.kind}??
          </Button>
        </Box>
      </Grid>

      <Box
        sx={{ p: 2, width: "100%", marginRight: "20cm" }}>
        <Typography
          sx={{ fontSize: 40, mt: 10, fontFamily: "Itim", color: "#737458" }}
        >3rd
        </Typography>
        <Box {...useScrollFadeIn('right', 1, 0.1)}>
          <Box style={StyledBox} sx={{ width: 500 }}>
            <CardActionArea sx={{ borderRadius: 5 }}>
              <CardMedia component="img" height="500" width="450" image={thridData?.images} sx={{ borderRadius: 5 }} />
              <Typography
                style={styledTypo}
              >
                {thridData?.kind}
              </Typography>
            </CardActionArea>
          </Box>
          <Button
            variant="text"
            onClick={() => {
              navigate(`/defaulthowpage`, {
                state: {
                  needKind: thridData?.kind,
                  needImages: thridData?.images,
                },
              });
            }}
            sx={{ mt: 3, margin: "auto", fontFamily: "Itim", color: "#737458", fontSize: 20 }}
          >
            How to Recycle this {thridData?.kind}??
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

export default MultiActionAreaCard;
