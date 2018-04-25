import React from 'react'
import {Field, Fields, FieldArray, reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css'
import {load as loadAccount} from './account'


import {DateRangePicker, SingleDatePicker,END_DATE, START_DATE} from 'react-dates'
import '../../datepicker.css'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import hotelList from "../../../data/hotelsTur.json"
import TypeAheadField from "./TypeAheadField";

moment.locale('tr-TR')
momentLocalizer()

const data = {
    // used to populate "account" reducer when "Load" is clicked
    hotelName: "Otel Adı",
    start: moment().format('YYYY-MM-DD'),
    end: moment().add(1, 'day').format('YYYY-MM-DD'),
    adultNumber: 2,
    childNumber: 0,
    childBirthDates: null
}


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

class renderDateTimePicker extends React.Component {
    static propTypes = {
        input: PropTypes.shape({
            onChange: PropTypes.func.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.bool,
        }),
        placeholder: PropTypes.string,
    }

    static defaultProps = {
        placeholder: ''
    }

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(date) {
        this.props.input.onChange(moment(date).format('YYYY-MM-DD'))
    }

    render() {
        const {
            input, placeholder,
            meta: {touched, error}
        } = this.props

        return (
            <div>
                <DatePicker
                    {...input}
                    placeholder={placeholder}
                    dateFormat="YYYY-MM-DD"
                    selected={input.value ? moment(input.value, 'YYYY-MM-DD') : null}
                    onChange={this.handleChange}

                />
                {touched && error && <span>{error}</span>}
            </div>
        )
    }
}

const formatDate = (value) => {
    return moment(value);
};
const normalizeDate = (value) => {
    return value.value.format('YYYY-MM-DD');
};
const month = moment()
const onMonthSelect = (month, value) => {
    return
}

const onYearSelect = (month, value) => {
    return
}
const renderDate = ({input, label, type, meta}) => (
    <SingleDatePicker
        isOutsideRange={() => false}
        numberOfMonths={1}
        keepOpenOnDateSelect={false}
        date={input.value}
        focused={meta.active}
        onDateChange={value => input.onChange({ value })}
        onFocusChange={({ focused }) => input.onFocus({ focused })}
        renderCaption={({month, onMonthSelect, onYearSelect}) => (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div>
                    <select
                        value={month.month()}
                        onChange={(e) => {
                            onMonthSelect(month, e.target.value);
                        }}
                    >
                        {moment.months().map((label, value) => (
                            <option value={value}>{label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        value={month.year()}
                        onChange={(e) => {
                            onYearSelect(month, e.target.value);
                        }}
                    >
                        <option value={moment().year() - 1}>Last year</option>
                        <option value={moment().year()}>{moment().year()}</option>
                        <option value={moment().year() + 1}>Next year</option>
                    </select>
                </div>
            </div>
        )}
    />
);
const renderChildBirthDates = ({fields, meta: {error, submitFailed}}) => (
    <ul>
        <h4>Çocukların Doğum Tarihleri</h4>
        <li>
            <button type="button" onClick={() => fields.push({})}>Çocuk Ekle</button>
            {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((child, index) => (
            <li className="childagesfloat" key={index}>
                <button
                    type="button"
                    title="Remove Member"
                    onClick={() => fields.remove(index)}>Çocuk Çıkar
                </button>
                <h4>{index + 1}. Çocuk</h4>
                <Field
                    name={`${child}.birth`}
                    component={renderDate}
                    normalize={normalizeDate}
                    format={formatDate}
                />
            </li>
        ))}
    </ul>
)

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

    componentDidMount() {
        this.props.load(data)
    }

    componentDidUpdate() {
        this.props.load(data)
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

        const {handleSubmit, childNumber, adultNumber} = this.props;
        let childPlace = ''
        if (childNumber > 0) {
            childPlace = `${childNumber} Çocuk`
        }
        const placeholders = `${adultNumber} Yetişkin ${childPlace}`

        return (
            <form onSubmit={handleSubmit}>

                <div className="search-form">

                    <TypeAheadField placeholder="Otel Adı" name="hotelName" label="Otel Adı" items={items}/>

                    <Fields
                        names={['start', 'end']}
                        component={this.renderDates}
                        normalize={this.normalizeDates}
                        format={this.formatDates}
                    />


                    <div className="popover-container">

                        <div onClick={this.handlesClick} className="popover-container">
                            <Field name="numbers" className="search-form-main" readOnly component="input"
                                   type="text" placeholder={placeholders}/>

                        </div>

                        {this.state.popupVisible && (

                            <div
                                className="popover-open" ref={node => {
                                this.node = node;
                            }}>

                                <div className="guest-container">
                                    <div className="adultnum guest">
                                        <h4>Yetişkin Sayısı</h4>
                                        <Field name="adultNumber" component="select">

                                            <option value="1">1 Yetişkin</option>
                                            <option value="2">2 Yetişkin</option>
                                            <option value="3">3 Yetişkin</option>
                                            <option value="4">4 Yetişkin</option>
                                            <option value="5">5 Yetişkin</option>
                                            <option value="6">6 Yetişkin</option>
                                        </Field>
                                    </div>
                                    <div className="childnum guest">
                                        <h4>Çocuk Sayısı</h4>
                                        <Field name="childNumber" component="select">

                                            <option value="0">0 Çocuk</option>
                                            <option value="1">1 Çocuk</option>
                                            <option value="2">2 Çocuk</option>
                                            <option value="3">3 Çocuk</option>
                                            <option value="4">4 Çocuk</option>
                                        </Field>
                                    </div>
                                    <div className="childages guest">
                                        <FieldArray name="childBirthDates" component={renderChildBirthDates}/>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>


                    <button onClick={this.submit} className="search-form-button" type="submit">Ara</button>
                </div>

            </form>
        )
    }
}

const selector = formValueSelector('searchForm') // <-- same as form name
SearchForm = reduxForm({
    // a unique name for the form
    form: 'searchForm',
    destroyOnUnmount: false,
})(SearchForm)

SearchForm = connect(
    state => ({
        initialValues: state.reducerData.data,
        childNumber: selector(state, 'childNumber'),
        adultNumber: selector(state, 'adultNumber')// pull initial values from account reducer
    }),
    {load: loadAccount} // bind account loading action creator
)(SearchForm)

export default SearchForm