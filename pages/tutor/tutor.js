// pages/tutor/tutor.js
var app = getApp();
var tutor_name;
var student_name;
var recordline;
var idinfolist = [
  { "name": "潘翔", "faculty": '数字媒体', "picknum": 20, "allnum": 30,"select":false },
  { "name": "王秀梅", "faculty": '网络工程', "picknum": 10, "allnum": 50, "select": false },
  { "name": "王鑫", "faculty": '软件工程', "picknum": 15, "allnum": 10, "select": false },
  { "name": "王万良", "faculty": '计算机自动化', "picknum": 13, "allnum": 26, "select": false },
  { "name": "亦文", "faculty": '数字媒体', "picknum": 20, "allnum": 30, "select": false },
  { "name": "王老师", "faculty": '网络工程', "picknum": 50, "allnum": 50, "select": false},
  { "name": "王鑫", "faculty": '计算机自动化', "picknum": 5, "allnum": 10, "select": false },
  { "name": "王万良1", "faculty": '计算机自动化', "picknum": 13, "allnum": 26, "select": false },
  { "name": "王春平", "faculty": '软件工程', "picknum": 5, "allnum": 10, "select": false},
  { "name": "龙胜春", "faculty": '软件工程', "picknum": 5, "allnum": 10, "select": false },
  { "name": "汤颖", "faculty": '数字媒体', "picknum": 5, "allnum": 10, "select": false },

]

var idinfolist2 = [
  { "sname": "钟亦文", "faculty": '数字媒体' },
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
    stuList:idinfolist2,
    xindex: -1,
    tutors: [],
    faculties: [],
    students:[],
    searchtu: true,
    record_line: 1,
    tutor_pick:false,
    selectall:false
  },
  bindPickerChange: function (e) {
    this.setData({
      xindex: e.detail.value,
    })

  },
  choose:function(e){
    this.setData({
      tutor_pick: false
    });
  },
  
  unchoose: function (e) {
    this.setData({
      tutor_pick:true
    });

  },

  searchStu:function(e){
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
  selectall:function(){
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
    tutor_name=this.data.tutors;
  },
  searchfaculty: function () {
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
  tutordetail: function (e) {

    this.setData({
      record_line: e.currentTarget.dataset.index
    });
    recordline = this.data.record_line;
    wx.navigateTo({
      url: '../tutor/info'
    })
  }, 
  studetail: function (e) {
    if (this.data.selectall) 
      student_name = idinfolist2
    this.setData({
      record_line: e.currentTarget.dataset.index,
    });
    recordline = this.data.record_line;
   
    wx.navigateTo({
      url: '../tutor/info'
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

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})
var getMylist=function(){
  return tutor_name;
}
var getRecord=function(){
  return recordline;
}
var getstu=function(){
  return student_name;
}
module.exports={
  student_name: student_name,
  tutor_name: tutor_name,
  recordline: recordline,
  getMylist: getMylist,
  getRecord: getRecord,
  getstu: getstu
}

