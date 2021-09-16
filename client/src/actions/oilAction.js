import axios from "axios";
import {
    GET_ERRORS,
    OIL_GET,
    OIL_ADD,
    OIL_UPDATE,
    OIL_DELETE,
} from "./types";

export const getOil = () => dispatch => {
    axios
        .post("/api/oil/get")
        .then(res =>
            dispatch({
                type: OIL_GET,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const addOil = (oildata) => dispatch => {
    axios
        .post("/api/oil/add", oildata)
        .then(res =>
            dispatch({
                type: OIL_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}; 

export const updateOil = (oildata) => dispatch => {
    axios
        .post("/api/oil/update", oildata)
        .then(res =>
            dispatch({
                type: OIL_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteOil = (oildata) => dispatch => {
    axios
        .post("/api/oil/delete", oildata)
        .then(res => 
            dispatch({
                type:OIL_DELETE,
                payload: res,   
            })
        ).catch(err =>
           dispatch({
            type: GET_ERRORS,
            payload: err.response.data
           })
           );
};