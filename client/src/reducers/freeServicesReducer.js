import {
    GET_ERRORS,
    GET_FREESERVICES,
    ADD_FREESERVICES,
    DELETE_FREESERVICES,
    UPDATE_FREESERVICES,
} from "../actions/types";

const initialState = {
    // isAuthenticated: false,
    freeServices: {},
    // loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FREESERVICES:
            return {
                freeServices: action.payload
            };
        case ADD_FREESERVICES:
            return {
                freeServices: action.payload
            };
        case DELETE_FREESERVICES:
            return {
                freeServices: action.payload
            };
        case UPDATE_FREESERVICES:
            return {
                freeServices: action.payload
            };
        default:
            return state;
    }
}