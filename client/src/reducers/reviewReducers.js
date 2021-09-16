import {
    REVIEW_GET,
    REVIEW_ADD,
    REVIEW_DELETE,
    REVIEW_UPDATE,
    REVIEW_DETAIL_ADD,
    REVIEW_DETAIL_UPDATE,
    REVIEW_DETAIL_DELETE,
} from "../actions/types";

const initialState = {
    // isAuthenticated: false,
    review: {},
    // loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case REVIEW_GET:
            return {
                review: action.payload
            };
        case REVIEW_ADD:
            return {
                review: action.payload
            };
        case REVIEW_UPDATE:
            return {
                review: action.payload
            };
        case REVIEW_DELETE:
            return {
                review: action.payload
            };
        case REVIEW_DETAIL_ADD:
            return {
                review: action.payload
            };
        case REVIEW_DETAIL_UPDATE:
            return {
                review: action.payload
            };
        case REVIEW_DETAIL_DELETE:
            return {
                review: action.payload
            };

        default:
            return state;
    }
}