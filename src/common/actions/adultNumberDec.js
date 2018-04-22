import {
    HOME_DEC_ADULT_NUM,
} from '../redux/constants/index';

export function decAdultNum() {
    return {
        type: HOME_DEC_ADULT_NUM,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case HOME_DEC_ADULT_NUM:
            return {
                ...state,
                adultNum : state.adultNum - 1
            };

        default:
            return state;
    }
}
