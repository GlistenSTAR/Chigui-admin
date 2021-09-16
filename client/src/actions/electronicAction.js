import axios from "axios";
import {
    GET_ERRORS,
    ELECTRONIC_GET,
    ELECTRONIC_ADD,
    ELECTRONIC_UPDATE,
    ELECTRONIC_DELETE,
} from "./types";

export const getElectronic = () => dispatch => {
    axios
        .post("/api/electronic/get")
        .then(res =>
            dispatch({
                type: ELECTRONIC_GET,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const addElectronic = (data) => dispatch => {
    axios
        .post("/api/electronic/add", data)
        .then(res =>
            dispatch({
                type: ELECTRONIC_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateElectronic = (data) => dispatch => {
    axios
        .post("/api/electronic/update", data)
        .then(res =>
            dispatch({
                type: ELECTRONIC_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteElectronic = (data) => dispatch => {
    axios
        .post("/api/electronic/delete", data)
        .then(res => 
            dispatch({
                type:ELECTRONIC_DELETE,
                payload: res,   
            })
        ).catch(err =>
           dispatch({
            type: GET_ERRORS,
            payload: err.response.data
           })
           );
};