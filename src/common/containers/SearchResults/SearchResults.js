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


        console.log(cbds)
        // Do something with the form values
        this.props.availHotelsForm(cbds, values.end, values.hotelName, values.adultNumber, values.childNumber, values.start);
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



                        {this.props.availHotel && this.props.availHotel.length > 2 ? availables.map(search => {
                            let i = 0;
                            var ratings = []
                            for (i; i < search.Rating; i++) {
                                ratings.push(<Star/>)
                            }
                            return (
                                <Col md={4}>
                                    <Link to={`hotels/${search.Description}`}>
                                        <HotelCard
                                            hotelImage={search.ImageURL["string"][0] + '.jpg'}
                                            hotelName={search.Description}
                                            hotelRating={ratings}
                                            hotelPlace={search.Place}
                                            minPrice={search.RoomTypes.apiHotelRoomTypeInfo ?search.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net:''}
                                        />
                                    </Link>
                                </Col>
                            )
                        }) : this.props.availHotel && this.props.availHotel.Description && !Array.isArray(this.props.availHotel) ?

                            <Col md={4}>
                                <Link to={`hotels/${this.props.availHotel.Description}`}>
                                    <HotelCard
                                        hotelImage={this.props.availHotel.ImageURL["string"][0] + '.jpg'}
                                        hotelName={this.props.availHotel.Description}
                                        hotelRating={ratingsa.length >2 ? ratingsa:''}
                                        hotelPlace={this.props.availHotel.Place}
                                        minPrice={this.props.RoomTypes.apiHotelRoomTypeInfo ? this.props.availHotel.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net:''}
                                    />
                                </Link>
                            </Col>
                            :
                            <div>Bekleyin</div>}
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
        availHotel: state.availHotel,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(SearchResults);