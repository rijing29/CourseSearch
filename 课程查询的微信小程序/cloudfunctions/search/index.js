// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'whj-2zta2'
})
const db = cloud.database()
const _=db.command
let week
let part
let class_personal
let school
// 云函数入口函数
exports.main = async (event, context) => {
  week=event.week;
  part=event.part;
  class_personal=event.class_personal;
  school=event.school;
  let count =await getCount();
  count = count.total;
  let list = []
  for (let i = 0; i < count; i += 100) {//自己设置每次获取数据的量
    list = list.concat(await getList(i));
  }
  return list;
}
async function getCount() {//获取数据的总数，这里记得设置集合的权限
  let count = await db.collection('curriculum').where({
  }).count();
  return count;
}
async function getList(skip) {//分段获取数据
  let list = await db.collection('curriculum')
  .where(
    _.or([
      {
        // 排课周次
        class_personal:db.RegExp({
          //正则
          regexp:'.*' + class_personal+ '.*', //key为用户输入的内容,
          options:"i"     //忽略大小写
        }),
        // 学院
        school:db.RegExp({
          //正则
          regexp:'.*' + school+ '.*', //key为用户输入的内容,
          options:"i"     //忽略大小写
        }),
        // detail2中的节次
        detail2:db.RegExp({
          //正则
          regexp:'.*' + part+ '.*', //key为用户输入的内容,
          options:"i"     //忽略大小写
        }),
        // detail中的周次
        detail:db.RegExp({
          //正则
          regexp:'.*' + week + '.*', //key为用户输入的内容,
          options:"i"     //忽略大小写
        })
      },
    ]),
  ).orderBy('course_id','asc').skip(skip).get();
  return list.data;
}