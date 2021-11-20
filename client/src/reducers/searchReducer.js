import {FETCH_USER_SEARCHES} from "../actions/types";

export default function searchReducer(state = null, action) {

    switch (action.type) {
        case FETCH_USER_SEARCHES:
            return action.payload || false;
        default:
            return state;
    }
}
