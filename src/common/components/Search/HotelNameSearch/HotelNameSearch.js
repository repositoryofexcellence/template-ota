import React from 'react';
import 'react-dates/initialize';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';
import {updateInputValue,loadSuggestions,clearSuggestions}  from "../../../redux/actions";

class HotelNameSearch extends React.Component {
    getSuggestionValue(suggestion) {
        return suggestion.name;
    }

   renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }

    render() {
const {onChange,onSuggestionsFetchRequested,onSuggestionsClearRequested} = this.props
        const { value, suggestions, isLoading } = this.props.main.reducer;
        const inputProps = {
            placeholder: "Otel Adı",
            value,
            onChange
        };
        const status = (isLoading ? 'Yükleniyor' : 'Önerileri Görebilmek için yazınız');


        return (

            <div>
                <div className="status">
                    <strong>Bir tesis adı giriniz</strong> {status}
                </div>
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
    return {
        main: state,
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(HotelNameSearch);
