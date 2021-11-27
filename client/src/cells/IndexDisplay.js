import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { colors } from "../utils/colors";
import {indexChoice, formatNumber} from "../utils/indexChoice";

function IndexDisplay({classes, item}) {

  const indexesFront = indexChoice.toFront

  const renderContent = () => {
    return (
        <div className={classes.root}>
          <Typography className={classes.indexName}>{indexesFront[item.index]}</Typography>
          <Typography className={classes.indexValue}>{formatNumber(item.value, item.index)}</Typography>
          <Typography className={classes.descriptionText}>Value</Typography>
          <Typography className={classes.indexValue}>{item.errorMargin}%</Typography>
          <Typography className={classes.descriptionText}>
            Error Margin
          </Typography>
        </div>
    );
  }
  const render = () => {
    return renderContent();
  }
  return render()
}

const styles = () => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 300,
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
