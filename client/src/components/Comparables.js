import React from 'react'
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import * as actions from "../actions";


function Comparables({auth, currentSearch, searchResults}) {


    const render = () => {
        return (
            <div>
                {searchResults.bestMatch.summary.symbol}
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

function mapStateToProps({ auth, currentSearch, searchResults}) {
    return { auth, currentSearch, searchResults};
}
export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, actions)
)(Comparables);
