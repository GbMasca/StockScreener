import {FETCH_SEARCH} from "../actions/types";

export default function currentSearchReducer(state = null, action) {
    switch (action.type) {
        case FETCH_SEARCH:
            return action.payload || false;
        default:
            return state;
    }
}
