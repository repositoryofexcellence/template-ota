import React, {Component} from 'react'
import Header from '../../components/header/header'
import SearchFormDetail from '../../components/searchForm/SearchForm'
import Slider from "react-slick";

import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import {Swiper, Slide} from 'react-dynamic-swiper'
import {Grid, Row, Col} from 'react-styled-flexboxgrid';
import Divider from 'material-ui/Divider';
import * as actionCreators from "../../redux/actions/index";
import {bindActionCreators} from "redux";
import {Star} from 'material-ui-icons';

import {connect} from "react-redux";
import {Gmaps, Marker} from 'react-gmaps';

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

const HotelIcon = (props) => (
    <Tooltip id="tooltip-fab" title={props.iconTitle}>
        <IconButton style={{backgroundColor: "#2a98d8"}} aria-label={props.iconTitle}>
            <i title="" className={`icon-hotel-icon-${props.iconName} circle`}></i>
        </IconButton>
    </Tooltip>

)

class HotelDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

            nav1: null,
            nav2: null,

        };
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



    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2,

        });
    }

    render() {

        const {Description, ImageURL, HotelInformations, Latitude, Longitude, PensionTypes, Rating, HotelFacilities} = this.props.hotel
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
                                <SearchFormDetail onSubmit={this.submit} className="search-form-detail"/>
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
                                    <div className="hotel-rating-detail">{ratings}
                                        <div className="detail-price">
                                            {this.props.avail ?

                                                    <div>{Array.isArray(this.props.avail.RoomTypes.apiHotelRoomTypeInfo) ? this.props.avail.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net + 'EUR'
                                                    : !Array.isArray(this.props.avail.RoomTypes.apiHotelRoomTypeInfo) ? this.props.avail.RoomTypes.apiHotelRoomTypeInfo.Pricings.apiHotelPricingInfo.TotalPrice.Net + 'EUR' :''
                                                    }</div>

                                            :''}


                                        </div> </div>

                                </div>
                                <div className="detail-left-bottom">
                                    <h3 className="detail-title">Otel Özellikleri</h3>
                                    <div
                                        className="hotelFac">{HotelFacilities != null ? HotelFacilities["string"].map(facility => {
                                        let fac = ''
                                        if (facility === "Televiziyon") {
                                            fac = <HotelIcon iconTitle={facility} iconName="television"/>
                                        }
                                        else if (facility === "Yuzme Havuzu") {
                                            fac = <HotelIcon iconTitle={facility} iconName="swimmingPool"/>
                                        }
                                        else if (facility === "WI-FI Internet") {
                                            fac = <HotelIcon iconTitle={facility} iconName="wifi"/>
                                        }
                                        else if (facility === "Klima") {
                                            fac = <HotelIcon iconTitle={facility} iconName="airConditioning"/>
                                        }
                                        else if (facility === "Deniz") {
                                            fac = <HotelIcon iconTitle={facility} iconName="beach"/>
                                        }
                                        else if (facility === "Oda Servisi") {
                                            fac = <HotelIcon iconTitle={facility} iconName="breakfast"/>
                                        }
                                        else if (facility === "Animasyon") {
                                            fac = <HotelIcon iconTitle={facility} iconName="entertainment"/>
                                        }
                                        else if (facility === "Kafeterya") {
                                            fac = <HotelIcon iconTitle={facility} iconName="coffee"/>
                                        }
                                        else if (facility === "Fotograf Servisi") {
                                            fac = <HotelIcon iconTitle={facility} iconName="camera2"/>
                                        }
                                        else if (facility === "Mescid") {
                                            fac = <HotelIcon iconTitle={facility} iconName="mosque"/>
                                        }
                                        else if (facility === "Spa") {
                                            fac = <HotelIcon iconTitle={facility} iconName="spa"/>
                                        }
                                        else if (facility === "Ottopark") {
                                            fac = <HotelIcon iconTitle={facility} iconName="parking"/>
                                        }
                                        else if (facility === "Otopark") {
                                            fac = <HotelIcon iconTitle={facility} iconName="parking"/>
                                        }
                                        else if (facility === "Fitness Salonu") {
                                            fac = <HotelIcon iconTitle={facility} iconName="fitness"/>
                                        }
                                        else if (facility === "Su Sporlari") {
                                            fac = <HotelIcon iconTitle={facility} iconName="sailing"/>
                                        }
                                        else if (facility === "Transfer Servisi") {
                                            fac = <HotelIcon iconTitle={facility} iconName="airplane"/>
                                        }
                                        else if (facility === "Çamaşır Servisi") {
                                            fac = <HotelIcon iconTitle={facility} iconName="washingMachine"/>
                                        }
                                        else if (facility === "tenis kortu") {
                                            fac = <HotelIcon iconTitle={facility} iconName="tennis"/>
                                        }
                                        else if (facility === "Halı Saha") {
                                            fac = <HotelIcon iconTitle={facility} iconName="football"/>
                                        }
                                        else if (facility === "Alışveriş İmkanı") {
                                            fac = <HotelIcon iconTitle={facility} iconName="package"/>
                                        }
                                        else if (facility === "Oyun Salonu") {
                                            fac = <HotelIcon iconTitle={facility} iconName="video"/>
                                        }
                                        else if (facility === "Uyandırma Servisi") {
                                            fac = <HotelIcon iconTitle={facility} iconName="wakeupService"/>
                                        }
                                        else {
                                            return ''
                                        }
                                        return (
                                            <div className="hotelFacDet">{fac}</div>
                                        )
                                    }) : <p>Otel özellikleri henüz sisteme yüklenmemiştir</p>}</div>
                                </div>
                            </div>


                        </Col>
                        <Col xs={12} md={12}>
                            <h2>Odalar</h2>
                            <Divider/>
                        </Col>

                        <Grid>
                        {this.props.avail ?
                        <Row>{Array.isArray(this.props.avail.RoomTypes.apiHotelRoomTypeInfo) ?
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
                            }) :
                            !Array.isArray(this.props.avail.RoomTypes.apiHotelRoomTypeInfo) ?

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
                                            {this.props.avail.RoomTypes.apiHotelRoomTypeInfo.ImageURL && Array.isArray(this.props.avail.RoomTypes.apiHotelRoomTypeInfo.ImageURL["string"]) ? this.props.avail.RoomTypes.apiHotelRoomTypeInfo.ImageURL["string"].map(r => {

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
                                            }) : this.props.avail.RoomTypes.apiHotelRoomTypeInfo.ImageURL && !Array.isArray(this.props.avail.RoomTypes.apiHotelRoomTypeInfo.ImageURL["string"]) ?
                                                <Slide>
                                                    <div className="hotel-card-media" style={{

                                                        height: 250,
                                                        backgroundImage: `url(${this.props.avail.RoomTypes.apiHotelRoomTypeInfo.ImageURL["string"]}.jpg)`,
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
                                                className="room-price">{this.props.avail.RoomTypes.apiHotelRoomTypeInfo.Pricings.apiHotelPricingInfo.TotalPrice.Net} EUR
                                            </div>
                                        </div>

                                        <div className="hotel-card-content">
                                            <div className="hotel-title">
                                                {this.props.avail.RoomTypes.apiHotelRoomTypeInfo.Name}
                                            </div>
                                            <div className="hotel-place">
                                                <p dangerouslySetInnerHTML={{__html: this.props.avail.RoomTypes.apiHotelRoomTypeInfo.Description}}/>
                                            </div>

                                        </div>
                                    </div>


                                </Col>

                       :'' }
                            </Row>
                            :''}</Grid>

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
    return bindActionCreators(actionCreators, dispatch)
}

function mapStateToProps(state) {
    return {
        availHotel: state.availHotel,
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(HotelDetail);