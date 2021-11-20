import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import {
    Button,
} from "@material-ui/core";
import {connect} from "react-redux";

class NewSearchInput extends Component {
    render() {
        return <Button>New Search Input</Button>;
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
)(NewSearchInput);
