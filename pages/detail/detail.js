//detail.js
//获取应用实例
var app = getApp()
Page({
  data: {
    info:{}
  },
  detailBack:function(){
    wx.navigateBack();
  },
  onLoad: function (options) {
    console.log(options.id);
    var that = this;
     wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getDetail.html',
      data: {id:options.id},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        that.setData({
          info:res.data
        })
      }
    })
    wx.setNavigationBarTitle({
      title: options.title+'详情页'
    })
  }
})