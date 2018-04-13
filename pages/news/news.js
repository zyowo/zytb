// pages/news/news.js
var wemark = require('../../wemark/wemark.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"浙江工业大学本科生导师选择注意事项",
    time:'2018-03-29',
    author:'最选导',
    wemark: {},
    content:'令人激动的导师志愿填报即将在2018年4月23日开始！你准备好了嘛？\n\n> 选择导师，也要看风水。相生者共同进步，相克者矛盾易损。——不愿透露姓名的风水大师\n\n![news](../../img/news.jpg)\n\n既然选导师是一个需要谨慎对待的事，那你就自然要看好下面的各项注意事项咯。\n\n1. 每位同学有第一、第二志愿，系统将优先考虑第一志愿的选择，请注意先后次序！\n2. 选择导师之前，应该保证自己的个人信息已经完善。\n3. 注意选择导师的时间，在规定时间内做出选择。迟到了就没啦！\n\n祝愿大家都能选择到自己心仪的导师哦~',
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
    var md = this.data.content;
    wemark.parse(md, this);
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