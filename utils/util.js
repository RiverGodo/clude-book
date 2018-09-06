const baseUrl = "https://m.yaojunrong.com"

const fetch = {
  http(url, method, data){
    return new Promise((resolve,reject)=>{
     let token = wx.setStorageSync('token')

      let header ={
        
        'content-type': "application/json"
      
      }
      if(token){
        header.token = token
      }

      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        success(res) {
          console.log(res)
          if(res.header.Token){
            wx.setStorageSync('token', res.header.Token)
          }
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  get(url, data){
   return this.http(url, 'GET',data)
  },
  post(url,data){
    return this.http(url,'POST',data)
  }

}

const login = ()=>{
  wx.login({
    success(res){

      fetch.post('/login',{
        code:res.code,
        appid:"wx24aaa4dd5c1f62a6",
        secret:"1e95032030065ed401d6ae702e5c1c33"
      }).then(res=>{
        // console.log(res)
      })

    }
  })
}

exports.fetch = fetch;
exports.login = login;