import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import {hotel} from './reducers/hotel'
import {availHotel} from './reducers/availHotel'
import {autoSuggest} from './reducers/autoSuggest'
import {staticState} from './reducers/staticState'
import {adultNum} from "./reducers/adultNumber";
import reducerData from "../components/searchForm/account";

export default combineReducers({
    form:formReducer,
    reducerData,
    adultNum,
    autoSuggest,
    availHotel,
    hotel,
    staticState,
    routing: routerReducer,

});
