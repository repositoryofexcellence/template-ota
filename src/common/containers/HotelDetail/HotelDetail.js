import React, {Component} from 'react'
import {withRouter} from 'react-router'
import Header from '../../components/header/header'
import SearchFormDetail from '../../components/searchForm/SearchForm'
import Slider from "react-slick";
import Tabs, {Tab} from 'material-ui/Tabs';
import classnames from 'classnames';
import {Swiper, Slide} from 'react-dynamic-swiper'
import {Grid, Row, Col, Container} from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import * as actions from "../../redux/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Card, {CardContent, CardMedia, CardActions} from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const params = {v: '3.exp', key: 'AIzaSyD1zi-3_-hEhcE_BaC4dezdsAEKZ9LGZKY'};

class MiniMap extends React.Component {

    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onDragEnd(e) {
        console.log('onDragEnd', e);
    }

    onCloseClick() {
        console.log('onCloseClick');
    }

    onClick(e) {
        console.log('onClick', e);
    }

    render() {
        return (
            <Gmaps
                width={'100%'}
                height={'400px'}
                lat={this.props.lati}
                lng={this.props.long}
                zoom={8}
                params={params}
                onMapCreated={this.onMapCreated}>
                <Marker
                    lat={this.props.lati}
                    lng={this.props.long}
                    draggable={true}
                    onDragEnd={this.onDragEnd}/>
            </Gmaps>
        );
    }

};

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit * 3,
        backgroundColor: "blue",
    },
    card: {
        marginTop: 20,
        marginBottom: 20
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 300,
        height: 200,
        float: 'left'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    actions: {
        width: '100% !important'
    },
    expand: {

        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    button: {
        width: '100%'
    },
    expandOpen: {},
});


class HotelDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            nav1: null,
            nav2: null,
            expanded: false
        };
    }

    componentDidUpdate() {

        this.props.actions.availHotel

    }

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    };
    handleChange = (event, value) => {
        this.setState({value});
    };

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        const {Description, ImageURL, HotelInformations, Latitude, Longitude, PensionTypes} = this.props.hotel


        return (
            <div>
                <Header/>
                <div className="jumbotron topJumbo">
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <SearchFormDetail className="search-form-detail"/>
                            </Col>
                        </Row>

                    </Grid>
                </div>
                <Grid>
                    <Row>

                        <div className="col-md-4 detail-side-bar">
                            {this.props.avail ?
                                <div>
                                    <div>
                                        {this.props.avail.RoomTypes ? this.props.avail.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net + '€' : ''}</div>


                                    <h2>{Description}</h2></div> : ''}
                        </div>
                        <div className="col-md-8">
                            <Slider
                                ref={slider => (this.slider1 = slider)}
                                asNavFor={this.state.nav2}
                            >{ImageURL["string"].map(slide => {
                                return (
                                    <div>
                                        <div style={{
                                            borderRadius: 4,
                                            height: 400,
                                            backgroundImage: `url(${slide})`,
                                            backgroundSize: "cover"
                                        }}></div>
                                    </div>
                                )
                            })}

                            </Slider>
                            <Slider
                                ref={slider => (this.slider2 = slider)}
                                slidesToShow={8}
                                asNavFor={this.state.nav1}
                                swipeToSlide={true}
                                focusOnSelect={true}
                            >{ImageURL["string"].map(slide => {
                                return (
                                    <div>
                                        <div style={{
                                            borderRadius: 4,
                                            margin: 5,
                                            height: 60,
                                            backgroundImage: `url(${slide})`,
                                            backgroundSize: "cover"
                                        }}></div>
                                    </div>
                                )
                            })}
                            </Slider>

                        </div>

                        <Col xs={12} md={12}>
                            <h2>Odalar</h2>
                            <Divider/>
                        </Col>


                        {
                            this.props.avail ?
                                this.props.avail.RoomTypes.apiHotelRoomTypeInfo.map((room, i) => {
                                    return (

                                        <Col xs={12} md={4}>
                                            <div className="room-grid">
                                                <div className="hotel-card">

                                                    <Swiper
                                                        swiperOptions={{
                                                            slidesPerView: 1,
                                                            spaceBetween: 15,
                                                            freeMode: false,


                                                        }}
                                                        pagination={false}

                                                    >
                                                        {room.ImageURL && Array.isArray(room.ImageURL["string"]) ? room.ImageURL["string"].map(r => {

                                                            return (
                                                                <Slide>
                                                                    <div className="hotel-card-media" style={{

                                                                        height: 250,
                                                                        backgroundImage: `url(${r}.jpg)`,
                                                                        backgroundSize: "cover"
                                                                    }}>

                                                                    </div>
                                                                </Slide>
                                                            )
                                                        }) : room.ImageURL && !Array.isArray(room.ImageURL["string"]) ?
                                                            <Slide>
                                                                <div className="hotel-card-media" style={{

                                                                    height: 250,
                                                                    backgroundImage: `url(${room.ImageURL["string"]}.jpg)`,
                                                                    backgroundSize: "cover"
                                                                }}>

                                                                </div>
                                                            </Slide>
                                                            : ''}

                                                    </Swiper>
                                                    <div className="room-card-top-content">
                                                        <div className="room-pension">
                                                            {PensionTypes["string"] + " - "}
                                                        </div>
                                                        <div
                                                            className="room-price">{room.Pricings.apiHotelPricingInfo.TotalPrice.Net} EUR
                                                        </div>
                                                    </div>

                                                    <div className="hotel-card-content">
                                                        <div className="hotel-title">
                                                            {room.Name}
                                                        </div>
                                                        <div className="hotel-place">
                                                            <p dangerouslySetInnerHTML={{__html: room.Description}}/>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </Col>

                                    )
                                }) : ''}


                    </Row>
                </Grid>


                <Grid>
                    <Row>

                        <Col xs={12} md={12}>
                            <h2>Tesisin Konumu</h2>

                            <MiniMap
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1zi-3_-hEhcE_BaC4dezdsAEKZ9LGZKY&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{height: `100%`}}/>}
                                containerElement={<div style={{height: `400px`}}/>}
                                mapElement={<div style={{height: `100%`}}/>}
                                lati={Latitude}
                                long={Longitude}
                            />
                        </Col>
                    </Row>
                </Grid>


                <Grid>
                    <Row>
                        <Col md={12}>
                            <h2>Otel Bilgileri</h2>
                            <Divider/>
                        </Col>
                        {HotelInformations ? HotelInformations["apiHotelInformationInfo"].map(hotelInfo => {


                            return (


                                <Col md={6}>
                                    <div className="info-panel">
                                    <div className="info-content">
                                        <h3 dangerouslySetInnerHTML={{__html: hotelInfo.Header}}/>
                                        <Divider/>
                                        <div className="hotelInfo" style={{paddingTop: 20, paddingBottom: 20}}
                                             dangerouslySetInnerHTML={{__html: hotelInfo.Text}}/>
                                    </div>
                                    </div>
                                </Col>


                            )
                        }) : <div className="col-md-6"><h3>Otel Bilgileri</h3>
                            <Divider/><p>Otelin bilgileri henüz oluşturulma aşamasındadır</p>
                        </div>}

                    </Row>
                </Grid>
            </div>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...actions}, dispatch)
    };
}

export default withRouter(withStyles(styles, {withTheme: true})(connect(
    mapDispatchToProps
)(HotelDetail)));