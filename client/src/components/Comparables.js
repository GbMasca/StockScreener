import React from 'react'
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import * as actions from "../actions";

function Comparables() {

    const render = () => {
        return (
            <div>
                Comparables
            </div>
        )
    }
    return render()
}

const styles = () => ({
    root: {
        display: "flex"
    }
})

function mapStateToProps({ auth, currentSearch, searchResults, searches }) {
    return { auth, currentSearch, searchResults, searches };
}
export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, actions)
)(Comparables);
