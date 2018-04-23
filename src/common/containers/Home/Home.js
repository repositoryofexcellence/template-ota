import React, {Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from 'react-router'

import Header from '../../components/header/header'
import HotelCarousel from '../../components/hotelCarousel/hotelCarousel'
import ThermalCarousel from '../../components/hotelCarousel/thermalCarousel'
import Divider from 'material-ui/Divider'
import SearchForm from '../../components/searchForm/SearchForm'
import * as actionCreators from "../../redux/actions/index";
import {bindActionCreators} from "redux";

import {Grid, Row, Col} from 'react-styled-flexboxgrid';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    submit = (values) => {
        let cbds = null
            if(values.childBirthDates != null){
                cbds = values.childBirthDates.map(cbd => {

                    var cbdt = {name: cbd.birth}

                    return (cbdt.name)
                })
            } else if(values.childBirthDates == null ){
                cbds = " "
            }

        this.props.history.push('/search-results')
        console.log(cbds)
        // Do something with the form values
        this.props.availHotelsForm(cbds,values.end,values.hotelName,values.adultNumber,values.childNumber,values.start);
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="jumbotron main-head">

                        <Grid>
                            <Row>
                                <Col md={12}>
                        <h2 className="banner-text">Demiroğlu Reisen. Güvenin adresi</h2>
                                    <SearchForm onSubmit={this.submit} className="search-form"/>
                                </Col>
                            </Row>
                        </Grid>

                </div>
                <Grid>
                    <Row>
                        <Col md={12}>
                    <h2>Sahil Otelleri</h2>
                    <Divider/>
                    <HotelCarousel className="carousel-main"

                    />



                    <h2>Termal Oteller</h2>
                    <Divider/>
                    <ThermalCarousel className="carousel-main"

                    />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {hotels: state.hotel.hotels,
        availHotel:state.availHotel,
    startDate:state.staticState.startDate,
        endDate:state.staticState.endDate,
        adultNum:state.staticState.adultNum,
        childNum:state.staticState.childNum,
        childAges:state.staticState.childAges,
        location:state.staticState.location
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default withRouter(connect(
    mapStateToProps,mapDispatchToProps
)(Home));