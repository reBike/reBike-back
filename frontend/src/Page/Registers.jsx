import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal,Backdrop,Button,CssBaseline,TextField,Box,Typography,Container,Link, styled } from '@mui/material';
import { ReactComponent as TrashCan } from "../../src/images/trashcan.svg";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:3,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const btnstyle = {
    borderColor: "transparent",
    backgroundColor: "#759F98",
     color:"#ffffff",
     height:"40px",
     width:"300px",
     borderRadius:"5px",
     marginTop:"25px",
     textAlign:"center",
     fontSize:"15px",
     fontWeight:"bold",
     textDecoration: "none",
     p: 1,
    "&:hover":{backgroundColor: "#5e8079", color:"#ffffff"}
  };

const theme = createTheme({
    palette: {
      primary: {
        main: "#759F98",
      },
    },
  });

  const UserInfoTf = styled(TextField)(({ }) => ({
    backgroundColor: "",
    "&:hover": {
        color : "#759F98",
        
    },

    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: '#759F98',
        },
      },
  }));



function Register() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
          name: data.get('name'),
      })
    };

  return (
    <Container  style={{backgroundColor : '#E7F5EF',  border: "solid", borderColor :"#E7F5EF", minWidth: "100%", height: "100vh"}}>
    <ThemeProvider theme={theme} >
        <Container component="main" maxWidth="xs" sx={{mb: 2 }} >
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
                    회원가입
                </Typography>
                <Box component="form" color="info.contrastText" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                
                    <UserInfoTf
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <UserInfoTf
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                    <UserInfoTf
                      margin="normal"
                      required
                      fullWidth
                      name="passwordconfirm"
                      label="Passwordconfirm"
                      type="passwordconfirm"
                      id="passwordconfirm"
                    />
                    <UserInfoTf
                      margin="normal"
                      required
                      fullWidth
                      name="name"
                      label="name"
                      type="name"
                      id="name"
                    />
                    <React.Fragment>
      
      <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2, height : 50, color : 'white',fontWeight: 'bold',fontSize:20}}
      onClick={handleOpen}>가입하기</Button>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 700,
        }}
      >
        <Box sx={style} >
          <Typography id="modal-title" variant="h4" fontWeight="bold" component="h1" sx={{mb:1}}>
            회원가입 완료
          </Typography>
          <Typography id="modal-description" variant="h6" sx={{mb: 3, mt: 2 }}>
            가입이 완료되었습니다!
          </Typography>
          <TrashCan/>
          <Link href="/login"
          sx={btnstyle}
          >로그인하러가기</Link>
        </Box>
      </Modal>
      </React.Fragment>
                </Box>
              </Box>
        </Container>
    </ThemeProvider>
    </Container>
  );
}

export default Register;