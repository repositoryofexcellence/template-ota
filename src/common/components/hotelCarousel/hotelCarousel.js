import React, {Component} from 'react'
import HotelCard from '../../components/hotelCard/hotelCard'
import {Link} from 'react-router-dom';
import {Star} from 'material-ui-icons';
import removeDuplicates from 'removeduplicates'
import {Swiper, Slide} from 'react-dynamic-swiper'
import Next from 'material-ui-icons/ChevronRight'
import Prev from 'material-ui-icons/ChevronLeft'

import {withRouter} from "react-router";
import {connect} from "react-redux";

class HotelCarousel extends Component {
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
        if (hotelSearchResult.length > 1 && hotels != null) {
            var uniqueArray = hotelSearchResult.concat(hotels)
            var allHotels = removeDuplicates(uniqueArray, 'Description');
            allHotelsList = allHotels.map(all => {
                let i = 0;
                var ratings = []
                for (i; i < all.Rating; i++) {
                    ratings.push(<Star/>)
                }
                if ( all.PensionTypes && all.ImageURL && all.AgeInformation != null && all.RoomTypes.apiHotelRoomTypeInfo.Pricings == null && all.Concepts["string"] === "SAHİL OTELİ") {
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
                } else if (all.PensionTypes && all.ImageURL && !all.AgeInformation && all.RoomTypes.apiHotelRoomTypeInfo.Pricings !== null && all.Concepts["string"] === "SAHİL OTELİ") {
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
        return (
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


            </Swiper>
        )
    }
}

function mapStateToProps(state) {
    return {
        hotels: state.hotel.hotels,
        availHotel: state.availHotel
    }
}

export default withRouter(connect(
    mapStateToProps,
)(HotelCarousel));
