import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import {connect} from "react-redux";
import NewSearch from "./NewSearch";
import * as actions from "../actions";

function EditSearch () {
    return <NewSearch edit/>
}

const styles = () => ({
    root: {
        flexGrow: 1,
    },
});

function mapStateToProps({ auth, currentSearch }) {
    return { auth, currentSearch };
}
export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, actions),
)(EditSearch);
