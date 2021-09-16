import {
    CAR_GET,
    CAR_ADD,
    CAR_DELETE,
    CAR_UPDATE,
    CAR_MODEL_ADD,
    CAR_MODEL_UPDATE,
    CAR_MODEL_DELETE,
    CAR_YEAR_ADD,
    CAR_YEAR_UPDATE,
    CAR_YEAR_DELETE,
    CAR_CYLINDER_ADD,
    CAR_CYLINDER_UPDATE,
    CAR_CYLINDER_DELETE
} from "../actions/types";

const initialState = {
    // isAuthenticated: false,
    car: {},
    // loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CAR_GET:
            return {
                car: action.payload
            };
        case CAR_ADD:
            return {
                car: action.payload
            };
        case CAR_UPDATE:
            return {
                car: action.payload
            };
        case CAR_DELETE:
            return {
                car: action.payload
            };
        case CAR_MODEL_ADD: 
            return {
                car: action.payload
            };
        case CAR_MODEL_UPDATE: 
        return {
            car: action.payload
        };
        case CAR_MODEL_DELETE: 
        return {
            car: action.payload
        };
        case CAR_YEAR_ADD: 
            return {
                car: action.payload
            };
        case CAR_YEAR_UPDATE: 
        return {
            car: action.payload
        };
        case CAR_YEAR_DELETE: 
        return {
            car: action.payload
        };
        case CAR_CYLINDER_ADD: 
            return {
                car: action.payload
            };
        case CAR_CYLINDER_UPDATE: 
        return {
            car: action.payload
        };
        case CAR_CYLINDER_DELETE: 
        return {
            car: action.payload
        };

        default:
            return state;
    }
}