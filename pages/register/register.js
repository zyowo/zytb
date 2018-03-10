// app.json 中 page 的第一项表示小程序的初始界面。 --zyw
// 在编辑小程序的时候切记 Ctrl+S 保存，程序不会自动保存。 --zyw
// json 文件不支持注释。 微信小程序正式运行时把debug关闭。 --zyw
// pages/register.js

var app = getApp()  // 微信小程序在 app.js 中定义的是全局函数和全局数据，在页面文件夹 *.js 文件里可以直接使用，在使用之前需要用 getAPP() 函数来获取小程序实例。获取实例后，不要私自调用生命周期函数。 --zyw
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'钟亦文',
    flag:true,
    id:201526810530  // 在 data 对象里可以初始化页面要用到的函数，data 会以 JSON 的形式由逻辑层传至渲染层(视图层)，所以其数据必须是可以转成 JSON 的格式：字符串、数字、布尔值、对象、数组。在页面中通过数据绑定的方式取出，如 <view>{{name}}</view>  --zyw
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