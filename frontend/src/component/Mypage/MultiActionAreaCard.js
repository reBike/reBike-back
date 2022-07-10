import * as React from 'react';
import { Button, CardActionArea, CardActions,Card,CardContent,CardMedia,Typography } from '@mui/material';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 200, border: 1, margin:2  }}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="170"
            image='https://picsum.photos/400/300'
        
            />
            <CardContent>
            <Typography fontWeight={"bold"} fontSize={20} component="div" marginTop={1}>
                물병
            </Typography>      
            </CardContent>
        </CardActionArea>
        <CardActions >
            <Button size="small" sx={{margin : "auto", bgcolor : "#C0F0FF", border:1}}>
                더보기
            </Button>
        </CardActions>
    </Card>
  );
}