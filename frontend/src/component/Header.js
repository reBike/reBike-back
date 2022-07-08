import * as React from 'react';
import {Button, Container, Box, Link} from '@mui/material';

function Header() {
  return (
        <Container style={{backgroundColor : '#E7F5EF', minWidth: "100%"}}>
          
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                marginLeft= "auto"
            >
                <Link href="#" sx={{textDecoration: 'none',fontSize : 30, color : "black", fontWeight: 'bold',mb:1,position: 'absolute',left: 55 ,}}>HOWTRASH</Link>
                <Button
                    variant="contained"
                    sx={{fontWeight: 'bold',color : "black",mt:2,mb : 2,mr:2, backgroundColor : "#759F98"}}
                >
                    MyPage
                </Button>
                <Button
                    variant="contained"
                    sx={{fontWeight: 'bold' ,color : "black",mb : 2,backgroundColor : "#759F98"}}
                >
                    Login
                </Button>
            </Box>
        </Container> 

  );
}

export default Header;