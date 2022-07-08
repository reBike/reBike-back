import * as React from 'react';
import Button from '@mui/material/Button';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Header() {
  return (
        <Container style={{backgroundColor : '#E7F5EF', minWidth: "100%"}}>
          
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
            <Button sx={{fontSize : 30, color : "black", fontWeight: 'bold', mr : 95}}>
                HOWTRASH
            </Button>
                <Button
                    variant="contained"
                    sx={{fontWeight: 'bold',color : "black",mb : 2,mr:2, backgroundColor : "#759F98"}}
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