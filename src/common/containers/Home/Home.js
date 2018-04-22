import React, {Component} from 'react'
import {connect} from "react-redux";
import Header from '../../components/header/header'
import HotelCarousel from '../../components/hotelCarousel/hotelCarousel'
import ThermalCarousel from '../../components/hotelCarousel/thermalCarousel'
import Divider from 'material-ui/Divider'
import SearchForm from '../../components/searchForm/SearchForm'
import * as actionCreators from "../../redux/actions/index";
import {bindActionCreators} from "redux";

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <div>
                <Header/>
                <div className="jumbotron main-head">
                    <div className="container">
                        <h2 className="banner-text">Demiroğlu Reisen. Güvenin adresi</h2>
                        <SearchForm className="search-form"/>
                    </div>
                </div>
                <div className="container">
                    <h2>Sahil Otelleri</h2>
                    <Divider/>
                    <HotelCarousel className="carousel-main"

                    />



                    <h2>Termal Oteller</h2>
                    <Divider/>
                    <ThermalCarousel className="carousel-main"

                    />
                </div>
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

export default connect(
    mapStateToProps,mapDispatchToProps
)(Home);