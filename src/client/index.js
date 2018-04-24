import 'core-js/es6/map'
import 'core-js/es6/set'
import 'raf/polyfill'

import React from 'react';
import {hydrate} from 'react-dom';
import theme from '../server/theme';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import store, { history } from '../common/store/configure-store';
import {MuiThemeProvider} from 'material-ui/styles';
import App from '../common/App';

// This is needed in order to deduplicate the injection of CSS in the page.

class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return <App {...this.props} />
    }
}

hydrate(

        <Provider store={store}>
            <ConnectedRouter history={history}>
                <BrowserRouter>
                    <MuiThemeProvider theme={theme}>
                    <Main/>
                    </MuiThemeProvider>
                </BrowserRouter>
            </ConnectedRouter>
        </Provider>,
    document.querySelector('#root'),
);

if (module.hot) {
    module.hot.accept();
}
