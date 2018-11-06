import axios from 'axios'
import wx from "weixin-js-sdk";
// 调用之前签名准备
function share(url,title,desc,link,imgurl) {
  axios({
    method: "post",
    url: "/basics/anon/wxSign",
    responsetype: "json",
    data: {
      url: url
    }
  }).then(data => {
      let datas = data.data.res_data.sign_info;
      console.log('datas',datas)
      // 调用微信接口
      // 自定义参数  1.分享标题  2.重定向后的链接  3.描述  4.分享的图标链接地址
      wx.config({
        // debug: true,
        appId: datas.appId,
        timestamp: datas.timestamp,
        nonceStr: datas.nonceStr,
        signature: datas.signature,
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareQZone",
          "hideMenuItems"
        ]
      });
      wx.ready(function() {
        console.log('groupobj',111);
        let obj = {
          title: title,
          desc: desc,
          link:link,
          imgUrl: imgurl,
          success: function(res) {
            console.log("微信接口調用成功",link)
          },
          cancel: function(err) {
            console.log('微信接口調用错误',err);
          }
        };
        console.log('groupobj',obj);
        wx.onMenuShareAppMessage(obj);
        wx.onMenuShareTimeline(obj);
        wx.onMenuShareQQ(obj);
        wx.onMenuShareQZone(obj);
      });
    })
    .catch(err => {
      console.log(err);
    });
}
export default share;
