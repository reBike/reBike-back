import * as React from 'react';
import {useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormHelperText,Modal,Backdrop,Button,CssBaseline,TextField,Box,Typography,Container,Link, styled } from '@mui/material';
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

  const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

function Register() {
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [registerError, setRegisterError] = useState('');

//form 비교
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
    };
    const { email, name, password, rePassword } = joinData;

    // 이메일 유효성 체크
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex = /^[가-힣a-zA-Z]+$/;
    if (!passwordRegex.test(password))
      setPasswordState('비밀번호를 입력해주세요!');
    else setPasswordState('');

    // 비밀번호 같은지 체크
    if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    // 모두 통과되면 완료출력
    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name)
    ) {
      handleOpen();
    }
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                      error={emailError !== '' || false}
                    />
                    <FormHelperTexts>{emailError}</FormHelperTexts>
                    
                    <UserInfoTf
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      error={passwordState !== '' || false}
                    />
                    <FormHelperTexts>{passwordState}</FormHelperTexts>

                    <UserInfoTf
                      margin="normal"
                      required
                      fullWidth
                      name="rePassword"
                      label="Password Confirm"
                      type="password"
                      id="rePassword"
                      error={passwordError !== '' || false}
                    />
                    <FormHelperTexts>{passwordError}</FormHelperTexts>

                    <UserInfoTf
                      margin="normal"
                      required
                      fullWidth
                      name="name"
                      label="name"
                      type="name"
                      id="name"
                      error={nameError !== '' || false}
                    />
                    <FormHelperTexts>{nameError}</FormHelperTexts>
                    <React.Fragment>
      
      <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2, height : 50, color : 'white',fontWeight: 'bold',fontSize:20}}
      >가입하기</Button>
      <FormHelperTexts>{registerError}</FormHelperTexts>

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