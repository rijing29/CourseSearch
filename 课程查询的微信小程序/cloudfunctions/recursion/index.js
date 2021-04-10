// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'whj-2zta2'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  var rowId=event.rowId//所有待插入行的下标
  var row=event.row//即将插入行的数组
  console.log(rowId)
  console.log(row)
  console.log("哈哈哈哈哈哈哈哈哈哈哈")
  const tasks = [] //用来存储所有的添加数据操作
  const promise = db.collection('test')
    .add({
      data: {
        course_id: row[0], //课程编码
        course_name: row[1], //课程名称
        class_name: row[2], //教学班
        total_hour: row[3], //总学时
        credit:row[4],//学分

        character_class: row[5], //课程性质
        class_major: row[6], //上课专业
        teacher: row[7], //任课教师
        teacher_id: row[8], //教师工号
        class_plain:row[9],//任务计划周次

        class_personal: row[10], //排课周次
        people: row[11], //选课人数
        detail: row[12], //上课时间地点
        detail2: row[12], //上课时间地点
        school: row[13], //开课学院
        _openid:row[14]
      }
    })
  tasks.push(promise)
  // 等待所有数据添加完成
  let result = await Promise.all(tasks).then(res => {
    return res
  }).catch(function(err) {
    return err
  })
  return await cloud.callFunction({
    name: 'excel',
  })
  // return result
  // console.log(result)
}