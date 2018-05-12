import {FETCH_HOTELS,FETCH_HOTELS_FAILED} from "../constants";

export const initialState = {
    hotels: []
};

export function hotel(state = initialState, action) {
    switch (action.type) {
        case FETCH_HOTELS:
            return action.payload
        case FETCH_HOTELS_FAILED:
            return action.payload
        default:
            return state;
    }
}
