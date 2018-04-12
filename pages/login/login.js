// pages/login/login.js
var app = getApp();
const form = {  //新建一个表单
  username: '',
  password: '',
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:""
  },

  // 检测学号
  checkNumber: function (e) {
    var len = e.detail.value.length;
    if (len != 0 && (len % 5 == 0 || len % 10 == 0 || len % 12 == 0)) {
      this.setData({
        checknum: true  //学号是否5、10、12位
      })
      form["username"] = e.detail.value;
    }
    else this.setData({
      checknum: false
    })
  },

  // 检测密码
  getPsd: function (e) {
    var len = e.detail.value.length;
    if (len >= 6) {
      this.setData({
        checkpsd: true // 密码是否超过6位
      })
      form["password"] = e.detail.value;
    }
    else this.setData({
      checkpsd: false
    })
  },

  // 点击登录
  login() {
    wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: 'http://localhost:8443/login',
      // zhr：在上面输入你的本机Servlet地址
      data: {
        uid: form["username"],
        psw: form["password"]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        if(res.data.success){
        wx.hideLoading();
        wx.showToast({
          title: 'res.data.message',
          icon: 'success',
          duration: 1500,
          mask: true,
        })
        app.globalData.uid = res.data.uid;
        wx.redirectTo({
          url: '../index/index',
        })}
        
        //登录失败
        else {
          wx.hideLoading();
          wx.showToast({
            title: 'res.data.message',
            image: '../../img/fail.ico',
            duration: 1500,
            mask: true,
          })
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '服务器连接失败',
          image: '../../img/fail.ico',
          duration: 1500,
          mask: true,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uid: getApp().globalData.uid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})