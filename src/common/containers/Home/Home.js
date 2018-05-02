import React, {Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import MainSlider from '../../components/mainSlider/mainSlider'
import Header from '../../components/header/header'
import moment from 'moment'
import HotelCarousel from '../../components/hotelCarousel/hotelCarousel'
import ThermalCarousel from '../../components/hotelCarousel/thermalCarousel'
import {selector} from '../../components/searchForm/SearchForm'
import SearchForm from '../../components/searchForm/SearchForm'
import * as actionCreators from "../../redux/actions/index";
import {bindActionCreators} from "redux";
import { Redirect } from 'react-router'

import {Grid, Row, Col} from 'react-styled-flexboxgrid';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect: false

        }
    }
    noSubmit = (values) =>{
        return
    }

    submit = (values) => {
        let cbds = null
        if (values.childBirthDates != null) {
            cbds = values.childBirthDates.map(cbd => {

                var cbdt = {name: cbd.birth}

                return (`childBirthDates[]=${cbdt.name}&`)
            })
        } else if (values.childBirthDates == null) {
            cbds = ''
        }
        let name = null
        if (values.hotelName != null) {
            name = values.hotelName
        } else if (values.hotelName == null) {
            name = ''
        }
        this.setState({ redirect: true })


        // Do something with the form values
        this.props.availHotelsForm(cbds, values.end, name, values.adultNumber, values.childNumber, values.start);
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/search-results'/>;
        }

        return (
            <div>
                <Header/>
                <MainSlider>

                        <Grid>
                            <Row>
                                <Col md={12}>
                        <h2 className="banner-text">Demiroğlu Reisen. Güvenin adresi</h2>
                                    {this.props.loading ?
                                        <SearchForm onSubmit={this.noSubmit} className="search-form"/>
                                        : <SearchForm onSubmit={this.submit} className="search-form"/>}

                                </Col>
                            </Row>
                        </Grid>

                </MainSlider>
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Row> <Col md={6}><h2>Sahil Otelleri </h2></Col><Col md={6}><p className="indicator">   <strong>{moment(this.props.start).format('DD-MM-YYYY')}  </strong> -   <strong>{moment(this.props.end).format('DD-MM-YYYY')}  </strong> tarihlerinde,
                                <strong>{this.props.adultNumber}</strong> Yetişkin   {this.props.childNumber > 0 ?  <dummy> <strong>{this.props.childNumber}</strong> Çocuk </dummy> :'' }
                                için fiyatlar </p></Col></Row>

                    <HotelCarousel className="carousel-main"

                    />



                            <Row> <Col md={6}><h2>Termal Oteller </h2></Col><Col md={6}><p className="indicator">   <strong>{moment(this.props.start).format('DD-MM-YYYY')}  </strong> -   <strong>{moment(this.props.end).format('DD-MM-YYYY')}  </strong> tarihlerinde,
                                <strong>{this.props.adultNumber}</strong> Yetişkin   {this.props.childNumber > 0 ?  <dummy> <strong>{this.props.childNumber}</strong> Çocuk</dummy> :'' }
                                için fiyatlar </p></Col></Row>


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
        availHotel:state.availHotel.availHotel,
        loading:state.availHotel.loading,
        start: selector(state, 'start'),
        end: selector(state, 'end'),
        childNumber: selector(state, 'childNumber'),
        adultNumber: selector(state, 'adultNumber'),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default withRouter(connect(
    mapStateToProps,mapDispatchToProps
)(Home));