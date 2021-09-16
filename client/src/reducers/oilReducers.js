import {
    OIL_GET,
    OIL_ADD,
    OIL_UPDATE,
    OIL_DELETE,
} from "../actions/types";

const initialState = {
    // isAuthenticated: false,
    oil: [],  
    // loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case OIL_GET:
            return {
                oil: action.payload.data
            };
        case OIL_ADD:
            return {
                oil: [action.payload.data, ...state.oil]
            };
        case OIL_UPDATE:
            let updatedoilindex = state.oil.findIndex( item => item.id == action.payload.data.id);
            state.oil[updatedoilindex] = action.payload.data;
            return {
                oil: state.oil
            };
        case OIL_DELETE:
            let deletedoilindex = state.oil.findIndex( item => item.id == action.payload.data.id);
            state.oil.splice(deletedoilindex, 1);
            return {
                oil: state.oil
            };

        default:
            return state;
    }
}