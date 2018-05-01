import {HOTEL_SEARCH,HOTEL_SEARCH_FORM,SET_LOADING} from "../constants";

export const initialState = {
    availHotel:[],
    loading:false
}

export function availHotel(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return action.payload
        case HOTEL_SEARCH:
            return action.payload
        case HOTEL_SEARCH_FORM:
            return action.payload
        default:
            return state;
    }
}
