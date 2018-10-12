// pages/study/study.js
import hideData from '../details/details.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveData:[],
    bookId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    console.log(wx.getStorageSync("hideData"))
    if(this.data.bookId){
      console.log(已收藏)
    }else{
      let saveData = wx.getStorageSync("hideData")
      this.setData({
        saveData: saveData
      })}
 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})