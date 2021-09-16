import {
    BATTERY_ADD,
    BATTERY_DELETE,
    BATTERY_UPDATE,
    BATTERY_GET
} from "../actions/types";

const initialState = {
    // isAuthenticated: false,
    battery: [],
    // loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case BATTERY_GET:           
            return {
                battery: action.payload.data
            };
        case BATTERY_ADD:
            return {
                battery: [action.payload.data, ...state.battery]
            };
        case BATTERY_UPDATE:
            let updatedbatteryindex = state.battery.findIndex( item => item.id == action.payload.data.id);
            state.battery[updatedbatteryindex] = action.payload.data;
            return {
                battery: state.battery
            };
        case BATTERY_DELETE:
            let deletedbatteryindex = state.battery.findIndex( item => item.id == action.payload.data.id);
            state.battery.splice(deletedbatteryindex, 1);
            return {
                battery: state.battery
            };

        default:
            return state;
    }
}

