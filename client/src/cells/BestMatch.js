import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { colors } from "../utils/colors";
import { Grid, Typography } from "@material-ui/core";

class BestMatch extends Component {

  state = {
    item: {
      name: "",
      industry: "",
      marketTraded: "",
      currentPrice: "",
      marketCap: "",
      beta: "",
      peRatio: "",
      volume: "",
      dayRange: "",
      earningsPerShare: "",
    }
  }

  componentDidMount() {
    // console.log("Mount COMP", this.props.item)
    this.loadState(this.props.item)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.item.name !== prevProps.item.name){
      this.loadState(this.props.item)
    }
    // console.log("UPDATED")
  }

  loadState(item) {
    this.setState({item})
  };

  formatMetric(value, indicator) {
    let dividedBy = 1
    if (indicator === "M") {
      dividedBy = 1000000
    } else if (indicator === "B") {
      dividedBy = 1000000000
    } else {
      return Number(value).toFixed(2)
    }

    const formattedValue = String(Math.round(value/dividedBy))
    return formattedValue+indicator

  }

  render() {
    const { classes } = this.props;
    const { item } = this.state
    return (
      <div>
        <Typography className={classes.title}>Best Match</Typography>
        <div className={classes.cardContainer}>
          <div className={classes.companyInfoHeader}>
            <div className={classes.companyInfoContainer}>
              <Typography className={classes.companyName}>
                {item.name}
              </Typography>
              <Typography className={classes.companyIndustry}>
                {item.industry}
              </Typography>
              <Typography className={classes.companyMarket}>
                {item.marketTraded}
              </Typography>
            </div>
            <div style={{ flexGrow: 1 }} />
            <div className={classes.companyPriceContainer}>
              <Typography className={classes.companyPrice}>${item.currentPrice}</Typography>
              <Typography className={classes.descriptionText}>
                Current Price
              </Typography>
            </div>
          </div>
          <Grid container className={classes.gridContainer} spacing={6}>
            <Grid item md={6}>
              <div className={classes.metricContainer}>
                <Typography className={classes.metricText}>${this.formatMetric(item.marketCap, "B")}</Typography>
                <Typography className={classes.descriptionText}>Market Cap</Typography>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className={classes.metricContainer}>
                <Typography className={classes.metricText}>{this.formatMetric(item.beta, "V")}</Typography>
                <Typography className={classes.descriptionText}>Beta</Typography>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className={classes.metricContainer}>
                <Typography className={classes.metricText}>{this.formatMetric(item.peRatio, "V")}</Typography>
                <Typography className={classes.descriptionText}>PE Ratio</Typography>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className={classes.metricContainer}>
                <Typography className={classes.metricText}>{this.formatMetric(item.volume, "M")}</Typography>
                <Typography className={classes.descriptionText}>Volume</Typography>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className={classes.metricContainer} style={{marginTop: 4}}>
                <Typography className={classes.metricText} style={{fontSize: 18}}>{item.dayRange}</Typography>
                <Typography className={classes.descriptionText} style={{marginTop: 2}}>Day Range</Typography>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className={classes.metricContainer}>
                <Typography className={classes.metricText}>${this.formatMetric(item.earningsPerShare, "V")}</Typography>
                <Typography className={classes.descriptionText}>EPS</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
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
    fontWeight: "bold",
    color: colors.main,
  },
  cardContainer: {
    width: "100%",
    backgroundColor: colors.main,
    borderRadius: 20,
    height: 500,
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
    paddingTop: 20,
    paddingRight: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  metricContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    marginTop: 40,
    marginLeft: '10%',
    width: '80%'
  },
});

export default withStyles(styles, { withTheme: true })(BestMatch);
