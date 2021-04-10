const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // a(){
  //   let a=1;
  //   let b=2;
  //   console(a+b)
  // },
  

  // 1.选择excle表格
  chooseExcel(){
    console.log("点击导入excel了")
    let that=this
    wx.chooseMessageFile({
      count: 1,
      type:'file',
      success(res){
        let path=res.tempFiles[0].path;
        console.log("选择excel成功",path)
        that.uploadExcel(path);
      }
    })
  },
  // 2.上传excel
  uploadExcel(path){
    let that=this
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime()+ 'whjUpload.xlsx',
      filePath:path,
      success:res=>{
        //上传成功返回res，包括fileID
        console.log("上传成功：",res); 
        console.log(res.fileID)
        that.analysis(res.fileID);
      },
      fail:err=>{
        console.log("上传失败：",err);
      }      
    })
  },
  // 3.解析excel并存储到数据库
  analysis(fileID){
    console.log('成功得到fileID'+fileID)
    //调用云函数
    wx.cloud.callFunction({
      name:"excel",
      data:{
        fileID : fileID
      },
      success(res){
        console.log('测试成功',res)
      },
      fail(res){
        console.log('测试失败',res)
      }
    })
  }
})