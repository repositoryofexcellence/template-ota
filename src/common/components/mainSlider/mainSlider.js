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
                        loop: true,
                    }}
                    pagination={false}
                    navigation={false}
                    className="slider-main-mobile-inner"
                >
                    <Slide>
                        <div style={{backgroundPosition:'50%',opacity:0.5,height:400,backgroundSize: "cover",backgroundImage: `url("http://www.sahinnparadise.com/Uploaded/Content/c65de6c0-0f65-4d66-b274-1326e5d2e87a.jpg")`}}></div>
                    </Slide>
                    <Slide>
                        <div style={{backgroundPosition:'50%',opacity:0.5,height:400,backgroundSize: "cover",backgroundImage: `url("http://www.sahinnparadise.com/Uploaded/Content/7bdc37ed-bbf5-44e0-b179-53661a20435b.jpg")`}}></div>
                    </Slide>

                </Swiper>
            <Swiper
                swiperOptions={{
                    slidesPerView: 1,
                    spaceBetween: 0,
                    freeMode: false,
                    autoplay: 3000,
                    loop: true,
                }}
                className="slider-main-desktop-inner"
                pagination={false}
                navigation={false}
            >
                <Slide>
                    <div style={{backgroundPosition:'50%',opacity:0.5,height:700,backgroundSize: "cover",backgroundImage: `url("http://www.sahinnparadise.com/Uploaded/Content/c65de6c0-0f65-4d66-b274-1326e5d2e87a.jpg")`}}></div>
                </Slide>
                <Slide>
                    <div style={{backgroundPosition:'50%',opacity:0.5,height:700,backgroundSize: "cover",backgroundImage: `url("http://www.sahinnparadise.com/Uploaded/Content/7bdc37ed-bbf5-44e0-b179-53661a20435b.jpg")`}}></div>
                </Slide>

            </Swiper>
                <div className="main-title">{this.props.children}</div>
            </div>
        )
    }
}

export default MainSlider