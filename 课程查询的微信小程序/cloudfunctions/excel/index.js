const cloud = require('wx-server-sdk')
cloud.init({
  env:'whj-2zta2'
})
var xlsx = require('node-xlsx');
const db = cloud.database()

//每次写50条的方法
function uploadFifty(row){
  for(let i=0;i<1;i++){
    db.collection('test')
    .add({
      data: {
        course_id: row[i][0], //课程编码
        course_name: row[i][1], //课程名称
        class_name: row[i][2], //教学班
        total_hour: row[i][3], //总学时
        credit:row[i][4],//学分

        character_class: row[i][5], //课程性质
        class_major: row[i][6], //上课专业
        teacher: row[i][7], //任课教师
        teacher_id: row[i][8], //教师工号
        class_plain:row[i][9],//任务计划周次

        class_personal: row[i][10], //排课周次
        people: row[i][11], //选课人数
        detail: row[i][12], //上课时间地点
        detail2: row[i][12], //上课时间地点
        school: row[i][13], //开课学院
        _openid:row[i][14]
      }
    })
  }
}

//取得从起点到终点的row 哇可行的！！！！！！！！！耶
function getRow(start,end,rowArr){
  let row=[];
  for(let i=start;i<end;i++){
    row.push(rowArr[i])
  }
  return row;
}

// 上传的方法
function upload(rowArr){
  let start=0//0开始
  let end=1//50开始每次递增50
  while (end<rowArr.length) {
    let row=getRow(start,end,rowArr)
    uploadFifty(row)
    start+=1
    end+=1
  }
}

exports.main = async(event, context) => {
  //等待保存的数据
  let dataToSave = []
  const res = await cloud.downloadFile({
    // fileID: fileID,
    fileID: event.fileID,
  })
  const buffer = res.fileContent
  const tasks = [] //用来存储所有的添加数据操作
  //2,解析excel文件里的数据
  var sheets = xlsx.parse(buffer); //获取到所有sheets
  for (let index = 0; index < sheets.length; index++) {
    let sheet = sheets[index]
    let sheetName = sheet['name']
    let rowArr = sheet['data']//每一行的数据
    // let res=getRow(0,50,rowArr)
    // console.log(res)
    upload(rowArr)
  }


  // 等待所有数据添加完成我的思路试将所有数据放入数组里  直接传输这个数组就可以批量保存
  let result = await Promise.all(tasks).then(res => {
    return res
  }).catch(function (err) {
    return err
  })
  return result
}



