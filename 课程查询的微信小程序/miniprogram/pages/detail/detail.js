const db = wx.cloud.database();
Page({

  data: {
    // 判断用户权限
    authority:'',
    // 从不完整的展示页传过来的
    character_class:'',
    course_id:'',
    class_name:'',
    total_hour:'',
    credit:'',
    class_major:'',
    teacher_id:'',
    class_plain:'',
    school:'',
    update_id:''
  },
  onLoad: function (options) {
    this.authentication();
    this.setData({
      character_class: options.character_class,
      course_id: options.course_id,
      class_name: options.class_name,
      total_hour: options.total_hour,
      credit: options.credit,
      class_major: options.class_major,
      teacher_id: options.teacher_id,
      class_plain: options.class_plain,
      school: options.school,
      update_id:options.update_id
    })
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
  // 修改
  edit:function(){
    wx.navigateTo({
      url: '/pages/edit/edit?update_id='+this.data.update_id
    })
  }
})