const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    update_id:'',
    detail:'',
    detail2:'',
    class_personal:'',
    course_name:'',
    teacher:'',
    character_class:'',
    class_major:'',
    teacher_id:'',
    class_plain:'',
    school:'',
    people:'',
    course_id:'',
    class_name:'',
    total_hour:'',
    week:'',
    credit:'',
    courseInfo:[]
  },

  
  onLoad: function (options) {
    this.setData({
      update_id:options.update_id
    })
    db.collection('curriculum').where({
      _id:this.data.update_id
    })
    .get()
    .then(res => {//formData是数据库里面集合的名称
      console.log(res); //如果更新数据成功则输出成功信息
      var that = this;
      that.setData({
        courseInfo: res.data  
      });
      console.log(res.data);
    }).catch(err => {
      console.log(err); 
    })
  },

  submit(e){
    this.setData({
      detail:e.detail.value.detail,
      detail2:e.detail.value.detail2,
      class_personal:e.detail.value.class_personal,
      course_name:e.detail.value.course_name,
      teacher:e.detail.value.teacher,
      character_class:e.detail.value.character_class,
      class_major:e.detail.value.class_major,
      teacher_id:e.detail.value.teacher_id,
      class_plain:e.detail.value.class_plain,
      school:e.detail.value.school,
      people:e.detail.value.people,
      course_id:e.detail.value.course_id,
      class_name:e.detail.value.class_name,
      total_hour:e.detail.value.total_hour,
      week:e.detail.value.week,
      credit:e.detail.value.credit
    })
    db.collection('curriculum').doc(this.data.update_id).update({
      data:{
        detail:this.data.detail,
        detail2:this.data.detail2,
        class_personal:this.data.class_personal,
        course_name:this.data.course_name,
        teacher:this.data.teacher,
        character_class:this.data.character_class,
        class_major:this.data.class_major,
        teacher_id:this.data.teacher_id,
        class_plain:this.data.class_plain,  
        school:this.data.school,
        people:this.data.people,
        course_id:this.data.course_id,
        class_name:this.data.class_name,
        total_hour:this.data.total_hour,
        week:this.data.week,
        credit:this.data.credit,
      },
      success(res){
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail(res){
        console.log("数据修改失败")
      }
    })
  }
})