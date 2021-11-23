import {
    QUOTE_GET,
    QUOTE_ADD,
    QUOTE_DELETE,
    QUOTE_UPDATE,
    QUOTE_EDIT,
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
                quote: action.payload
            };
        case QUOTE_ADD:
            return {
                quote: action.payload
            };
        case QUOTE_UPDATE:
            return {
                quote: action.payload
            };
        case QUOTE_DELETE:
            return {
                quote: action.payload
            };
        case QUOTE_EDIT:
            return {
                quote: action.payload
            };
        default:
            return state;
    }
}