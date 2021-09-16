import {
    HIGHLIGHT_GET,
    HIGHLIGHT_ADD,
    HIGHLIGHT_UPDATE,
    HIGHLIGHT_DELETE,
    HIGHLIGHT_DETAIL_ADD,
    HIGHLIGHT_DETAIL_UPDATE,
    HIGHLIGHT_DETAIL_DELETE,
} from "../actions/types";

const initialState = {
    // isAuthenticated: false,
    highlight: {},
    // loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case HIGHLIGHT_GET:
            return {
                highlight: action.payload
            };
        case HIGHLIGHT_ADD:
            return {
                highlight: action.payload
            };
        case HIGHLIGHT_UPDATE:
            return {
                highlight: action.payload
            };
        case HIGHLIGHT_DELETE:
            return {
                highlight: action.payload
            };
        case HIGHLIGHT_DETAIL_ADD:
            return {
                highlight: action.payload
            };
        case HIGHLIGHT_DETAIL_UPDATE:
            return {
                highlight: action.payload
            };
        case HIGHLIGHT_DETAIL_DELETE:
            return {
                highlight: action.payload
            };

        default:
            return state;
    }
}