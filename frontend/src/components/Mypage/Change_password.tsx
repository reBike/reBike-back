import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { API_BASE_URL } from "src/utils/constants";
import { getAccess } from "../../Auth/tokenManager";
import { setAccessToken, setRefreshToken } from "src/Auth/tokenManager";
import { useState } from "react";

import {
    FormHelperText,
    Typography,
    Container,
    styled,
    TextField,
    Box,
    Button,
    Hidden
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
  padding-left:6px;
  font-weight: 600;
  color: #c65959;
  font-size: 12px;
`;

function ChangePassWord() {
    const [passwordState, setPasswordState] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const passwordRegex = /^[가-힣a-zA-Z0-9]+$/;

    const [open, setOpen] = useState(false);

    const aliasChange = async (changePassword: string) => {
        const stringAccess: any = getAccess();

        if (stringAccess !== null) { // stringAccess if문 안써주면 코드 오류 발생
            /* const access: rs.TokenInfo = JSON.parse(stringAccess); // string형태로 받는 토큰 JSON으로 만들어줌*/
            console.log("넘겨줄 토큰값", stringAccess);

            await axios
                .patch(`${API_BASE_URL}/users/`, { "value": { password: changePassword } }, { //patch : 바디 -> 변경할 alias & 헤더 -> 확인해야되는 토큰 
                    headers: {
                        Authorization: `${stringAccess.value}`,
                    },
                })
                .then((response) => {
                    console.log("response", response.data);
                    setAccessToken(response.data.access_token, true); // 그 전의 access토큰 초기화
                    setRefreshToken(response.data.refresh_token, true); // 그 전의 refresh토큰 초기화
                    setOpen(true);
                })
                .catch((e) => { // 의도치 않는 오류
                    alert("로그인 정보에 오류가 생겼습니다.");
                });
        };
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const rePassword = data.get("rePassword");
        const changePassword = data.get("password");

        // 비밀번호 유효성 체크
        if (!passwordRegex.test(changePassword as string))
            setPasswordState("비밀번호를 형식에 맞춰 입력해주세요!");
        else setPasswordState("");

        // 비밀번호 같은지 체크
        if (changePassword !== rePassword)
            setPasswordError("비밀번호가 일치하지 않습니다.");
        else setPasswordError("");

        if (passwordRegex.test(changePassword as string) &&
            (changePassword as string) === rePassword) { // 닉네임 체크에 통과될 때
            aliasChange(changePassword as string);
        }
        else e.preventDefault();
        //오류 생길때는 활성화 X 화면 넘어가지 않도록
    }



    return (
        <Container
            style={{
                border: "solid",
                borderRadius: 5,
                borderColor: "transparent",
                minWidth: "100%",
                height: "auto",
                justifyContent: "center",
            }}>
            <ThemeProvider theme={theme}>
                <Typography
                    color="black"
                    fontWeight="bold"
                    sx={{
                        mt: 1.2,
                        mb: 1,
                        fontSize: "medium",
                        textAlign: "center",
                    }}>
                    비밀번호 변경
                </Typography>

                <Container
                    style={{
                        backgroundColor: "white",
                        border: "solid",
                        borderRadius: 5,
                        borderColor: "white",
                        justifyContent: "center",
                        height: "auto",
                        paddingTop: 30
                    }}>

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
                            margin: "auto"
                        }}

                    >
                        <UserInfoChange
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="변경할 비밀번호"
                            type="password"
                            id="password"
                        />
                        <FormHelperTexts>{passwordState}</FormHelperTexts>

                        <UserInfoChange
                            margin="normal"
                            required
                            fullWidth
                            name="rePassword"
                            label="비밀번호 재확인"
                            type="password"
                            id="rePassword"
                        />
                        <FormHelperTexts>{passwordError}</FormHelperTexts>
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
                                borderRadius: 3
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

export default ChangePassWord;
