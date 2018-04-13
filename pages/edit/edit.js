// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //本地
    array: ['群众', '团员', '中共党员'],
    index: -1,
    //服务器表单
    class: '',
    long: null,
    short: null,
    email: '',
    direction: '',
    honor: '',
    research: '',
    intro: ''
  },
  /**
   * 监听普通picker选择器
   */
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  },

  formSubmit: function (e) {
    wx.navigateBack({
      percent: 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    wx.setStorage({   //TODELETE: 模拟缓存
      key: '个人信息',
      data: {
        studentInfo:{
        sid: 201601020304,
        sname: '模拟生',
        sclass: '数字媒体1603',
        politicalStatus: "群众",
        phone: 15811223344,
        email:null,
        directionInterest:null,
        honor:null,
        directionInauguration:null,
        intro:null
        }
      },
    })
  */
  var that = this;
    wx.getStorage({
      key: '个人信息',
      success: function (res) {
        //成功获得本地缓存
        console.log("缓存成功");
        var po_index = -1;
        if (res.data.studentInfo.politicalStatus == "群众")
          po_index = 0;
        else if (res.data.studentInfo.politicalStatus == "团员")
          po_index = 1;
        else po_index = 2;

        that.setData({
            class: res.data.studentInfo.sclass,
            index: po_index,
            long: res.data.studentInfo.phone,
            email:res.data.studentInfo.email,
            direction: res.data.studentInfo.directionInterest,
            honor:res.data.studentInfo.honor,
            research: res.data.studentInfo.directionInauguration,
            intro: res.data.studentInfo.intro
        })
      },
      fail: function (res) {
        // 如果缓存失败，请求学生的基本信息
        wx.request({
          url: 'http://localhost:8443/info',
          // zhr：在上面输入你的本机Servlet地址
          method: 'GET',
          data: {
            uid: 0
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) { },
          fail: function (res) {
            console.log("缓存失败，连接失败")
          }
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