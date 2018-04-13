// pages/my/my.js
var app = getApp()
var isStu = getApp().globalData.isStudent;
var idInfoList = [];  // 这里存了学生的选导记录

Page({
  data: {
    // --- 展示用户头像 ---
    userInfo: {   // 默认展示的图片
      avatarUrl: "../../img/cat.png",

    },
    hasUserInfo: false,
    canIUse: wx.canIUse('image.open-type.getUserInfo'),
    my_choice: idInfoList,    // 在这里，把选导记录重新赋给 my_choice
    // --- 判断是学生还是导师 ---
    isStudent: isStu,
    // --- 判断学生是否含有选导记录 ---
    isNoTutor: true,
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
      name: '钟亦文', status: '接受'
    }, {
      name: '张浩然', status: '已读'
    }, {
      name: '周志雄', status: '超期'
    }, {
      name: '张浩然', status: '已读'
    }, {
      name: '周志雄', status: '超期'
    }, {
      name: '张浩然', status: '已读'
    }, {
      name: '周志雄', status: '超期'
    }]
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
    var that = this;    // 很重要，存入一份this指针的变量，后面调用

    // [1] 获取个人信息
    // 因为后面马上就要用到缓存传参，所以这里必须是同步的
    try {
      var st_value = wx.getStorageSync('个人信息')
      console.log("读取个人信息")
      if (st_value) {
        if (isStu) // 如果是学生，则初始化学生数据
        {
          that.setData({
            uname: st_value.studentInfo.sname,
            uid: st_value.studentInfo.sid,
            academy: '计算机科学与技术学院、软件学院'
          })
          var count = 0;
          for (var i in res) { // 统计一下有哪些项是填好的
            if (res[i]) count++;
          }
          count *= 10;
          // 这里就计算出学生的信息完善度了
          app.globalData.percent = count;
        }
        else // 如果是老师，则初始化教师数据
        {
          that.setData({
            uname: st_value.teacherInfo.tname,
            uid: st_value.teacherInfo.tid,
            academy: st_value.teacherInfo.department,
            office: st_value.teacherInfo.office,
            email: st_value.teacherInfo.email,
            tel: st_value.teacherInfo.phone,
            research: st_value.teacherInfo.researchField,
          })
        }
      }
    } catch (e) {
      // 如果缓存失败，请求学生的基本信息
      wx.request({
        url: 'http://localhost:8443/info',
        // zhr：在上面输入你的本机Servlet地址
        method: 'GET',
        data: {
          uid: that.data.uid
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

    // [1.1] 把 uid 存入全局变量，这样不用每次都调用
    app.globalData.uid = that.data.uid;
    console.log("已经存入全局变量，现在是" + app.globalData.uid);

    // [2] 获取UserInfo
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

    // [3] TODO: 获取选导记录、学生记录 
    if (isStu) // 如果是学生
    {
      wx.request({
        url: 'http://localhost:8443/report/mychoice',
        data: {
          // 已经读过缓存了，用全局变量写入
          sid: app.globalData.uid,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.success) { // 如果查询成功，说明有导师
            that.setData({
              isNoTutor: false
            })
            /* CANUSE: 成功获取服务端的内容，先存一份缓存
            wx.setStorage({
              key: '选导记录',
              data: {
                //这里存的是 sid - tid - status - choice
                reportItemList: res.data.reportItemList,
                
                //这里存的是 tid-tname-allnum-picknum-reportItem
                //教师工号、姓名、总人数、已选人数、学生
                reportList: res.data.reportList
              },
            })*/
            // [3.2] 遍历sid-tid表，录入第一、第二、第三志愿
            var st_item = res.data.reportItemList;
            var st_index = 0, st_tid = 0;
            for (var i in st_item) {
              // 判断是第几志愿，
              if (st_item[i].choiceNumber == 1)
                st_index = 0;
              else if (st_item[i].choiceNumber == 2)
                st_index = 1;
              else st_index = 2;

              // 先定义一个item，方便填表呀！
              var fill = {
                name: '',
                status: 0,
                choice: 0
              }

              // 填表 idInfoList[] name choice status
              st_tid = st_item[i].tid;
              for (var j in res.data.reportList) {
                if (res.data.reportList[j].tid == st_tid)
                  fill.name = res.data.reportList[j].tname;
              } // 名字填好了
              fill.status = st_item[i].status;
              fill.choice = st_item[i].choiceNumber;

              idInfoList[st_index] = fill;
            } // st_item 结束

            that.renderToView();      //异步更新
            that.updateInfoList();    //异步更新
            
            // 将填好的数据存入缓存
            // 把学生的选导记录存到本地缓存
            wx.setStorage({
              key: '选导记录',
              data: {
                // 左边是 两个大写，右边是定义的 var 页面全局变量
                idInfoList: idInfoList
              },
            })
          } // 有选导信息结束

          else  // 没有选导信息，服务器的success字段为false
            that.setData({
              isNoTutor: true
            })
        },
        fail: function (res) {
          // 尝试调取本地的缓存
          wx.getStorage({
            key: '选导记录',
            success: function (res) {
              that.setData({
                isNoTutor: false,
              })
              idInfoList = res.data.idInfoList;
              console.log(idInfoList);
              that.renderToView();      //异步更新
              that.updateInfoList();    //异步更新
            },
            fail: function (res) {
              that.setData({
                isNoTutor: true,
              })
              console.log("读取选导记录时，服务器连接失败，读取缓存失败");
            },
          })
        },
      })
    }
    else {  // 如果是老师
      // TODO: 写老师获取学生的逻辑
    }
  },





  /** ———— 自定义函数 ————
   *  渲染到视图，需要把 数字 改成 字符串 显示 (可以在HTML层实现)
   */
  renderToView: function () {
    for (var i in idInfoList) {
      switch (idInfoList[i].choice) {
        case 1: idInfoList[i].choice = '第一志愿'; break;
        case 2: idInfoList[i].choice = '第二志愿'; break;
        default: idInfoList[i].choice = '随机匹配';
      }
      switch (idInfoList[i].status) {
        case 0: idInfoList[i].status = '处理中'; break;
        case 1: idInfoList[i].status = '成功'; break;
        case 2: idInfoList[i].status = '失败'; break;
      }
    }
  },

  /** ———— 自定义函数 ————
   *  异步更新选导记录
   */
  updateInfoList: function () {
    this.setData({
      my_choice: idInfoList
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
    console.log(idInfoList);
    wx.stopPullDownRefresh()
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