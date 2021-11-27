import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { colors } from "../utils/colors";
import { Grid, Typography } from "@material-ui/core";
import {indexChoice, formatNumber} from "../utils/indexChoice";

function BestMatch({match, classes}) {
  const { toSearch } = match

  const indexes = indexChoice.choice
  const indexesFront = indexChoice.toFront

  const renderTitle = () => {
    return <Typography className={classes.title}>Best Match</Typography>
  }
  const renderHeader = () => {
    return (
        <div>
          <div className={classes.companyInfoHeader}>
            <div className={classes.companyInfoContainer}>
              <Typography className={classes.companyName}>
                {toSearch.longName}
              </Typography>
              <Typography className={classes.companyIndustry}>
                {toSearch.industry}
              </Typography>
              <Typography className={classes.companyMarket}>
                {toSearch.exchangeName}
              </Typography>
            </div>
            <div style={{ flexGrow: 1 }} />
            <div className={classes.companyPriceContainer}>
              <Typography className={classes.companyPrice}>${toSearch.currentPrice}</Typography>
              <Typography className={classes.descriptionText}>
                Current Price
              </Typography>
            </div>
          </div>
        </div>
    )
  }
  const renderMetrics = () => {
    return (
        <Grid container className={classes.gridContainer}>
          {indexes.map(i => {
            return (
                <Grid item md={4} key={i}>
                  <div className={classes.metricContainer}>
                    <Typography className={classes.metricText}>{formatNumber(Number(toSearch[i]), i)}</Typography>
                    <Typography className={classes.descriptionText}>{indexesFront[i]}</Typography>
                  </div>
                </Grid>
            )
          })}
        </Grid>
    )
  }
  const renderContainer = () => {
    return (
        <div className={classes.cardContainer}>
          {renderHeader()}
          {renderMetrics()}
        </div>
    )
  }
  const render = () => {
    if (Object.keys(match).length === 0) {
      return <Typography className={classes.title}>No Match</Typography>
    } else {
      return (
          <div>
            {renderTitle()}
            {renderContainer()}
          </div>
      )
    }

  }

  return render()
}

const styles = () => ({
  root: {
    backgroundColor: colors.main,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.main,
  },
  cardContainer: {
    width: "100%",
    backgroundColor: colors.main,
    borderRadius: 20,
  },
  companyInfoContainer: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  companyName: {
    color: colors.white,
    fontSize: 25,
  },
  companyIndustry: {
    color: colors.white,
    fontSize: 15,
    marginTop: -7,
  },
  companyMarket: {
    color: colors.white,
    fontSize: 13,
    marginTop: -3,
  },
  companyPrice: {
    color: colors.white,
    fontSize: 35,
  },
  companyInfoHeader: {
    display: "flex",
    flexDirection: "row",
  },
  companyPriceContainer: {
    paddingTop: 10,
    paddingRight: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  metricContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 15,
    minWidth: 200,
  },
  descriptionText: {
    color: colors.white,
    fontSize: 18,
    marginTop: -5,
  },
  metricText: {
    color: colors.white,
    fontSize: 25,
  },

  gridContainer: {
    marginTop: 30,
    paddingBottom: 30,
    marginLeft: '10%',
    width: '80%',
  },
});

export default withStyles(styles, { withTheme: true })(BestMatch);
