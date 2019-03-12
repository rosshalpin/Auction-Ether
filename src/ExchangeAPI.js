const request = require("request");

let handle = async () => {
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
 
export default handle