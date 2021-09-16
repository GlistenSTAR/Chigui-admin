import {
    ELECTRONIC_GET,
    ELECTRONIC_ADD,
    ELECTRONIC_UPDATE,
    ELECTRONIC_DELETE,
} from "../actions/types";

const initialState = {
    // isAuthenticated: false,
    electronic: [],
    // loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ELECTRONIC_GET:
            return {
                electronic: action.payload.data
            };
        case ELECTRONIC_ADD:
            return {
                electronic: [action.payload.data, ...state.electronic]
            };
        case ELECTRONIC_UPDATE:
            let updatedelectonicindex = state.electronic.findIndex( item => item.id == action.payload.data.id);
            state.electronic[updatedelectonicindex] = action.payload.data;
            return {
                electronic: state.electronic
            };
        case ELECTRONIC_DELETE:
            let deletedelectronicindex = state.electronic.findIndex( item => item.id == action.payload.data.id);
            state.electronic.splice(deletedelectronicindex, 1);
            return {
                electronic: state.electronic
            };

        default:
            return state;
    }
}

