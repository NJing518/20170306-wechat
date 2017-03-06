//list.js
//获取应用实例
var app = getApp()
Page({
  data: {
    newliist:[
      // {id:1,title:"好好学习，天天向上",img:"../../image/node.jpg",cTime:"2017-12-19"},
      // {id:2,title:"好好学习，天天向上",img:"../../image/php.jpg",cTime:"2017-12-19"},
      // {id:3,title:"好好学习，天天向上",img:"../../image/js.jpg",cTime:"2017-12-19"},
      // {id:4,title:"好好学习，天天向上",img:"../../image/net.jpg",cTime:"2017-12-19"},
      // {id:5,title:"好好学习，天天向上",img:"../../image/ui.jpg",cTime:"2017-12-19"}
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // });
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getList.html', //仅为示例，并非真实的接口地址
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        //更新数据
        that.setData({
        newliist:res.data
        })
      }
    })
  }
})
