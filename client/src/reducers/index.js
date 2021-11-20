import { combineReducers } from "redux";
import authReducer from "./authReducer";
import finDataReducer from "./finDataReducer";
import currentSearchReducer from "./currentSearchReducer";
import resultsReducer from "./resultsReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
  auth: authReducer,
  financials: finDataReducer,
  currentSearch: currentSearchReducer,
  searchResults: resultsReducer,
  searches: searchReducer,
});
