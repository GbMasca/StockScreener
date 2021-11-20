import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { colors } from "../utils/colors";
import {
  List, ListItem,
  Typography,
} from "@material-ui/core";
import Match from "./Match";

class OtherMatches extends Component {
  state = {
    matches: [],
  };

  componentDidMount() {
      const {matches} = this.props
      this.setState({matches})
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {matches} = this.props
    if (matches !== prevProps.matches) {
      this.setState({matches})
    }

  }

  renderMatches() {
      const {matches} = this.state
    return (
      <div style={{height: 500, overflow: "auto"}}>
        <List>
            {matches.map(match => {
                return (
                    <ListItem key={match.summary.symbol}>
                      <Match match={match} />
                    </ListItem>
                )
            })}
        </List>
      </div>
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.title}>Matches</Typography>
        <div className={classes.cardContainer}>{this.renderMatches()}</div>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    backgroundColor: colors.main,
  },
  title: {
    fontSize: 25,
    color: colors.black,
  },
  cardContainer: {
    width: "100%",
    backgroundColor: colors.black,
    borderRadius: 20,
    height: 500,
  },
});

export default withStyles(styles, { withTheme: true })(OtherMatches);
