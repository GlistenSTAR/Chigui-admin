import axios from "axios";
import {
    GET_ERRORS,
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
    SERVICE_SERVICELIST_DELETE,
} from "./types";

export const addServices = (data) => dispatch => {
    axios
        .post("/api/services/add", data)
        .then(res =>
            dispatch({
                type: SERVICE_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateServices = (data) => dispatch => {
    console.log("service-update-action", data);
    axios
        .post("/api/services/update", data)
        .then(res =>
            dispatch({
                type: SERVICE_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteServices = (data) => dispatch => {
    console.log("servcie-delete-action", data);
    axios
        .post("/api/services/delete", data)
        .then(res => 
            dispatch({
                type:SERVICE_DELETE,
                payload: res,   
            })
        ).catch(err =>
           dispatch({
            type: GET_ERRORS,
            payload: err.response.data
           })
           );
};

export const addData = (data) => dispatch => {
    console.log("service-data-add-action", data)
    axios
        .post("/api/services/data/add", data)
        .then(res =>
            dispatch({
                type: SERVICE_DATA_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateData = (data) => dispatch => {
    console.log("service-data-update-action", data);
    axios
        .post("/api/services/data/update", data)
        .then(res =>
            dispatch({
                type: SERVICE_DATA_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteData = (data) => dispatch => {
    console.log("servcie-data-delete-action", data);
    axios
        .post("/api/services/data/delete", data)
        .then(res => 
            dispatch({
                type:SERVICE_DATA_DELETE,
                payload: res,   
            })
        ).catch(err =>
           dispatch({
            type: GET_ERRORS,
            payload: err.response.data
           })
           );
};

export const addSubdata = (data) => dispatch => {
    console.log("service-subdata-add-action", data)
    axios
        .post("/api/services/subdata/add", data)
        .then(res =>
            dispatch({
                type: SERVICE_SUBDATA_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateSubdata = (data) => dispatch => {
    console.log("service-subdata-update-action", data);
    axios
        .post("/api/services/subdata/update", data)
        .then(res =>
            dispatch({
                type: SERVICE_SUBDATA_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteSubdata = (data) => dispatch => {
    console.log("servcie-subdata-delete-action", data);
    axios
        .post("/api/services/subdata/delete", data)
        .then(res => 
            dispatch({
                type:SERVICE_SUBDATA_DELETE,
                payload: res,   
            })
        ).catch(err =>
           dispatch({
            type: GET_ERRORS,
            payload: err.response.data
           })
           );
};

export const addServiceList = (data) => dispatch => {
    console.log("service-servicelist-add-action", data)
    axios
        .post("/api/services/servicelist/add", data)
        .then(res =>
            dispatch({
                type: SERVICE_SERVICELIST_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateServiceList = (data) => dispatch => {
    console.log("service-servicelist-update-action", data);
    axios
        .post("/api/services/servicelist/update", data)
        .then(res =>
            dispatch({
                type: SERVICE_SERVICELIST_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteServiceList = (data) => dispatch => {
    console.log("servcie-servicelist-delete-action", data);
    axios
        .post("/api/services/servicelist/delete", data)
        .then(res => 
            dispatch({
                type:SERVICE_SERVICELIST_DELETE,
                payload: res,   
            })
        ).catch(err =>
           dispatch({
            type: GET_ERRORS,
            payload: err.response.data
           })
           );
};

