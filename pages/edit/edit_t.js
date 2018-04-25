// pages/edit/edit_t.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    office: '计算机大楼B403',
    long: 12345678901,
    short: 668828,
    email: 'wxm@zjut.edu.cn',
    research: '模式识别 人工智能',
    intro: '',
    tid: null,
    tname: '',
    department:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: '个人信息',
      success: function (res) {
        that.setData({
          tid: res.data.teacherInfo.tid,
          tname: res.data.teacherInfo.tname,
          department: res.data.teacherInfo.department,
          office: res.data.teacherInfo.office,
          long: res.data.teacherInfo.phone,
          email: res.data.teacherInfo.email,
          research: res.data.teacherInfo.researchField
        })
      },
    })
  },

  // 用户点击 提交 按钮
  formSubmit: function (e) {
    wx.showLoading({
      title: '提交中...',
    })

    var getVal = e.detail.value;
    console.log(getVal);

    wx.request({
      url: 'https://zyowo.cn/choice/info/update_teacher_info',
      method: 'POST',
      data: {
        tid: this.data.tid,
        tname: this.data.tname,
        department: this.data.department,
        office: getVal.office,
        phone: getVal.phone,
        researchField: getVal.research,
        email: getVal.email
      },
      success: function (res) {
        // 判断服务器是否正确返回
        if (res.data.success) {
          // 先用服务器传下来的info替换
          wx.setStorage({
            key: '个人信息',
            data: {
              teacherInfo: res.data.userinfo
            },
          })
          wx.hideLoading();
          wx.showToast({
            title: '编辑成功',
            icon: 'success',
            duration: 1500,
            mask: true,
          })
          wx.navigateBack();
        }
        else {
          wx.hideLoading();
          wx.showToast({
            title: '失败，请重试',
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