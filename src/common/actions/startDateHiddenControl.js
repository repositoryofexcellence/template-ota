import {
    HOME_ASUG_HIDDEN_CONT,
} from '../redux/constants/index';

export function asugHiddenCont() {
    return {
        type: HOME_ASUG_HIDDEN_CONT,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case HOME_ASUG_HIDDEN_CONT:
            return {
                ...state,
                autoSuggestHidden : !state.autoSuggestHidden
            };

        default:
            return state;
    }
}
