import 'react-dates/initialize';
import React from 'react'
import {DateRangePicker} from 'react-dates'
import '../../../datepicker.css'
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import moment from 'moment'
moment.locale('tr-TR')
class DateSearch extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            startDate:moment(),
            endDate:moment().add(1,'day')
        }
    }
    render(){
        return(
            <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })}
                displayFormat="DD-MM-YYYY"
                keepOpen={true}// PropTypes.func.isRequired,
            />
        )
    }
}



export default DateSearch;