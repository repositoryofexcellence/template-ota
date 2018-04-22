import {
    HOME_ASUG_HIDDEN_CONT,
} from '../redux/constants/index';

export function asugHiddenCont() {
    return {
        type: HOME_ASUG_HIDDEN_CONT,
        axios.get('http://localhost:3000/flug')
        .then(function(result){
            YourAction.getAllFlights(result)
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case HOME_ASUG_HIDDEN_CONT:
            return {
                ...state,
                autoSuggestHidden : !state.autoSuggestHidden,
                dateHidden : state.dateHidden = true,
                guestsHidden: state.guestsHidden = true

            };

        default:
            return state;
    }
}
