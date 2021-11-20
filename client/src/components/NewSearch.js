import React, {useEffect, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import {compose} from "redux";
import {connect} from "react-redux";
import * as actions from "../actions";
import {colors} from "../utils/colors";
import {Button, Grid, MenuItem, TextField} from "@material-ui/core";
import IndexDisplay from "../cells/IndexDisplay";
import {Add} from "@material-ui/icons";
import {Link, useNavigate} from "react-router-dom";

const _ = require("lodash");

const sectorChoice = [
  "Basic Materials",
  "Communication Services",
  "Consumer Cyclical",
  "Consumer Defensive",
  "Energy",
  "Financial",
  "Healthcare",
  "Industrials",
  "Real Estate",
  "Technology",
  "Utilities",
];
const industryChoice = {
  "Basic Materials": [
    "Agricultural Inputs",
    "Aluminum",
    "Building Materials",
    "Chemicals",
    "Coking Coal",
    "Copper",
    "Gold",
    "Lumber & Wood Production",
    "Other Industrial Metals & Mining",
    "Other Precious Metals & Mining",
    "Paper & Paper Products",
    "Silver",
    "Specialty Chemicals",
    "Steel",
  ],
  "Communication Services": [
    "Advertising Agencies",
    "Broadcasting",
    "Electronic Gaming & Multimedia",
    "Entertainment",
    "Internet Content & Information",
    "Publishing",
    "Telecom Services",
  ],
  "Consumer Cyclical": [
    "Apparel Manufacturing",
    "Apparel Retail",
    "Auto Manufacturers",
    "Auto Parts",
    "Auto & Truck Dealerships",
    "Department Stores",
    "Footwear & Accessories",
    "Furnishings, Fixtures & Appliances",
    "Gambling",
    "Home Improvement Retail",
    "Internet Retail",
    "Leisure",
    "Lodging",
    "Luxury Goods",
    "Packaging & Containers",
    "Personal Services",
    "Recreational Vehicles",
    "Residential Construction",
    "Resorts & Casinos",
    "Restaurants",
    "Specialty Retail",
    "Textile Manufacturing",
    "Travel Services",
  ],
  "Consumer Defensive": [
    "Beverages - Brewers",
    "Beverages - Non-Alcoholic",
    "Beverages - Wineries & Distilleries",
    "Confectioners",
    "Discount Stores",
    "Education & Training Services",
    "Farm Products",
    "Food Distribution",
    "Grocery Stores",
    "Household & Personal Products",
    "Packaged Foods",
    "Tobacco",
  ],
  Energy: [
    "Oil & Gas Drilling",
    "Oil & Gas E&P",
    "Oil & Gas Equipment & Services",
    "Oil & Gas Integrated",
    "Oil & Gas Midstream",
    "Oil & Gas Refining & Marketing",
    "Thermal Coal",
    "Uranium",
  ],
  Financial: [
    "Stocks only (ex-Funds)",
    "Asset Management",
    "Banks - Diversified",
    "Banks - Regional",
    "Capital Markets",
    "Closed-End Fund - Debt",
    "Closed-End Fund - Equity",
    "Closed-End Fund - Foreign",
    "Credit Services",
    "Exchange Traded Fund",
    "Financial Conglomerates",
    "Financial Data & Stock Exchanges",
    "Insurance Brokers",
    "Insurance - Diversified",
    "Insurance - Life",
    "Insurance - Property & Casualty",
    "Insurance - Reinsurance",
    "Insurance - Specialty",
    "Mortgage Finance",
    "Shell Companies",
  ],
  Healthcare: [
    "Biotechnology",
    "Diagnostics & Research",
    "Drug Manufacturers - General",
    "Drug Manufacturers - Specialty & Generic",
    "Healthcare Plans",
    "Health Information Services",
    "Medical Care Facilities",
    "Medical Devices",
    "Medical Distribution",
    "Medical Instruments & Supplies",
    "Pharmaceutical Retailers",
  ],
  Industrials: [
    "Aerospace & Defense",
    "Airlines",
    "Airports & Air Services",
    "Building Products & Equipment",
    "Business Equipment & Supplies",
    "Conglomerates",
    "Consulting Services",
    "Electrical Equipment & Parts",
    "Engineering & Construction",
    "Farm & Heavy Construction Machinery",
    "Industrial Distribution",
    "Infrastructure Operations",
    "Integrated Freight & Logistics",
    "Marine Shipping",
    "Metal Fabrication",
    "Pollution & Treatment Controls",
    "Railroads",
    "Rental & Leasing Services",
    "Security & Protection Services",
    "Specialty Business Services",
    "Specialty Industrial Machinery",
    "Staffing & Employment Services",
    "Tools & Accessories",
    "Trucking",
    "Waste Management",
  ],
  "Real Estate": [
    "Real Estate - Development",
    "Real Estate - Diversified",
    "Real Estate Services",
    "REIT - Diversified",
    "REIT - Healthcare Facilities",
    "REIT - Hotel & Motel",
    "REIT - Industrial",
    "REIT - Mortgage",
    "REIT - Office",
    "REIT - Residential",
    "REIT - Retail",
    "REIT - Specialty",
  ],
  Technology: [
    "Communication Equipment",
    "Computer Hardware",
    "Consumer Electronics",
    "Electronic Components",
    "Electronics & Computer Distribution",
    "Information Technology Services",
    "Scientific & Technical Instruments",
    "Semiconductor Equipment & Materials",
    "Semiconductors",
    "Software - Application",
    "Software - Infrastructure",
    "Solar",
  ],
  Utilities: [
    "Utilities - Diversified",
    "Utilities - Independent Power Producers",
    "Utilities - Regulated Electric",
    "Utilities - Regulated Gas",
    "Utilities - Regulated Water",
    "Utilities - Renewable",
  ],
  "": [],
};

function NewSearch({ classes, currentSearch, edit, postSearch, editSearch }) {
  const [indexChoice, setIndexChoice] = useState(["ROE", "ROA", "beta"]);
  const [indexList, setIndexList] = useState([]);

  const [nameText, setNameText] = useState("");
  const [nameError, setNameError] = useState(false);
  const [sectorText, setSectorText] = useState("");
  const [sectorError, setSectorError] = useState(false);
  const [industryText, setIndustryText] = useState("");
  const [industryError, setIndustryError] = useState(false);

  const [indexText, setIndexText] = useState("");
  const [indexError, setIndexError] = useState(false);
  const [valueText, setValueText] = useState("");
  const [valueError, setValueError] = useState(false);
  const [marginText, setMarginText] = useState("10");
  const [marginError, setMarginError] = useState(false);

  const [thisSearch, setThisSearch] = useState();
  const [isEdit, setIsEdit] = useState();
  const [open, setOpen] = useState();

  const [indexEdit, setIndexEdit] = useState(false);
  const [toEdit, setToEdit] = useState();

  const navigate = useNavigate();

  const handleChangeSectorText = (event) => {
    setSectorText(event.target.value);
  };
  const handleChangeIndustryText = (event) => {
    setIndustryText(event.target.value);
  };
  const handleChangeNameText = (event) => {
    setNameText(event.target.value);
  };
  const handleChangeIndexText = (event) => {
    setIndexText(event.target.value);
  };
  const handleChangeValueText = (event) => {
    setValueText(event.target.value);
  };
  const handleChangeMarginText = (event) => {
    setMarginText(event.target.value);
  };

  const handlePopUpOpen = (thisIndex) => {
    if (thisIndex) {
      setIndexEdit(true)
      setToEdit(thisIndex)
      indexChoice.push(thisIndex.index)
      setIndexText(thisIndex.index);
      setValueText(thisIndex.value);
      setMarginText(thisIndex.margin);
    }
    setOpen(!open);
  };
  const handlePopUpClose = (cancel) => {

    if (cancel) {
      _.remove(indexChoice, (s) => {
        return s === indexText;
      });
      setIndexChoice(indexChoice);
    }

    setIndexText("");
    setValueText("");
    setMarginText("10");

    setOpen(!open);
    setIndexEdit(false)
  };

  const loadEditState = () => {
    if (edit) {
      setNameText(currentSearch.name);
      setSectorText(currentSearch.sector);
      setIndustryText(currentSearch.industry);
      setIndexList(currentSearch.searchIndex);
      setIsEdit(edit);
      setThisSearch(currentSearch);
      if (currentSearch.searchIndex.length === indexChoice.length) {
        setIndexChoice([])
      } else {
        const choice = indexChoice
        _.remove(choice, c => {
          let remove = false
          currentSearch.searchIndex.map(({index}) => {
            if (index === c) {
              return remove = true
            } else {
              return remove = false
            }
          })
          return remove
        })
        setIndexChoice(choice)
      }
    }
  };

  const addNewIndex = () => {
    const newIndex = {
      index: indexText,
      value: valueText,
      margin: marginText,
    };

    indexList.push(newIndex);
    _.remove(indexChoice, (s) => {
      return s === indexText;
    });

    setIndexList(indexList);
    setIndexChoice(indexChoice);
    handlePopUpClose();
  };
  const validateNewIndex = () => {
    let newIndexError = false;
    let newValueError = false;
    let newMarginError = false;
    if (!indexText) {
      newIndexError = true;
    }
    if (!Number(marginText)) {
      newMarginError = true;
    }
    if (!Number(valueText)) {
      newValueError = true;
    }
    const error = newMarginError || newValueError || newIndexError;

    if (error) {
      setValueError(newValueError);
      setIndexError(newIndexError);
      setMarginError(newMarginError);
    } else {
      if (indexEdit) {
        editIndex()
      } else {
        addNewIndex();
      }
    }
  };
  const createNewSearch = () => {
    const indexes = indexList.map((index) => {
      const thisIndex = index.index;
      const value = index.value;
      let margin = null;
      if (index.margin) {
        margin = index.margin;
      }
      let stringIndex = thisIndex + " " + value;
      if (margin) {
        stringIndex += " " + margin;
      }
      return stringIndex;
    });
    const searchIndex = indexes.toString();

    const newSearch = {
      name: nameText,
      sector: sectorText,
      industry: industryText,
      searchIndex,
    };

    if (isEdit) {
      editSearch(thisSearch, newSearch, navigate);
    } else {
      postSearch(newSearch, navigate);
    }
  };
  const validateSearch = () => {
    let newNameError = false;
    let newSectorError = false;
    let newIndustryError = false;

    if (!nameText) {
      newNameError = true;
    }
    if (!sectorText) {
      newSectorError = true;
    }
    if (!industryText) {
      newIndustryError = true;
    }

    const error = newNameError || newSectorError || newIndustryError;
    if (error) {
      setNameError(newNameError);
      setSectorError(newSectorError);
      setIndustryError(newIndustryError);
    } else {
      createNewSearch()
    }
  };

  const editIndex = () => {
    const edited = indexList.map((index) => {
      if (index.index === toEdit.index) {
        return {index: indexText, value: valueText, margin:marginText}
      }
      return index
    })

    _.remove(indexChoice, (s) => {
      return s === indexText;
    });
    setIndexList(edited)
    setIndexChoice(indexChoice);
    handlePopUpClose();
  };
  const deleteIndex = () => {
    _.remove(indexList, i => {
      return i.index === toEdit.index
    })
    setIndexList(indexList)
    handlePopUpClose();
  };

  useEffect(() => {
    loadEditState();
  });

  const renderInputs = () => {
    return (
        <div className={classes.inputContainer}>
          <TextField
              label={"Name"}
              id={"outlined-search"}
              helperText={
                nameError ? "You must provide a name!" : "Give your search a name"
              }
              required
              value={nameText}
              onChange={handleChangeNameText}
              error={nameError}
              className={classes.indexInput}
              inputProps={{style: {fontSize: 40}}}
          />
          <TextField
              id="outlined-search"
              select
              label="Sector"
              value={sectorText}
              onChange={handleChangeSectorText}
              helperText={
                sectorError
                    ? "You must provide a sector!"
                    : "Please select the sector"
              }
              required
              error={sectorError}
              className={classes.indexInput}
          >
            {sectorChoice.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
            ))}
          </TextField>
          <TextField
              id="outlined-select-currency"
              select
              label="Industry"
              value={industryText}
              onChange={handleChangeIndustryText}
              helperText={
                industryError
                    ? "You must provide a industry!"
                    : "Please select the industry"
              }
              required
              error={industryError}
              className={classes.indexInput}
          >
            {industryChoice[sectorText].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
            ))}
          </TextField>
        </div>
    );
  };
  const renderSearchIndexes = () => {
    return (
        <div style={{ width: "80%" }}>
          <Grid container justifyContent={"center"}>
            {indexList.map((index) => {
              return (
                  <div key={index.index} onClick={() => {
                    handlePopUpOpen(index)
                  }}>
                    <Grid item style={{ margin: 10 }}>
                    <IndexDisplay item={index} />
                  </Grid>
                  </div>
              );
            })}
          </Grid>
        </div>
    );
  };
  const renderAddIndexButton = () => {
    return (
        <Button
            className={classes.addIndexButton}
            endIcon={<Add style={{ fontSize: 25 }} />}
            onClick={() => {
              handlePopUpOpen(null);
            }}
        >
          Add index
        </Button>
    );
  };
  const renderEndButtons = () => {
    return (
        <div className={classes.endButtonContainer}>
          <Button
              className={classes.submitButton}
              onClick={() => {
                validateSearch();
              }}
          >
            {edit ? "Update Screener" : "Create Screener"}
          </Button>
          <Link to={"/dash"} style={{ textDecoration: "none" }}>
            <Button className={classes.cancelButton}>Cancel</Button>
          </Link>
        </div>
    );
  };
  const renderPopUp = () => {
    if (open) {
      return (
          <div id="overlay" className={classes.popupRoot}>
            <div className={classes.popupContainer}>
              <TextField
                  id="outlined-select-currency"
                  select
                  label="Index"
                  value={indexText}
                  onChange={handleChangeIndexText}
                  helperText={
                    indexError ? "You must provide a index" : "What index?"
                  }
                  variant="outlined"
                  required
                  error={indexError}
                  className={classes.popupInput}
              >
                {indexChoice.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.toUpperCase()}
                    </MenuItem>
                ))}
              </TextField>
              <TextField
                  label={"Value"}
                  id={"outlined-search"}
                  helperText={
                    valueError ? "Invalid value!" : "Give your search a name"
                  }
                  required
                  value={valueText}
                  onChange={handleChangeValueText}
                  variant="outlined"
                  autoComplete={"none"}
                  error={valueError}
                  type={"number"}
                  className={classes.popupInput}
              />
              <TextField
                  label={"Error Margin"}
                  id={"outlined-search"}
                  helperText={
                    marginError
                        ? "Invalid Margin!"
                        : "This is the margin of error relative to the value."
                  }
                  required
                  value={marginText}
                  onChange={handleChangeMarginText}
                  variant="outlined"
                  autoComplete={"none"}
                  error={marginError}
                  type={"number"}
                  className={classes.popupInput}
              />
              <Button className={classes.popupAdd} onClick={validateNewIndex}>
                {indexEdit ? "Edit" : "Add"}
              </Button>
              <Button className={classes.popupClose} onClick={() => handlePopUpClose(true)}>
                cancel
              </Button>
              {indexEdit ? <Button onClick={deleteIndex}>Delete</Button> : <div/>}
            </div>
          </div>
      );
    }
  };
  const render = () => {
    return (
        <div className={classes.root}>
          {renderInputs()}
          {renderSearchIndexes()}
          {renderAddIndexButton()}
          {renderEndButtons()}
          {renderPopUp()}
        </div>
    );
  };

  return render();
}

const styles = () => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  endButtonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  submitButton: {
    height: 40,
    width: 250,
    textTransform: "none",
    backgroundColor: colors.secondary,
    color: colors.white,
    fontSize: 17,
    borderRadius: 8,
    marginTop: 25,
  },
  cancelButton: {
    height: 30,
    width: 200,
    textTransform: "none",
    border: "2px solid",
    borderColor: colors.red,
    borderRadius: 6,
    color: colors.red,
    fontSize: 15,
    marginTop: 15,
  },
  addIndexButton: {
    width: "80%",
    height: 50,
    border: "2px dashed",
    borderRadius: 10,
    borderColor: colors.secondary,
    textTransform: "none",
    justifyContent: "start",
    color: colors.secondary,
    fontSize: 20,
    marginTop: 10,
  },
  inputContainer: {
    justifyContent: "start",
    width: "80%",
    display: "flex",
    flexDirection: "column",
  },
  indexInput: {
    marginTop: 20,
  },
  popupRoot: {
    display: "flex",
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.overlayBlack,
  },
  popupContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    border: "2px solid",
    borderColor: colors.main,
    borderRadius: "5%",
  },
  popupInput: {
    width: 250,
    color: colors.main,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  popupAdd: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    color: colors.white,
    width: 200,
    height: 50,
    borderRadius: 5,
    textTransform: "none",
  },
  popupClose: {
    marginTop: 10,
    marginBottom: 20,
    border: "2px solid",
    borderColor: colors.red,
    color: colors.red,
    width: 150,
    height: 35,
    borderRadius: 3.5,
    textTransform: "none",
  },
});

function mapStateToProps({ auth, currentSearch }) {
  return { auth, currentSearch };
}
export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, actions)
)(NewSearch);
