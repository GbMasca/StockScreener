import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { Button, Grid, Menu, MenuItem } from "@material-ui/core";
import BestMatch from "../cells/BestMatch";
import OtherMatches from "../cells/OtherMatches";

import { KeyboardArrowDown, Add } from "@material-ui/icons";

import { connect } from "react-redux";
import * as actions from "../actions";
import { colors } from "../utils/colors";
import { Link } from "react-router-dom";
import IndexDisplay from "../cells/IndexDisplay";

function Dashboard({
  classes,
  auth,
  currentSearch,
  searchResults,
  searches,
  fetchUser,
  fetchResults,
  fetchUserSearches,
  fetchSearch,
  updateCurrentSearch,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [currentSearchID, setCurrentSearchID] = useState(0);

  useEffect(() => {
    if (!auth) {
      fetchUser();
      fetchUserSearches();
    }
    if (!currentSearch && auth) {
      fetchSearch(auth.currentSearch);
      fetchResults(auth.currentSearch);
      setCurrentSearchID(auth.currentSearch);
    }
    if (auth && auth.currentSearch !== currentSearchID) {
      setCurrentSearchID(auth.currentSearch);
      fetchSearch(auth.currentSearch);
      fetchResults(auth.currentSearch);
    }
  }, [
    auth,
    currentSearch,
    searchResults,
    searches,
    currentSearchID,
    fetchResults,
    fetchSearch,
    fetchUser,
    fetchUserSearches,
  ]);

  const setCurrentSearch = (search) => {
    updateCurrentSearch(search);
  };

  const renderBestMatch = () => {
    if (searchResults) {
      const match = searchResults.bestMatch;
      if (match) {
        return <BestMatch match={match} />;
      }
    }
  };
  const renderOtherMatches = () => {
    if (searchResults && searchResults.matches.length > 0) {
      const matches = searchResults.matches;
      return <OtherMatches matches={matches} />;
    }
  };

  const renderSearchIndex = () => {
    if (currentSearch) {
      return (
        <Grid
          container
          justifyContent={"center"}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {currentSearch.searchIndex.map((index) => {
            return (
              <Grid key={index.index} item style={{ margin: 10 }}>
                <IndexDisplay key={index.index} item={index} />
              </Grid>
            );
          })}
        </Grid>
      );
    }
  };

  const renderSearchSelection = () => {
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            marginTop: 40,
            width: 300,
            borderRadius: 0,
          },
        }}
      >
        {renderSelectionItem()}
      </Menu>
    );
  };
  const renderSelectionItem = () => {
    if (searches && currentSearch) {
      return searches.map((search, index) => {
        if (search.name !== currentSearch.name) {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                setCurrentSearch(search);
                handleClose();
              }}
            >
              {search.name}
            </MenuItem>
          );
        }
        return <div key={index} />;
      });
    }
  };
  const renderTopButtons = () => {
    return (
      <div style={{ display: "flex" }} key={"top-buttons"}>
        <Button
          onClick={handleClick}
          endIcon={<KeyboardArrowDown />}
          className={classes.currentSearchButton}
        >
          {currentSearch ? currentSearch.name : "Loading"}
        </Button>
        <Link to={"/dash/edit"} style={{ textDecoration: "none" }}>
          <Button className={classes.editSearchButton}>Edit</Button>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Link to={"/dash/new"} style={{ textDecoration: "none" }}>
          <Button endIcon={<Add />} className={classes.newSearchButton}>
            New Search
          </Button>
        </Link>
      </div>
    );
  };
  const renderActionButtons = () => {
    return (
      <div
        key={"action-buttons"}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button className={classes.compareButton}>Compare Results</Button>
        <Button className={classes.dcfButton}>Run DCF Analysis</Button>
      </div>
    );
  };
  const render = () => {
    return (
      <div>
        {renderTopButtons()}
        {renderSearchSelection()}
        {renderSearchIndex()}
        {renderBestMatch()}
        {renderOtherMatches()}
        {renderActionButtons()}
        <div style={{ height: 200 }} />
      </div>
    );
  };
  return render();
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
  },
});

function mapStateToProps({ auth, currentSearch, searchResults, searches }) {
  return { auth, currentSearch, searchResults, searches };
}
export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, actions)
)(Dashboard);
