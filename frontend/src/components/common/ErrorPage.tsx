import { Grid, Container, Box, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <Container
      style={{
        width: "100vw",
        height: "100vw",
        maxWidth: "1920px",
        padding: 0,
        marginTop: 70,
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{
            fontFamily: "Itim",
            fontSize: 50,
            color: "#C65959",
            marginTop: "15rem",
          }}
        >
          {" "}
          No Recyclable Garbage{" "}
        </Typography>
        <Link
          href="/mainpage"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            fontFamily: "Itim",
            color: "#B0B09A",
            fontSize: 30,
            marginTop: "3rem",
          }}
        >
          {" "}
          Try Another Photo {" ▷▶︎"}{" "}
        </Link>
      </Grid>
    </Container>
  );
}

export default Footer;
