import axios from 'axios'
import {
    FETCH_HOTELS,FETCH_HOTELS_FAILED
} from '../constants'


export function fetchHotels() {
    return function (dispatch) {
        axios.get(`/api/fetch-hotels`)
            .then((response => {
                dispatch({
                    type: FETCH_HOTELS,
                    payload: {
                       hotels: response.data.apiGetHotelsResult.Hotels.apiHotelInfo
                    }
                });
            }))
            .catch((error) => dispatch({
                type: FETCH_HOTELS_FAILED,
                payload: error
            }))
    }
}