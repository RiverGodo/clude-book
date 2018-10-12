// pages/details.js

import {fetch} from "../../utils/util.js" 
const app = getApp();

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
    token:"",
    hidden:true,
    isClick:true,
    img:{},
    hideData:[],
    index:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        console.log(res)
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
  hideBook(e){
    fetch.get(`/book/${this.data.bookId}`).then(res => {
      console.log(res)
      if (!this.data.isClick == true) {   
        console.log(this.data.hideData)
        let hideData = this.data.hideData
        hideData.push({
          bookId:res.data._id,
          title: res.data.title,
          img: res.data.img,
          index: res.data.index
        })
        console.log(this.data.hideData)
        wx.setStorageSync("hideData", hideData);
        wx.showToast({
          title: '已收藏',
        });

      } else {
        wx.showToast({
          title: '已取消收藏',
        });
      }
      this.setData({
        isClick: !this.data.isClick
      })
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
    return{
      title:this.data.bookData.data.title,
      path:`/pages/details/details?id=${this.data.bookId}`,
      imageUrl: this.data.bookData.data.img

    }
  }
})