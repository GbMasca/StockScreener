import axios from "axios";
import {
  FETCH_USER,
  FETCH_FINANCIALS,
  FETCH_SEARCH,
  FETCH_RESULTS,
  FETCH_USER_SEARCHES,
  EDIT_SEARCH,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchFinData = (tkr) => async (dispatch) => {
  const res = await axios.get("/api/get_all_financials/" + tkr);
  dispatch({ type: FETCH_FINANCIALS, payload: res.data });
};

export const postSearch = (values, navigate) => async (dispatch) => {
  const res = await axios.post("/api/new_search", values);
  navigate("/dash");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const editSearch =
  (thisSearch, values, navigate) => async (dispatch) => {
    const path = "/api/edit_search/" + thisSearch._id;
    const res = await axios.post(path, values);
    navigate("/dash");
    dispatch({ type: EDIT_SEARCH, payload: res.data });
  };

export const fetchSearch = (thisSearch) => async (dispatch) => {
  const res = await axios.get("/api/get_search/" + thisSearch);
  dispatch({ type: FETCH_SEARCH, payload: res.data });
};

export const fetchUserSearches = () => async (dispatch) => {
  const res = await axios.get("/api/get_user_searches");
  dispatch({ type: FETCH_USER_SEARCHES, payload: res.data });
};

export const fetchResults = (thisSearch) => async (dispatch) => {
  const res = await axios.get("/api/search/" + thisSearch);
  dispatch({ type: FETCH_RESULTS, payload: res.data });
};

export const updateCurrentSearch = (search) => async (dispatch) => {
  const res = await axios.post("/api/update_current_search/", search);
  dispatch({ type: FETCH_USER, payload: res.data });
};
