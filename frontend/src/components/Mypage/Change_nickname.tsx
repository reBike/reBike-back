import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { API_BASE_URL } from "src/utils/constants";
import { getAccess } from "../../Auth/tokenManager";
import { setAccessToken, setRefreshToken } from "src/Auth/tokenManager";
import { useState } from "react";
import Api from "../../utils/customApi";
import {
  FormHelperText,
  Typography,
  Container,
  styled,
  TextField,
  Box,
  Button,
  Hidden,
} from "@mui/material";
import OpenModal from "./OpenModal"

const theme = createTheme({
  palette: {
    primary: {
      main: "#737458",
    },
  },
});

const UserInfoChange = styled(TextField)(({ }) => ({
  borderRadius: 5,
  textAlign: "center",
  "&:hover": {
    color: "#737458",
  },

  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#737458",
    },
  },
}));

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 6px;
  font-weight: 600;
  color: #c65959;
  font-size: 12px;
`;

function ChangeNickName() {
  const aliasRegex = /^[가-힣a-zA-Z0-9]+$/;
  const [checkAilas, setCheckAlias] = useState("");
  const [alias, setAlias] = useState("");
  const [newAccess, getNewAccess] = useState("");

  const [open, setOpen] = useState(false);


  const onBlurInfo = async (props: Array<string>, event: any) => {
    const res = await Api.get(
      `/users/?case=${props[0]}&value=${props[1] as string}`
    );
    if (props[0] === "alias") {
      if (!aliasRegex.test(alias as string) || (alias as string).length < 1) {
        setCheckAlias("올바른 닉네임을 입력해주세요.");
      } else {
        if (res.data.result == false) setCheckAlias("사용 중인 닉네임 입니다.");
        else setCheckAlias("사용 가능한 닉네임 입니다.");
      }
    }
  }; // 닉네임 유효성 체크

  // 닉네임 체크에 통과될 때
  const aliasChange = async (changeAlias: string) => {
    const stringAccess: any = getAccess();

    if (stringAccess !== null) {
      // stringAccess if문 안써주면 코드 오류 발생
      /* const access: rs.TokenInfo = JSON.parse(stringAccess); // string형태로 받는 토큰 JSON으로 만들어줌*/
      console.log("넘겨줄 토큰값", stringAccess);

      await axios
        .patch(
          `${API_BASE_URL}/users/`,
          { value: { alias: changeAlias } },
          {
            //patch : 바디 -> 변경할 alias & 헤더 -> 확인해야되는 토큰
            headers: {
              Authorization: `${stringAccess.value}`,
            },
          }
        )
        .then((response) => {
          console.log("response", response.data);
          setAccessToken(response.data.access_token, true); // 그 전의 access토큰 초기화
          setRefreshToken(response.data.refresh_token, true); // 그 전의 refresh토큰 초기화
          setOpen(true);
        })
        .catch((e) => {
          // 의도치 않는 오류
          alert("로그인 정보에 오류가 생겼습니다.");
        });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const changeAlias = data.get("alias");
    if (
      aliasRegex.test(changeAlias as string) &&
      checkAilas === "사용 가능한 닉네임 입니다."
    ) {
      aliasChange(changeAlias as string);
    } else e.preventDefault();
    //오류 생길때는 활성화 X 화면 넘어가지 않도록
  };

  React.useEffect(() => { }, [alias]);
  React.useEffect(() => {
    console.log("newAccess", newAccess);
  }, [newAccess]);

  return (
    <Container
      style={{
        border: "solid",
        borderRadius: 5,
        borderColor: "transparent",
        minWidth: "100%",
        height: "auto",
      }}
    >
      <ThemeProvider theme={theme}>
        <Typography
          color="black"
          fontWeight="bold"
          sx={{
            mt: 1.2,
            mb: 1,
            fontSize: "medium",
            textAlign: "center",
          }}
        >
          닉네임 변경
        </Typography>

        <Container
          style={{
            backgroundColor: "white",
            border: "solid",
            borderRadius: 5,
            borderColor: "white",
            justifyContent: "center",
            height: "auto",
            paddingTop: 30,
          }}
        >
          <Box
            component="form"
            color="info.contrastText"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "auto",
              margin: "auto",
            }}
          >
            <UserInfoChange
              margin="normal"
              required
              fullWidth
              name="alias"
              label="변경할 닉네임 입력"
              type="alias"
              id="alias"
              onChange={(e) => setAlias(e.target.value)}
              onBlur={(event) => {
                onBlurInfo(["alias", alias], event);
              }}
            />
            <FormHelperTexts>{checkAilas}</FormHelperTexts>
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
                borderRadius: 3,
              }}
            >
              변경하기
            </Button>
            <>
              {
                open ? <OpenModal open={open} /> : <Hidden />
              }
            </>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  );
}

export default ChangeNickName;
