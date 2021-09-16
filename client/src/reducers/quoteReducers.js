import {
    QUOTE_GET,
    QUOTE_ADD,
    QUOTE_DELETE,
    QUOTE_UPDATE,
} from "../actions/types";

const initialState = {
    // isAuthenticated: false,
    quote: {},
    // loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case QUOTE_GET:
            return {
                highlight: action.payload
            };
        case QUOTE_ADD:
            return {
                highlight: action.payload
            };
        case QUOTE_UPDATE:
            return {
                highlight: action.payload
            };
        case QUOTE_DELETE:
            return {
                highlight: action.payload
            };
        default:
            return state;
    }
}