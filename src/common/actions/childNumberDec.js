import {
    HOME_DEC_CHILD_NUM,
} from '../redux/constants/index';

export function decChildNum() {
    return {
        type: HOME_DEC_CHILD_NUM,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case HOME_DEC_CHILD_NUM:
            return {
                ...state,
                childNum : state.childNum - 1,
                childNumCont: [
                ...state.childNumCont.slice(0, 0),
                ...state.childNumCont.slice(0 + 1)]
            };

        default:
            return state;
    }
}
