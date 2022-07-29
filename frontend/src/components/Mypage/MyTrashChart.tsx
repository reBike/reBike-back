import * as React from "react";

import { useState } from "react";
import {
    Typography,
    Container,
    Box

} from "@mui/material";
import Chart from "../chart/Chart";
import Date from "../chart/Date";

function MyTrashchart() {
    const [userData, setUserData] = useState<any>([]);

    return (
        <Container
            style={{
                border: "solid",
                borderRadius: 5,
                borderColor: "transparent",
                minWidth: "100%",
                height: "80vh",
            }}>
            <Typography color="black" fontWeight="bold" sx={{ mt: 3, mb: 2, fontSize: "medium" }}>
                내 쓰레기 통계
            </Typography>
            <Container
                style={{
                    borderRadius: 8,
                    backgroundColor: "white",
                    height: "50vh"
                }}
                sx={{ mt: 3 }}>
                <Date onClickRetrieve={setUserData} />
                <Chart list={userData} />
            </Container>
        </Container>
    );

}

export default MyTrashchart;