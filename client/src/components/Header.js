import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { colors } from "../utils/colors";
import { Link } from "react-router-dom";

class Header extends Component {
  renderStatus() {
    const { classes } = this.props;
    switch (this.props.auth) {
      case null:
        return <div></div>;
      case false:
        return (
          <div className={classes.appBarContent}>
            <Button href={"/auth/google"} className={classes.appBarButton}>
              Login
            </Button>
          </div>
        );
      default:
        return (
          <div className={classes.appBarContent}>
            <Link to={"/dash"} style={{ textDecoration: "none" }}>
              <Button className={classes.appBarNavigationButton}>
                Dashboard
              </Button>
            </Link>
            <Button href={"/api/logout"} className={classes.appBarButton}>
              Logout
            </Button>
          </div>
        );
    }
  }
  render() {
    const { classes, auth } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Link to={auth ? "/dash" : "/" } style={{ textDecoration: "none" }}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <Typography className={classes.menuButtonText}>
                  Easy Invest
                </Typography>
              </IconButton>
            </Link>
            <div className={classes.spacing} />
            {this.renderStatus()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: colors.white
  },
  menuButtonText: {
    fontSize: 23,
  },
  spacing: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: colors.main,
  },
  appBarContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  appBarButton: {
    color: colors.white,
    border: "2px solid",
    borderColor: colors.secondary,
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "none",
  },
  appBarNavigationButton: {
    color: colors.white,
    fontSize: 18,
    marginRight: 10,
    textTransform: "none",
  },
});

function mapStateToProps({ auth }) {
  return { auth };
}
export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(Header);
