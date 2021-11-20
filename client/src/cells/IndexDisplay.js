import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { colors } from "../utils/colors";

class IndexDisplay extends Component {
  state = {
    item: {
      index: "",
      value: "",
      margin: "",
    },
  };

  componentDidMount() {
    this.loadState(this.props.item);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { item } = this.props
    if (item !== prevProps.item) {
      this.loadState(item)
    }
  }

  loadState(item) {
    this.setState({ item });
  }

  renderContent() {
    const { item} = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.indexName}>{item.index.toUpperCase()}</Typography>
        <Typography className={classes.indexValue}>{item.value}</Typography>
        <Typography className={classes.descriptionText}>Value</Typography>
        <Typography className={classes.indexValue}>{item.margin}%</Typography>
        <Typography className={classes.descriptionText}>
          Error Margin
        </Typography>
      </div>
    );
  }
  render() {
    return this.renderContent();
  }
}

const styles = () => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 200,
    height: 150,
    border: "2px solid",
    borderColor: colors.main,
    borderRadius: 10,
  },
  descriptionText: {
    color: colors.black,
    fontSize: 15,
    marginTop: -5,
    marginBottom: 10,
  },
  indexName: {
    color: colors.main,
    fontSize: 25,
    fontWeight: "bold",
  },
  indexValue: {
    color: colors.main,
    fontSize: 20,
  },
  mainIndex: {
    color: colors.main,
    marginTop: 35,
    fontSize: 17,
    marginRight: 10,
    marginLeft: 10,
  }
});

function mapStateToProps({ auth }) {
  return { auth };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(IndexDisplay);
