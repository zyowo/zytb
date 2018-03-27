// pages/my/my.js
var app = getApp()
Page({
  data: {
    // --- 展示用户头像 ---
    userInfo: {   //默认展示的图片
      avatarUrl: "../../img/cat.png",
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    // --- 判断是学生还是导师 ---
    isStudent: false,

    // --- 公用数据 ---
    uname: '王秀梅',
    uid: '07373',
    academy: '马克思主义学院',

    // --- 学生数据 ---
    major: '数字媒体技术',
    tutor: '王秀梅',
    status: 'loading',
    status2: 'amazing',
    institute: '马克思主义学院',

    // --- 导师数据 ---
    office: '计算机大楼B403',
    tel: 12345678901,
    email: 'wxm@zjut.edu.cn',
    direction: '模式识别 人工智能',
    students: [{
      name: '钟亦文',
      status: '接受'
    }, {
      name: '张浩然',
      status: '已读'
    }, {
      name: '周志雄',
      status: '超期'
    }]
  },
  // -- 点击 前往操作 --
  tutor() {
    wx.switchTab({
      url: '../tutor/tutor'
    })
  },
  // -- 点击 退出登录 --
  register() {
    wx.redirectTo({
      url: '../login/login'
    })
  },

  // -- 点击 编辑资料 --
  edit() {
    wx.navigateTo({
      url: '../edit/edit'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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