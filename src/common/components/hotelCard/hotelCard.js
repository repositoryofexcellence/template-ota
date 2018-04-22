import React, {Component} from 'react'
import PropTypes from 'prop-types';



class HotelCard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {hotelImage, hotelRating,hotelPlace,hotelPension, hotelName,minPrice} = this.props;
        return (

            <div className="hotel-card">
                <div className="hotel-card-media"

                     style={{
                         height: 250,
                         backgroundImage: `url(${hotelImage})`,
                         backgroundSize: "cover"}}>
                    <div className="hotel-card-top-content">
                    <div className="hotel-pension">
                        {hotelPension}
                    </div>
                    <div className="hotel-price">{minPrice} EUR</div>
                    </div>
                </div>
                    <div className="hotel-card-content">
                        <div className="hotel-title">
                            {hotelName}
                        </div>
                        <div className="hotel-rating">
                            {hotelRating}
                        </div>
                        <div className="hotel-place">
                            {hotelPlace}
                        </div>

                    </div>
                </div>
        )
    }
}



export default HotelCard;

