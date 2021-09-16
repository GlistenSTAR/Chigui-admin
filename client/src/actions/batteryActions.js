import axios from "axios";
import {
    GET_ERRORS,
    BATTERY_GET,
    BATTERY_ADD,
    BATTERY_UPDATE,
    BATTERY_DELETE,
} from "./types";

export const getBattery = () => dispatch => {
    axios
        .post("/api/battery/get")
        .then(res =>
            dispatch({
                type: BATTERY_GET,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const addBattery = (data) => dispatch => {
    axios
        .post("/api/battery/add", data)
        .then(res =>
            dispatch({
                type: BATTERY_ADD,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const updateBattery = (data) => dispatch => {
    axios
        .post("/api/battery/update", data)
        .then(res =>
            dispatch({
                type: BATTERY_UPDATE,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteBattery = (data) => dispatch => {
    axios
        .post("/api/battery/delete", data)
        .then(res =>
            dispatch({
                type: BATTERY_DELETE,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};