

import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL, CLEAR_ERRORS, ALL_DETAILS_REQUEST, ALL_DETAILS_SUCCESS, ALL_DETAILS_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_FAIL, NEW_PRODUCT_SUCCESS
} from "../constants/productConstants";

import * as api from '../api';




export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await api.createProducts(productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Create Product
// export const createProduct = (productData) => async (dispatch) => {
//     try {
//         dispatch({ type: NEW_PRODUCT_REQUEST });

//         const config = {
//             headers: { "Content-Type": "application/json" },
//         };

//         const { data } = await api.createProducts(productData, config);

//         dispatch({
//             type: NEW_PRODUCT_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: NEW_PRODUCT_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };


export const getProduct = (keyword = "", currentPage = 1) => async (dispatch) => {

    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        const { data } = await api.fetchProduct(keyword, currentPage);

        dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data, });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: ALL_DETAILS_REQUEST });

        const { data } = await api.getProductdetails(id);

        dispatch({
            type: ALL_DETAILS_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: ALL_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}




/// clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
