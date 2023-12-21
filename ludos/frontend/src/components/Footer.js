import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    color: "#fff",
    marginTop: "72px",
    padding: theme.spacing(4),
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
    },
  },
  logo: {
    maxWidth: 100,
    marginRight: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={12}>
          <img src={logo} alt="Logo" className={classes.logo} />
          <Typography
            variant="body1"
            display="flex"
            style={{ justifyContent: "center" }}
          >
            If you are a developer or e-sport player? Contact us at{" "}
            <a href="mailto:ludos@ludos.com.tr" style={{ color: "#fff" }}>
              ludos@ludos.com.tr
            </a>{" "}
            and we will change your user type!
            <br />
            You can contact us for your wishes, suggestions, and complaints.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Additional content for the right side of the footer */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
