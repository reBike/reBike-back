import * as React from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardMedia,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { save_ID } from "../../actions/ImgIDActions";

import { useNavigate } from "react-router-dom";

const MyTrashcanBtn = styled(Button)(({}) => ({
  backgroundColor: "#B0B09A",
  borderColor: "#B0B09A",
  "&:hover": {
    color: "black",
    backgroundColor: "white",
    borderColor: "#B0B09A",
  },
}));

export default function MultiActionAreaCard({ image = "", id = "" }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  //const itemID = useSelector((state: RootReducerType) => state.ImgIDReducer);
  const onDispatch = () => {
    // console.log(id);
    dispatch(save_ID(id));
    navigate(`/howtopage`);
  };

  return (
    <Card
      sx={{ maxWidth: 170, border: 1, margin: 1.4, borderColor: "#B0B09A" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          width="170"
          image={image}
          style={{ padding: 3, borderRadius: 8 }}
        />
      </CardActionArea>
      <CardActions>
        <MyTrashcanBtn
          variant="outlined"
          onClick={onDispatch}
          sx={{
            margin: "auto",
            width: 70,
            height: 20,
            bgcolor: "#B0B09A",
            borderColor: "#B0B09A",
            color: "black",
            fontSize: 2,
          }}
        >
          더보기
        </MyTrashcanBtn>
      </CardActions>
    </Card>
  );
}
