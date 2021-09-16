import {
    SERVICE_GET,
    SERVICE_ADD,
    SERVICE_UPDATE,
    SERVICE_DELETE,
    SERVICE_DATA_ADD,
    SERVICE_DATA_UPDATE,
    SERVICE_DATA_DELETE,
    SERVICE_SUBDATA_ADD,
    SERVICE_SUBDATA_UPDATE,
    SERVICE_SUBDATA_DELETE,
    SERVICE_SERVICELIST_ADD,
    SERVICE_SERVICELIST_UPDATE,
    SERVICE_SERVICELIST_DELETE
} from "../actions/types";

const initialState = {
    // isAuthenticated: false,
    services: {},
    // loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SERVICE_GET:
            return {
                services: action.payload
            };
        case SERVICE_ADD:
            return {
                services: action.payload
            };
        case SERVICE_UPDATE:
            return {
                services: action.payload
            };
        case SERVICE_DELETE:
            return {
                services: action.payload
            };
        case SERVICE_DATA_ADD:
            return {
                services: action.payload
            };
        case SERVICE_DATA_UPDATE:
            return {
                services: action.payload
            };
        case SERVICE_DATA_DELETE:
            return {
                services: action.payload
            };
        case SERVICE_SUBDATA_ADD:
        return {
            services: action.payload
            };
        case SERVICE_SUBDATA_UPDATE:
            return {
                services: action.payload
            };
        case SERVICE_SUBDATA_DELETE:
            return {
                services: action.payload
            };
        case SERVICE_SERVICELIST_ADD:
            return {
                services: action.payload
                };
        case SERVICE_SERVICELIST_UPDATE:
            return {
                services: action.payload
            };
        case SERVICE_SERVICELIST_DELETE:
            return {
                services: action.payload
            };

        default:
            return state;
    }
}

