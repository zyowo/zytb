// pages/tutor/info.js
var remark = require("../tutor/tutor.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // --- 公用数据 ---
    uname: '王秀梅',
    uid: '07373',
    academy: '马克思主义学院',
    office: '计算机大楼B403',
    long: 12345678901,
    short: 123456,
    email: 'wxm@zjut.edu.cn',
    research: '模式识别 人工智能',
    intro:'国家级教学名师——王万良，男，1957年生，博士、教授、博士生导师。现任计算机科学与技术学院、软件学院院长，主讲课程有：自动控制原理、现代控制工程、人工智能导论等。其中《自动控制原理》系国家级精品课程（2005）、国家级资源共享课（2013），《人工智能导论》（2010）系校级精品课程。'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = remark.getMylist();
    var b = remark.getRecord();
    this.setData({
      uname: a[b].name
    })
    /**console.log('hhhhh', remark.faculties);
    console.log('hhhhh', remark.record_line);**/
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