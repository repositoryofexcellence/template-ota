import React from 'react'
import {Swiper, Slide} from 'react-dynamic-swiper'

class MainSlider extends React.Component{
    render(){
        return(
            <div className="main-container">
            <Swiper
                swiperOptions={{
                    slidesPerView: 1,
                    spaceBetween: 0,
                    freeMode: false,
                    autoplay: 3000,
                    effect: 'fade',
                    loop: true,
                }}
                pagination={false}
                navigation={false}
            >
                <Slide>
                    <div style={{backgroundPosition:'50%',height:500,backgroundSize: "cover",backgroundImage: `url("http://gallery.suaytour.com/UploadedFiles/Hotel/2e32b487-c2d7-476f-b361-872d718efd4b.jpg")`}}></div>
                </Slide>
                <Slide>
                    <div style={{backgroundPosition:'50%',height:500,backgroundSize: "cover",backgroundImage: `url("http://gallery.suaytour.com/UploadedFiles/Hotel/2e790473-71e7-40db-b032-985b82f302f0.jpg")`}}></div>
                </Slide>

            </Swiper>
                <div className="main-title">{this.props.children}</div>
            </div>
        )
    }
}

export default MainSlider