import axios from "axios";
import {
    GET_ERRORS,
    QUOTE_ADD,
    QUOTE_UPDATE,
    QUOTE_DELETE,
} from "./types";

export const addQuote = (data) => dispatch => {
    
    axios
        .post("/api/quote/add", data)
        .then(res =>
            dispatch({
                type: QUOTE_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateQuote = (userData) => dispatch => {
    
    axios
        .post("/api/quote/update", userData)
        .then(res =>
            dispatch({
                type: QUOTE_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteQuote = (userData) => dispatch => {
    axios
        .post("/api/quote/delete", userData)
        .then(res => 
            dispatch({
                type:QUOTE_DELETE,
                payload: res,   
            })
        ).catch(err =>
           dispatch({
            type: GET_ERRORS,
            payload: err.response.data
           })
           );
};