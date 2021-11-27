import React from 'react'
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import * as actions from "../actions";

function CompanyDetail() {

};

const styles = () => ({
    root: {
        display: "flex"
    }
})

function mapStateToProps({auth}) {
    return {auth}
}

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, actions)
)(CompanyDetail);
