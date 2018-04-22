import {HOTEL_SEARCH,HOTEL_SEARCH_FORM} from "../constants";

const initialState = {
    availHotel:[]
}

export function availHotel(state = initialState, action) {
    switch (action.type) {
        case HOTEL_SEARCH_FORM:
            return action.payload
        case HOTEL_SEARCH:
            return action.payload
        default:
            return state;
    }
}
