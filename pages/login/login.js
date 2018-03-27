// pages/login/login.js
const form = {  //新建一个表单
  username: '',
  password: '',
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    wx.switchTab({
      url: '../my/my'
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
  
  }
})