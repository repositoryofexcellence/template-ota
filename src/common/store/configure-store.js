import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../redux/rootReducer';
import {createLogger} from 'redux-logger'

export const history = createHistory();
const logger = createLogger()
export const initialState = {};
const enhancers = [];
const middleware = [thunk, logger, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());

    }
}


const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
