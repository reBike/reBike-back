import * as React from "react";
import { useState } from "react";
import {
    Modal,
    Backdrop,
    Typography,
    Box,
    Link,
} from "@mui/material";
import lottie from "lottie-web";

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
    backgroundColor: "#B0B09A",
    color: "#ffffff",
    height: "40px",
    width: "300px",
    marginTop: "25px",
    textAlign: "center",
    fontSize: "15px",
    textDecoration: "none",
    borderRadius: 4,
    p: 1,
    fontFamily: "Itim",
    "&:hover": { backgroundColor: "#737458", color: "#ffffff" },
};

const Lottie = () => {
    //lottie
    const element = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        lottie.loadAnimation({
            container: element.current as HTMLDivElement,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: require("../../images/TrashLottie.json"),
        });
    }, []);
    return <Box ref={element} style={{ height: 300 }}></Box>;
};

function OpenModal({ open }: any) {

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={open}
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
                    sx={{ mb: 3, color: "#737458", fontFamily: "Itim" }}
                >
                    Change Success!
                </Typography>
                <div style={{ marginTop: 15 }}>
                    <Lottie />
                </div>

                <Link href="/mypage/userInfo" sx={btnstyle}>
                    OK
                </Link>
            </Box>
        </Modal>
    )
};
export default OpenModal;