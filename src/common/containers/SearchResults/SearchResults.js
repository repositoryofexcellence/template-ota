import React, {Component} from 'react'
import {connect} from "react-redux";
import Header from '../../components/header/header'
import {Link} from 'react-router-dom'
import SearchForm from '../../components/searchForm/SearchForm'
import removeDuplicates from 'removeduplicates'
import * as actionCreators from "../../redux/actions/index";
import {bindActionCreators} from "redux";
import HotelCard from '../../components/hotelCard/hotelCard'
import {Star} from 'material-ui-icons';

class SearchResults extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }


    render() {
        let availables = removeDuplicates(this.props.availHotel,'Description')
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
                    <h2>Arama Sonuçları</h2>
                    <div className="row">


                    {this.props.availHotel && this.props.availHotel.length > 2 ? availables.map(search =>{
                        let i = 0;
                        var ratings = []
                        for (i; i < search.Rating; i++) {
                            ratings.push(<Star/>)
                        }
                        return(
                            <div className="col-md-4">
                            <Link to={`hotels/${search.Description}`}>
                                <HotelCard
                                    hotelImage={search.ImageURL["string"][0] + '.jpg'}
                                    hotelName={search.Description}
                                    hotelRating={ratings}
                                    hotelPlace={search.Place}
                                    minPrice={search.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net}
                                />
                            </Link>
                            </div>
                        )
                    }) :<div>Bekleyin</div>}
                    </div>
                </div>
            </div>
        )
    }

}
function mapStateToProps(state) {
    return {hotels: state.hotel.hotels,
        availHotel:state.availHotel,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(SearchResults);