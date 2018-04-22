// pages/tutor/info.js
var remark = require("../tutor/tutor.js");

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
    qqnum:'26884685',
    research: '跑步冠军、乒乓球冠军、acm金牌',
    intro: '比较爱好电脑，猫里奥世界纪录保持者'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var recline = remark.getRecord();
       var infoS = remark.getStu();
       this.setData({
         uname: infoS[recline].sname,
         uid: infoS[recline].sid,
         academy: infoS[recline].sclass,
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