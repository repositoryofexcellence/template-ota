import {
    HOME_INC_ADULT_NUM,
} from '../redux/constants/index';

export function incAdultNum() {
    return {
        type: HOME_INC_ADULT_NUM,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case HOME_INC_ADULT_NUM:
            return {
                ...state,
                adultNum : state.adultNum + 1
            };

        default:
            return state;
    }
}
