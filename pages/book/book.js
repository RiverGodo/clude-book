// pages/book/book.js

import {fetch} from "../../utils/util.js";

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleId: "",
    article: {},
    title: "",
    bookId: "",
    catalog:[],
    isShow:false,
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      titleId: options.id,
      bookId: options.bookId,
    })
    this.getData()
    this.getCatalog()
  },
  getData() {
    this.setData({
      isLoading: true
    })
    fetch.get(`/article/${this.data.titleId}`)
      .then(res => {
        let data = app.towxml.toJson(res.data.article.content, 'markdown');
      
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
  
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        catalog:res.data
      })

    })
  },

  toggleCatalog(){
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },

  handleGet(event){

    const id = event.currentTarget.dataset.id
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
    this.setData({
      titleId:id
    })
  this.getData()
  },


  onShareAppMessage: function () {
  
  }
})