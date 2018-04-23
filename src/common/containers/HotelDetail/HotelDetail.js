import React, {Component} from 'react'
import {withRouter} from 'react-router'
import Header from '../../components/header/header'
import SearchFormDetail from '../../components/searchForm/SearchForm'
import Slider from "react-slick";
import Tabs, {Tab} from 'material-ui/Tabs';
import classnames from 'classnames';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import {Swiper, Slide} from 'react-dynamic-swiper'
import {Grid, Row, Col} from 'react-styled-flexboxgrid';
import Divider from 'material-ui/Divider';
import * as actions from "../../redux/actions";
import {bindActionCreators} from "redux";
import {Star} from 'material-ui-icons';

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
        fab: {
            margin: theme.spacing.unit * 2,
        },
        absolute: {
            position: 'absolute',
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 3,
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
const HotelIcon = (props) => (
    <Tooltip id="tooltip-fab" title={props.iconTitle}>
        <IconButton style={{backgroundColor:"#2a98d8"}} aria-label={props.iconTitle}>
            <i  title="" className={`icon-hotel-icon-${props.iconName} circle`}></i>
        </IconButton>
    </Tooltip>

)

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
            nav2: this.slider2,

        });
    }

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        const {Description, ImageURL, HotelInformations, Latitude, Longitude, PensionTypes, Rating,HotelFacilities} = this.props.hotel
        var ratings = []
        let i = 0
        for (i; i < Rating; i++) {
            ratings.push(<Star/>)
        }
        return (
            <div>
                <Header/>
                <div className="jumbotron">
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


                        <Col md={8}>
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

                        </Col>
                        <Col md={4}>

                                <div>

                                    <div className="detail-left">
                                    <h2 className="detail-title">{Description}</h2>
                                    <div className="hotel-rating-detail">{ratings}  {this.props.avail ?<div className="detail-price">
                                        {this.props.avail.RoomTypes ? this.props.avail.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net + 'EUR' : ''}
                                    </div> : ''}</div>

                                    </div>
                                    <div className="detail-left-bottom">
                                        <h3 className="detail-title">Otel Özellikleri</h3>
                                        <div className="hotelFac">{HotelFacilities != null ? HotelFacilities["string"].map(facility =>{
                                            let fac = ''
                                            if (facility === "Televiziyon"){
                                               fac = <HotelIcon iconTitle={facility} iconName="television"/>
                                            }
                                            else if (facility === "Yuzme Havuzu"){
                                                fac = <HotelIcon iconTitle={facility} iconName="swimmingPool"/>
                                            }
                                            else if (facility === "WI-FI Internet"){
                                                fac = <HotelIcon iconTitle={facility} iconName="wifi"/>
                                            }
                                            else if (facility === "Klima"){
                                                fac = <HotelIcon iconTitle={facility} iconName="airConditioning"/>
                                            }
                                            else if (facility === "Deniz"){
                                                fac = <HotelIcon iconTitle={facility} iconName="beach"/>
                                            }
                                            else if (facility === "Oda Servisi"){
                                                fac = <HotelIcon iconTitle={facility} iconName="breakfast"/>
                                            }
                                            else if (facility === "Animasyon"){
                                                fac = <HotelIcon iconTitle={facility} iconName="entertainment"/>
                                            }
                                            else if (facility === "Kafeterya"){
                                                fac = <HotelIcon iconTitle={facility} iconName="coffee"/>
                                            }
                                            else if (facility === "Fotograf Servisi"){
                                                fac = <HotelIcon iconTitle={facility} iconName="camera2"/>
                                            }
                                            else if (facility === "Mescid"){
                                                fac = <HotelIcon iconTitle={facility} iconName="mosque"/>
                                            }
                                            else if (facility === "Spa"){
                                                fac = <HotelIcon iconTitle={facility} iconName="spa"/>
                                            }
                                            else if (facility === "Ottopark"){
                                                fac = <HotelIcon iconTitle={facility} iconName="parking"/>
                                            }
                                            else if (facility === "Otopark"){
                                                fac = <HotelIcon iconTitle={facility} iconName="parking"/>
                                            }
                                            else if (facility === "Fitness Salonu"){
                                                fac = <HotelIcon iconTitle={facility} iconName="fitness"/>
                                            }
                                            else if (facility === "Su Sporlari"){
                                                fac = <HotelIcon iconTitle={facility} iconName="sailing"/>
                                            }
                                            else if (facility === "Transfer Servisi"){
                                                fac = <HotelIcon iconTitle={facility} iconName="airplane"/>
                                            }
                                            else if (facility === "Çamaşır Servisi"){
                                                fac = <HotelIcon iconTitle={facility} iconName="washingMachine"/>
                                            }
                                            else if (facility === "tenis kortu"){
                                                fac = <HotelIcon iconTitle={facility} iconName="tennis"/>
                                            }
                                            else if (facility === "Halı Saha"){
                                                fac = <HotelIcon iconTitle={facility} iconName="football"/>
                                            }
                                            else if (facility === "Alışveriş İmkanı"){
                                                fac = <HotelIcon iconTitle={facility} iconName="package"/>
                                            }
                                            else if (facility === "Oyun Salonu"){
                                                fac = <HotelIcon iconTitle={facility} iconName="video"/>
                                            }
                                            else if (facility === "Uyandırma Servisi"){
                                                fac = <HotelIcon iconTitle={facility} iconName="wakeupService"/>
                                            }
                                            else {
                                                return ''
                                            }
                                            return(
                                                <div className="hotelFacDet">{fac}</div>
                                            )
                                        }):<p>Otel özellikleri henüz sisteme yüklenmemiştir</p>}</div>
                                    </div>
                                </div>



                        </Col>
                        <Col xs={12} md={12}>
                            <h2>Odalar</h2>
                            <Divider/>
                        </Col>


                        {
                            this.props.avail ?
                                this.props.avail.RoomTypes.apiHotelRoomTypeInfo.map((room, i) => {
                                    return (

                                        <Col className="room-grid" xs={12} md={4}>

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


                                        </Col>

                                    )
                                }) : ''}


                    </Row>
                </Grid>


                <Grid>
                    <Row>

                        <Col xs={12} md={12}>
                            <h2>Tesisin Konumu</h2>
                            <Divider/>
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