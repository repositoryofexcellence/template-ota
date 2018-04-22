import {
    HOME_GUEST_HIDDEN_CONT,
} from '../redux/constants/index';

export function guestHiddenCont() {
    return {
        type: HOME_GUEST_HIDDEN_CONT,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case HOME_GUEST_HIDDEN_CONT:
            return {
                ...state,
                guestsHidden : !state.guestsHidden,
                dateHidden : state.dateHidden = true,
                autoSuggestHidden : state.autoSuggestHidden = true
            };

        default:
            return state;
    }
}
