class ipfsAPI {

  static get(auctionIPFS, address, auction){
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        var nAuction = {
          media: "body",
          scanAddress: "address",
          auctionFunc: "auctionFunc",
        };
        resolve(nAuction);

      },1000);

    });
  }
}

export default ipfsAPI.get;