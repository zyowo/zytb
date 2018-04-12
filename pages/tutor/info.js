// pages/tutor/info.js
var remark = require("../tutor/tutor.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // --- 公用数据 ---
    uname: '王万良',
    uid: '07373',
    academy: '计算机智能系统研究所',
    office: '计算机大楼B403',
    tel: 12345678901,
    email: 'wwl@zjut.edu.cn',
    research: '人工智能',
    intro:'高校教师应该具有高尚的职业道德，诲人不倦；较高的学术造诣，诲人有术；丰富的教学经验，诲人有方。'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var a = remark.getMylist();
    //var b = remark.getRecord();
    //this.setData({
    //  uname: a[b].name
    //})
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