const request = require("request");

class exchangeAPI {

  static handle(){
    return new Promise((resolve, reject) => {
      request("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR", { json: true }, (err, res, body) => {
        if (err) {
          reject(err);
        }else {
          resolve(body.EUR);
        }
      });
    });
  }
}
 
export default exchangeAPI.handle;