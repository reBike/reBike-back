import * as React from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 300, border: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image="https://picsum.photos/400/300"
        />
        <Typography
          fontWeight={"bold"}
          fontSize={20}
          component="div"
          margin={1}
          marginTop={2}
        >
          물병
        </Typography>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          sx={{ margin: "auto", bgcolor: "#C0F0FF", border: 1 }}
        >
          더보기
        </Button>
      </CardActions>
    </Card>
  );
}
