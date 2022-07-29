import * as React from "react";
import { useState } from "react";
import Api from "../utils/customApi";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormHelperText,
  Modal,
  Backdrop,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Link,
  styled,
} from "@mui/material";
import TrashCan from "../../src/images/trashcan";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const btnstyle = {
  borderColor: "transparent",
  backgroundColor: "#759F98",
  color: "#ffffff",
  height: "40px",
  width: "300px",
  borderRadius: "5px",
  marginTop: "25px",
  textAlign: "center",
  fontSize: "15px",
  fontWeight: "bold",
  textDecoration: "none",
  p: 1,
  "&:hover": { backgroundColor: "#5e8079", color: "#ffffff" },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#759F98",
    },
  },
});

const UserInfoTf = styled(TextField)(({}) => ({
  backgroundColor: "",
  "&:hover": {
    color: "#759F98",
  },

  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#759F98",
    },
  },
}));

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 12px;
  font-weight: 700;
  color: #d32f2f;
  font-size: 16px;
`;

interface User {
  name: FormDataEntryValue | null;
  pw: FormDataEntryValue | null;
  alias: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
}

const Register = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [aliasError, setAliasError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alias, setAlias] = useState("");
  const [checkName, setCheckName] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [checkAilas, setCheckAlias] = useState("");

  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const passwordRegex = /^[가-힣a-zA-Z]+$/;
  const nameRegex = /^[가-힣a-zA-Z]+$/;
  const aliasRegex = /^[가-힣a-zA-Z]+$/;

  //form 비교
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const user: User = {
      name: data.get("name"),
      pw: data.get("password"),
      alias: data.get("alias"),
      email: data.get("email"),
    };

    const rePassword = data.get("rePassword");
    // 비밀번호 유효성 체크
    if (!passwordRegex.test(user.pw as string))
      setPasswordState("비밀번호를 형식에 맞춰 입력해주세요!");
    else setPasswordState("");

    // 비밀번호 같은지 체크
    if (user.pw !== rePassword)
      setPasswordError("비밀번호가 일치하지 않습니다.");
    else setPasswordError("");

    // 모두 통과되면 완료출력
    if (
      emailRegex.test(user.email as string) &&
      passwordRegex.test(user.pw as string) &&
      (user.pw as string) === rePassword &&
      nameRegex.test(user.name as string) &&
      aliasRegex.test(user.alias as string)
    ) {
      Api.post<User>(`/users/`, user)
        .then((response) => {
          // Handle success.
          handleOpen();

          console.log("Well done!");
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onBlurInfo = async (props: Array<string>, event: any) => {
    const res = await Api.get(
      `/users/?case=${props[0]}&value=${props[1] as string}`
    );

    if (props[0] == "name") {
      if (!nameRegex.test(name as string) || (name as string).length < 1) {
        setNameError("올바른 이름을 입력해주세요.");
        setCheckName("");
      } else {
        setNameError("");
        if (res.data.result == false) setCheckName("사용 중인 아이디입니다.");
        else setCheckName("사용 가능한 아이디 입니다.");
      }
    }
    if (props[0] == "email") {
      if (!emailRegex.test(email as string)) {
        setEmailError("올바른 이메일 형식이 아닙니다.");
      } else {
        setEmailError("");
        if (res.data.result == false) setCheckEmail("사용 중인 이메일 입니다.");
        else setCheckEmail("사용 가능한 이메일 입니다.");
      }
    }

    if (props[0] == "alias") {
      if (!aliasRegex.test(alias as string) || (alias as string).length < 1) {
        setAliasError("올바른 이름을 입력해주세요.");
        setCheckName("");
      } else {
        setAliasError("");
        if (res.data.result == false) setCheckAlias("사용 중인 닉네임 입니다.");
        else setCheckAlias("사용 가능한 닉네임 입니다.");
      }
    }
  };

  return (
    <Container
      style={{
        backgroundColor: "#E7F5EF",
        border: "solid",
        borderColor: "#E7F5EF",
        minWidth: "100%",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ mb: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              color="primary"
              fontWeight="bold"
              variant="h4"
            >
              회원가입
            </Typography>
            <Box
              textAlign="left"
              component="form"
              color="info.contrastText"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: 396 }}
            >
              <UserInfoTf
                margin="normal"
                required
                fullWidth
                name="name"
                label="ID"
                type="name"
                id="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                onBlur={(event) => {
                  onBlurInfo(["name", name], event);
                }}
                error={nameError !== "" || false}
              />
              <span
                style={{
                  color: "red",
                  fontSize: 13,
                  marginLeft: 8,
                }}
              >
                {checkName}
              </span>
              <FormHelperTexts>{nameError}</FormHelperTexts>
              <UserInfoTf
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={passwordState !== "" || false}
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
                error={passwordError !== "" || false}
              />
              <FormHelperTexts>{passwordError}</FormHelperTexts>

              <UserInfoTf
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(event) => {
                  onBlurInfo(["email", email], event);
                }}
                error={emailError !== "" || false}
              />
              <span
                style={{
                  color: "red",
                  fontSize: 13,
                  marginLeft: 8,
                }}
              >
                {checkEmail}
              </span>

              <FormHelperTexts>{emailError}</FormHelperTexts>
              <UserInfoTf
                margin="normal"
                required
                fullWidth
                name="alias"
                label="Nickname"
                type="alias"
                id="alias"
                onChange={(e) => setAlias(e.target.value)}
                onBlur={(event) => {
                  onBlurInfo(["alias", alias], event);
                }}
              />
              <span
                style={{
                  color: "red",
                  fontSize: 13,
                  marginLeft: 8,
                }}
              >
                {checkAilas}
              </span>

              <React.Fragment>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    height: 50,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  가입하기
                </Button>

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
                  <Box sx={style}>
                    <Typography
                      id="modal-title"
                      variant="h4"
                      fontWeight="bold"
                      component="h1"
                      sx={{ mb: 1 }}
                    >
                      회원가입 완료
                    </Typography>
                    <Typography
                      id="modal-description"
                      variant="h6"
                      sx={{ mb: 3, mt: 2 }}
                    >
                      가입이 완료되었습니다!
                    </Typography>
                    <TrashCan />
                    <Link href="/login" sx={btnstyle}>
                      로그인하러가기
                    </Link>
                  </Box>
                </Modal>
              </React.Fragment>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  );
};

export default Register;
