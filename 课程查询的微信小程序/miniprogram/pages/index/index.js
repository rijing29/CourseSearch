const db = wx.cloud.database();
Page({
  data: {
    authority:'',
    // 星期的
    weeksarray: ['','星期一', '星期二', '星期三', '星期四','星期五', '星期六', '星期日'],
    index: 0,
    // 周次的
    multiArray: [['','1', '2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25'], 
                 ['','1', '2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25']],
    multiIndex: [0, 0],
    // 节次的
    classmultiArray: [['','1', '2','3','4','5','6','7','8','9','10','11','12'], 
                     ['','1', '2','3','4','5','6','7','8','9','10','11','12']],
    classmultiIndex: [0, 0],
    // 学院的
    schoolsarray: ['','地球科学学院', '石油工程学院', '化学化工学院','机械科学与工程学院','土木建筑工程学院','电气信息工程学院',
                  '计算机与信息技术学院','经济管理学院','物理与电子工程学院','数学与统计','外国语学院','人文科学学院','体育教研部','艺术学院','图书馆',
                  '研究生院','国际合作处','现代教育技术中心','高等教育研究中心','马克思主义学院','石油机械研究所','校外联合培养基地'],
    schoolIndex:0,
    week:'',
    class_personal:'',
    part:'',
    school:''
  },

  bindPickerChange: function (e) {
    console.log('星期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('学院picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('周次picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerChange2: function (e) {
    console.log('节次picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      classmultiIndex: e.detail.value
    })
  },
  
  // 点击查询按钮
  submit(e) {
    console.log(e.detail.value);
    var week="";
    if(e.detail.value.week=="星期一"){
      week="周一";
    }else if(e.detail.value.week=="星期二"){
      week="周二";
    }else if(e.detail.value.week=="星期三"){
      week="周三";
    }else if(e.detail.value.week=="星期四"){
      week="周四";
    }else if(e.detail.value.week=="星期五"){
      week="周五";
    }else if(e.detail.value.week=="星期六"){
      week="周六";
    }else if(e.detail.value.week=="星期日"){
      week="周日";
    }
    wx.navigateTo({
      url: '/pages/show/show?week=' + week + '&class_personal=' + e.detail.value.class_personal+ '&part=' + e.detail.value.part + '&school=' + e.detail.value.school,
    })
  },
 
  //判断用户权限
  onLoad: function (options) {
    this.authentication();
  },

  //判断用户权限的函数
  authentication: function () {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        db.collection('limits').get().then(res2 => {
          if (res.result.openid === res2.data[0]._openid) {
            this.setData({
              authority: true
            })
          }
        })
      }
    })
  },
})