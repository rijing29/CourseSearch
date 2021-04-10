const db = wx.cloud.database();
Page({
  data: {
    courseInfo:[],
    course_num:0
  },
  onLoad: function (options) {
    console.log("进来了")
    db.collection('curriculum')
    .get()
    .then(res => {//formData是数据库里面集合的名称
      console.log(res); //如果更新数据成功则输出成功信息
      var that = this;
      that.setData({
        courseInfo: res.data  //数据赋值
      });
      console.log(res.data);
    }).catch(err => {
      console.log(err); //如果更新数据失败则输出失败信息
    })
  },

  onReachBottom: function () {
    wx.showLoading({
      title: '刷新中！',
      duration: 1000
    })
    let x = this.data.course_num + 20
    console.log(x)
    let old_courseInfo = this.data.courseInfo
    db.collection('curriculum').orderBy('time','desc').skip(x) // 限制返回数量为 20 条
      .get()
      .then(res => {
      // 利用concat函数连接新数据与旧数据
      // 并更新emial_nums  
      this.setData({
        courseInfo: old_courseInfo.concat(res.data),
        course_num: x
      })
      console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
    console.log('circle 下一页');
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
      + '&class_personal=' +this.data.courseInfo[index].class_personal
      + '&school=' + this.data.courseInfo[index].school
      + '&update_id=' + this.data.courseInfo[index]._id
    })
  },
  onShow:function(){
    this.onLoad()
  }
})