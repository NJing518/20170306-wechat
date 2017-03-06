//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    array: ['美国', '中国', '巴西', '印度'],
    area:0,
    score:0
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      area: e.detail.value
    })
  },
  sliderchange:function(e){
    this.setData({
      score: e.detail.value
    })
  },
  formSubmit:function(e){
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Feedback/Feedback/addFeedback.html', //仅为示例，并非真实的接口地址
      data:e.detail.value,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        wx.showToast({
          title: '信息提交成功，感谢您的支持',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/list/list'
          })
        },2000)
        
      },
      fali:function(res){
        console.log(res.data)
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.setNavigationBarTitle({
      title: '用户反馈'
    })
  }
})