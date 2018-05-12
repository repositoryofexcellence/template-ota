import 'react-dates/initialize'
import React from 'react'
import {Field, Fields, FieldArray, reduxForm, change, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import {load as loadAccount} from './account'
import Popup from "reactjs-popup";
import {Grid, Row, Col} from 'react-styled-flexboxgrid'
import {DateRangePicker, SingleDatePicker, END_DATE, START_DATE} from 'react-dates'
import '../../datepicker.css'
import moment from 'moment'
import hotelList from "../../../data/hotelsTur.json"
import TypeAheadField from "./TypeAheadField";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';

import Slide from 'material-ui/transitions/Slide';

moment.locale('tr-TR')

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function TransitionNumber(props) {
    return <Slide direction="up" {...props} />;
}



const data = {
    // used to populate "account" reducer when "Load" is clicked
    hotelName: null,
    start: moment().format('YYYY-MM-DD'),
    end: moment().add(1, 'day').format('YYYY-MM-DD'),
    adultNumber: 2,
    childNumber: 0,
    childBirthDates: null
    , min: '1', max: '10'
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
                startDateId="your_unique_start_date_id"
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,

                onDatesChange={this.handleDatesChange}
                onFocusChange={this.handleFocusChange}
                startDate={startDate}
                startDatePlaceholderText="Start Date"

            />
        );
    }
}

class DateRangePickerWrapperResponsive extends React.Component {
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
                startDateId="your_unique_start_date_id"
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,

                onDatesChange={this.handleDatesChange}
                onFocusChange={this.handleFocusChange}
                startDate={startDate}
                startDatePlaceholderText="Start Date"
                orientation="vertical"
                withFullScreenPortal
            />
        );
    }
}


const language = hotelList.Hotels.map(hotel => {

    var HotelName = {name: hotel.Description}

    return (HotelName.name)

})
const items = language;

class renderDate extends React.Component {
    state = {focused: null};
    handleFocusChange = ({focused}) => this.setState({focused});

    render() {
        const {focused = null} = this.state;
        const {input} = this.props
        return (
            <SingleDatePicker
                isOutsideRange={() => false}
                numberOfMonths={1}
                date={input.value}
                focused={focused}
                onDateChange={value => input.onChange({value})}
                onFocusChange={this.handleFocusChange}
                renderCaption={({month, onMonthSelect, onYearSelect}) => (
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                            <h4>{input.value.format('DD MMMM YYYY')}</h4>
                        </div>
                        <div>
                            <select
                                value={month.year()}
                                onChange={(e) => {
                                    onYearSelect(month, e.target.value);
                                }}
                            >

                                <option value={moment().year()}>{moment().year()}</option>
                                <option value={moment().year() - 1}>{moment().year() - 1}</option>
                                <option value={moment().year() - 2}>{moment().year() - 2}</option>
                                <option value={moment().year() - 3}>{moment().year() - 3}</option>
                                <option value={moment().year() - 4}>{moment().year() - 4}</option>
                                <option value={moment().year() - 5}>{moment().year() - 5}</option>
                                <option value={moment().year() - 6}>{moment().year() - 6}</option>
                                <option value={moment().year() - 7}>{moment().year() - 7}</option>
                                <option value={moment().year() - 8}>{moment().year() - 8}</option>
                                <option value={moment().year() - 9}>{moment().year() - 9}</option>
                                <option value={moment().year() - 10}>{moment().year() - 10}</option>
                                <option value={moment().year() - 11}>{moment().year() - 11}</option>
                                <option value={moment().year() - 12}>{moment().year() - 12}</option>
                                <option value={moment().year() - 13}>{moment().year() - 13}</option>
                                <option value={moment().year() - 14}>{moment().year() - 14}</option>
                                <option value={moment().year() - 15}>{moment().year() - 15}</option>
                                <option value={moment().year() - 16}>{moment().year() - 16}</option>

                            </select>
                        </div>
                    </div>
                )}
            />
        )
    }
}

class renderDateResponsive extends React.Component {
    state = {focused: null};
    handleFocusChange = ({focused}) => this.setState({focused});

    render() {
        const {focused = null} = this.state;
        const {input} = this.props
        return (
            <SingleDatePicker
                isOutsideRange={() => false}
                numberOfMonths={1}
                date={input.value}
                focused={focused}
                onDateChange={value => input.onChange({value})}
                onFocusChange={this.handleFocusChange}
                renderCaption={({month, onMonthSelect, onYearSelect}) => (
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                            <h4>{input.value.format('DD MMMM YYYY')}</h4>
                        </div>
                        <div>
                            <select
                                value={month.year()}
                                onChange={(e) => {
                                    onYearSelect(month, e.target.value);
                                }}
                            >

                                <option value={moment().year()}>{moment().year()}</option>
                                <option value={moment().year() - 1}>{moment().year() - 1}</option>
                                <option value={moment().year() - 2}>{moment().year() - 2}</option>
                                <option value={moment().year() - 3}>{moment().year() - 3}</option>
                                <option value={moment().year() - 4}>{moment().year() - 4}</option>
                                <option value={moment().year() - 5}>{moment().year() - 5}</option>
                                <option value={moment().year() - 6}>{moment().year() - 6}</option>
                                <option value={moment().year() - 7}>{moment().year() - 7}</option>
                                <option value={moment().year() - 8}>{moment().year() - 8}</option>
                                <option value={moment().year() - 9}>{moment().year() - 9}</option>
                                <option value={moment().year() - 10}>{moment().year() - 10}</option>
                                <option value={moment().year() - 11}>{moment().year() - 11}</option>
                                <option value={moment().year() - 12}>{moment().year() - 12}</option>
                                <option value={moment().year() - 13}>{moment().year() - 13}</option>
                                <option value={moment().year() - 14}>{moment().year() - 14}</option>
                                <option value={moment().year() - 15}>{moment().year() - 15}</option>
                                <option value={moment().year() - 16}>{moment().year() - 16}</option>

                            </select>
                        </div>
                    </div>
                )} orientation="vertical"
                withFullScreenPortal
            />
        )
    }
}

class renderChildBirthDates extends React.Component {

    incAdt = () => {

        this.props.changeFieldValue('searchForm', 'adultNumber', this.props.adultNumber + 1)

    }
    decAdt = () => {

        this.props.changeFieldValue('searchForm', 'adultNumber', this.props.adultNumber - 1)

    }

    inc = () => {

        this.props.changeFieldValue('searchForm', 'childNumber', this.props.childNumber + 1)
        this.props.fields.push({})
    }
    dec = () => {

        this.props.changeFieldValue('searchForm', 'childNumber', this.props.childNumber - 1)
        this.props.fields.pop()
    }

    render() {
        const {adultNumber, childNumber, fields} = this.props


        return (
            <ul>
                <div className="guestNumbers">
                    <Row>
                        <Col md={6}>
                            <h4>Yetişkin Sayısı</h4>
                            <div className="guestLine">
                                {adultNumber === 1 ? <div className="amountDisabled">-</div> :
                                    <div className="amount" onClick={this.decAdt}>-</div>}
                                <div className="inputAmountContainer">
                                    <Field name="adultNumber" readOnly className="inputAmount" type="number"
                                           component="input"/>
                                    <div className="inputAmountTitle"> Yetişkin</div>
                                </div>
                                {adultNumber === 6 ? <div className="amountDisabled">+</div> :
                                    <div className="amount" onClick={this.incAdt}>+</div>}
                            </div>
                        </Col>
                        <Col md={6}>
                            <h4>Çocuk Sayısı</h4>

                            <div className="guestLine">
                                {childNumber === 0 ? <div className="amountDisabled">-</div> :
                                    <div className="amount" onClick={this.dec}>-</div>}
                                <div className="inputAmountContainer">
                                    <Field name="childNumber" readOnly className="inputAmount" type="number"
                                           component="input"/>
                                    <div className="inputAmountTitle"> Çocuk</div>
                                </div>
                                {childNumber === 4 ? <div className="amountDisabled">+</div> :
                                    <div className="amount" onClick={this.inc}>+</div>}
                            </div>
                        </Col>
                        <div className="dateLine">
                            {childNumber > 0 ? <h4>Çocukların Doğum Tarihleri</h4> : ''}
                            {fields.map((child, index) => (
                                <Col md={6} className="childagesfloat" key={index}>
                                    <h4>{index + 1}. Çocuk</h4>
                                    <Field
                                        name={`${child}.birth`}
                                        component={renderDate}
                                        normalize={normalizedDate}
                                        format={formattedDate}

                                    />
                                </Col>
                            ))}
                        </div>
                    </Row>
                </div>


            </ul>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // This will be passed as a property to this component
        changeFieldValue: function (form, field, value) {
            dispatch(change(form, field, value))
        }
    }
}


renderChildBirthDates = connect(
    state => ({

        childNumber: selector(state, 'childNumber'),
        adultNumber: selector(state, 'adultNumber')
    }),
    mapDispatchToProps
    // bind account loading action creator
)(renderChildBirthDates)

class renderChildBirthDatesResponsive extends React.Component {

    incAdt = () => {

        this.props.changeFieldValue('searchForm', 'adultNumber', this.props.adultNumber + 1)

    }
    decAdt = () => {

        this.props.changeFieldValue('searchForm', 'adultNumber', this.props.adultNumber - 1)

    }

    inc = () => {

        this.props.changeFieldValue('searchForm', 'childNumber', this.props.childNumber + 1)
        this.props.fields.push({})
    }
    dec = () => {

        this.props.changeFieldValue('searchForm', 'childNumber', this.props.childNumber - 1)
        this.props.fields.pop()
    }

    render() {
        const {adultNumber, childNumber, fields} = this.props


        return (
            <ul>
                <div className="guestNumbers">
                    <Row>
                        <Col md={6}>
                            <h4>Yetişkin Sayısı</h4>
                            <div className="guestLine">
                                {adultNumber === 1 ? <div className="amountDisabled">-</div> :
                                    <div className="amount" onClick={this.decAdt}>-</div>}
                                <div className="inputAmountContainer">
                                    <Field name="adultNumber" readOnly className="inputAmount" type="number"
                                           component="input"/>
                                    <div className="inputAmountTitle"> Yetişkin</div>
                                </div>
                                {adultNumber === 6 ? <div className="amountDisabled">+</div> :
                                    <div className="amount" onClick={this.incAdt}>+</div>}
                            </div>
                        </Col>
                        <Col md={6}>
                            <h4>Çocuk Sayısı</h4>

                            <div className="guestLine">
                                {childNumber === 0 ? <div className="amountDisabled">-</div> :
                                    <div className="amount" onClick={this.dec}>-</div>}
                                <div className="inputAmountContainer">
                                    <Field name="childNumber" readOnly className="inputAmount" type="number"
                                           component="input"/>
                                    <div className="inputAmountTitle"> Çocuk</div>
                                </div>
                                {childNumber === 4 ? <div className="amountDisabled">+</div> :
                                    <div className="amount" onClick={this.inc}>+</div>}
                            </div>
                        </Col>
                        <div className="dateLine">
                            {childNumber > 0 ? <h4>Çocukların Doğum Tarihleri</h4> : ''}
                            {fields.map((child, index) => (
                                <Col md={6} className="childagesfloat" key={index}>
                                    <h4>{index + 1}. Çocuk</h4>
                                    <Field
                                        name={`${child}.birth`}
                                        component={renderDateResponsive}
                                        normalize={normalizedDate}
                                        format={formattedDate}

                                    />
                                </Col>
                            ))}
                        </div>
                    </Row>
                </div>


            </ul>
        )
    }
}



renderChildBirthDatesResponsive = connect(
    state => ({

        childNumber: selector(state, 'childNumber'),
        adultNumber: selector(state, 'adultNumber')
    }),
    mapDispatchToProps,
    // bind account loading action creator
)(renderChildBirthDatesResponsive)
const formattedDate = (value) => {
    return moment(value);
};
const normalizedDate = (value) => {
    return value.value.format('YYYY-MM-DD');
};


class SearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.handlesClick = this.handlesClick.bind(this);
        this.handlesOutsideClick = this.handlesOutsideClick.bind(this);
        this.state = {
            loading: false,
            searchResults: null,
            popupVisible: false,
            open: false,
            openText: false,
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

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleClickOpenText = () => {
        this.setState({openText: true});
    };

    handleCloseText = () => {
        this.setState({openText: false});
    };

    renderDates = fields => (
        <DateRangePickerWrapper
            startDateFieldName="start"
            endDateFieldName="end"
            {...fields}
        />
    );
    renderDatesResponsive = fields => (
        <DateRangePickerWrapperResponsive
            startDateFieldName="start"
            endDateFieldName="end"

            orientation="vertical"
            withFullScreenPortal
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
            <div>

                <form className="form-desktop" onSubmit={handleSubmit}>

                    <div className="search-form">

                        <TypeAheadField placeholder="Otel Adı" name="hotelName" label="Otel Adı" items={items}/>

                        <Fields
                            names={['start', 'end']}
                            component={this.renderDates}
                            normalize={this.normalizeDates}
                            format={this.formatDates}
                        />
                        <Popup
                            trigger={<Field name="numbers" className="search-form-main" readOnly component="input"
                                            type="text" placeholder={placeholders}/>}
                            position="bottom center"
                            closeOnDocumentClick
                        >
                            <div>

                                <FieldArray name="childBirthDates" component={renderChildBirthDates}/>
                            </div>
                        </Popup>


                        {this.props.loading ?
                            <button onClick={this.noSubmit} className=" no-submit" type="submit">Bekleyin</button> :
                            <button onClick={this.submit} className="search-form-button" type="submit">Ara</button>}

                    </div>

                </form>
                <div  className="form-mobile">


                            <form  onSubmit={handleSubmit}>

                                <div className="search-form">
                                    <div>
                                        <Field name="hotelName" className="search-form-main" readOnly
                                               component="input"
                                               onClick={this.handleClickOpenText} type="text"
                                               placeholder="Otel Adı" />
                                        <Dialog
                                            fullScreen
                                            open={this.state.openText}
                                            onClose={this.handleCloseText}
                                            TransitionComponent={Transition}
                                        >

                                            <div>

                                                <TypeAheadField placeholder="Otel Adı" name="hotelName" label="Otel Adı"
                                                                items={items}/>
                                                <button onClick={this.handleCloseText} className="search-form-button"
                                                        type="submit">Tamam
                                                </button>
                                            </div>
                                        </Dialog>
                                    </div>



                                        <Fields
                                            names={['start', 'end']}
                                            component={this.renderDatesResponsive}
                                            normalize={this.normalizeDates}
                                            format={this.formatDates}
                                        />


                                        <div>
                                            <Field name="numbers" className="search-form-main" readOnly
                                                   component="input"
                                                   onClick={this.handleClickOpen} type="text"
                                                   placeholder={placeholders}/>
                                            <Dialog
                                                fullScreen
                                                open={this.state.open}
                                                onClose={this.handleClose}
                                                TransitionComponent={TransitionNumber}
                                            >

                                                <div>

                                                    <FieldArray name="childBirthDates"
                                                                component={renderChildBirthDatesResponsive}/>
                                                    <button onClick={this.handleClose} className="search-form-button"
                                                            type="submit">Tamam
                                                    </button>
                                                </div>
                                            </Dialog>
                                        </div>


                                        {this.props.loading ? <button onClick={this.noSubmit} className="no-submit"
                                                                      type="submit">Bekleyin</button> :
                                            <button onClick={this.submit} className="search-form-button"
                                                    type="submit">Ara</button>}

                                </div>

                            </form>


                </div>
            </div>
        )
    }
}

export const selector = formValueSelector('searchForm') // <-- same as form name
SearchForm = reduxForm({
    // a unique name for the form
    form: 'searchForm',
    destroyOnUnmount: false,
})(SearchForm)

SearchForm = connect(
    state => ({
        initialValues: state.reducerData.data,
        childNumber: selector(state, 'childNumber'),
        adultNumber: selector(state, 'adultNumber'),
        loading: state.availHotel.loading// pull initial values from account reducer
    }),

    {load: loadAccount}
)(SearchForm)

export default withStyles(styles)(SearchForm)