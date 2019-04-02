import Web3 from "web3";
const HDWalletProvider = require('truffle-hdwallet-provider');

let web3 = null;
const test = false;

const _mnemonic = 'abstract holiday rule this panel actor winner distance example foam enlist visa'; //WERE_HIDING
const _gateway = 'e70cae671d574f388d897d913ce0f5aa';  //WERE_HIDING

class web3API {
  constructor(api){
    this.api = this.enable();
  }
  enable() {
    if(test === true){
      const provider = new HDWalletProvider(
        _mnemonic,
        'https://rinkeby.infura.io/v3/' + _gateway
      );
      web3 = new Web3(provider);
    }else{
      try{
        window.ethereum.enable();
        web3 = new Web3(window.ethereum);
      }catch(e){

      }
      
    }
    return web3;
  }
  
  static async getAuctions(ledger) {
    let acc = await web3.eth.getAccounts();
    return await ledger.methods.getAuctions()
				.call({from: acc[0]})
				.then(result => result);
  }
  
  static async getHash(auction){
    return await auction.methods
      .ipfsHash()
      .call({ from: web3.eth.getAccounts[0] })
      .then(result => result);
  }
}

export default web3API;