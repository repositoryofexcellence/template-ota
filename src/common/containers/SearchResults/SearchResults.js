import React, {Component} from 'react'
import {connect} from "react-redux";
import Header from '../../components/header/header'
import {Link} from 'react-router-dom'
import {Grid, Row, Col} from 'react-styled-flexboxgrid';

import SearchForm from '../../components/searchForm/SearchForm'
import removeDuplicates from 'removeduplicates'
import * as actionCreators from "../../redux/actions/index";
import {bindActionCreators} from "redux";
import HotelCard from '../../components/hotelCard/hotelCard'
import {Star} from 'material-ui-icons';

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){
        this.props.restoreRedirect()
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




        // Do something with the form values
        this.props.availHotelsForm(cbds, values.end, name, values.adultNumber, values.childNumber, values.start);
    }

    render() {
        if(this.props.availHotel && !Array.isArray(this.props.availHotel)){
            let i = 0;
            var ratingsa = []
            for (i; i < this.props.availHotel.Rating; i++) {
                ratingsa.push(<Star/>)
            }
        }
        let availables = removeDuplicates(this.props.availHotel, 'Description')
        console.log(availables)
        return (
            <div>
                <Header/>
                <div className="jumbotron">
                    <Grid>
                        <Row>
                            <Col md={12}>

                                <SearchForm onSubmit={this.submit} className="search-form"/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <Grid>
                    <Row>
                        <Col md={12}>

                    <h2>Arama Sonuçları</h2>

                            {this.props.availHotel.length > 0 && this.props.loading === false && availables ? availables.map(avail =>{
                                    let i = 0;
                                    var ratings = []
                                    for (i; i < avail.Rating; i++) {
                                        ratings.push(<Star/>)
                                    }
                                    return (
                                        <Col className="hotelcard" md={4}>
                                            <Link to={`hotels/${avail.Description}`}>
                                                <HotelCard
                                                    hotelImage={avail.ImageURL["string"][0] + '.jpg'}
                                                    hotelName={avail.Description}
                                                    hotelRating={ratings}
                                                    hotelPlace={avail.Place}
                                                    minPrice={Array.isArray(avail.RoomTypes.apiHotelRoomTypeInfo) ? avail.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net
                                                    : !Array.isArray(avail.RoomTypes.apiHotelRoomTypeInfo) ? avail.RoomTypes.apiHotelRoomTypeInfo.Pricings.apiHotelPricingInfo.TotalPrice.Net :'' }
                                                />
                                            </Link>
                                        </Col>
                                    )
                                }) : this.props.availHotel.Description && !Array.isArray(availables) ?
                                <Col className="hotelcard" md={4}>
                                    <Link to={`hotels/${this.props.availHotel.Description}`}>
                                        <HotelCard
                                            hotelImage={this.props.availHotel.ImageURL["string"][0] + '.jpg'}
                                            hotelName={this.props.availHotel.Description}
                                            hotelRating={ratingsa}
                                            hotelPlace={this.props.availHotel.Place}
                                            minPrice={Array.isArray(this.props.availHotel.RoomTypes.apiHotelRoomTypeInfo) ? this.props.availHotel.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net
                                                : !Array.isArray(this.props.availHotel.RoomTypes.apiHotelRoomTypeInfo) ? this.props.availHotel.RoomTypes.apiHotelRoomTypeInfo.Pricings.apiHotelPricingInfo.TotalPrice.Net :'' }
                                        />
                                    </Link>
                                </Col> :this.props.availHotel.length > 0 && this.props.loading === true
?
                                <div>Bekleyin</div>: '' }


                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        hotels: state.hotel.hotels,
        availHotel:state.availHotel.availHotel,
        loading:state.availHotel.loading,
        redirect:state.availHotel.redirect
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(SearchResults);