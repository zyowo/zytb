// pages/tutor/tutor.js
var app = getApp();
var tutor_name;
var student_name;
var recordline = 0;
var checkindex = [];
var choice_stu = 0;
var recordindex = 0;
var facultyli = ['数字媒体', '网络工程', '软件工程', '计算机智能系统研究所']; 
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
    voluneidinfolist:[],
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
    timeNode:0
  },
  bindPickerChange: function (e) {
    this.setData({
      xindex: e.detail.value,

    })
    recordline = 0;
    var x = this.data.xindex;
    var facul = facultyli[x];
    var arr = new Array();
    for (var i =0;i< tutorinfolist.length;i++) {
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
  cancel:function(e){
    this.setData({
      record_line: e.currentTarget.dataset.index
    });
    recordline = this.data.record_line;
    
    /*wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: 'http://localhost:8443/report/findReportItem',//???
      // zhr：在上面输入你的本机Servlet地址
      method: 'POST',
      data: {
        sid: getApp().globalData.uid,//向数据库提交 sid-tid,查询该条数据，并修改status为0
        tid: tutor_name[recordline].tid,
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
checkindex[recordline] = true;
    this.setData({
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
    }) */
  },
  choose: function (e) {
    this.setData({
      record_line: e.currentTarget.dataset.index
    });

    if (isStu) {
      choice_stu++;
      if (choice_stu >= 3) {
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
     /* var fill = {
        sid: getApp().globalData.uid,
        tid: tutor_name[recordline].tid,
        choice: choice_stu,
        status: 0,
      }
      voluneidinfolist.push(fill);
      console.log('你选择了之后的情况', voluneidinfolist);*/
      /* wx.showLoading({
          title: '提交中...',
        })
        wx.request({
          url: 'http://localhost:8443/report/findReport',
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            sid: getApp().globalData.uid,//向数据库提交 一条sid-tid-choice-status数据
            tid: tutor_name[recordline].tid,
            choiceNumber: choice_stu,
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
       /*wx.showLoading({
         title: '提交中...',
       })
       var List;
       wx.request({
         url: 'http://localhost:8443/report/findReportItem',//根据自己的tid,在教师列表中寻找picknum,allnum
         // zhr：在上面输入你的本机Servlet地址
         method: 'POST',
         data: {
           tid: getApp().globalData.uid
         }
         ,
         header: {
           'content-type': 'application/json' // 默认值
         },
         success: function (res) {
           wx.hideLoading();
           List = res.data.reportList;
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
       */
      if (this.data.selectall) {


        recordline = this.data.record_line;
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
        checkindex[recordline] = false;
        this.setData({
          checkindex: checkindex
        })

       /*  wx.showLoading({
     title: '提交中...',
   })
   wx.request({
     url: 'http://localhost:8443/report/findReportItem',
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
        checkindex[recordline] = false;
        this.setData({
          checkindex: checkindex
        })
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
        /*wx.showLoading({
          title: '提交中...',
        })
        wx.request({
          url: 'http://localhost:8443/report/findReportItem',
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

    }

   
  },

  unchoose: function (e) {
    this.setData({
      record_line: e.currentTarget.dataset.index
    });
    recordline = this.data.record_line;
   
    if (isStu) {
      //向数据库请求数据，当前选择的数据和数据库中的数据对比(name,faculty,uid,choice)，若一样则选取该条数据，进行删除操作
      /* wx.showLoading({
         title: '提交中...',
       })
       wx.request({
         url: 'http://localhost:8443/report/findReportItem',//???
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
           wx.hideLoading();
           wx.showToast({
             title: res.data.message,
             icon: 'success',
             duration: 1500,
             mask: true,
           })
  checkindex[recordline] = true;
    this.setData({
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
       })*/
      choice_stu--;
      this.setData({
        choice: choice_stu
      })

      /*for (var i = 0; i < voluneidinfolist.length; i++) {
        if (tutor_name[recordline].tid == voluneidinfolist[i].tid) {
          voluneidinfolist.splice(i, 1)
        }
      } console.log(voluneidinfolist);*/


      //与之对应数据库表中的picknum减一，tutor_name[recordline].picknum--
    }
    else {
      if (this.data.selectall) {
        /*  wx.showLoading({
            title: '提交中...',
          })
          wx.request({
            url: 'http://localhost:8443/report/findReportItem',//???
            // zhr：在上面输入你的本机Servlet地址
            method: 'POST',
            data: {
              tid: getApp().globalData.uid,//向数据库提交 sid-tid,查询该条数据，并删除
              sid: stuinfolist[recordline].sid,
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
        /* for (var i = 0; i < voluneidinfolist.length; i++) {
           if (stuinfolist[recordline].sid == voluneidinfolist[i].sid) {
             voluneidinfolist.splice(i, 1)
           }
         }
         console.log(voluneidinfolist);*/
      }
      else {
        /*wx.showLoading({
          title: '提交中...',
        })
        wx.request({
          url: 'http://localhost:8443/report/findReportItem',//???
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: getApp().globalData.uid,//向数据库提交 sid-tid,查询该条数据，并删除
            sid: student_name[recordline].sid,
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
  
   /* for (var i = 0; i < voluneidinfolist.length; i++) {//对比自己的学生和搜索出的学生列表，志愿中的tid在学生列表中存在的话，则相对应那行的标签设置为false，即不可选
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
*/
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
   

    /*for (var i = 0; i < voluneidinfolist.length; i++) {//对比自己的学生和搜索出的学生列表，志愿中的tid在学生列表中存在的话，则相对应那行的标签设置为false，即不可选
      for (var j = 0; j < stuinfolist.length; j++) {
        if (voluneidinfolist[i].sid == stuinfolist[j].sid) {
          checkindex[j] = false;
          console.log('当前你的学生处于第' + (j) + '行')
        }
      }
    }
    this.setData({
      checkindex: checkindex,
    })*/

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  updatetutorInfoList: function () {
    this.setData({
      tutorinfolist: tutorinfolist,
    })
    console.log(this.data.tutorinfolist)
  }, 
  updatevoluneInfoList: function () {
    this.setData({
      voluneidinfolist: voluneidinfolist,
    })
    console.log(voluneidinfolist)
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
          volinfolist[i] = fill;

        }
      }
    }


    for (var i = 0; i < volinfolist.length; i++) {
      switch (volinfolist[i].choice) {
        case 1: volinfolist[i].choice = '第一志愿'; break;
        case 2: volinfolist[i].choice = '第二志愿'; break;
        case 3: volinfolist[i].choice = '随机匹配';
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
          wx.hideLoading();
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
            that.updatevoluneInfoList();
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
     
      
     
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'https://zyowo.cn/choice/report/index',//？？？请求所有导师的信息repotrtlist        // zhr：在上面输入你的本机Servlet地址
        method: 'POST',
        data: { },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          var List = res.data.reportList;
          tutorinfolist = List;
          that.updatetutorInfoList();
         
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
        /*wx.showLoading({//导师第一轮选取学生
          title: '加载中...',
        })
        wx.request({
          url: 'http://localhost:8443/report/mychoice',//？？？
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: app.globalData.uid,
            choiceNumber: 1
          },
          success: function (res) {
            wx.hideLoading();
            var List = res.data.reportList;
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
      }

      else {
        /*wx.showLoading({//导师第二轮选取学生
          title: '加载中...',
        })
        wx.request({
          url: 'http://localhost:8443/report/mychoice',//？？？
          // zhr：在上面输入你的本机Servlet地址
          method: 'POST',
          data: {
            tid: app.globalData.uid,
            choiceNumber: 2
          },
          success: function (res) {
            wx.hideLoading();
            var List = res.data.reportList;
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

      }
      /*wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'http://localhost:8443/info',//？？？获取到所有学生的信息
        // zhr：在上面输入你的本机Servlet地址
        method: 'POST',

        success: function (res) {
          wx.hideLoading();
          var Lists = res.data.studentInfo;
          stuinfolist = List;

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
      that.setData({
        stuList: stuinfolist
      })
      console.log('当前选择您的所有学生', arr)
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

