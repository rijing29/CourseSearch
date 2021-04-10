const db = wx.cloud.database();
Page({
  data: {
    week:'', //星期
    part:'',//节次
    school:'',//学院
    class_personal:'',//周次
    courseInfo:[],
    course_num:0
  },
  
  onLoad: function (options) {
    wx.showToast({
      title: '查询中，请稍后',
      icon: 'success',
      duration: 2000
    })
    this.setData({
      week: options.week,
      part: options.part,
      school: options.school,
      class_personal: options.class_personal
    })
    wx.cloud.callFunction({
      name:"search",
      data:{
        week:this.data.week,
        part:this.data.part,
        class_personal:this.data.class_personal,
        school:this.data.school
      }
    }).then(res=>{
      console.log(res.result)
      this.setData({
        courseInfo:res.result
      })
    })
  },
  // 跳转到详情页面
  detail(e){
    var index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/detail/detail?character_class=' +this.data.courseInfo[index].character_class  
      + '&course_id=' + this.data.courseInfo[index].course_id
      + '&class_name=' + this.data.courseInfo[index].class_name
      + '&total_hour=' +this.data.courseInfo[index].total_hour
      + '&credit=' + this.data.courseInfo[index].credit
      + '&class_major=' + this.data.courseInfo[index].class_major
      + '&teacher_id=' +this.data.courseInfo[index].teacher_id
      + '&class_plain=' +this.data.courseInfo[index].class_plain
      + '&school=' + this.data.courseInfo[index].school
      + '&update_id=' + this.data.courseInfo[index]._id
    })
  },
  // onShow:function(){
  //   this.onLoad()
  // }
})