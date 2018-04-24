// app.json 中 page 的第一项表示小程序的初始界面。 --zyw
// 在编辑小程序的时候切记 Ctrl+S 保存，程序不会自动保存。 --zyw
// json 文件不支持注释。 微信小程序正式运行时把debug关闭。 --zyw
// pages/register.js

var app = getApp()  // 微信小程序在 app.js 中定义的是全局函数和全局数据，在页面文件夹 *.js 文件里可以直接使用，在使用之前需要用 getAPP() 函数来获取小程序实例。获取实例后，不要私自调用生命周期函数。 --zyw

const form = {  //新建一个表单
  username: '',
  password: '',
}

Page({
  // 在 data 对象里可以初始化页面要用到的函数，data 会以 JSON 的形式由逻辑层传至渲染层(视图层)，所以其数据必须是可以转成 JSON 的格式：字符串、数字、布尔值、对象、数组。在页面中通过数据绑定的方式取出，如 <view>{{name}}</view>  
  data: {
    checknum: false,
    checkpsd: false,
    validpsd: false,
    validcolor: "white",
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

  // 确认密码是否相同
  checkPsd: function (e) {
    const validate = e.detail.value;
    const psw = form["password"];
    if (psw == validate) {
      this.setData({
        validpsd: true,
        validcolor: "white"
      })
    }
    else {
      this.setData({
        validpsd: false,
        validcolor: "red"
      })
    }
  },

  register() {
    wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: 'https://zyowo.cn/choice/register',
      // zhr：在上面输入你的本机Servlet地址
      method: 'POST',
      data: {
        uid: form["username"],
        psw: form["password"]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // [1] 如果学号和服务器一致
        if (res.data.success) {
          wx.hideLoading();
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500,
            mask: true,
          })
          app.globalData.uid = form["username"];  //login
          wx.redirectTo({
            url: '../login/login',
          })
        }
        // [2] 连接成功，但登录失败
        else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.message,
            image: '../../img/fail.png',
            duration: 1500,
            mask: true,
          })
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '服务器连接失败',
          image: '../../img/fail.png',
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
  },

})