import urlstate from "./state";

let filter=function(imgs,ws){
  let reg=new RegExp('jyimg:/');
  let urls='';
  if(reg.test(imgs)){
    let reg=new RegExp('jyimg:/');
    let imgurl='';
    if(urlstate.numb==1){
      imgurl=imgs.replace(reg,'https://jymall-test.oss-cn-beijing.aliyuncs.com/')
    }else if(urlstate.numb==2){
      imgurl=imgs.replace(reg,'https://jymall.oss-cn-beijing.aliyuncs.com/')
    }
    urls=imgurl
  }else{
    urls=imgs
  }
  return urls
}
export default filter
