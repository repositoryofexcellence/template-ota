import React from 'react'
import { Field,Fields, reduxForm } from 'redux-form'
import NameSearch from './nameSearch'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {DateRangePicker, END_DATE, START_DATE} from 'react-dates'
import '../../datepicker.css'
import moment from 'moment'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";
import TypeAheadField from "./TypeAheadField";
moment.locale('tr-TR')


class DateRangePickerWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
        };
    }

    handleDatesChange = (dates) => {
        const startField = this.props[this.props.startDateFieldName];
        const endField = this.props[this.props.endDateFieldName];
        startField.input.onChange(dates.startDate);
        endField.input.onChange(dates.endDate);
    }

    handleFocusChange = (focusedInput) => {
        this.setState({ focusedInput });
        if (focusedInput === START_DATE) {
            this.props[this.props.startDateFieldName].input.onFocus();
            return;
        }
        if (focusedInput === END_DATE) {
            this.props[this.props.endDateFieldName].input.onFocus();
            return;
        }
    }

    render() {
        const startDate = this.props[this.props.startDateFieldName].input.value || null;
        const endDate = this.props[this.props.endDateFieldName].input.value || null;

        return (
            <DateRangePicker
                endDate={endDate}
                endDatePlaceholderText="End Date"
                focusedInput={this.state.focusedInput || null}
                minimumNights={0}
                onDatesChange={this.handleDatesChange}
                onFocusChange={this.handleFocusChange}
                startDate={startDate}
                startDatePlaceholderText="Start Date"
                isOutsideRange={() => false}
            />
        );
    }
}




const items = ["apple", "pear", "orange", "grape", "banana"];


class SearchForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            searchResults:null
        }

    }

    renderDates = fields => (
        <DateRangePickerWrapper
            startDateFieldName="start"
            endDateFieldName="end"
            {...fields}
        />
    );
    formatDates = (value, name) => {
        return moment(value);
    };
    normalizeDates = (name, value) => {
        return moment(value).format('YYYY-MM-DD');
    };
    render(){
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit}>
            <div className="search-form" >

                <TypeAheadField name="fruit" label="Enter fruit name" items={items} />

                <Fields
                    names={['start', 'end']}
                    component={this.renderDates}
                    normalize={this.normalizeDates}
                    format={this.formatDates}
                />
                <Field className="search-form-main" placeholder="2 Yetişkin" disabled name="email" component="input" type="email" />
                <button onClick={this.submit} className="search-form-button" type="submit">Ara</button>
            </div>
            </form>
        )
    }
}

SearchForm = reduxForm({
    // a unique name for the form
    form: 'searchForm',

})(SearchForm)
function mapStateToProps(state) {
    return {value: state.value,
        availHotel:state.availHotel,
    startDate:state.startDate}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SearchForm));