// pages/tutor/info.js
var remark = require("../tutor/tutor.js");
var myNews;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // --- 公用数据 ---


    uname: '钟亦文',
    uid: '201526810530',
    academy: '数字媒体',
    tel: 12345678234,
    email: 'wwl@zjut.edu.cn',
    qqnum: '26884685',
    research: '跑步冠军、乒乓球冠军、acm金牌',
    intro: '比较爱好电脑，猫里奥世界纪录保持者'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var recline = remark.getRecord();
    var infoS = remark.getStu();
    that.setData({
      uname: infoS[recline].sname
    })
/*wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: 'http://localhost:8443/report/findReportItem',//???
      // zhr：在上面输入你的本机Servlet地址
      method: 'POST',
      data: {//在教师详细信息的表中搜索
         tid: that.data.uid
      }
      ,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 1500,
          mask: true,
        })
       var detailNews = res.data.reportList;
       myNews=detailNews;
       that.setData({
         uname: myNews.sname,
         academy: myNews.sclass,
         tel: myNews.tel,
         email: myNews.email,
         qqnum:myNews.qqnum,
         research: myNews.research,
         intro: myNews.intro
       })
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
    }) */


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