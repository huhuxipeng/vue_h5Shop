//1:屏幕的宽度
//2：半屏的宽度
//3：三分之一屏幕的宽度

import urlstate from './state.js'

let filterss=function(imgs,ws){
  // console.log(imgs)
  // console.log(w)
  // console.log(document.body.clientWidth)
  let reg=new RegExp('jyimg:/');
  let urls='';
// console.log(imgs)
  var widths=document.body.clientWidth;
  if(ws==1 || !ws){
    ws=1.05
  }
  // if(ws>3){
  //   ws=ws-1;
  // }
  var w=parseInt(widths/ws)*3;
  if(reg.test(imgs)){

    let reg=new RegExp('jyimg:/');
    let imgurl='';
    if(urlstate.numb==1){
      imgurl=imgs.replace(reg,'https://jymall-test.oss-cn-beijing.aliyuncs.com/')
    }else if(urlstate.numb==2){
      imgurl=imgs.replace(reg,'http://img.juyooo.com/')
    }
    urls=imgurl+'?x-oss-process=image/resize,w_'+w
  }else{
    urls=imgs+'?x-oss-process=image/resize,w_'+w
  }
  // console.log(urls)
  return urls
}


// replace="https://jymall.oss-cn-beijing.aliyuncs.com"+replace+"?x-oss-process=image/resize,w_"+mScreenWidth/proportion;
// }else{//是测试
//   replace="https://jymall-test.oss-cn-beijing.aliyuncs.com"+replace+"?x-oss-process=image/resize,w_"+mScreenWidth/proportion;
//积分截取
let strings=function(str){
  if(typeof(str)=='number'){
    str=JSON.stringify(str)
  }

  let indexs=str.indexOf('.')
  if (indexs>0){
    str=str.slice(0,indexs+3)
  } else{
    str=str+'.00'
  }
  return str
}


export {filterss,strings}
