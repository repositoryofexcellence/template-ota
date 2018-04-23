import {INC_ADULT_NUM, DEC_ADULT_NUM, LOAD_SUGGESTIONS_BEGIN} from "../constants";

const initialState = {
    adultNum: 2
};

export function adultNum(state = initialState, action) {
    switch (action.type) {
        case INC_ADULT_NUM:
            return {
                ...state,
                adultNum: state.adultNum + 1
            }
        case DEC_ADULT_NUM:
            return {
                ...state,
                adultNum: state.adultNum - 1
            }
        default:
            return state;
    }
}
