import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { Divider,Button,CssBaseline,TextField,Box,Typography,Container } from '@mui/material';



// function Copyright(props) {
//     return (
//       <Typography variant="body2" color="text.secondary" align="center" {...props}>
//         {'Copyright © '}
//         <Link color="inherit" href="https://mui.com/">
//           Your Website
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
//   }
  
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
          
        {/* <Container fullwidth sx={{ flexDirection: 'row-reverse' }}>
          <Typography textAlign	="left" fontWeight= 'bold' fontSize={30} sx={{ mt: 6, ml: 8 }}>
              HOWTRASH
          </Typography>
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

        </Container> */}
        
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
              {/* <Avatar sx={{ m: 1}}>
              <AcUnitIcon />
              </Avatar> */}
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
                    {/* <FormControlLabel 
                      control={<Checkbox value="remember"/>}
                      label="Remember me" 
                    /> */}
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
                    {/*<Grid container 
                            direction="column-reverse"
                            alignItems="flex-end">
                      <Grid item xs >
                          <Link href="#" variant="body2">
                          Forgot password?
                          </Link>
                      </Grid>
                      <Grid item>
                          <Link href="#" variant="body2">
                          {"Don't have an account? Sign Up"}
                          </Link>
                      </Grid>
                              </Grid> */}
                    
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
         
            {/* <Typography align='right'>
               <Button>
                example
               </Button>
            </Typography> */}
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
    </ThemeProvider>
    </Container>
  );
}

export default Login;
