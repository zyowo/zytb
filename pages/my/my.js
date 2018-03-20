// pages/my/my.js
const basic = {  //新建一个表单
  uname: '钟亦文',
  uid: '201526810530',
  ucollege: '计算机学院',
  
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
  name:'亦文同学',
  id:'201526810530',
  acadmy:'计算机学院',
  major:'数字媒体',
  tutor:'王秀梅',
  status:'loading',
  status2:'amazing',
  institute:'数字媒体'
  },

  register() {
    wx.navigateTo({
      url: '../login/login'
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