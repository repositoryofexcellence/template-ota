import {
    HOME_INC_CHILD_NUM,
} from '../redux/constants/index';

export function incChildNum() {
    return {
        type: HOME_INC_CHILD_NUM,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case HOME_INC_CHILD_NUM:
            return {
                ...state,
                childNum : state.childNum + 1,
                childNumCont:[...state.childNumCont, state.childAgeExample ]
            };

        default:
            return state;
    }
}
