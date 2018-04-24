//app.js 注册一个微信小程序，可接收object对象参数，同时还可以指定微信小程序的生命周期函数、全局函数和全局数据。 --zyw
App({
  onLaunch: function () { // 当小程序初始化完成时触发。 --zyw

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {

    userInfo: null,   //用户信息
    percent:80,       //个人信息完善度
    uid: 201526810528,  //学号/工号
    isStudent: true,   //是否为学生
    timeNode:1      //时间节点
  }
})