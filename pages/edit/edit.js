// pages/edit/edit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //本地
    array: ['群众', '团员', '中共党员'],
    index: -1,
    checkClass: true,
    checkPhone: true,
    checkEmail: true,
    //服务器表单（隐藏）
    sid: null,
    sname: '',
    //服务器表单（显示）
    sclass: '',
    long: null,
    short: null,
    email: '',
    direction: '',
    honor: '',
    research: '',
    introduction: ''
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

  /**
   * 判断班级是否正确
   */
  checkClass: function(e){
    var len = e.detail.value.length;
    if(len > 3)
    {
      this.setData({
        checkClass: true,
      })
    }
  },

  /**
   * 判断电话是否正确
   */
  checkPhone: function (e) {
    var str = e.detail.value;
    var len = str.length;
    if (len == 11 && str > 1) {
      this.setData({
        checkPhone: true,
      })
    }
    else this.setData({
      checkPhone: false,
    })
  },

  /**
   * 判断邮箱是否正确
   */
  checkEmail: function (e) {
    var str = e.detail.value;
    var len = str.length;
    if (len > 8 && str.indexOf('@') >= 0 && str.indexOf('.') >= 0) {
      this.setData({
        checkEmail: true,
      })
    }
    else this.setData({
      checkEmail: false,
    })
  },

  // 用户点击 提交 按钮
  formSubmit: function (e) {
    wx.showLoading({
      title: '提交中...',
    })
    console.log(e);

    // 计算一下 percent
    var newpercent = 2;
    for(var i in e.detail.value)
    { //算出来都是90？
      if(e.detail.value[i]) newpercent++;
      if (newpercent > 10) newpercent=10;
    }
    newpercent *= 10;

    // 制作对象
    var stuInfo = {
      sid: this.data.sid,
      sname: this.data.sname,
      sclass: e.detail.value.sclass,
      // 把下标替换成字符串
      politicalStatus: this.data.array[e.detail.value.politicalStatus],
      phone: e.detail.value.phone,
      email: e.detail.value.email,
      directionInterest: e.detail.value.directionInterest,
      honor: e.detail.value.honor,
      directionInauguration: e.detail.value.directionInauguration,
      introduction: e.detail.value.introduction
    }
    // 判断一下必填项是不是空的
    if(!stuInfo.sclass)
    {
      wx.hideLoading();
      wx.showToast({
        title: '班级不能为空！',
        image: '../../img/fail.png',
        duration: 1500,
        mask: true,
      })
      this.setData({
        checkClass: false
      })
    }
    else if (!stuInfo.phone) {
      wx.hideLoading();
      wx.showToast({
        title: '电话不能为空！',
        image: '../../img/fail.png',
        duration: 1500,
        mask: true,
      })
      this.setData({
        checkPhone: false
      })
    }
    else if (!stuInfo.email) {
      wx.hideLoading();
      wx.showToast({
        title: '邮箱不能为空！',
        image: '../../img/fail.png',
        duration: 1500,
        mask: true,
      })
      this.setData({
        checkEmail: false
      })
    }
    // 如果本地检测表单逻辑都正确，则发送修改
    else wx.request({
      url: 'https://zyowo.cn/choice/info/update_student_info',
      method: 'POST',
      data: {
        sid: this.data.sid,
        sname: this.data.sname,
        sclass: e.detail.value.sclass,

        politicalStatus: e.detail.value.politicalStatus,
        phone: e.detail.value.phone,
        email: e.detail.value.email,
        directionInterest: e.detail.value.directionInterest,
        honor: e.detail.value.honor,
        directionInauguration: e.detail.value.directionInauguration,
        introduction: e.detail.value.introduction
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // 判断服务器是否正确返回
        if (res.data.success)
        { 
          // 先用服务器传下来的info替换
          wx.setStorage({
            key: '个人信息',
            data: {
              studentInfo: res.data.userinfo
            },
          })
          wx.hideLoading();
          wx.showToast({
            title: '编辑成功',
            icon: 'success',
            duration: 1500,
            mask: true,
          })
          app.globalData.percent = newpercent;
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
        introduction:null
        }
      },
    })
    */
    var that = this;
    wx.getStorage({
      key: '个人信息',
      success: function (res) {
        // 成功获得本地缓存
        console.log("缓存成功");
        var po_index = -1;
        if (res.data.studentInfo.politicalStatus == "群众")
          po_index = 0;
        else if (res.data.studentInfo.politicalStatus == "团员")
          po_index = 1;
        else po_index = 2;

        that.setData({
          sid: res.data.studentInfo.sid,
          sname: res.data.studentInfo.sname,
          sclass: res.data.studentInfo.sclass,
          index: po_index,
          long: res.data.studentInfo.phone,
          email: res.data.studentInfo.email,
          direction: res.data.studentInfo.directionInterest,
          honor: res.data.studentInfo.honor,
          research: res.data.studentInfo.directionInauguration,
          introduction: res.data.studentInfo.introduction
        })
      },
      fail: function (res) {
        // 如果缓存失败，请求学生的基本信息
        wx.request({
          url: 'https://zyowo.cn/choice/info',
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