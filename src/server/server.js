import 'core-js/es6/map'
import 'core-js/es6/set'
import 'raf/polyfill'

import App from '../common/App';
import React from 'react';
import express from 'express';
import theme from './theme';
import jss from './styles';
import cors from 'cors'
import {Provider} from 'react-redux';
import soap from 'soap';
import {ConnectedRouter} from 'react-router-redux'
import createServerStore from './store';
import {SheetsRegistry} from 'react-jss';
import {JssProvider} from 'react-jss';

import {MuiThemeProvider} from 'material-ui/styles';
import {renderToString} from 'react-dom/server';
import bodyParser from 'body-parser'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
// Construct a schema, using GraphQL schema language
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());
server.get(`/api/fetch-hotels`, async (req, res) => {
    const url =
        'http://api.suaytour.com:8081/altarflexxapi/altarflexxapi.AltarFlexxAPI.svc?wsdl';
    const args = {
        Parameters: {
            Language: 'TR',
            UserIdentifier: 'e4d412a7-eeae-458e-94d1-c90d898c4915',
        },
    };


    soap.createClient(url, (error, client) => {
        client.apiGetHotels(args, (err, result) => {
            res.send(result);
        });
    });
})


server.get(`/api/search-results`, async (req, res) => {
    const url =
        'http://api.suaytour.com:8081/altarflexxapi/altarflexxapi.AltarFlexxAPI.svc?wsdl';
    const args = {
        Parameters: {
            Currency: 'EUR',
            Language: 'TR',
            SearchCriteria: {
                ChildAges: null,
                ChildBirthDates: [{"sys:dateTime": req.query.childBirthDates}],
                EndDate: req.query.endDate,
                LocationName: req.query.location,
                NumberOfAdults: req.query.adultNum,
                NumberOfChildren: req.query.childNum,
                StartDate: req.query.startDate
            },
            UserIdentifier: 'e4d412a7-eeae-458e-94d1-c90d898c4915',
        },
    };

    soap.createClient(url, (error, client) => {
        client.apiGetHotelSearchResults(args, (err, result) => {
            res.send(result);
        });
    });
})


//push
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        // This is needed in order to deduplicate the injection of CSS in the page.
        const sheetsManager = new WeakMap();
        // This is needed in order to inject the critical CSS.
        // Compile an initial state
        const {store, history} = createServerStore(req.path);

        const sheetsRegistry = new SheetsRegistry();
        const markup = renderToString(
            <Provider store={store}>
                <ConnectedRouter history={history}>

                    <JssProvider registry={sheetsRegistry} jss={jss}>
                        <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
                            <App/>
                        </MuiThemeProvider>
                    </JssProvider>

                </ConnectedRouter>
            </Provider>
        );

        const css = sheetsRegistry.toString();
        res.send(
            `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Demiroğlu Reisen</title>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css?family=Mukta+Mahee:300,400,500,600,700&amp;subset=latin-ext" rel="stylesheet">
       <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        ${assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''}
        ${css ? `<style id='jss-ssr'>${css}</style>` : ''}
         ${process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
      
    </body>
</html>`
        );
    });

export default server
