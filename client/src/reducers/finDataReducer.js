import {FETCH_FINANCIALS} from "../actions/types";

export default function finDataReducer(state = null, action) {
    // console.log("REDUCERS", action.payload)
    switch (action.type) {
        case FETCH_FINANCIALS:
            return action.payload || false;
        default:
            return state;
    }
}
