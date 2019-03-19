import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import exchangeAPI from './api/exchangeAPI.js';
import contract from "./contract";
import web3API from "./api/web3API.js";

async function getExchange(){
  return await exchangeAPI();	
}

async function getAuctions(){
  return await web3API.getAuctions(contract.ledger);
}

ReactDOM.render(<App exchangeAPI={getExchange()} auctions={getAuctions()}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
