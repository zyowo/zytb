//index.js 【主页】选项卡
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    imgUrls: [  //上方图片
      "../../img/1.png",
      "../../img/2.png",
      "../../img/3.png",
    ],
    teacher: [   //老师照片
      {
        src: "../../img/wwl.png",
        name: '王万良'
      },
      {
        src: "../../img/lsc.png",
        name: '龙胜春'
      },
      {
        src: "../../img/hdc.png",
        name: '黄德才'
      },
      {
        src: "../../img/lq.png",
        name: '李曲'
      }
    ],

    headline: null,  //这是一个Date
    timeNode: 0,     //这是一个时间节点
    description: [    //时间描述
      "志愿填报开始还有",
      "志愿填报结束剩余",
      "第一志愿匹配剩余",
      "第二志愿匹配剩余",
      "预计随机匹配还需",
      "导师志愿填报已过"
    ],
    countdown: 0,     //相差的天数

    news: [   //新闻
      { topic: '浙江工业大学硕士研究生导师选择注意事项' },
      { topic: '导师志愿填报操作流程' },
      { topic: '计算机学院研究所/新部门介绍' }
    ],
    instrucion: '个人信息越完善、丰富，导师在进行审核的时候就可以获得越多的参考，进而完成更适合的匹配！',  //每日小贴士

    //userInfo: {},
    //hasUserInfo: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),

    //本地日期
    year: '', month: '', day: '',
    date: null,
    week: ['日', '一', '二', '三', '四', '五', '六', '日'],

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //跳转到新闻通知
  news() {
    wx.navigateTo({
      url: '../news/news',
    })
  },

  //跳转到导师介绍
  info() {
    wx.navigateTo({
      url: '../tutor/info_t',
    })
  },

  onLoad: function () {
    wx.showNavigationBarLoading();
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    var n = timestamp * 1000;

    var nodeDate = new Date(n);

    nodeDate.setDate(28);   //TO DELETE:测试时间用的
    console.log(nodeDate);

    //从服务器获取时间节点
    wx.request({
      url: 'http://localhost:8443/time',
      data: {
        get: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        nodeDate = res.data.time;
        this.setData({
          headline: res.data.time,
          timeNode: res.data.node
        })
      },
    })

    //获取当前时间  
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    //var h = date.getHours();
    //分  
    //var m = date.getMinutes();
    //秒  
    //var s = date.getSeconds();
    //星期
    var w = date.getDay();

    this.setData({
      year: Y,
      month: M,
      day: D,
      date: w,
    });

    var days = 0, countTime = 0;
    if (date >= nodeDate)  // 说明时间已经过了
    {
      this.setData({ 
        timeNode : 5
        })    // 输出最后一条
      days = date.getTime() - nodeDate.getTime();
    }

    else //时间还没到，看看差了几天？
      days = nodeDate.getTime() - date.getTime();

    var countTime = parseInt(days / (1000 * 60 * 60 * 24));
    this.setData({
      countdown: countTime
    })
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time,
    });
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
  }
})

