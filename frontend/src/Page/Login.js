import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { Divider,Button,CssBaseline,TextField,Box,Typography,Container } from '@mui/material';

  const theme = createTheme({
    palette: {
      primary: {
        main: "#759F98",

      },
      secondary: {
        main: green[500],
      },
    },
  });


function Login() {
  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };
  return (
    <Container  style={{backgroundColor : '#E7F5EF',  border: "solid", borderColor :"#E7F5EF", minWidth: "100%", height: "100vh"}}>
    <ThemeProvider theme={theme} bgcolor="black">
        <Container component="main" maxWidth="xs" sx={{  mb: 2 }} >
            <CssBaseline />
              <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
              >
      
                <Typography component= "h1" color = "primary" fontWeight = 'bold' variant="h4">
                    로그인
                </Typography>
                <Box component="form" color="info.contrastText" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, height : 50, color : 'white',fontWeight: 'bold'}}
                    >
                      Login
                    </Button>
                    <Typography align='right'>
                      <Button variant="text" style={{ fontWeight: 'bold'}} >
                         가입하기
                      </Button>
                    </Typography>
                    <Divider sx={{color : 'lightgrey'}}>또는</Divider>

                    <Button
                      variant="outlined"
                      sx={{borderColor : '#F1DC2C', color: '#F1DC2C', fontWeight: 'bold', ml : 5,mr:2,mt:3}}
                    >
                      카카오로 로그인하기
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{borderColor : '#54B94E', color: '#54B94E', fontWeight: 'bold',mt:3}}
                    >
                      네이버로 로그인하기
                    </Button>
                </Box>
              </Box>
        </Container>
    </ThemeProvider>
    </Container>
  );
}

export default Login;
