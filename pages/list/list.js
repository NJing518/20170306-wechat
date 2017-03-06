//list.js
var app = getApp()
Page({
  data: {
    // 内容
    newliist:[],
    // 显示的最后内容对应的id
    lastid:0,
    // 控制“点击加载更多”的显示
    listlist:false,
    // 控制toast的显示
    // status:true,
    // 控制“温馨提示”的显示
    hiddenmodal:true,
    // 温馨提示的显示次数
    firstid:0,
    // 控制“正在加载”的显示
    hiddenLoading:false,
    // 控制“没有数据”的显示
    hiddendata:true,
    // 控制“点击加载更多”的显示
    non:"none"
  },
  //后台数据接口
  loadData:function(lastid){
    var that = this;
    //一次加载几个
    var limit = 2;
    //获取后台数据
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getList.html',
      data: {limit:limit,lastid:lastid},
      header: {
          'content-type': 'application/json'
      },
      // 后台数据
      success: function(res) {
        // res.data=""
        if(res.data){
          var len = res.data.length;
          var dataArr = that.data.newliist;
          //合并
          var dataNewList = dataArr.concat(res.data);
          // 存储缓存
          if(lastid==0){
             wx.setStorageSync('cmsindex', dataNewList)
          }
         
          //更新数据
          that.setData({
            newliist:dataNewList,
            lastid:res.data[len-1].id,
            non:"block"
          })
        }else{
           that.setData({
            // listlist:true,
            non:"none",
            // status:false,
            hiddendata:false
          })
          wx.showToast({
            title: '无更多数据',
            icon: 'success',
            duration: 2000
          })
        }   
      },
      // 离线缓存
    fail:function(){
      if(lastid==0){
        var storageNewList = wx.getStorageSync("cmsindex");
        var len = storageNewList.length;
        that.setData({
            newliist:storageNewList,
            lastid:storageNewList[len-1].id,
            non:"block"
          })
      }else{
        wx.showToast({
          title: '当前网络异常，请稍后重试',
          icon: 'success',
          duration: 2000
        })
      }   
    },
    // 接口调用结束的回调函数
    complete:function(){
        that.setData({
          hiddenLoading:true
        })
      }
    })
  },
//加载更多
  loadMore:function(event){
    var that = this;
    var id = event.currentTarget.dataset.lastid;
    var firstid = event.currentTarget.dataset.firstid;
    	that.setData({
        hiddenLoading:false
      })
    this.loadData(id);
    // 判断wifi还是流量
    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType;
        if(networkType != "wifi" && firstid == "0"){
          that.setData({
            hiddenmodal:false,
            firstid:1
          })
        }
      }
    })
  },
  // 温馨提示
  confirm:function(){
    this.setData({
      hiddenmodal:true
    })
  },
  // 一上来的加载
  onLoad: function () {
    var that = this;
    this.loadData(0);
    wx.setNavigationBarTitle({
      title: '首页'
    })
  },
  // onReady:function(){
  //   wx.setNavigationBarTitle({
  //     title: '当前页面'
  //   })
  // }
  onShareAppMessage: function () {
    return {
      title: '中软国际',
      path: '/list/list'
    }
  }
})
