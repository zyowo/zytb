// pages/tutor/tutor.js
var app = getApp();
var tutor_name;
var student_name;
var recordline;
var checkindex = [];
var choice_stu = 0;
var recordindex = 0;
var select = ['选择', '退选']
var isStu = getApp().globalData.isStudent;
var voluneidinfolist = [
  { "name": "王万良", "choice": '第一志愿', "status": '未选中' },
  { "name": "王秀梅", "choice": '第二志愿', "status": '未选中' },
  { "name": "王秀梅", "choice": '第三志愿', "status": '已选' },
]
var tutorinfolist = [
  { "name": "潘翔", "faculty": '数字媒体', "picknum": 20, "allnum": 30 },
  { "name": "王秀梅", "faculty": '网络工程', "picknum": 10, "allnum": 50 },
  { "name": "王鑫", "faculty": '软件工程', "picknum": 15, "allnum": 10 },
  { "name": "王万良", "faculty": '计算机自动化', "picknum": 13, "allnum": 26 },
  { "name": "亦文", "faculty": '数字媒体', "picknum": 20, "allnum": 30 },
  { "name": "王老师", "faculty": '网络工程', "picknum": 50, "allnum": 50 },
  { "name": "王鑫", "faculty": '计算机自动化', "picknum": 5, "allnum": 10 },
  { "name": "王万良1", "faculty": '计算机自动化', "picknum": 13, "allnum": 26 },
  { "name": "王春平", "faculty": '软件工程', "picknum": 5, "allnum": 10 },
  { "name": "龙胜春", "faculty": '软件工程', "picknum": 5, "allnum": 10 },
  { "name": "汤颖", "faculty": '数字媒体', "picknum": 5, "allnum": 10 },
]

var stuinfolist = [
  { "sname": "钟亦文1", "faculty": '数字媒体' },
  { "sname": "钟亦文2", "faculty": '网络工程' },
  { "sname": "钟亦文3", "faculty": '软件工程' },
  { "sname": "钟亦文4", "faculty": '数字媒体' },
  { "sname": "钟亦文5", "faculty": '网络工程' },
  { "sname": "钟亦文6", "faculty": '计算机自动化' },
]
var volinfolist = [];
var facultyli = ['数字媒体', '网络工程', '软件工程', '计算机自动化']
Page({
  data: {
    animation: '',
    animationData: {},
    percent: 0,
    listData: tutorinfolist,
    facultyList: facultyli,
    stuList: stuinfolist,
    xindex: -1,
    tutors: [],
    faculties: [],
    students: [],
    searchtu: true,
    record_line: 1,
    tutor_pick: true,
    selectall: false,
    isStudent: isStu,
    my_choice: voluneidinfolist

  },
  bindPickerChange: function (e) {
    this.setData({
      xindex: e.detail.value,
    })
    var x = this.data.xindex;
    var facul = facultyli[x];
    var arr = new Array();
    for (var i = 0; i < tutorinfolist.length; i++) {
      var m = tutorinfolist[i];
      if (facul == m.faculty) arr.push(m);
    }
    this.setData({
      faculties: arr,
      searchtu: false,
    });
    tutor_name = this.data.faculties;
    checkindex.length = tutor_name.length;
    for (var i = 0; i < checkindex.length; i++)checkindex[i] = true;
  },
  choose: function (e) {
    this.setData({
      record_line: e.currentTarget.dataset.index
    });
    recordline = this.data.record_line;
    if (isStu) {

      checkindex[recordline] = true;
      choice_stu++;
      tutor_name[recordline].picknum++;
     /* wx.showLoading({
        title: '提交中...',
      })
      wx.request({
        url: 'http://localhost:8443/report/findReport',
        // zhr：在上面输入你的本机Servlet地址
        method: 'POST',
        data: {
          sid: getApp().globalData.uid,//向数据库提交学生id,老师id,choice,picknum
          tid: tutor_name[recordline].tid,
          choice: choice_stu,
        }
        ,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500,
            mask: true,
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
      })*/

      //if (choice_stu == 2) this.setData({ tutor_pick: false, });
    }
    else {
     /* var restatus = 0;
      for (var i = 0; i < volinfolist.length; i++) {
        if (stuinfolist[recordline].sid == volinfolist[i].sid) {
          volinfolist[i].status = 1;
          restatus = i;
          break;
        }
      }*/

      if (this.data.selectall) {
       /* wx.showLoading({
          title: '提交中...',
        })
        wx.request({
          url: 'http://localhost:8443/report/findReportItem',
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: getApp().globalData.uid,//向数据库提交 学生id,老师id,choice
            sid: stuinfolist[recordline].sid,
            choice: choice_stu,
            status: volinfolist[restatus].status
          }
          ,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            wx.hideLoading();
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 1500,
              mask: true,
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
        })*/
        /*checkindex[recordline] = false;*/
      }
      else {
      }
     // tutor_name[recordline].picknum++;
    }

    //刷新
  },

  unchoose: function (e) {
    this.setData({
      record_line: e.currentTarget.dataset.index
    });
    recordline = this.data.record_line;
    if (isStu) {
      //向数据库请求数据，当前选择的数据和数据库中的数据对比(name,faculty,uid,choice)，若一样则选取该条数据，进行删除操作
      choice_stu--;
     
      checkindex[recordline] = false;

      /*for (var i = 0; i < tutorinfolist.length; i++) {
        if (tutor_name[recordline] == tutorinfolist[i]) {
          tutor_name[recordline].select = true;
          tutorinfolist[i].select = true;
        }
      }*/
      //与之对应数据库表中的picknum减一，tutor_name[recordline].picknum--
    }
    else {
      if (this.data.selectall) {
        stuinfolist[recordline].select = true;
      }
      else {

      }
    }
    //向数据库提交该老师的数据，添加tname,suid,等等
    ////刷新
  },

  searchStu: function (e) {
    var sname = e.detail.value;
    var arr = new Array();
    for (var i = 0; i < stuinfolist.length; i++) {
      var m = stuinfolist[i];
      if (sname == m.sname) arr.push(m);
    }
    this.setData({
      selectall: false,
      students: arr,
    });
    student_name = this.data.students;
  },
  selectall: function () {
    this.setData({
      selectall: true
    });
  },
  searchtutor: function (e) {
    var name = e.detail.value;
    var arr = new Array();
    for (var i = 0; i < tutorinfolist.length; i++) {
      var m = tutorinfolist[i];
      if (name == m.name) arr.push(m);
    }
    this.setData({
      tutors: arr,
      searchtu: true
    });
    tutor_name = this.data.tutors;
    checkindex.length = tutor_name.length;
    for (var i = 0; i < checkindex.length; i++)checkindex[i] = true;
  },

  tutordetail: function (e) {

    this.setData({
      record_line: e.currentTarget.dataset.index
    });
    recordline = this.data.record_line;

    wx.navigateTo({
      url: '../tutor/info_t'
    })
  },
  studetail: function (e) {
    if (this.data.selectall)
    { student_name = stuinfolist;
      console.log(student_name) }
    this.setData({
      record_line: e.currentTarget.dataset.index
    });
    recordline = this.data.record_line;

    wx.navigateTo({
      url: '../tutor/info_s'
    })
  },
  onShow: function () {
    // 实例化一个动画
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 500,
    })

    // 传递给 data
    this.animation = animation

    // 调用实例的方法来描述动画。
    // 调用动画操作方法后要调用 step() 来表示一组动画完成，可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。
    animation.translate(0, 50).step()

    // 通过动画实例的export方法导出动画数据传递给组件
    // export 方法每次调用后会清掉之前的动画操作
    this.setData({
      animationData: animation.export()
    })

    // 设置了一个延迟函数，5秒钟后平移
    setTimeout(function () {
      animation.translate(0, -50).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 5000)
  },

  //以下是参考的三个动画写法
  rotateAndScale: function () {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale: function () {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function () {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onLoad: function () {
    this.setData({
      percent: getApp().globalData.percent
    })

    /*wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://localhost:8443/report/findReport',//？？？
      // zhr：在上面输入你的本机Servlet地址
      method: 'GET',
      success: function (res) {
        volinfolist: res.data.reportList.reportItems//获取suid,tuid,choice
        tutorinfolist: res.data.reportList
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '服务器连接失败',
          image: '../../img/fail.png',
          duration: 2000,
          mask: true,
        })
      }
    })*/
    //var arr = new Array();
    if (isStu) {
      /*for (var i = 0; i < volinfolist.length; i++) {
        if (getApp().globalData.uid == volinfolist[i].sid)
          arr.push(volinfolist[i]);
      }
      voluneidinfolist = arr;*/
    }
    else {
      /*wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'http://localhost:8443/info',//？？？
        // zhr：在上面输入你的本机Servlet地址
        method: 'GET',
        success: function (res) {
          stuinfolist: res.data.studentInfo//获取suid,tuid,choice
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '服务器连接失败',
            image: '../../img/fail.png',
            duration: 2000,
            mask: true,
          })
        }
      })
      for (var i = 0; i < volinfolist.length; i++) {
        for (var j = 0; j < stuinfolist.length; j++) {
          if (volinfolist[i].sid == stuinfolist[j].sid) {
            arr.push(stuinfolist[j]);
          }
        }
      }
      stuinfolist = arr;*/
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})
var getTutor = function () {
  return tutor_name;
}
var getRecord = function () {
  return recordline;
}
var getStu = function () {
  return student_name;
}
module.exports = {
  student_name: student_name,
  tutor_name: tutor_name,
  recordline: recordline,
  getTutor: getTutor,
  getRecord: getRecord,
  getStu: getStu
}

