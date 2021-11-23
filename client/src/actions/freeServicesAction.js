import axios from "axios";
import {
    GET_ERRORS,
    GET_FREESERVICES,
    ADD_FREESERVICES,
    DELETE_FREESERVICES,
    UPDATE_FREESERVICES,
} from "./types";

export const getFreeServices = () => dispatch => {
    axios
        .post("/api/freeServices/get")
        .then(res =>{
            dispatch({
                type: GET_FREESERVICES,
                payload: res.data,
            })}
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const addFreeServices = (data) => dispatch => {
    axios
        .post("/api/freeServices/add", data)
        .then(res =>
            dispatch({
                type: ADD_FREESERVICES,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

//
// export const updateCar = (data) => dispatch => {
//
//     axios
//         .post("/api/car/update", data)
//         .then(res =>
//             dispatch({
//                 type: CAR_UPDATE,
//                 payload: res,
//             })
//         ).catch(err =>
//         dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         })
//     );
// };
//
// export const deleteCar = (data) => dispatch => {
//     // console.log("car-delete-action", data);
//     axios
//         .post("/api/car/delete", data)
//         .then(res =>
//             dispatch({
//                 type:CAR_DELETE,
//                 payload: res,
//             })
//         ).catch(err =>
//         dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         })
//     );
// };

