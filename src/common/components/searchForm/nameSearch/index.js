import React from 'react';
import 'react-dates/initialize';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';
import {updateInputValue,loadSuggestions,clearSuggestions}  from "../../../redux/actions";

class NameSearch extends React.Component {
    getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }

    render() {
        const {onChange,onSuggestionsFetchRequested,onSuggestionsClearRequested, value, suggestions } = this.props

        const inputProps = {
            placeholder: "Tüm Oteller",
            value,
            onChange
        };


        return (

            <div>

                <Autosuggest
                    suggestions={suggestions.slice(0, 5)}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps} />

            </div>

        );
    }
}

function mapStateToProps(state) {
    return {value: state.autoSuggest.value,
        isLoading:state.autoSuggest.isLoading,
    suggestions:state.autoSuggest.suggestions}
}

function mapDispatchToProps(dispatch) {
    return {
        onChange(event, { newValue }) {
            dispatch(updateInputValue(newValue));
        },
        onSuggestionsFetchRequested({ value }) {
            dispatch(loadSuggestions(value));
        },
        onSuggestionsClearRequested() {
            dispatch(clearSuggestions());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NameSearch);
