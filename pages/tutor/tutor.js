// pages/tutor/tutor.js
var app = getApp();
var tutor_name;
var student_name;
var recordline = 0;
var checkindex = [];
var choice_stu = 0;
var recordindex = 0;

var facultyli = ['计算机教学研究中心', '计算机软件研究所', '计算机视觉研究所', '计算机智能系统研究所', '智能技术工程中心', '空间信息计算研究所','数字媒体技术研究所']; 
//var select = ['选择', '退选']

var isStu = null;
var voluneidinfolist = [

  /*{ "sid": 105, "tid": 1002, "choice": 1, "status": 0 },
  { "sid": 101, "tid": 1003, "choice": 2, "status": 1 },
  { "sid": 104, "tid": 1011, "choice": 3, "status": 2 },*/

]
var tutorinfolist = [
  /* { "tid": 1004, "tname": "潘翔", "department": '数字媒体', "picknum": 20, "allnum": 30 },
   { "tid": 1002, "tname": "王秀梅", "department": '网络工程', "picknum": 10, "allnum": 50 },
   { "tid": 1003, "tname": "王鑫", "department": '软件工程', "picknum": 15, "allnum": 10 },
   { "tid": 1005, "tname": "亦文", "department": '数字媒体', "picknum": 20, "allnum": 30 },
   { "tid": 1006, "tname": "王老师", "department": '网络工程', "picknum": 50, "allnum": 50 },
   { "tid": 1007, "tname": "王鑫2", "department": '计算机自动化', "picknum": 5, "allnum": 10 },
   { "tid": 1008, "tname": "王万良1", "department": '计算机自动化', "picknum": 13, "allnum": 26 },
   { "tid": 1009, "tname": "王春平", "department": '软件工程', "picknum": 5, "allnum": 10 },
   { "tid": 1000, "tname": "龙胜春", "department": '软件工程', "picknum": 5, "allnum": 10 },
   { "tid": 1011, "tname": "王万良", "department": '计算机自动化', "picknum": 13, "allnum": 26 },*/
]

var stuinfolist = [
  /* { "sid": 101, "sname": "钟亦文1", "sclass": '数字媒体' },
   { "sid": 106, "sname": "钟亦文2", "sclass": '网络工程' },
   { "sid": 104, "sname": "钟亦文3", "sclass": '软件工程' },
   { "sid": 103, "sname": "钟亦文4", "sclass": '数字媒体' },
   { "sid": 105, "sname": "钟亦文5", "sclass": '网络工程' },
   { "sid": 102, "sname": "钟亦文6", "sclass": '计算机自动化' },*/
]
var volinfolist = [];
//volinfolist = voluneidinfolist;

Page({
  data: {
    animation: '',
    animationData: {},
    percent: 0,
    uid: 0,
    tutorinfolist: [],
    voluneidinfolist: [],
    stuinfolist: [],
    facultyList: facultyli,
    stuList: [],
    xindex: -1,
    tutors: [],
    faculties: [],
    students: [],
    searchtu: true,
    record_line: 0,
    tutor_pick: true,
    selectall: false,
    isStudent: null,
    my_choice: [],
    checkindex: [],
    refreshFlag: false,
    timeNode: 0
  },
  bindPickerChange: function (e) {
    this.setData({
      xindex: e.detail.value,

    })
    recordline = 0;
    var x = this.data.xindex;
    var facul = facultyli[x];
    var arr = new Array();
    for (var i = 0; i < tutorinfolist.length; i++) {
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

  cancel: function (e) {
    var that = this;
    that.setData({
      record_line: e.currentTarget.dataset.index
    });
    if (that.data.selectall) {
      recordline = that.data.record_line;
      wx.showLoading({
        title: '提交中...',
      })
      wx.request({
        url: 'https://zyowo.cn/choice/report/teacher_choice',//???
        // zhr：在上面输入你的本机Servlet地址
        method: 'POST',
        data: {
          tid: getApp().globalData.uid,//向数据库提交 学生id,老师id,choice,老师选择了该学生
          sid: stuinfolist[recordline].sid,
          status: 0
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

          checkindex[recordline] = true;
          that.setData({
            checkindex: checkindex
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
    }
    else {
      recordline = that.data.record_line;
      wx.showLoading({
        title: '提交中...',
      })
      wx.request({
        url: 'https://zyowo.cn/choice/report/teacher_choice',//???
        // zhr：在上面输入你的本机Servlet地址
        method: 'POST',
        data: {
          tid: getApp().globalData.uid,//向数据库提交 学生id,老师id,choice,老师选择了该学生
          sid: student_name[recordline].sid,
          status: 0
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

          checkindex[recordline] = true;
          that.setData({
            checkindex: checkindex
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
    }
  },
  choose: function (e) {
    var that = this;
    that.setData({
      record_line: e.currentTarget.dataset.index
    });

    if (isStu) {
      choice_stu++;
      if (choice_stu >= 3) {
        var toastText = '超过啦!';
        wx.showToast({
          title: toastText,
          image: '../../img/none.png',
          duration: 1500,
          mask: true,
        })
        choice_stu--;
        return;
      }
      recordline = that.data.record_line;

      wx.showLoading({
        title: '提交中...',
      })
      wx.request({
        url: 'https://zyowo.cn/choice/report/student_choice',
        // zhr：在上面输入你的本机Servlet地址
        method: 'POST',
        data: {
          sid: that.data.uid,//向数据库提交 一条sid-tid-choice-status数据
          tid: tutor_name[recordline].tid,
          choiceNum: choice_stu,
        }
        ,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.message)
          wx.hideLoading();
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500,
            mask: true,
          })
          console.log(tutor_name[recordline].tid)
          checkindex[recordline] = false;
          that.setData({
            checkindex: checkindex,
          })
          var fill = {
            sid: that.data.uid,
            tid: tutor_name[recordline].tid,
            status: 0,
            choiceNumber: choice_stu,

          }
          voluneidinfolist.push(fill);
          that.supdatevoluneInfoList();
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



    }
    else {
      //添加一个请求，教师表
      //var mylist,if mylist.picknum>最多选择人数，进行提示，return
      wx.showLoading({
        title: '提交中...',
      })
      var List;
      wx.request({
        url: 'https://zyowo.cn/choice/report/index',//根据自己的tid,在教师列表中寻找picknum,allnum
        // zhr：在上面输入你的本机Servlet地址
        method: 'POST',
        data: {
        }
        ,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          var m;
          m = res.data.reportList;
          for (var i = 0; i < m.length; i++) {
            if (that.data.uid == m[i].tid)
              List = m[i]
          }
          List.picknum++;
          if (List.picknum >= List.allnum) {
            var toastText = '超过啦!';
            wx.showToast({
              title: toastText,
              image: '../../img/none.png',
              duration: 2000,
              mask: true,
            })
            List.picknum--;
            return;
          }
          console.log(List.picknum)
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


      if (that.data.selectall) {


        recordline = that.data.record_line;
        //choice_stu++;
        //搜索mylist中的sid
        /*var fill = {
          sid: stuinfolist[recordline].sid,
          tid: getApp().globalData.uid,
          choice: choice_stu,
          status: 1
        }
         voluneidinfolist.push(fill);
        console.log(voluneidinfolist);
*/


        wx.showLoading({
          title: '提交中...',
        })
        wx.request({
          url: 'https://zyowo.cn/choice/report/teacher_choice',
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: getApp().globalData.uid,//向数据库提交 学生id,老师id,choice,老师选择了该学生
            sid: stuinfolist[recordline].sid,
            status: 1
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
            checkindex[recordline] = false;
            that.setData({
              checkindex: checkindex
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

      }
      else {

        recordline = that.data.record_line;

        //choice_stu++;
        //搜索mylist中的sid

        /*var fill = {
          sid: student_name[recordline].sid,
          tid: getApp().globalData.uid,
          choice: choice_stu,
          status: 1
        }
        voluneidinfolist.push(fill);
        console.log(voluneidinfolist);
        */
        wx.showLoading({
          title: '提交中...',
        })
        wx.request({
          url: 'https://zyowo.cn/choice/report/teacher_choice',
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: getApp().globalData.uid,//向数据库提交 学生id,老师id,choice，老师选择了该学生
            sid: stuinfolist[recordline].sid,
            status: 1
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
            checkindex[recordline] = false;
            that.setData({
              checkindex: checkindex
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


      }

    }


  },

  unchoose: function (e) {
    var that = this;
    that.setData({
      record_line: e.currentTarget.dataset.index
    });
    recordline = that.data.record_line;

    if (isStu) {
      //向数据库请求数据，当前选择的数据和数据库中的数据对比(name,faculty,uid,choice)，若一样则选取该条数据，进行删除操作
      choice_stu--;
      wx.showLoading({
        title: '提交中...',
      })
      wx.request({
        url: 'https://zyowo.cn/choice/report/student_exit_choice',
        // zhr：在上面输入你的本机Servlet地址
        method: 'POST',
        data: {
          sid: getApp().globalData.uid,//向数据库提交 sid-tid,查询该条数据，并删除
          tid: tutor_name[recordline].tid,
        }
        ,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.message)
          wx.hideLoading();
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500,
            mask: true,
          })
          for (var i = 0; i < voluneidinfolist.length; i++) {
            if (tutor_name[recordline].tid == voluneidinfolist[i].tid) {
              voluneidinfolist.splice(i, 1)
            }
          }
          that.supdatevoluneInfoList();
          checkindex[recordline] = true;
          that.setData({
            checkindex: checkindex
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


      /*for (var i = 0; i < voluneidinfolist.length; i++) {
        if (tutor_name[recordline].tid == voluneidinfolist[i].tid) {
          voluneidinfolist.splice(i, 1)
        }
      } console.log(voluneidinfolist);*/


      //与之对应数据库表中的picknum减一，tutor_name[recordline].picknum--
    }
    else {
      checkindex[recordline] = false;
      that.setData({
        checkindex: checkindex
      })
      if (this.data.selectall) {
        wx.showLoading({
          title: '提交中...',
        })
        wx.request({
          url: 'https://zyowo.cn/choice/report/teacher_choice',//???
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: getApp().globalData.uid,//向数据库提交 sid-tid,查询该条数据，并删除
            sid: stuinfolist[recordline].sid,
            status: 2
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
        /* for (var i = 0; i < voluneidinfolist.length; i++) {
           if (stuinfolist[recordline].sid == voluneidinfolist[i].sid) {
             voluneidinfolist.splice(i, 1)
           }
         }
         console.log(voluneidinfolist);*/
      }
      else {
        wx.showLoading({
          title: '提交中...',
        })
        wx.request({
          url: 'https://zyowo.cn/choice/report/teacher_choice',//???
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: getApp().globalData.uid,//向数据库提交 sid-tid,查询该条数据，并删除
            sid: student_name[recordline].sid,
            status: 2
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
        /* for (var i = 0; i < voluneidinfolist.length; i++) {
           if (student_name[recordline].sid == voluneidinfolist[i].sid) {
             voluneidinfolist.splice(i, 1)
           }
         } console.log(voluneidinfolist);*/
      }
    }
    //向数据库提交该老师的数据，添加tname,suid,等等
    ////刷新
  },

  searchStu: function (e) {
    var that = this;
    var sname = e.detail.value;
    var arr = new Array();
    for (var i = 0; i < stuinfolist.length; i++) {
      var m = stuinfolist[i];
      if (sname == m.sname) arr.push(m);
    }
    that.setData({
      selectall: false,
      students: arr,
    });
    student_name = that.data.students;

    for (var i = 0; i < student_name.length; i++) {
      checkindex[i] = true;//给搜索到的每一行添加标签
    }
    that.setData({
      checkindex: checkindex
    })

    for (var i = 0; i < voluneidinfolist.length; i++) {//对比自己的学生和搜索出的学生列表，志愿中的tid在学生列表中存在的话，则相对应那行的标签设置为false，即不可选
      for (var j = 0; j < student_name.length; j++) {
        if (voluneidinfolist[i].sid == student_name[j].sid) {
          if (voluneidinfolist[i].status != 0) {
            checkindex[j] = false;
            console.log(voluneidinfolist[i])
          }
        }
      }
    }
    that.setData({
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


    for (var i = 0; i < voluneidinfolist.length; i++) {//对比自己的学生和搜索出的学生列表，志愿中的tid在学生列表中存在的话，则相对应那行的标签设置为false，即不可选

      if (voluneidinfolist[i].status != 0) {
        checkindex[i] = false;

      }

    }
    this.setData({
      checkindex: checkindex,
    })

  },
  searchtutor: function (e) {
    var tname = e.detail.value;
    var arr = new Array();
    for (var i = 0; i < tutorinfolist.length; i++) {
      var m = tutorinfolist[i];
      if (tname == m.tname) arr.push(m);
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
    var that = this;
    isStu = this.data.isStudent;
    if (isStu) {//如果是学生则请求老师信息

      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'https://zyowo.cn/choice/report/index',//？？？请求所有导师的信息repotrtlist        // zhr：在上面输入你的本机Servlet地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          var List = res.data.reportList;
          tutorinfolist = List;
          that.updatetutorInfoList();

          wx.request({
            url: 'https://zyowo.cn/choice/report/mychoice',
            // zhr：在上面输入你的本机Servlet地址
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              sid: app.globalData.uid,
            },

            success: function (res) {

              var List = res.data.reportItemList;
              if (List == null) {
                var toastText = '暂无已选导师';
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 1500,
                  mask: true,
                })
              }
              else {
                voluneidinfolist = List;//获取到自己sid下的tid-sid-choice-status列表
                that.supdatevoluneInfoList();
               
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


      //console.log('当前你的志愿情况', volinfolist)
    }
    else {//如果是老师则请求学生信息
      if (that.data.timeNode == 2) {
        wx.showLoading({//导师第一轮选取学生
          title: '加载中...',
        })
        wx.request({
          url: 'https://zyowo.cn/choice/report/findReportItem',
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: app.globalData.uid,
            //choiceNumber: 2
          },
          success: function (res) {
            wx.hideLoading();
            var List = res.data.reportItemList;
            if (List == null) {
              var toastText = '无学生';
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 1500,
                mask: true,
              })
            }
            else {
              voluneidinfolist = List;//获取到自己tid下第一轮的tid-sid-choice-status列表
              that.tupdatevoluneInfoList();

              console.log(that.data.uid)
              wx.request({
                url: 'https://zyowo.cn/choice/report/findReportItem',//？？？获取到所有学生的信息
                // zhr：在上面输入你的本机Servlet地址
                method: 'POST',
                data: {
                  tid: that.data.uid
                },

                success: function (res) {

                  var List = res.data.studentInfos;
                  if (List == null) {
                    var toastText = '';
                    wx.showToast({
                      title: toastText,
                      icon: '',
                      duration: 1500,
                      mask: true,
                    })
                  }
                  else {
                    stuinfolist = List;//获取到自己tid下第一轮的tid-sid-choice-status列表
                    that.updatestuInfoList();
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
      }

      else {
        wx.showLoading({//导师第二轮选取学生
          title: '加载中...',
        })
        wx.request({
          url: 'https://zyowo.cn/choice/report/findReportItem',
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: app.globalData.uid,
            //choiceNumber: 2
          },
          success: function (res) {
            wx.hideLoading();
            var List = res.data.reportItemList;
            if (List == null) {
              var toastText = '无学生';
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 1500,
                mask: true,
              })
            }
            else {
              voluneidinfolist = List;//获取到自己tid下第一轮的tid-sid-choice-status列表
              that.tupdatevoluneInfoList();

              console.log(that.data.uid)
              wx.request({
                url: 'https://zyowo.cn/choice/report/findReportItem',//？？？获取到所有学生的信息
                // zhr：在上面输入你的本机Servlet地址
                method: 'POST',
                data: {
                  tid: that.data.uid
                },

                success: function (res) {

                  var List = res.data.studentInfos;
                  if (List == null) {
                    var toastText = '';
                    wx.showToast({
                      title: toastText,
                      icon: '',
                      duration: 1500,
                      mask: true,
                    })
                  }
                  else {
                    stuinfolist = List;//获取到自己tid下第一轮的tid-sid-choice-status列表
                    that.updatestuInfoList();
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

      }
    }

    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  updatestuInfoList: function () {
    this.setData({
      stuinfolist: stuinfolist,
    })
    var arr = new Array();
    for (var i = 0; i < voluneidinfolist.length; i++) {//选择自己的学生
      for (var j = 0; j < stuinfolist.length; j++) {//所有学生的信息
        if (voluneidinfolist[i].sid == stuinfolist[j].sid) {
          var m = stuinfolist[j];
          arr.push(m);
        }
      }
    }

    stuinfolist = arr;//获取到了该老师下所有学生的个人信息
    this.setData({
      stuList: stuinfolist
    })

    console.log(this.data.stuinfolist)
  },
  updatetutorInfoList: function () {
    this.setData({
      tutorinfolist: tutorinfolist,
    })
    console.log(this.data.tutorinfolist)
  },
  tupdatevoluneInfoList: function () {
    this.setData({
      voluneidinfolist: voluneidinfolist,
    })
    console.log(voluneidinfolist)
  },
  supdatevoluneInfoList: function () {
    this.setData({
      voluneidinfolist: voluneidinfolist,
    })
    choice_stu = this.data.voluneidinfolist.length;
    console.log(choice_stu)
    console.log(voluneidinfolist);
    var vol = [];
    for (var i = 0; i < voluneidinfolist.length; i++) {//找到自己志愿的导师
      var fill = {
        name: '',
        choice: 0,
        status: 0
      }

      for (var j = 0; j < tutorinfolist.length; j++) {
        if (voluneidinfolist[i].tid == tutorinfolist[j].tid) {
          fill.name = tutorinfolist[j].tname;
          fill.choice = voluneidinfolist[i].choiceNumber;
          fill.status = voluneidinfolist[i].status;
          vol[i] = fill;
        }
      }
    }

    volinfolist = vol;
    for (var i = 0; i < volinfolist.length; i++) {
      switch (volinfolist[i].choice) {
        case 1: volinfolist[i].choice = '第一志愿'; break;
        case 2: volinfolist[i].choice = '第二志愿'; break;
        default: volinfolist[i].choice = '随机匹配';
      }
      switch (volinfolist[i].status) {
        case 0: volinfolist[i].status = '处理中'; break;
        case 1: volinfolist[i].status = '成功'; break;
        case 2: volinfolist[i].status = '失败'; break;
      }
    }

    this.setData({
      my_choice: volinfolist,
    })

  },
  onLoad: function () {
    var that = this;
    that.setData({
      percent: getApp().globalData.percent,
      uid: getApp().globalData.uid,
      timeNode: getApp().globalData.timeNode,
      isStudent: getApp().globalData.isStudent,

    })

    isStu = this.data.isStudent;
    if (isStu) {//如果是学生则请求老师信息

      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'https://zyowo.cn/choice/report/index',//？？？请求所有导师的信息repotrtlist        // zhr：在上面输入你的本机Servlet地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          var List = res.data.reportList;
          tutorinfolist = List;
          that.updatetutorInfoList();

          wx.request({
            url: 'https://zyowo.cn/choice/report/mychoice',
            // zhr：在上面输入你的本机Servlet地址
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              sid: app.globalData.uid,
            },

            success: function (res) {

              var List = res.data.reportItemList;
              if (List == null) {
                var toastText = '暂无已选导师';
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 1500,
                  mask: true,
                })
              }
              else {
                voluneidinfolist = List;//获取到自己sid下的tid-sid-choice-status列表
                that.supdatevoluneInfoList();
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


      //console.log('当前你的志愿情况', volinfolist)
    }
    else {//如果是老师则请求学生信息
      if (that.data.timeNode == 2) {
        wx.showLoading({//导师第一轮选取学生
          title: '加载中...',
        })
        wx.request({
          url: 'https://zyowo.cn/choice/report/findReportItem',
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: app.globalData.uid,
            //choiceNumber: 2
          },
          success: function (res) {
            wx.hideLoading();
            var List = res.data.reportItemList;
            if (List == null) {
              var toastText = '无学生';
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 1500,
                mask: true,
              })
            }
            else {
              voluneidinfolist = List;//获取到自己tid下第一轮的tid-sid-choice-status列表
              that.tupdatevoluneInfoList();

              console.log(that.data.uid)
              wx.request({
                url: 'https://zyowo.cn/choice/report/findReportItem',//？？？获取到所有学生的信息
                // zhr：在上面输入你的本机Servlet地址
                method: 'POST',
                data: {
                  tid: that.data.uid
                },

                success: function (res) {

                  var List = res.data.studentInfos;
                  if (List == null) {
                    var toastText = '';
                    wx.showToast({
                      title: toastText,
                      icon: '',
                      duration: 1500,
                      mask: true,
                    })
                  }
                  else {
                    stuinfolist = List;//获取到自己tid下第一轮的tid-sid-choice-status列表
                    that.updatestuInfoList();
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
      }

      else {
        wx.showLoading({//导师第二轮选取学生
          title: '加载中...',
        })
        wx.request({
          url: 'https://zyowo.cn/choice/report/findReportItem',
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: app.globalData.uid,
            //choiceNumber: 2
          },
          success: function (res) {
            wx.hideLoading();
            var List = res.data.reportItemList;
            if (List == null) {
              var toastText = '无学生';
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 1500,
                mask: true,
              })
            }
            else {
              voluneidinfolist = List;//获取到自己tid下第一轮的tid-sid-choice-status列表
              that.tupdatevoluneInfoList();

              console.log(that.data.uid)
              wx.request({
                url: 'https://zyowo.cn/choice/report/findReportItem',//？？？获取到所有学生的信息
                // zhr：在上面输入你的本机Servlet地址
                method: 'POST',
                data: {
                  tid: that.data.uid
                },

                success: function (res) {

                  var List = res.data.studentInfos;
                  if (List == null) {
                    var toastText = '';
                    wx.showToast({
                      title: toastText,
                      icon: '',
                      duration: 1500,
                      mask: true,
                    })
                  }
                  else {
                    stuinfolist = List;//获取到自己tid下第一轮的tid-sid-choice-status列表
                    that.updatestuInfoList();
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

      }



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

