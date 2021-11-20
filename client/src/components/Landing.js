import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import {
    Typography,
} from "@material-ui/core";
import {connect} from "react-redux";

class Landing extends Component {
  render() {
    return (
        <div>
            <Typography>
                Welcome to the first deployment of Easy Invest.
            </Typography>
            <Typography>
                For this first version, only screener is functional.
            </Typography>
            <Typography>
                You can create, modify new screeners based on Beta, ROE and ROA
            </Typography>
            <Typography>
                Please let me know if you fund any bugs or functionality errors with the application
            </Typography>
            <Typography>
                Disclaimer:
            </Typography>
            <Typography>
                The front-end is yet to be optimized for the user experience.
            </Typography>
            <Typography>
                There is no "LOADING" system, so depending on your internet connection be patient.
            </Typography>
        </div>
    );
  }
}

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
});

function mapStateToProps({ auth }) {
    return { auth };
}
export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps)
)(Landing);
