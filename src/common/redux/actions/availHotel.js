import axios from 'axios'
import {HOTEL_SEARCH,HOTEL_SEARCH_FORM,HOTEL_SEARCH_FAILED,HOTEL_SEARCH_FORM_FAILED} from '../constants'

export function availHotels(startDate,endDate,adultNum,childNum,location) {
    return function(dispatch) {
      axios.get(`/api/search-results?startDate=${startDate}&endDate=${endDate}&adultNum=${adultNum}&childNum=${childNum}&location=${location}`)
            .then((response => {
                dispatch({
                    type: HOTEL_SEARCH,
                    payload: response.data.apiGetHotelSearchResultsResult.Hotels.apiHotelInfo
                });
            }))
            .catch((error) => dispatch({
                type: HOTEL_SEARCH_FAILED,
                payload:error
            }))
    }
}

export function availHotelsForm(childBirth,endDate,location,adultNum,childNum,startDate) {
    return function(dispatch) {
        axios.get(`/api/search-results?${childBirth}endDate=${endDate}&location=${location}&adultNum=${adultNum}&childNum=${childNum}&startDate=${startDate}`)
            .then((response => {
                dispatch({
                    type: HOTEL_SEARCH_FORM,
                    payload: response.data.apiGetHotelSearchResultsResult.Hotels.apiHotelInfo
                });
            }))
            .catch((error) => dispatch({
                type: HOTEL_SEARCH_FORM_FAILED,
                payload:error
            }))
    }
}