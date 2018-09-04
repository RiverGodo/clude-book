//index.js
//获取应用实例
import {fetch} from '../../utils/util.js'
const app = getApp();

Page({
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    indicatoractiveColor: "rgba(255,255,255,255)", 
    autoplay: true,
    interval: 3000,
    duration: 1000,
    isLoading: false
  },
  onLoad (){
    this.getData(),
    this.getContent()
  
  },
  getData(){
    this.setData({
      isLoading: true
    })
    fetch.get('/swiper').then(res =>{
     this.setData({
       swiperData : res.data,
       isLoading: false
     })
    }).catch(err=>{
      this.setData({
        isLoading: false
      })
    })
  },
  getContent(){
    fetch.get('/category/books').then(res=>{
      console.log(res)
      this.setData({
        mainContent: res.data
      })
    })
  },
  jumpBook(event){
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
    // console.log(event.currentTarget.dataset.id)
  
  },

  
})