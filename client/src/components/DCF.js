import React from 'react'
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import * as actions from "../actions"

function DCF({classes}) {
    const render = () => {
        return (
            <div className={classes.root}>
                DCF
            </div>
        )
    }
    return render()

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
    withStyles(styles, {withTheme: true}),
    connect(mapStateToProps, actions)
)(DCF);
