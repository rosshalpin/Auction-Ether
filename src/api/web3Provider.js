import Web3 from "web3";
const HDWalletProvider = require('truffle-hdwallet-provider');

window.ethereum.enable();
let web3 = new Web3(window.ethereum);
const test = false;

if(test === true){
  const provider = new HDWalletProvider(
    '<REDACTED>',
    'https://rinkeby.infura.io/v3/<REDACTED>'
  );
  web3 = new Web3(provider);
}

export {web3}
