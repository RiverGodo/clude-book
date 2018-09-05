// pages/details.js

import {fetch} from "../../utils/util.js" 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    bookData:{},
    isLoading: false,
    isShow: false,
    titleId: "",
    article: {},
    title: "",
    catalog: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({bookId : options.id})
    this.getData()
    this.getCatalog()
  },


  getData(){
    this.setData({
      isLoading: true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
 
      this.setData({
        bookData :res,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
 
  },
  getDate() {
    this.setData({
      isLoading: true
    })
    fetch.get(`/article/${this.data.titleId}`)
      .then(res => {
        this.setData({
          article: data,
          title: res.data.title,
          isLoading: false
        })
      }).catch(err => {
        this.setData({
          isLoading: false
        })
      })
  },

  getCatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        catalog: res.data
      })

    })
  },

 jumpCatalog(){
   wx.navigateTo({
     url: `/pages/catalog/catalog?id=${this.data.bookId}`,
   })
 },
  jumpTCatalog(){
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },
 
  /**
   * 用户点击右上角分享
   */
  handleGet(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
    this.setData({
      titleId: id
    })
    this.getData()
  },

  onShareAppMessage: function () {
  
  }
})