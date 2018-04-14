// pages/tutor/tutor.js
var app = getApp();
var tutor_name;
var student_name;
var recordline = 0;
var checkindex = [];
var choice_stu = 0;
var recordindex = 0;
//var select = ['选择', '退选']
var isStu = getApp().globalData.isStudent;
var voluneidinfolist = [
  { "sid": 105, "tid": 1002, "name": "王秀梅", "choice": '第一志愿', "status": '处理中' },
]
var tutorinfolist = [
  { "tid": 1004, "name": "潘翔", "department": '数字媒体', "picknum": 20, "allnum": 30 },
  { "tid": 1002, "name": "王秀梅", "department": '网络工程', "picknum": 10, "allnum": 50 },
  { "tid": 1003, "name": "王鑫", "department": '软件工程', "picknum": 15, "allnum": 10 },
  { "tid": 1005, "name": "亦文", "department": '数字媒体', "picknum": 20, "allnum": 30 },
  { "tid": 1006, "name": "王老师", "department": '网络工程', "picknum": 50, "allnum": 50 },
  { "tid": 1007, "name": "王鑫2", "department": '计算机自动化', "picknum": 5, "allnum": 10 },
  { "tid": 1008, "name": "王万良1", "department": '计算机自动化', "picknum": 13, "allnum": 26 },
  { "tid": 1009, "name": "王春平", "department": '软件工程', "picknum": 5, "allnum": 10 },
  { "tid": 1000, "name": "龙胜春", "department": '软件工程', "picknum": 5, "allnum": 10 },
  { "tid": 1011, "name": "汤颖", "department": '数字媒体', "picknum": 5, "allnum": 10 },
  { "tid": 1001, "name": "王万良", "department": '计算机自动化', "picknum": 13, "allnum": 26 },
]

var stuinfolist = [
  { "sid": 101, "sname": "钟亦文1", "sclass": '数字媒体' },
  { "sid": 106, "sname": "钟亦文2", "sclass": '网络工程' },
  { "sid": 104, "sname": "钟亦文3", "sclass": '软件工程' },
  { "sid": 103, "sname": "钟亦文4", "sclass": '数字媒体' },
  { "sid": 105, "sname": "钟亦文5", "sclass": '网络工程' },
  { "sid": 102, "sname": "钟亦文6", "sclass": '计算机自动化' },
]
var volinfolist = [];
volinfolist = voluneidinfolist
var facultyli = ['数字媒体', '网络工程', '软件工程', '计算机自动化']
Page({
  data: {
    animation: '',
    animationData: {},
    percent: 0,
    uid: '',
    listData: tutorinfolist,
    facultyList: facultyli,
    stuList: stuinfolist,
    xindex: -1,
    tutors: [],
    faculties: [],
    students: [],
    searchtu: true,
    record_line: 0,
    tutor_pick: true,
    selectall: false,
    isStudent: isStu,
    my_choice: volinfolist,
    checkindex: checkindex
  },
  bindPickerChange: function (e) {
    this.setData({
      xindex: e.detail.value,

    })
    recordline = 0;
    var x = this.data.xindex;
    var facul = facultyli[x];
    var arr = new Array();
    for (var i in tutorinfolist) {
      var m = tutorinfolist[i];
      if (facul == m.department) arr.push(m);
    }
    this.setData({
      faculties: arr,
      searchtu: false,
    });
    tutor_name = this.data.faculties;


    for (var i = 0; i < tutor_name.length; i++) {
      checkindex[i] = true;//给搜索到的每一行添加标签

    }
    this.setData({
      checkindex: checkindex
    })
    //console.log(checkindex)

    for (var i = 0; i < voluneidinfolist.length; i++) {//对比自己的志愿和搜索出的老师列表，志愿中的tid在老师列表中存在的话，则相对应那行的标签设置为false，即不可选
      for (var j = 0; j < tutor_name.length; j++) {
        if (voluneidinfolist[i].tid == tutor_name[j].tid) {
          checkindex[j] = false;
          console.log('当前你的志愿处于第' + (j) + '行')
        }
      }
    }
    this.setData({
      checkindex: checkindex,
    })

  },
  choose: function (e) {
    this.setData({
      record_line: e.currentTarget.dataset.index
    });

    if (isStu) {
     
      choice_stu++;
      if (choice_stu == 3) {
        var toastText = '超过啦!';
        wx.showToast({
          title: toastText,
          image: '../../img/none.png',
          duration: 2000,
          mask: true,
        })
        choice_stu--;
        return;
      }
      recordline = this.data.record_line;
      checkindex[recordline] = false;
      this.setData({
        checkindex: checkindex
      })
      var fill = {
        sid: getApp().globalData.uid,
        tid: tutor_name[recordline].tid,
        name: tutor_name[recordline].name,
        choice: choice_stu,
        status: 0,
      }
      voluneidinfolist.push(fill);
      console.log(voluneidinfolist);
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



    }
    else {
      //添加一个请求，教师表
      //var mylist,if mylist.picknum>最多选择人数，进行提示，return
      if (this.data.selectall) {
     
        recordline = this.data.record_line;
        choice_stu++;
        //搜索mylist中的sid
        var fill = {
          sid: stuinfolist[recordline].sid,
          tid: getApp().globalData.uid,
          name: stuinfolist[recordline].sname,
          choice: choice_stu,
          status: 1

        }

        checkindex[recordline] = false;
        this.setData({
          checkindex: checkindex
        })
        voluneidinfolist.push(fill);
        console.log(voluneidinfolist);
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

      }
      else {
       
        recordline = this.data.record_line;
        choice_stu++;
        //搜索mylist中的sid
        var fill = {
          sid: student_name[recordline].sid,
          tid: getApp().globalData.uid,
          name: '教师名字',
          choice: choice_stu,
          status: 1

        }
        checkindex[recordline] = false;
        this.setData({
          checkindex: checkindex
        })
        voluneidinfolist.push(fill);
        console.log(voluneidinfolist);
      }

    }

    //刷新
  },

  unchoose: function (e) {
    this.setData({
      record_line: e.currentTarget.dataset.index
    });
    recordline = this.data.record_line;
    checkindex[recordline] = true;
    this.setData({
      checkindex: checkindex
    })
    if (isStu) {
      //向数据库请求数据，当前选择的数据和数据库中的数据对比(name,faculty,uid,choice)，若一样则选取该条数据，进行删除操作
      choice_stu--;
      for (var i = 0; i < voluneidinfolist.length; i++) {
        if (tutor_name[recordline].tid == voluneidinfolist[i].tid) {
          voluneidinfolist.splice(i, 1)
        }
      } console.log(voluneidinfolist);


      //与之对应数据库表中的picknum减一，tutor_name[recordline].picknum--
    }
    else {
      if (this.data.selectall) {
        for (var i = 0; i < voluneidinfolist.length; i++) {
          if (stuinfolist[recordline].sid == voluneidinfolist[i].sid) {
            voluneidinfolist.splice(i, 1)
          }
        }
        console.log(voluneidinfolist);
      }
      else {
        for (var i = 0; i < voluneidinfolist.length; i++) {
          if (student_name[recordline].sid == voluneidinfolist[i].sid) {
            voluneidinfolist.splice(i, 1)
          }
        } console.log(voluneidinfolist);
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

    for (var i = 0; i < student_name.length; i++) {
      checkindex[i] = true;//给搜索到的每一行添加标签

    }
    this.setData({
      checkindex: checkindex
    })
    //console.log(checkindex)

    for (var i = 0; i < voluneidinfolist.length; i++) {//对比自己的学生和搜索出的学生列表，志愿中的tid在学生列表中存在的话，则相对应那行的标签设置为false，即不可选
      for (var j = 0; j < student_name.length; j++) {
        if (voluneidinfolist[i].sid == student_name[j].sid) {
          checkindex[j] = false;
          console.log('当前你的学生处于第' + (j) + '行')
        }
      }
    }
    this.setData({
      checkindex: checkindex,
    })

  },
  selectall: function () {
    this.setData({
      selectall: true
    });
    for (var i = 0; i < stuinfolist.length; i++) {
      checkindex[i] = true;//给搜索到的每一行添加标签

    }
    this.setData({
      checkindex: checkindex
    })
    //console.log(checkindex)

    for (var i = 0; i < voluneidinfolist.length; i++) {//对比自己的学生和搜索出的学生列表，志愿中的tid在学生列表中存在的话，则相对应那行的标签设置为false，即不可选
      for (var j = 0; j < stuinfolist.length; j++) {
        if (voluneidinfolist[i].sid == stuinfolist[j].sid) {
          checkindex[j] = false;
          console.log('当前你的学生处于第' + (j) + '行')
        }
      }
    }
    this.setData({
      checkindex: checkindex,
    })

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

    for (var i = 0; i < tutor_name.length; i++) {
      checkindex[i] = true;//给搜索到的每一行添加标签

    }
    this.setData({
      checkindex: checkindex
    })
    //console.log(checkindex)

    for (var i = 0; i < voluneidinfolist.length; i++) {//对比自己的志愿和搜索出的老师列表，志愿中的tid在老师列表中存在的话，则相对应那行的标签设置为false，即不可选
      for (var j = 0; j < tutor_name.length; j++) {
        if (voluneidinfolist[i].tid == tutor_name[j].tid) {
          checkindex[j] = false;
          console.log('当前你的志愿处于第' + (j) + '行')
        }
      }
    }
    this.setData({
      checkindex: checkindex,
    })
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
    if (this.data.selectall) {
      student_name = stuinfolist;
      console.log(student_name)
    }
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
    var that = this;
    this.setData({
      percent: getApp().globalData.percent,
      uid: getApp().globalData.uid
    })
    /*
        wx.showLoading({
          title: '加载中...',
        })
        wx.request({
          url: 'http://localhost:8443/report/index',//？？？
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            uid: that.data.uid
          },
          success: function (res) {
            wx.hideLoading();
            var List = res.data.reportList[0].reportItems;
            if (List == null) {
              var toastText = 'failed';
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 1500,
                mask: true,
              })
            }
            else {
    
              voluneidinfolist = List;//根据post动作uid来获取
              //如果uid是学生，则获取有关自己选导师记录的list，要到不同老师的下面查询
              //如果uid是老师，则获取所有自己id下学生选导的情况
            }
    
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
    if (isStu) {//如果是学生则请求老师信息
      /* wx.showLoading({
         title: '加载中...',
       })
       wx.request({
         url: 'http://localhost:8443/report/index',//？？？
         // zhr：在上面输入你的本机Servlet地址
         method: 'POST',
         success: function (res) {
 
           wx.hideLoading();
           var List = res.data.report;
           if (List == null) {
             var toastText = 'failed';
             wx.showToast({
               title: toastText,
               icon: '',
               duration: 1500,
               mask: true,
             })
           }
           else {
             tutorinfolist = List;
           }
 
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
       var fill = {
         name: '',
         choice: 0,
         status: 0
       }
 
       for (var i in voluneidinfolist) {
         for (var j in tutorinfolist) {
           if (voluneidinfolist[i].tid == tutorinfolist[j].tid) {
             fill.name = tutorinfolist[j].tname;
             fill.choice = voluneidinfolist[i].choice;
             fill.status = voluneidinfolist[i].status;
             volinfolist[i] = fill;
           }
         }
       }
 
       for (var i in volinfolist) {
         switch (volinfolist[i].choice) {
           case 1: volinfolist[i].choice = '第一志愿'; break;
           case 2: volinfolist[i].choice = '第二志愿'; break;
           default: volinfolist.choice = '随机匹配';
         }
         switch (volinfolist[i].status) {
           case 0: volinfolist[i].status = '处理中'; break;
           case 1: volinfolist[i].status = '成功'; break;
           case 2: volinfolist[i].status = '失败'; break;
         }
       }*/





    }
    else {//如果是老师则请求学生信息
      /* wx.showLoading({
         title: '加载中...',
       })
       wx.request({
         url: 'http://localhost:8443/info',//？？？
         // zhr：在上面输入你的本机Servlet地址
         method: 'POST',
 
         success: function (res) {
           wx.hideLoading();
           var Lists = res.data.studentInfo;
           if (List == null) {
             var toastText = 'failed';
             wx.showToast({
               title: toastText,
               icon: '',
               duration: 1500,
               mask: true,
             })
           }
           else {
             stuinfolist = List;//根据post动作uid来获取
           }
 
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
 
    
       var arr = new Array();
       for (var i in voluneidinfolist) {//选择自己的学生
         for (var j in stuinfolist) {//所有学生的信息
           if (voluneidinfolist[i].sid == stuinfolist[i].sid) {
             var m = stuinfolist[i];
             arr.push(m);
           }
         }
       }
       stuinfolist = arr;//获取到了该老师下所有学生的个人信息*/

    }
    choice_stu = voluneidinfolist.length;

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

