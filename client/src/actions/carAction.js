import axios from "axios";
import {
    GET_ERRORS,
    CAR_GET,
    CAR_ADD,
    CAR_UPDATE,
    CAR_DELETE,
    CAR_MODEL_ADD,
    CAR_MODEL_UPDATE,
    CAR_MODEL_DELETE,
    CAR_YEAR_ADD,
    CAR_YEAR_DELETE,
    CAR_YEAR_UPDATE,
    CAR_CYLINDER_ADD,
    CAR_CYLINDER_UPDATE,
    CAR_CYLINDER_DELETE
} from "./types";

export const getCar = () => dispatch => {
    axios
        .post("http://localhost:5000/api/car/gets")
        .then(res =>
            dispatch({
                type: CAR_GET,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const addCar = (data) => dispatch => {
    console.log("car-add-action", data);
    axios
        .post("/api/car/add", data)
        .then(res =>
            dispatch({
                type: CAR_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateCar = (data) => dispatch => {
    
    axios
        .post("/api/car/update", data)
        .then(res =>
            dispatch({
                type: CAR_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteCar = (data) => dispatch => {
    // console.log("car-delete-action", data);
    axios
        .post("/api/car/delete", data)
        .then(res => 
            dispatch({
                type:CAR_DELETE,
                payload: res,   
            })
        ).catch(err =>
           dispatch({
            type: GET_ERRORS,
            payload: err.response.data
           })
           );
};

export const addModel = (data) => dispatch => {
    axios
        .post("/api/car/model/add", data)
        .then(res =>
            dispatch({
                type: CAR_MODEL_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateModel = (data) => dispatch => {
    console.log("model-update-action", data)
    axios
        .post("/api/car/model/update", data)
        .then(res =>
            dispatch({
                type: CAR_MODEL_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteModel = (data) => dispatch => {
    console.log("model-delete-action", data)
    axios
        .post("/api/car/model/delete", data)
        .then(res =>
            dispatch({
                type: CAR_MODEL_DELETE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const addYear = (data) => dispatch => {
    console.log("Year-add-action", data)
    axios
        .post("/api/car/year/add", data)
        .then(res =>
            dispatch({
                type: CAR_YEAR_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateYear = (data) => dispatch => {
    console.log("year-update-action", data)
    axios
        .post("/api/car/year/update", data)
        .then(res =>
            dispatch({
                type: CAR_YEAR_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteYear = (data) => dispatch => {
    console.log("year-delete-action", data)
    axios
        .post("/api/car/year/delete", data)
        .then(res =>
            dispatch({
                type: CAR_YEAR_DELETE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const addCylinder = (data) => dispatch => {
    console.log("Cylinder-add-action", data)
    axios
        .post("/api/car/cylinder/add", data)
        .then(res =>
            dispatch({
                type: CAR_CYLINDER_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateCylinder = (data) => dispatch => {
    console.log("Cylinder-update-action", data)
    axios
        .post("/api/car/cylinder/update", data)
        .then(res =>
            dispatch({
                type: CAR_CYLINDER_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteCylinder = (data) => dispatch => {
    console.log("Cylinder-delete-action", data)
    axios
        .post("/api/car/cylinder/delete", data)
        .then(res =>
            dispatch({
                type: CAR_CYLINDER_DELETE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

