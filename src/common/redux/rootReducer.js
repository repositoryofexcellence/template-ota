import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import {hotel} from './reducers/hotel'
import {availHotel} from './reducers/availHotel'
import reducerData from "../components/searchForm/account";

export default combineReducers({
    form:formReducer,
    reducerData,
    availHotel,
    hotel,
    routing: routerReducer,

});
