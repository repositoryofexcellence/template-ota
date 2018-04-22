import React from 'react'
import {
    Button,
    Form,
    FormGroup,
    Input,
} from 'reactstrap';
import * as actions from "../../../redux/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from "moment/moment";
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
class SearchForm extends React.Component {
    constructor(props){
        super(props)
        this.state={
            autoSuggestHidden:false,
            dateHidden:true
        }
    }
    submit(){
        this.props.availHotelsForm(this.state.startDate,this.state.endDate)
    }

    render(){
        return(
                <Form className="forms">
                    <FormGroup>
                        <Input readOnly onClick={this.props.actions.asugHiddenCont} type="text" value={this.props.main.reducer.value === ''  ? 'Otel Adı' : this.props.main.reducer.value  } placeholder="Otel Adı"/>

                        <Input readOnly onClick={this.props.actions.dateHiddenCont}  type="text" value={this.props.startDate} placeholder="Giriş Tarihi"/>
                        <Input type="text" value={this.props.endDate} placeholder="Çıkış Tarihi"/>
                        <Input readOnly onClick={this.props.actions.guestHiddenCont}  type="text" value={this.props.guests} placeholder="Konuk Sayısı"/>
                        <Button type="submit" className="submit">Ara</Button>
                    </FormGroup>
                </Form>
        )
    }
}



function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...actions}, dispatch)
    };
}

export default connect(
    null,
    mapDispatchToProps
)(SearchForm);