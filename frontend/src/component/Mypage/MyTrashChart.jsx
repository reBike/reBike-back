import * as React from "react";
import {
    Typography,
    Container,

} from "@mui/material";


function MyTrashcan() {
    return(
        <Container
            style={{
                border: "solid",
                borderRadius: 5,
                borderColor:"transparent",
                minWidth: "100%",
                height: "100vh",
            }}>
                    <Typography
                        color="black"
                        fontWeight="bold"
                        sx={{mt: 1.2,
                            mb: 1,
                            fontSize: "medium"}}>
                        내 쓰레기 통계
                    </Typography>
                   
                <Container
                    style={{
                        backgroundColor: "white",
                        border: "solid",
                        borderRadius: 5,
                        borderColor: "black",
                        height: "100vh",
                        pt:2, pb:2}}>
                                                                   
                </Container>
            
        </Container>

    );
}

export default MyTrashcan;
