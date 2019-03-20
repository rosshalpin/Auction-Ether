const IPFS = require('ipfs-http-client');
const request = require("request");

class ipfsAPI {
  
  static provider() {
    const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    return ipfs;
  }

  static get(auctionIPFS, address, auction){
    return new Promise((resolve, reject) => {
      request("https://gateway.ipfs.io/ipfs/" + auctionIPFS, { json: true }, (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          var nAuction = {
            media: body,
            scanAddress: address,
            auctionFunc: auction,
          };
          resolve(nAuction);
        }
      });
    });
  }
}

export default ipfsAPI;