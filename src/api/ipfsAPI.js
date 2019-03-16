const IPFS = require('ipfs-http-client');

class ipfsAPI {
  
  static provider = () => {
    const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    return ipfs;
  }
  

}

export default ipfsAPI;