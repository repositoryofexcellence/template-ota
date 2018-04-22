import hotelList from '../../../data/hotelsTur.json'

const initialState = {
    hotels: hotelList.Hotels
};

export function hotel(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
