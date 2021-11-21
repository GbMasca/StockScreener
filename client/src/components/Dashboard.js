import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
} from "@material-ui/core";
import BestMatch from "../cells/BestMatch";
import OtherMatches from "../cells/OtherMatches";

import { KeyboardArrowDown, Add } from "@material-ui/icons";

import { connect } from "react-redux";
import * as actions from "../actions";
import { colors } from "../utils/colors";
import { Link } from "react-router-dom";
const _ = require("lodash");

class Dashboard extends Component {
  state = {
    anchorEl: null,
    openAlert: null,
    textAlert: null,
    currentSearch: { name: "Loading" },
    searches: [],
    bestMatchFinancials: {
      summary: {
        longName: "",
        exchangeName: "",
        marketCap: "",
        regularMarketVolume: "",
        regularMarketDayLow: "",
        regularMarketDayHigh: "",
      },
      profile: {
        industry: "",
      },
      keyStats: {
        beta: "",
        forwardPE: "",
        trailingEps: "",
      },
      financialData: {
        currentPrice: "",
      },
    },
    otherMatches: [],
  };

  componentDidMount() {
    const { currentSearch, auth, searchResults, searches } =
        this.props;

    if( currentSearch && auth && searchResults && searches) {
      this.loadAll()
    }
    this.props.fetchUser();
    this.loadState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { financials, currentSearch, auth, searchResults, searches } =
        this.props;
    if (
        (financials && !prevProps.financials) ||
        (financials !== prevProps.financials && prevProps.financials)
    ) {
      this.loadFinancials();
    }
    if (
        (currentSearch && !prevProps.currentSearch) ||
        (currentSearch !== prevProps.currentSearch && prevProps.currentSearch)
    ) {
      this.loadCurrentSearch();
    }
    if (
        (searchResults && !prevProps.searchResults) ||
        (searchResults !== prevProps.searchResults && prevProps.searchResults)
    ) {
      this.loadResults();
    }
    if (
        (auth && !prevProps.auth) ||
        (auth !== prevProps.auth && prevProps.auth)
    ) {
      this.loadSearch();
    }
    if (searches && !prevProps.searches) {
      this.loadUserSearches();
    }
  }

  loadSearch() {
    const { auth } = this.props
    if (auth.currentSearch) {
      this.props.fetchSearch(this.props.auth.currentSearch);
    }
  }
  loadUserSearches() {
    const { searches, currentSearch } = this.props;
    const selectionSearches = [...searches];
    _.remove(selectionSearches, (s) => {
      try {
        return s._id === currentSearch._id;
      } catch (error) {
        return false;
      }
    });
    this.setState({ searches: selectionSearches });
  }
  loadFinancials() {
    const { financials } = this.props;
    const bestMatchFinancials = financials;
    this.setState({ bestMatchFinancials });
  }
  loadCurrentSearch() {
    const { currentSearch } = this.props;
    this.setState({ currentSearch: currentSearch });
    this.props.fetchResults(currentSearch._id);
    this.props.fetchUserSearches();
  }
  loadResults() {
    const { searchResults } = this.props;
    const bestMatch = searchResults.bestMatch;
    const otherMatches = searchResults.matches;

    if (!_.isEmpty(bestMatch)) {
      this.setState({ bestMatchFinancials: bestMatch, otherMatches });
    }

  }
  loadState() {

    const anchorEl = null;
    const openAlert = null;
    const textAlert = "";
    this.setState({ anchorEl, openAlert, textAlert });
  }
  loadAll() {
    this.loadSearch()
    this.loadUserSearches()
    this.loadFinancials()
    this.loadCurrentSearch()
    this.loadResults()
  }

  handleClick = (event) => this.setState({ anchorEl: event.currentTarget });
  handleAlertOpen = (msg) => this.setState({ openAlert: true, alertText: msg });
  handleClose = () => this.setState({ anchorEl: null, openAlert: false });

  setCurrentSearch(search) {
    const currentSearch = search;
    const lastSearch = this.state.currentSearch;
    const searches = this.state.searches;
    const index = searches.findIndex((s) => {
      return s._id === currentSearch._id;
    });
    searches.splice(index, 1);
    searches.push(lastSearch);
    searches.sort();

    this.props.updateCurrentSearch(currentSearch);

    //this.setState({ currentSearch, searches });
  }

  renderSearchSelection() {
    const { anchorEl, searches } = this.state;
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
        PaperProps={{
          style: {
            marginTop: 40,
            width: 300,
            borderRadius: 0,
          },
        }}
      >
        {searches.map((search, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              this.setCurrentSearch(search);
              this.handleClose();
            }}
          >
            {search.name}
          </MenuItem>
        ))}
      </Menu>
    );
  }
  renderButtonContainer() {
    const { classes } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <Button
          onClick={this.handleClick}
          endIcon={<KeyboardArrowDown />}
          className={classes.currentSearchButton}
        >
          {this.state.currentSearch.name}
        </Button>
        <Link to={"/dash/edit"} style={{ textDecoration: "none" }}>
          <Button className={classes.editSearchButton}>Edit</Button>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Link to={"/dash/new"} style={{ textDecoration: "none" }}>
          <Button
            endIcon={<Add />}
            className={classes.newSearchButton}
          >
            New Search
          </Button>
        </Link>
      </div>
    );
  }

  renderCardBestMatch() {
    const { bestMatchFinancials } = this.state;
    let item;

    if (bestMatchFinancials) {
      item = {
        name: bestMatchFinancials.summary.longName || "",
        industry: bestMatchFinancials.profile.industry || "",
        marketTraded: bestMatchFinancials.summary.exchangeName || "",
        currentPrice: bestMatchFinancials.financialData.currentPrice || 0,
        marketCap: bestMatchFinancials.summary.marketCap || 0,
        beta: bestMatchFinancials.keyStats.beta || 0,
        peRatio: bestMatchFinancials.keyStats.forwardPE || 0,
        volume: bestMatchFinancials.summary.regularMarketVolume || 0,
        dayRange: `${
            "$" + Number(bestMatchFinancials.summary.regularMarketDayLow).toFixed(2)
        } - ${
            "$" +
            Number(bestMatchFinancials.summary.regularMarketDayHigh).toFixed(2)
        }` || "",
        earningsPerShare: bestMatchFinancials.keyStats.trailingEps || 0,
      };
    } else {
      item = {
        name: "",
        industry: "",
        marketTraded: "",
        currentPrice: 0,
        marketCap: 0,
        beta: 0,
        peRatio: 0,
        volume: 0,
        dayRange: "",
        earningsPerShare: 0,
      };
    }
    return (
      <div
        style={{ width: "35%", height: 500, marginLeft: 40, marginRight: 40 }}
      >
        <BestMatch item={item} />
      </div>
    );
  }
  renderCardMatches() {
    return (
      <div
        style={{ width: "35%", height: 500, marginLeft: 40, marginRight: 40 }}
      >
        <OtherMatches matches={this.state.otherMatches}/>
      </div>
    );
  }

  renderCardContainer() {
    const { classes } = this.props;
    return (
      <div style={{ display: "flex" }}>
        {this.renderCardBestMatch()}
        <div style={{ flexGrow: 1 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            className={classes.compareButton}
            onClick={() =>
              this.handleAlertOpen(
                "This will run a comparable analysis between Best Match and other matches and redirect user to comparable analysis page"
              )
            }
          >
            Compare Results
          </Button>
          <Button
            className={classes.dcfButton}
            onClick={() =>
              this.handleAlertOpen(
                "This will run a Discounted Cash Flow Analysis and redirect user to display results"
              )
            }
          >
            Run DCF Analysis
          </Button>
        </div>
        <div style={{ flexGrow: 1 }} />
        {this.renderCardMatches()}
      </div>
    );
  }

  renderAlert() {
    const { openAlert } = this.state;
    return (
      <Dialog
        open={Boolean(openAlert)}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"In construction"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.state.alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {

    return (
      <div>
        {this.renderButtonContainer()}
        {this.renderSearchSelection()}
        {this.renderCardContainer()}
        {this.renderAlert()}
      </div>
    );
  }
}

const styles = () => ({
  root: {
    backgroundColor: colors.main,
  },
  currentSearchButton: {
    backgroundColor: colors.main,
    color: colors.white,
    margin: 40,
    textTransform: "none",
    height: 40,
    width: 200,
  },
  newSearchButton: {
    border: "2px solid",
    borderColor: colors.red,
    color: colors.red,
    margin: 40,
    textTransform: "none",
    height: 40,
    width: 200,
  },
  compareButton: {
    backgroundColor: colors.secondary,
    marginTop: 40,
    width: 200,
    textTransform: "none",
  },
  dcfButton: {
    backgroundColor: colors.main,
    marginTop: 20,
    width: 200,
    textTransform: "none",
  },
  editSearchButton: {
    color: colors.secondary,
    fontSize: 20,
    textTransform: "none",
    marginLeft: -40,
    marginTop: 40,
    height: 40,
  }
});

function mapStateToProps({
  auth,
  financials,
  currentSearch,
  searchResults,
  searches,
}) {
  return { auth, financials, currentSearch, searchResults, searches };
}
export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, actions)
)(Dashboard);
