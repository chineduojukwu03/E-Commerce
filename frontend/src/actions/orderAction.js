import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL
} from '../constants/orderConstants'

export const createOrder = (order) => (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo, token}`,
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.message.data ?
                error.response.message.data : error.message
        })

    }
}

export const orderDetails = (id) => (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                authorization: `Bearer${userInfo, token}`
            }
        }
        const { data } = await axios.get(`/api/order/${id}`, config)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.message.data ?
                error.response.message.data : error.message
        })

    }
}

export const orderPayment = (orderId, paymentResult) = async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'applications/json',
                authorization: `Bearer ${userInfo, token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${orderId}/pay `, paymentResult, config)
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.message.data ?
                error.response.message.data : error.message
        })

    }
}

export const listOrders = () => (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                authorization: `Bearer${userInfo, token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myorder`, config)
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })
    } catch (eror) {

        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.message.data ?
                error.response.message.data : error.message
        })

    }

}

