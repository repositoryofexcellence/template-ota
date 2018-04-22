import React from 'react'
import { Field, reduxForm } from 'redux-form'
import NameSearch from './nameSearch'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {DateRangePicker} from 'react-dates'
import '../../datepicker.css'
import moment from 'moment'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";
moment.locale('tr-TR')

class SearchForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            searchResults:null
        }
        this.submit = this.submit.bind(this)
    }

    submit(){
        this.setState({
            searchResults:null
        })
        let startDateMoment = moment(this.state.startDate).format('YYYY-MM-DD')
        let endDateMoment = moment(this.state.endDate).format('YYYY-MM-DD')
        this.setState({
            loading:true
        })
        this.props.availHotelsForm(startDateMoment,endDateMoment)
        this.setState({
            loading:false
        })


        this.props.history.push(`/search-results`)


    }
    render(){

        return(
            <div className="search-form" >

                <Field placeholder="Otel Adı" name="dsadas" component={NameSearch} type="text" />
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                    displayFormat="DD-MM-YYYY"
                    keepOpen={true}
                    startDatePlaceholderText="Giriş"
                endDatePlaceholderText="Çıkış"
                />
                <Field className="search-form-main" placeholder="2 Yetişkin" disabled name="email" component="input" type="email" />
                <button onClick={this.submit} className="search-form-button" type="submit">Ara</button>
            </div>
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