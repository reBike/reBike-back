import * as React from "react";
import { Typography, Button, Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { API_BASE_URL } from "src/utils/constants";
import { getAccess } from "../../Auth/tokenManager";
import { ReduxModule } from "../../modules/ReduxModule";

const theme = createTheme({
  palette: {
    primary: {
      main: "#737458",
    },
  },
});

function formatDate(date: Date) {
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ].join("-");
} // 날짜 상태

function Dates({ onClickRetrieve }: { onClickRetrieve: any }) {
  // 함수의 반환 : onClickRetrieve
  const userIdtoRedux = ReduxModule().decodeInfo?.id;

  const [StartDate, setStartDate] = React.useState<string | null>(null);
  const [StartLock, setStartLock] = React.useState<Date | null>(null);
  const [EndDate, setEndDate] = React.useState<string | null>(null);
  const [EndLock, setEndLock] = React.useState<Date | null>(null);

  const HandleStartChange = (date: Date) => {
    const dateresult = formatDate(date);
    setStartDate(dateresult);
    setStartLock(date);
  };

  const HandleEndChange = (date: Date) => {
    const dateresult = formatDate(date);
    setEndDate(dateresult);
    setEndLock(date);
  };

  const HandleSubmit = (event: any) => {
    event.preventDefault();
    console.log(StartDate);
    console.log(EndDate);
    fetchUserData();
  };

  const fetchUserData = () => {
    const periodStr = StartDate !== null || EndDate !== null ? "/period" : "";
    const startDateStr = StartDate !== null ? `/${StartDate}` : "";
    const endDateStr = EndDate !== null ? `/${EndDate}` : "";

    if (StartLock !== null && EndLock !== null) {
      if (EndLock < StartLock) {
        alert("종료 날짜가 시작 날짜보다 앞에 있을수는 없습니다!");
      }
    }

    const getDate = async () => {
      const stringAccess: any = getAccess();
      console.log("잘 온거?", stringAccess);
      if (stringAccess !== null) { // stringAccess if문 안써주면 코드 오류 발생
        /* const access: rs.TokenInfo = JSON.parse(stringAccess); // string형태로 받는 토큰 JSON으로 만들어줌*/
        await axios
          .get(
            `${API_BASE_URL}/trash/users/${userIdtoRedux}/statistics${periodStr}${startDateStr}${endDateStr}`, { //patch : 바디 -> 변경할 alias & 헤더 -> 확인해야되는 토큰 
            headers: {
              Authorization: `${stringAccess.value}`
            }
          })
          .then((response) => {
            // Handle success.
            const responseUserData = response.data;
            console.log("data saved!");
            console.log(response.data);
            onClickRetrieve(responseUserData);
          })
          .catch((error) => {
            // Handle error.
            console.log("An error occurred:", error.response);
          });
      };
    }
    getDate();
  }

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="form"
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: 5 }}
        onSubmit={HandleSubmit}
        noValidate
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box margin="4px">
              <DatePicker
                label="시작 날짜"
                inputFormat="yyyy/MM/dd"
                value={StartDate}
                onChange={HandleStartChange as any}
                renderInput={(params) => (
                  <TextField size="small" {...params} sx={{ width: "100%" }} />
                )}
              />
            </Box>
            <Box margin="4px" justifyContent="center" alignItems="center">
              <Typography
                color="black"
                fontWeight="bold"
                sx={{ fontSize: "medium", mx: 2 }}
              >
                to
              </Typography>
            </Box>
            <Box margin="4px">
              <DatePicker
                label="종료 날짜"
                inputFormat="yyyy/MM/dd"
                value={EndDate}
                onChange={HandleEndChange as any}
                minDate={StartLock}
                renderInput={(params) => (
                  <TextField size="small" {...params} sx={{ width: "100%" }} />
                )}
              />
            </Box>
            <Box margin="4px">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: "#737458"
                  },
                  margin: 2,
                  width: 80,
                  height: 40,
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "white",
                  backgroundColor: "#B0B09A",
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </LocalizationProvider>
      </Grid>
    </ThemeProvider>
  );
}

export default Dates;
