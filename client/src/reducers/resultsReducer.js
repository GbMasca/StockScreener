import {FETCH_RESULTS} from "../actions/types";

export default function resultsReducer(state = null, action) {
    switch (action.type) {
        case FETCH_RESULTS:
            return action.payload || false;
        default:
            return state;
    }
}
