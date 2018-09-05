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
    isLoading: false,
    isScroll:false,
    font:40,
    index:'',
 
  
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
          isLoading: false,
          index:res.data.article.index,
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
  handleAdd(){
    if (this.data.font >= 56) {
      wx.showModal({
        title: '提示',
        content: '字体太大啦',
        showCancel: false,
      })
    } else {
      this.setData({
        font: this.data.font + 2
      })
    }
  },
  handleRuduce(){
    if(this.data.font<=30){
      wx.showModal({
        title: '提示',
        content:'字体太小影响视力哦',
        showCancel:false,
      })
    }else{
      this.setData({
        font: this.data.font - 2
      })
    }

  },
  handleNext(){
    let catalog = this.data.catalog
    if (catalog[this.data.index + 1]){
      this.setData({
        titleId: catalog[this.data.index + 1]._id
      })
      this.getData()
    }else{
      wx.showModal({
        title: '提示',
        content: '已经是最后一章了',
        showCancel: false,
      })
    }

  },
  handlePrev(){
    let catalog = this.data.catalog
    if(this.data.index-1<0){
      wx.showModal({
        title: '提示',
        content: '已经是第一章了',
        showCancel: false,
      })
    }else{
      this.setData({
        titleId: catalog[this.data.index - 1]._id
      })
      this.getData()
    }

  },

  onShareAppMessage: function () {
  
  }
})