import axios from "axios";
import {
    GET_ERRORS,
    HIGHLIGHT_ADD,
    HIGHLIGHT_UPDATE,
    HIGHLIGHT_DELETE,
    HIGHLIGHT_DETAIL_ADD,
    HIGHLIGHT_DETAIL_UPDATE,
    HIGHLIGHT_DETAIL_DELETE,
} from "./types";

export const addHighlight = (data) => dispatch => {
    
    axios
        .post("/api/highlight/add", data)
        .then(res =>
            dispatch({
                type: HIGHLIGHT_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateHighlight = (userData) => dispatch => {
    
    axios
        .post("/api/highlight/update", userData)
        .then(res =>
            dispatch({
                type: HIGHLIGHT_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteHighlight = (userData) => dispatch => {
    axios
        .post("/api/highlight/delete", userData)
        .then(res => 
            dispatch({
                type:HIGHLIGHT_DELETE,
                payload: res,   
            })
        ).catch(err =>
           dispatch({
            type: GET_ERRORS,
            payload: err.response.data
           })
           );
};

export const addService = (data) => dispatch => {
    console.log("highlightservice-add-action", data);   
    axios
        .post("/api/highlight/service/add", data)
        .then(res =>
            dispatch({
                type: HIGHLIGHT_DETAIL_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
export const updateService = (data) => dispatch => {
    console.log("highlightservice-update-action", data);  
    axios
        .post("/api/highlight/service/update", data)
        .then(res =>
            dispatch({
                type: HIGHLIGHT_DETAIL_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
export const deleteService = (data) => dispatch => {
    console.log("highlightservice-delete-action", data); 
    axios
        .post("/api/highlight/service/delete", data)
        .then(res =>
            dispatch({
                type: HIGHLIGHT_DETAIL_DELETE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};