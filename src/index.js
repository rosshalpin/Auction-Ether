import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import exchangeAPI from './api/exchangeAPI.js';

import web3 from "./api/web3API.js";
import ipfs from './api/ipfsAPI';


ReactDOM.render(<App
                  exchangeAPI={(async()=>{return await exchangeAPI();})()}
                  web3API={web3}
                  ipfsAPI={ipfs}
                />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
