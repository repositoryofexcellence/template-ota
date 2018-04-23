import React from 'react'
import {Field, Fields, reduxForm} from 'redux-form'
import NameSearch from './nameSearch'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {DateRangePicker, END_DATE, START_DATE} from 'react-dates'
import '../../datepicker.css'
import moment from 'moment'
import hotelList from "../../../data/hotelsTur.json"
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
        this.setState({focusedInput});
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


const language = hotelList.Hotels.map(hotel => {

    var HotelName = {name: hotel.Description}

    return (HotelName.name)

})
const items = language;


class SearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.handlesClick = this.handlesClick.bind(this);
        this.handlesOutsideClick = this.handlesOutsideClick.bind(this);
        this.state = {
            loading: false,
            searchResults: null,
            popupVisible: false
        }

    }

    handlesClick() {
        if (!this.state.popupVisible) {
            // attach/remove event handler
            document.addEventListener('click', this.handlesOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handlesOutsideClick, false);
        }

        this.setState(prevState => ({
            popupVisible: !prevState.popupVisible,
        }));
    }

    handlesOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }

        this.handlesClick();
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
    incAdult = (value) => {

        this.props.change('adultNumber', this.props.incAdultNum())
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="search-form">

                    <TypeAheadField name="hotelName" label="Otel Adı" items={items}/>

                    <Fields
                        names={['start', 'end']}
                        component={this.renderDates}
                        normalize={this.normalizeDates}
                        format={this.formatDates}
                    />


                    <div
                         ref={node => {
                        this.node = node;
                    }}>
                        <div onClick={this.handlesClick} className="popover-container"

                        >
                            <Field  name="adultNumber" className="search-form-main" disabled component="input" type="text" placeHolder="2 Yetişkin" value={this.value + "Yetişkin"} />

                        </div>

                        {this.state.popupVisible && (
                            <div
                                className="popover"
                            >
                                <Field name="adultNumber" component="select">
                                    <option defaultValue="2"/>
                                    <option value="1">1 Yetişkin</option>
                                    <option placeholder="2 Yetişkin" selected value="2">2 Yetişkin</option>
                                    <option value="3">3 Yetişkin</option>
                                    <option value="4">4 Yetişkin</option>
                                    <option value="5">5 Yetişkin</option>
                                    <option value="6">6 Yetişkin</option>
                                </Field>
                                <Field name="childNumber" component="select">
                                    <option></option>
                                    <option selected aria-selected value="0">0 Çocuk</option>
                                    <option value="1">1 Çocuk</option>
                                    <option value="2">2 Çocuk</option>
                                    <option value="3">3 Çocuk</option>
                                    <option value="4">4 Çocuk</option>
                                </Field>
                            </div>
                        )}
                    </div>


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
    return {
        value: state.value,
        hotels: state.hotel.hotels,
        availHotel: state.availHotel,
        startDate: state.startDate,
        adultNum: state.adultNum
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));