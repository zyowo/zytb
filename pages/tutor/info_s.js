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
    tel: '',
    poliface: '',
    email: 'wwl@zjut.edu.cn',
    inauguration: '',
    interest: '26884685',
    honor: '跑步冠军、乒乓球冠军、acm金牌',
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
      uid: infoS[recline].sid
    })
    wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: 'https://zyowo.cn/choice//info',//???
      // zhr：在上面输入你的本机Servlet地址
      method: 'POST',
      data: {//在教师详细信息的表中搜索
        uid: that.data.uid
      }
      ,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '',
          icon: 'success',
          duration: 1500,
          mask: true,
        })
        var detailNews = res.data.studentInfo;
        myNews = detailNews;

        var selection = ['群众', '团员', '党员']
        var m = myNews.politicalStatus;
        if (m == 0)
          that.setData({
            poliface: '群众'
          })
        if (m == 1)
          that.setData({
            poliface: '团员'
          })
        if (m == 2) that.setData({
          poliface: '党员'
        })

        that.setData({
          uname: myNews.sname,
          academy: myNews.sclass,
          tel: myNews.phone,
          email: myNews.email,
          inauguration: myNews.directionInauguration,
          interest: myNews.directionInterest,
          honor: myNews.honor,
          intro: myNews.introduction

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