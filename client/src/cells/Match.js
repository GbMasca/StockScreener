import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import {
    Typography,
} from "@material-ui/core";
import {connect} from "react-redux";
import {colors} from "../utils/colors";

class Match extends Component {
    state = {
        match: {
            name: "",
            industry: "",
            marketTraded: "",
        }
    }

    componentDidMount() {
        if (this.props.match) {
            this.loadState()
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {match} = this.props

        if (match !== prevProps.match) {
            this.loadState()
        }
    }

    loadState() {
        const {summary, profile} = this.props.match
        if( profile && summary) {
            const match = {
                name: summary.longName || "",
                industry: profile.industry || "",
                marketTraded: summary.exchangeName || "",
            }
            this.setState({match})
        }

    }
    renderInfo() {
        const {match} = this.state
        const {classes} = this.props
        return (
            <div>
                <Typography className={classes.name}>{match.name}</Typography>
                <Typography className={classes.industry}>{match.industry}</Typography>
                <Typography className={classes.market}>{match.marketTraded}</Typography>
            </div>
        )
    }

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                {this.renderInfo()}
                <div className={classes.separator}/>
            </div>
        );
    }
}

const styles = () => ({
    root: {
        flexGrow: 1,
        width: "100%"
    },
    separator: {
        height: 2,
        backgroundColor: colors.main,
        width: "100%"
    },
    name: {
        color: colors.white,
        fontSize: 17,

    },
    industry: {
        color: colors.white,
        fontSize: 13,
    },
    market: {
        color: colors.white,
        fontSize: 11,
    },
});

function mapStateToProps({ auth }) {
    return { auth };
}
export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps)
)(Match);
