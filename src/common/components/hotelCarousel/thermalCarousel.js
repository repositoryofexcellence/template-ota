import React, {Component} from 'react'
import HotelCard from '../../components/hotelCard/hotelCard'
import {Link} from 'react-router-dom';
import {Star} from 'material-ui-icons';
import removeDuplicates from 'removeduplicates'
import {Swiper, Slide} from 'react-dynamic-swiper'
import Next from 'material-ui-icons/ChevronRight'
import Prev from 'material-ui-icons/ChevronLeft'
import MyLoader from '../skeleton/skeleton'
import {Row, Col} from 'react-styled-flexboxgrid';
import {withRouter} from "react-router";
import {connect} from "react-redux";

class ThermalCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hotels:this.props.hotels,
            hotelSearchResult:this.props.availHotel
        }
    }

    render() {
        const {hotels, hotelSearchResult} = this.state
        let allHotelsList = ''
        if (hotelSearchResult.length > 2 && hotels != null) {
            var uniqueArray = hotelSearchResult.concat(hotels)
            var allHotels = removeDuplicates(uniqueArray, 'Description');
            allHotelsList = allHotels.map(all => {
                let i = 0;
                var ratings = []
                for (i; i < all.Rating; i++) {
                    ratings.push(<Star/>)
                }
                if ( all.PensionTypes && all.ImageURL && all.AgeInformation != null && all.RoomTypes.apiHotelRoomTypeInfo.Pricings == null && all.Concepts["string"] === "TERMAL OTEL") {
                    return (
                        <Slide className="unavailHotel">

                            <Link className="cardlink" to={`/hotels/${all.Description}`}>
                                <HotelCard
                                    hotelImage={all.ImageURL["string"][0]}
                                    hotelName={all.Description}
                                    hotelRating={ratings}
                                    hotelPlace={all.Place}
                                    hotelPension={all.PensionTypes["string"]}
                                    minPrice={null}
                                />
                            </Link>
                        </Slide>
                    )
                } else if ( all.PensionTypes && all.ImageURL && !all.AgeInformation && all.RoomTypes.apiHotelRoomTypeInfo.Pricings !== null && all.Concepts["string"] === "TERMAL OTEL") {
                    return (
                        <Slide>
                            <Link className="cardlink" to={`/hotels/${all.Description}`}>
                                <HotelCard
                                    hotelImage={all.ImageURL["string"][0] + '.jpg'}
                                    hotelName={all.Description}
                                    hotelRating={ratings}
                                    hotelPlace={all.Place}
                                    hotelPension={all.PensionTypes["string"]}
                                    minPrice={all.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net}
                                />
                            </Link>
                        </Slide>
                    )
                } else {
                    return <div>Yükleniyor</div>
                }
            })
            console.log(uniqueArray)

        }
        else if (!Array.isArray(hotelSearchResult) && hotels != null) {
            var singleHotel = [hotelSearchResult]

            uniqueArray = singleHotel.concat(hotels)
            allHotels = removeDuplicates(uniqueArray, 'Description');
            console.log(allHotels)
            allHotelsList = allHotels.map(all => {
                let i = 0;
                var ratings = []
                for (i; i < all.Rating; i++) {
                    ratings.push(<Star/>)
                }
                if ( all.PensionTypes && all.ImageURL && all.AgeInformation != null && all.RoomTypes.apiHotelRoomTypeInfo.Pricings == null && all.Concepts["string"] === "TERMAL OTEL") {
                    return (
                        <Slide className="unavailHotel">

                            <Link className="cardlink" to={`/hotels/${all.Description}`}>
                                <HotelCard
                                    hotelImage={all.ImageURL["string"][0]}
                                    hotelName={all.Description}
                                    hotelRating={ratings}
                                    hotelPlace={all.Place}

                                />
                            </Link>
                        </Slide>
                    )
                } else if (all.PensionTypes && all.ImageURL && !all.AgeInformation && all.RoomTypes.apiHotelRoomTypeInfo.Pricings !== null && all.Concepts["string"] === "TERMAL OTEL") {
                    return (
                        <Slide>
                            <Link className="cardlink" to={`/hotels/${all.Description}`}>
                                <HotelCard
                                    hotelImage={all.ImageURL["string"][0] + '.jpg'}
                                    hotelName={all.Description}
                                    hotelRating={ratings}
                                    hotelPlace={all.Place}
                                    hotelPension={all.PensionTypes["string"]}
                                    minPrice={all.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net}
                                />
                            </Link>
                        </Slide>
                    )

                } else {
                    return <div>Yükleniyor</div>
                }
            })
        }
        return (
            <div>
                {this.props.loading ? <Row><Col md={4}><MyLoader/></Col><Col md={4}><MyLoader/></Col>
                        <Col md={4}><MyLoader/></Col></Row> :

                    <Swiper
                        swiperOptions={{
                            slidesPerView: 3,
                            spaceBetween: 15,
                            freeMode: false

                        }}
                        pagination={false}
                        nextButton={<div className="swiper-button-next"><Next/></div>}
                        prevButton={<div className="swiper-button-prev"><Prev/></div>}
                    >



                        {allHotelsList}

                    </Swiper> }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        hotels: state.hotel.hotels,
        availHotel:state.availHotel.availHotel,
        loading:state.availHotel.loading
    }
}

export default withRouter(connect(
    mapStateToProps,
)(ThermalCarousel));
