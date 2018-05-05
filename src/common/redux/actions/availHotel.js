import axios from 'axios'
import {
    HOTEL_SEARCH,
    HOTEL_SEARCH_FORM,
    HOTEL_SEARCH_FAILED,
    HOTEL_SEARCH_FORM_COMPLETE,
    HOTEL_SEARCH_FORM_FAILED,
    SET_LOADING
} from '../constants'
import {initialState} from '../reducers/availHotel'

export function availHotels(startDate, endDate, adultNum, childNum, location) {
    return function (dispatch) {
        dispatch({
            type: SET_LOADING,
            payload: {availHotel: [], loading: initialState.loading = true}
        })
        axios.get(`/api/search-results?startDate=${startDate}&endDate=${endDate}&adultNum=${adultNum}&childNum=${childNum}&location=${location}`)
            .then((response => {
                dispatch({
                    type: HOTEL_SEARCH,
                    payload: {
                        availHotel: response.data.apiGetHotelSearchResultsResult.Hotels.apiHotelInfo,
                        loading: initialState.loading = false
                    }
                });
            }))
            .catch((error) => dispatch({
                type: HOTEL_SEARCH_FAILED,
                payload: error
            }))
    }
}

export function availHotelsForm(childBirth, endDate, location, adultNum, childNum, startDate) {
    return function (dispatch) {
        dispatch({
            type: SET_LOADING,
            payload: {availHotel: [], loading: initialState.loading = true, redirect: initialState.redirect = false}
        })
        let url = `/api/search-results?${childBirth}endDate=${endDate}&location=${location}&adultNum=${adultNum}&childNum=${childNum}&startDate=${startDate}`
        let urlClear = url.replace(",", "")

        axios.get(urlClear)
            .then((response => {
                if(response.data.apiGetHotelSearchResultsResult.Hotels !== null) {
                    dispatch({
                        type: HOTEL_SEARCH_FORM,
                        payload: {
                            availHotel: response.data.apiGetHotelSearchResultsResult.Hotels.apiHotelInfo,
                            loading: initialState.loading = false,
                            redirect: initialState.redirect = true
                        }
                    });
                } else {
                    dispatch({
                        type: HOTEL_SEARCH_FORM,
                        payload: {
                            availHotel: null,
                            loading: initialState.loading = false,
                            redirect: initialState.redirect = true
                        }
                    });
                }

            }))

            .catch((error) => dispatch({
                type: HOTEL_SEARCH_FORM_FAILED,
                payload: error
            }))
    }
}

export function restoreRedirect() {
    return  {

            type: HOTEL_SEARCH_FORM_COMPLETE,

    }
}
