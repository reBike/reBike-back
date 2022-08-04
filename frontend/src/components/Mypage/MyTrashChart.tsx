import * as React from "react";

import { useState } from "react";
import {
    Typography,
    Container,
} from "@mui/material";
import Chart from "../chart/Chart";
import Date from "../chart/Date";

function MyTrashchart() {
    const [userData, setUserData] = useState<any>([]);

    return (
        <Container
            style={{
                border: "solid",
                borderRadius: 8,
                borderColor: "transparent",
                minWidth: "100%",
                height: "100vh",
                marginTop: 20,
            }}>
            <Typography color="black" fontWeight="bold" sx={{
                mt: 1.2, mb: 1, fontSize: "medium"
            }}>

            </Typography>
            <Container
                style={{
                    borderRadius: 5,
                    backgroundColor: "white",
                    height: "80vh",
                    boxShadow: "1px 3px 3px #B0B09A",
                }}
                sx={{ mt: 5 }}>
                <Container>
                    <Date onClickRetrieve={setUserData} />
                </Container>
                <Container
                    sx={{ width: "100%", height: "80%" }}>
                    <Chart list={userData} />
                </Container>
            </Container>
        </Container>
    );

}

export default MyTrashchart;