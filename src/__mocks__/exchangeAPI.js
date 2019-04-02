class exchangeAPI {

  static handle(){
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(128.2);
      }, 1000)
    });
  }
}
 
export default exchangeAPI.handle;