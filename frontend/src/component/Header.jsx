import * as React from 'react';
import {Button, Container, Box, Link,CssBaseline} from '@mui/material';
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
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container style={{position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 }}>

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
                  <Link href= '/mypage' sx={{textDecoration: 'none', color : "white"}}>MyPage</Link>
                  </Button>
                  <Button
                      variant="contained"
                      sx={{fontWeight: 'bold' ,mb : 2,color:'white',backgroundColor : "#759F98"}}
                  >
                    <Link href= '/login' sx={{textDecoration: 'none', color : "white"}}>Login</Link>
                      
                  </Button>
              </Box>
          </Container> 
      </ThemeProvider>

  );
}

export default Header;