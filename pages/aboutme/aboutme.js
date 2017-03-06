//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    image:"../../image/logo.jpg",
    title:"中软国际",
    cont:"内容",
    phone:"123456789",
    adres:"健翔大厦",
    teamwork:"北京大学",
    imgUrls:[
      {
        link:'/pages/list/list',
url:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        link:'/pages/form/form',
url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        link:'/pages/list/list',
url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ],
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:1000
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.setNavigationBarTitle({
      title: '关于我们'
    })
  }
})