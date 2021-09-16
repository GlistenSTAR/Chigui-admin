import axios from "axios";
import {
    GET_ERRORS,
    REVIEW_GET,
    REVIEW_ADD,
    REVIEW_UPDATE,
    REVIEW_DELETE,
    REVIEW_DETAIL_ADD,
    REVIEW_DETAIL_UPDATE,
    REVIEW_DETAIL_DELETE,
} from "./types";

export const getReview = () => dispatch => {
    axios
        .post("/api/review/get")
        .then(res =>
            dispatch({
                type: REVIEW_GET,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const addReview = (reviewdata) => dispatch => {
    
    axios
        .post("/api/review/add", reviewdata)
        .then(res =>
            dispatch({
                type: REVIEW_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateReview = (userData) => dispatch => {
    
    axios
        .post("/api/review/update", userData)
        .then(res =>
            {console.log("action", res);
                dispatch({
                type: REVIEW_UPDATE,
                payload: res,
            });
        }
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteReview = (userData) => dispatch => {
    console.log("review-delete-action");
    axios
        .post("/api/review/delete", userData)
        .then(res => 
            dispatch({
                type:REVIEW_DELETE,
                payload: res,   
            })
        ).catch(err =>
           dispatch({
            type: GET_ERRORS,
            payload: err.response.data
           })
           );
};

export const addDetailData = (detaildata) => dispatch => {
    console.log("detaildata", detaildata);   
    axios
        .post("/api/review/detaildata/add", detaildata)
        .then(res =>
            dispatch({
                type: REVIEW_DETAIL_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
export const updateDetailData = (detaildata) => dispatch => {  
    axios
        .post("/api/review/detaildata/update", detaildata)
        .then(res =>
            dispatch({
                type: REVIEW_DETAIL_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
export const deleteDetailData = (detaildata) => dispatch => { 
    axios
        .post("/api/review/detaildata/delete", detaildata)
        .then(res =>
            dispatch({
                type: REVIEW_DETAIL_DELETE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};