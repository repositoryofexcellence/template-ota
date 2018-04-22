import {
    UPDATE_INPUT_VALUE,
        CLEAR_SUGGESTIONS,
        MAYBE_UPDATE_SUGGESTIONS,
        LOAD_SUGGESTIONS_BEGIN
} from '../constants';
import hotelList from '../../../data/hotelsTur.json'

const language = hotelList.Hotels.map(hotel => {

    var HotelName = {name: hotel.Description}

    return (HotelName)

})
const languages = language
function randomDelay() {
    return 300 + Math.random() * 1000;
}
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getMatchingLanguages(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(language => regex.test(language.name));
}

export function loadSuggestions(value) {
    return dispatch => {
        dispatch(loadSuggestionsBegin());

        // Fake an AJAX call
        setTimeout(() => {
            dispatch(maybeUpdateSuggestions(getMatchingLanguages(value), value));
        }, randomDelay());
    };
}

export function updateInputValue(value) {
    return {
        type: UPDATE_INPUT_VALUE,
        value
    };
}

export function clearSuggestions() {
    return {
        type: CLEAR_SUGGESTIONS
    };
}

export function loadSuggestionsBegin() {
    return {
        type: LOAD_SUGGESTIONS_BEGIN
    };
}

export function maybeUpdateSuggestions(suggestions, value) {
    return {
        type: MAYBE_UPDATE_SUGGESTIONS,
        suggestions,
        value
    };
}

