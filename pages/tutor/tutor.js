// pages/tutor/tutor.js
var app = getApp();
var tutor_name;
var student_name;
var recordline;
var isStu = getApp().globalData.isStudent;
var choice_stu = 0;
var idinfolist = [
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

var idinfolist2 = [
  { "sname": "钟亦文1", "faculty": '数字媒体' },
  { "sname": "钟亦文2", "faculty": '网络工程' },
  { "sname": "钟亦文3", "faculty": '软件工程' },
  { "sname": "钟亦文4", "faculty": '数字媒体' },
  { "sname": "钟亦文5", "faculty": '网络工程' },
  { "sname": "钟亦文6", "faculty": '计算机自动化' },
]
var facultyli = ['数字媒体', '网络工程', '软件工程', '计算机自动化']
Page({
  data: {
    animation: '',
    animationData: {},
    percent: 0,
    listData: idinfolist,
    facultyList: facultyli,
    stuList: idinfolist2,
    xindex: -1,
    tutors: [],
    faculties: [],
    students: [],
    searchtu: true,
    record_line: 1,
    tutor_pick: true,
    selectall: false,
    isStudent: isStu,

  },
  bindPickerChange: function (e) {
    this.setData({
      xindex: e.detail.value,
    })
    var x = this.data.xindex;
    var facul = facultyli[x];
    var arr = new Array();
    for (var i = 0; i < idinfolist.length; i++) {
      var m = idinfolist[i];
      if (facul == m.faculty) arr.push(m);
    }
    this.setData({
      faculties: arr,
      searchtu: false,
    });
    tutor_name = this.data.faculties;

  },
  choose: function (e) {
    this.setData({
      record_line: e.currentTarget.dataset.index
    });
    recordline = this.data.record_line;
    if (isStu) {

      /*wx.setStorage({
        key: 'volune',
        data: { "name": tutor_name[recordline].name, "faculty": tutor_name[recordline].faculty}
      })*/
      //向数据库request，数据与tutor_name[recordline].name, "faculty": tutor_name[recordline].faculty比较
      choice_stu++;
      //向数据库提交uid,tutorname,faculty,choice
      /* for (var i = 0; i < idinfolist.length; i++) {
         if (tutor_name[recordline] == idinfolist[i]) {
           tutor_name[recordline].select=false;
           idinfolist[i].select = false;
         }
       }*/

      if (choice_stu == 2) this.setData({ tutor_pick: false, });
      //与之对应数据库表中的picknum加一，tutor_name[recordline].picknum++
    }
    else {
      //向数据库请求，查找选择了自己的学生
      if (this.data.selectall) {
        idinfolist2[recordline].select = false;
      }
      else {
        /*for (var i = 0; i < idinfolist2.length; i++) {
          if (student_name[recordline] == idinfolist2[i]) {
            student_name[recordline].select = false;
            idinfolist2[i].select = false;}
          }*/
       }
    }
    //向数据库提交该学生的数据，添加tname,suid,等等
    //刷新
  },

  unchoose: function (e) {
    this.setData({
      tutor_pick: true,
      record_line: e.currentTarget.dataset.index
    });
    recordline = this.data.record_line;
    if (isStu) {
    //向数据库请求数据，当前选择的数据和数据库中的数据对比(name,faculty,uid,choice)，若一样则选取该条数据，进行删除操作
    choice_stu--;
    /*for (var i = 0; i < idinfolist.length; i++) {
      if (tutor_name[recordline] == idinfolist[i]) {
        tutor_name[recordline].select = true;
        idinfolist[i].select = true;
      }
    }*/ 
    //与之对应数据库表中的picknum减一，tutor_name[recordline].picknum--
    }
    else{
      if (this.data.selectall) {
        idinfolist2[recordline].select=true;
      }
      else{
        /*for (var i = 0; i < idinfolist2.length; i++) {
          if (student_name[recordline] == idinfolist2[i]) {
            student_name[recordline].select = true;
            idinfolist2[i].select = true;
          }
        }*/
      }
    }
   //向数据库提交该老师的数据，添加tname,suid,等等
    ////刷新
  },

  searchStu: function (e) {
    var sname = e.detail.value;
    var arr = new Array();
    for (var i = 0; i < idinfolist2.length; i++) {
      var m = idinfolist2[i];
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
    for (var i = 0; i < idinfolist.length; i++) {
      var m = idinfolist[i];
      if (name == m.name) arr.push(m);
    }
    this.setData({
      tutors: arr,
      searchtu: true
    });
    tutor_name = this.data.tutors;
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
      student_name = idinfolist2
    this.setData({

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
    idinfolist
    wx.getStorageSync('logs')

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

