// pages/my/my.js
var app = getApp()
var isStu = getApp().globalData.isStudent;
var idinfolist = [
  { "name": "王万良", "choice": '第一志愿', "status": '未选中' },
  { "name": "王秀梅", "choice": '第二志愿', "status": '未选中' },
  { "name": "王秀梅", "choice": '第三志愿', "status": '已选' },
]
Page({
  data: {
    // --- 展示用户头像 ---
    userInfo: {   // 默认展示的图片
      avatarUrl: "../../img/cat.png",

    },
    hasUserInfo: false,
    canIUse: wx.canIUse('image.open-type.getUserInfo'),
    my_choice: idinfolist,
    // --- 判断是学生还是导师 ---
    isStudent: isStu,
    percent: 0,

    // --- 公用数据 ---
    uname: '出错啦',
    uid: '4040404',
    academy: '请重新登录',

    // --- 学生数据 ---
    major: '数字媒体技术',
    tutor: '王秀梅',
    round: '第一志愿',
    status: '未选中',
    institute: '马克思主义学院',


    // --- 导师数据 ---
    office: '计算机大楼B403',
    tel: 12345678901,
    email: 'wxm@zjut.edu.cn',
    research: '模式识别 人工智能',
    students: [{
      name: '钟亦文',      status: '接受'    }, {
      name: '张浩然',      status: '已读'    }, {
      name: '周志雄',      status: '超期'    }, {
      name: '张浩然',      status: '已读'    }, {
      name: '周志雄',      status: '超期'    }, {
      name: '张浩然',      status: '已读'    }, {
      name: '周志雄',      status: '超期'    }]
  },
  // -- 点击 前往操作 --
  tutor() {
    wx.switchTab({
      url: '../tutor/tutor'
    })
  },
  // -- 点击 退出登录 --
  register() {
    wx.redirectTo({
      url: '../login/login'
    })
  },

  // -- 点击 编辑资料 --
  edit() {
    wx.navigateTo({
      url: '../edit/edit'
    })
  },

  // -- 点击 编辑资料(教师) --
  edit_t() {
    wx.navigateTo({
      url: '../edit/edit_t'
    })
  },

  // --- 获取用户微信头像。e是event
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showNavigationBarLoading();
    this.setData({
      uid:app.globalData.uid
    })

    wx.getStorage({
      key: '个人信息',
      success: function(res) {
        if(isStudent) // 如果是学生，则初始化学生数据
        {
          this.setData ({
            uname: res.data.userInfo.sname,
            uid: res.data.userInfo.sid,
            academy: '计算机科学与技术学院、软件学院'
          })
          var count = 0;
          for (var i in res)
          { // 统计一下有哪些项是填好的
            if(res[i]) count++;
          }
          count *= 10;
          // 这里就计算出学生的信息完善度了
          app.globalData.percent = count;
        }
        else // 如果是老师，则初始化教师数据
        {
          this.setData({
            uname: res.data.userInfo.tname,
            uid: res.data.userInfo.tid,
            academy: res.data.userInfo.department,
            office: res.data.userInfo.office,
            email: res.data.userInfo.email,
            tel: res.data.userInfo.phone,
            research: res.data.userInfo.researchField,
          })
        }
      },
      fail: function (res) {
        // 如果缓存失败，请求学生的基本信息
        wx.request({
          url: 'http://localhost:8443/info',
          // zhr：在上面输入你的本机Servlet地址
          method: 'GET',
          data: {
            uid: this.data.uid
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) { },
          fail: function(res) {
            console.log("缓存失败，连接失败")
           }
        })
      }
    })
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      percent: app.globalData.percent
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading();
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