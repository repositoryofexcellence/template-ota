import {HOTEL_SEARCH,HOTEL_SEARCH_FORM,SET_LOADING,HOTEL_SEARCH_FORM_COMPLETE} from "../constants";

export const initialState = {
    availHotel:[],
    loading:false,
    redirect:false,
}

export function availHotel(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return action.payload
        case HOTEL_SEARCH:
            return action.payload
        case HOTEL_SEARCH_FORM:
            return action.payload
        case HOTEL_SEARCH_FORM_COMPLETE:
            return {
                ...state,
                redirect: state.redirect = false
            }
        default:
            return state;
    }
}
