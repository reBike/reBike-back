import * as React from 'react';
import {Button, Container, Box, Link} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: "#759F98",
      },
    },
  });

function Header() {
  return (
    <ThemeProvider theme={theme} bgcolor="black">
        <Container style={{backgroundColor : '#E7F5EF', minWidth: "100%"}}>
          
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                marginLeft= "auto"
            >
                <Link href="/mainpage" sx={{textDecoration: 'none',fontSize : 30, color : "black", fontWeight: 'bold',mb:1,position: 'absolute',left: 55 ,}}>
                    HOWTRASH
                </Link>
                <Button
                    variant="contained"
                    sx={{fontWeight: 'bold',mt:2,mb : 2,mr:2, color:'white',backgroundColor : "#759F98"}}
                >
                 <Link href= '/mypage' sx={{color : "white"}}>MyPage</Link>
                </Button>
                <Button
                    variant="contained"
                    sx={{fontWeight: 'bold' ,mb : 2,color:'white',backgroundColor : "#759F98"}}
                >
                  <Link href= '/login' sx={{color : "white"}}>Login</Link>
                    
                </Button>
            </Box>
        </Container> 
    </ThemeProvider>
  );
}

export default Header;