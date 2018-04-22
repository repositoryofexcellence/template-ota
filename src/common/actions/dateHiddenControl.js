import {
    HOME_DATE_HIDDEN_CONT,
} from '../redux/constants/index';

export function dateHiddenCont() {
    return {
        type: HOME_DATE_HIDDEN_CONT,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case HOME_DATE_HIDDEN_CONT:
            return {
                ...state,
                dateHidden : !state.dateHidden,
                autoSuggestHidden : state.autoSuggestHidden = true,
                guestsHidden : state.guestsHidden = true
            };

        default:
            return state;
    }
}
