import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './containers/Home/Home'
import HotelDetail from './containers/HotelDetail/HotelDetail'
import SearchResults from './containers/SearchResults/SearchResults'
import './bootstrap.css';
import './App.css'
import './AppPhone.css'
import './imageGallery.css'

import './components/fonts/hotelfonts.css';
import 'react-dynamic-swiper/lib/styles.css'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from "moment/moment";
import hotelListTR from '../data/hotelsTur.json'
import {withRouter} from 'react-router'
import * as actionCreators from "./redux/actions";

const startDate = moment().format('YYYY-MM-DD')
const endDate = moment().add(1, 'day').format('YYYY-MM-DD')
const adultNum = 2
const childNum = 0
const location = ''

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hotels: this.props.hotels,
            availhotel: this.props.availHotel,

        }
    }

    componentWillMount(){
        this.props.fetchHotels()
        this.props.availHotels(startDate,endDate,adultNum,childNum,location)
    }

    render() {

        return (

            <Switch>
                <Route path='/' exact component={props => <Home hotels={this.props.hotels} {...props} />}/>
                <Route path="/hotels/:id">
                    {props => {
                        const hotelDetail = this.props.hotels.find(hotel => hotel.Description === props.match.params.id)
                        var availRooms = []
                            if(this.props.availHotel && Array.isArray(this.props.availHotel)){
                                availRooms = this.props.availHotel.find(availhotel => availhotel.Description === props.match.params.id);
                                return <HotelDetail {...props} hotel={hotelDetail} avail={availRooms} />;
                            }  else if(this.props.availHotel && !Array.isArray(this.props.availHotel)){
                                availRooms = this.props.availHotel
                                return <HotelDetail {...props} hotel={hotelDetail} avail={availRooms} />;
                            }
                            else {
                                return <HotelDetail {...props} hotel={hotelDetail} avail={null} />
                            }


                    }}
                </Route>
                <Route path='/search-results' component={SearchResults} />}/>


            </Switch>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}
/* istanbul ignore next */
function mapStateToProps(state) {
    return {hotels: state.hotel.hotels,
    availHotel:state.availHotel.availHotel,
    loading:state.availHotel.loading}
}

/* istanbul ignore next */

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
