import React, {Component} from 'react'
import Header from '../../components/header/header'
import SearchFormDetail from '../../components/searchForm/SearchForm'

import ImageGallery from 'react-image-gallery';
import HotelCard from '../../components/hotelCard/hotelCard'
import MyLoader from '../../components/skeleton/skeleton'

import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

import {Grid, Row, Col} from 'react-styled-flexboxgrid';
import Divider from 'material-ui/Divider';
import * as actionCreators from "../../redux/actions/index";
import {bindActionCreators} from "redux";
import {Star} from 'material-ui-icons';

import {connect} from "react-redux";
import {Gmaps, Marker} from 'react-gmaps';
import removeDuplicates from "removeduplicates";

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
            allRoom: this.props.avail ? this.props.avail.RoomTypes.apiHotelRoomTypeInfo : null,
            allRooms: null,
            roomArray: []
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
        this.props.restoreRedirect()
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2,

        });

    }


    render() {
        var unique = []
        var all = []
        var uniqueNot =[]
        if (this.state.allRoom !== null) {

            if(Array.isArray(this.state.allRoom))
            {
                unique = this.state.allRoom.concat(this.props.hotel.RoomTypes.apiHotelRoomTypeInfo);
                all = removeDuplicates(unique, 'Name')
            }
            else if (!Array.isArray(this.state.allRoom)) {
                uniqueNot = [
                    this.state.allRoom
                ]
                unique = uniqueNot.concat(this.props.hotel.RoomTypes.apiHotelRoomTypeInfo);
                all = removeDuplicates(unique, 'Name')
            }


            console.log(all)
        }
        const {Description, Region, DistanceToAirport, DistanceToCenter, RoomTypes, ImageURL, CheckInTime, CheckOutTime, HotelInformations, Place, Latitude, Longitude, PensionTypes, Rating, HotelFacilities} = this.props.hotel
        var ratings = []
        let i = 0
        for (i; i < Rating; i++) {
            ratings.push(<Star/>)
        }
        let imageSlide = []

        ImageURL["string"].map(imgs => {

            imageSlide.push(
                {
                    original: imgs,
                    thumbnail: imgs,
                    originalClass: 'fullScreenSlide',
                    thumbnailClass: 'fullScreenThumb',
                }
            )
        })


        return (
            <div>
                <Header/>


                <Grid>
                    <div className="search-component">
                        <Grid>
                            <Row>
                                <Col md={12}>
                                    {this.props.loading ?
                                        <SearchFormDetail onSubmit={this.noSubmit} className="search-form"/>
                                        : <SearchFormDetail onSubmit={this.submit} className="search-form"/>}

                                </Col>
                            </Row>
                        </Grid>
                    </div>
                    <Row className="detail-row">


                        <Col xs={12} md={8}>

                            <ImageGallery additionalClass="app-image-gallery" showPlayButton={false} sizes={300}
                                          items={imageSlide}/>
                        </Col>
                        <Col xs={false} md={4}>

                            <div className="detail-side-bar">
                                <div className="detail-container">
                                    <div className="detail-place">{Place} / {Region} </div>
                                    <div className="hotel-rating-detail">{ratings}</div>
                                    <h2 className="detail-title">{Description? Description :''}</h2>
                                    <div className="detail-place">Pansiyon
                                        Türleri {Array.isArray(PensionTypes["string"]) ? PensionTypes["string"].map(pension => {
                                            return (
                                                <div>
                                                    - {pension}
                                                </div>
                                            )

                                        }) : Array.isArray(PensionTypes["string"]) ?
                                            <div>{PensionTypes["string"]}</div> : ''}</div>
                                    <div className="detail-place">Otele Giriş Saati
                                        <div> {CheckInTime}</div>
                                    </div>
                                    <div className="detail-place">Otelden Çıkış Saati
                                        <div> {CheckOutTime}</div>
                                    </div>
                                    <div className="detail-place">Havaalanına Uzaklık
                                        <div> {DistanceToAirport} km</div>
                                    </div>
                                    <div className="detail-place">Merkeze Uzaklık
                                        <div> {DistanceToCenter} km</div>
                                    </div>
                                    <div className="detail-place-price">En Düşük Fiyat</div>
                                    <button className="detail-form-button" type="submit">{this.props.avail ?

                                        <div>{Array.isArray(this.props.avail.RoomTypes.apiHotelRoomTypeInfo) ? this.props.avail.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net + ' EUR'
                                            : !Array.isArray(this.props.avail.RoomTypes.apiHotelRoomTypeInfo) ? this.props.avail.RoomTypes.apiHotelRoomTypeInfo.Pricings.apiHotelPricingInfo.TotalPrice.Net + ' EUR' : ''
                                        }</div>

                                        : ''}
                                    </button>

                                </div>
                            </div>
                        </Col>
                        {/*<Col md={4}>

                            <div>

                                <div className="detail-left">
                                    <h2 className="detail-title">{Description}</h2>
                                    <div className="hotel-rating-detail">{ratings}
                                        <div className="detail-price">
                                            {this.props.avail ?

                                                <div>{Array.isArray(this.props.avail.RoomTypes.apiHotelRoomTypeInfo) ? this.props.avail.RoomTypes.apiHotelRoomTypeInfo[0].Pricings.apiHotelPricingInfo.TotalPrice.Net + 'EUR'
                                                    : !Array.isArray(this.props.avail.RoomTypes.apiHotelRoomTypeInfo) ? this.props.avail.RoomTypes.apiHotelRoomTypeInfo.Pricings.apiHotelPricingInfo.TotalPrice.Net + 'EUR' : ''
                                                }</div>

                                                : ''}


                                        </div>
                                    </div>

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


                        </Col>*/}
                        <Col xs={12} md={12}>
                            <h2>Odalar</h2>

                        </Col>

                        <Grid>

                            {this.props.loading ? <Row><Col md={3}><MyLoader/></Col><Col md={3}><MyLoader/></Col>
                                    <Col md={3}><MyLoader/></Col> <Col md={3}><MyLoader/></Col></Row> :

                                <Row>

                                    {all !== null ? all.map((room,i) => {
                                        if (!room.Pricings && room.Pricings === null) {
                                            return (
                                                <Col xs={12} key={i} sm={12} md={3}>
                                                    <div className="hotel-card unavailHotel">
                                                        <div className="hotel-card-media"

                                                             style={{
                                                                 height: 250,
                                                                 backgroundImage: `url(${Array.isArray(room.ImageURL) && room.ImageURL !== null ? room.ImageURL["string"] + '.jpg'
                                                                     : !Array.isArray(room.ImageURL) && room.ImageURL !== null && !room.ImageURL["string"][0].includes(".jpg") ? room.ImageURL["string"][0] + '.jpg'
                                                                         : !Array.isArray(room.ImageURL) && room.ImageURL !== null && room.ImageURL["string"][0].includes(".jpg")  ? room.ImageURL["string"][0]

                                                                             :!Array.isArray(room.ImageURL)&& room.ImageURL === null ? 'dsad' : ''})`,
                                                                 backgroundSize: "cover"}}>

                                                        </div>
                                                        <div className="hotel-card-content">
                                                            <div className="hotel-title">
                                                                {room.Name}
                                                            </div>
                                                            <div className="hotel-price"><div>Müsait Değildir</div></div>

                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        }
                                        else if (room.Pricings && room.Pricings !== null && room.Pricings.apiHotelPricingInfo.StopDates !== null) {
                                            return (

                                                <Col xs={12} key={i} sm={12} md={3}>
                                                    <div className="hotel-card unavailHotel">
                                                        <div className="hotel-card-media"

                                                             style={{
                                                                 height: 250,
                                                                 backgroundImage: `url(${Array.isArray(room.ImageURL) && room.ImageURL !== null ? room.ImageURL["string"] + '.jpg'
                                                                     : !Array.isArray(room.ImageURL) && room.ImageURL !== null && !room.ImageURL["string"][0].includes(".jpg") ? room.ImageURL["string"][0] + '.jpg'
                                                                         : !Array.isArray(room.ImageURL) && room.ImageURL !== null && room.ImageURL["string"][0].includes(".jpg")  ? room.ImageURL["string"][0]

                                                                             :!Array.isArray(room.ImageURL)&& room.ImageURL === null ? 'dsad' : ''})`,
                                                                 backgroundSize: "cover"}}>

                                                        </div>
                                                        <div className="hotel-card-content">
                                                            <div className="hotel-title">
                                                                {room.Name}
                                                            </div>
                                                            <div className="hotel-price"><div>Müsait Değildir</div></div>

                                                        </div>
                                                    </div>
                                                   </Col>)
                                        }
                                        else if (room.Pricings && room.Pricings !== null ) {
                                            return (
                                                <Col xs={12} key={i} sm={12} md={3}>
                                                    <HotelCard
                                                        hotelImage={Array.isArray(room.ImageURL) && room.ImageURL !== null ? room.ImageURL["string"] + '.jpg'
                                                            : !Array.isArray(room.ImageURL) && room.ImageURL !== null ? room.ImageURL["string"][0] + '.jpg'

                                                                :!Array.isArray(room.ImageURL)&& room.ImageURL === null ? 'dsad' : ''}
                                                        hotelName={room.Name}
                                                        hotelRating={null}
                                                        hotelPlace={null}
                                                        hotelPension={null}
                                                        minPrice={room.Pricings.apiHotelPricingInfo.TotalPrice ? room.Pricings.apiHotelPricingInfo.TotalPrice.Net : ''}
                                                    /> </Col>)
                                        }
                                    }) : <div>yok</div>}
                                </Row>}


                        </Grid>

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
                        <Col  xs={12} md={12}>
                            <h2>Otel Bilgileri</h2>
                            <Divider/>
                        </Col>
                        {HotelInformations ? HotelInformations["apiHotelInformationInfo"].map(hotelInfo => {


                            return (


                                <Col  xs={12} md={6}>
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
        availHotel: state.availHotel.availHotel,
        loading: state.availHotel.loading,
        redirect: state.availHotel.redirect
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(HotelDetail);