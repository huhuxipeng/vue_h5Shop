import {
  Toast,
  Indicator,
  MessageBox,
} from 'mint-ui';
import wx from "weixin-js-sdk";
import axios from 'axios'
let loadMore = function (obj, params, url, list, callback) {
  params.pageNo = obj.pageNo = obj.pageNo + 1;

  obj.$axios({
    method: 'post',
    url: url,
    responseType: 'json',
    data: params
  }).then(data => {
    if (callback) {
      callback(data);
      obj.$refs.allLoaded.onBottomLoaded();
      return;
    }

    // console.log(list.length);
    // console.log(data.data.res_data.total);
    obj.$refs.allLoaded.onBottomLoaded();

    if (data.data.res_data.total == list.length) { //已经加载完毕
      Toast('没有了');
      obj.allLoaded = true;
    } else {
      data.data.res_data.dataList.forEach(o => {
        list.push(o);
      });
      if (data.data.res_data.total == list.length) { //加载完毕
        obj.allLoaded = true;
      }
      // sessionStorage.goodList = JSON.stringify(list)
    }
  }).catch(err => {
    console.log(err)
  })
}

function photoCompress(file, w, callback) { //图片质量压缩，文件，宽度，回调

  Indicator.open({
    text: "图片加载中...",
    spinnerType: "triple-bounce"
  });
  var ready = new FileReader();
  /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
  ready.readAsDataURL(file);
  ready.onload = function () {
    var re = this.result;
    let obj = {}
    if (typeof (w) != 'object') { //默认只传宽度，传一个对象也可以，具有宽高，质量三种属性
      obj = {
        width: w,
      }
    }
    canvasDataURL(re, obj, callback)
  }
}

function canvasDataURL(path, obj, callback) {

  var img = new Image();
  img.src = path;

  img.onload = function () {

    var that = this;
    // 默认按比例压缩
    var w = that.width,
      h = that.height,
      scale = w / h;
    w = obj.width || 400; //默认四百宽度
    h = obj.height || (w / scale);
    console.log(obj.width);
    var quality = 0.7; // 默认图片质量为0.7，如果清晰度有要求适当调高
    //生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // 创建属性节点
    var anw = document.createAttribute("width");
    anw.nodeValue = w;
    var anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality);
    // 回调函数返回base64的值
    Indicator.close();

    callback(base64);
  }
}
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

function goback(num) {
  // sessionStorage.setItem('isBack', true);
  if (num) {
    window.history.go(-num);
  } else {
    window.history.go(-1);
  }

}

function checkPhone(num) {
  var myreg = /^[1][0-9]{10}$/;
  if (!myreg.test(num)) {
    MessageBox('提示', '手机号格式不正确');
    return false;
  } else {
    return true;
  }
}

function toRelDetail(val, obj) {
  console.log('方便',val.relType)
  if (typeof (val.relType) == 'string') {
    val.relType = parseInt(val.relType)
  }
  switch (val.relType) {
    //2001外链
    case 2001:
      // this.$router.push({path: '', query: {}})
      window.location.href = val.relHref;
      break;
      //  2002商品
    case 2002:
      if (val.relId != null) {
        obj.$router.push({
          path: "/goods/detail",
          query: {
            goodsId: val.relId
          }
        });
      } else {
        obj.$router.push({
          path: "/searchShop",
          query: {
            state: 0
          }
        });
      }
      sessionStorage.catId = val.relId;
      break;
      //2003店铺
    case 2003:
      obj.$router.push({
        path: "/goods/store",
        query: {
          goodsId: val.relId
        }
      });
      break;
      // 2004专题
    case 2004:
      if (val.relId) {
        obj.$router.push({
          path: "/specials",
          query: {
            relId: val.relId
          }
        });
      }
      // window.location.reload();
      break;
      //  2005分类
    case 2005:
      if (val.relId != null) {
        sessionStorage.catId = val.relId;
        obj.$router.push({
          path: "/goods/list"
        });
      } else {
        obj.$router.push({
          path: "/goods/category"
        });
      }
      break;
      // 2006签到
    case 2006:
      obj.$router.push({
        path: "/myGold"
      });
      break;
      //  2007普通团
    case 2007:
      if (val.relId != null) {
        obj.$router.push({
          path: "/group/groupdetail",
          query: {
            activityId: val.relId
          }
        });
      } else {
        obj.$router.push({
          path: "/group/groupBooking",
          query: {}
        });
      }
      break;
      //  2008砍价
    case 2008:
      obj.$router.push({
        path: "/bargain/bargainshop",
        query: {
          state: 0
        }
      });
      break;
      //  2009店长福利
    case 2009:
      if (sessionStorage.identityId == 1) {
        obj.$router.push("/commodity");
      } else {
        identyPath();
      }
      break;
      //  2010多抱团
    case 2010:
      if (val.relId) {
        obj.$router.push({
          path: '/group/groupdetail',
          query: {
            activityId: val.relId,
            isDuobao: true
          }
        })
      } else {
        obj.$router.push({
          path: "/seize/seizeIndex",
          query: {}
        });
      }
      break;
      //  2011兑换
    case 2011:
      console.log("val", val);
      if (val.relId) {
        obj.$router.push({
          path: "/goods/detail",
          query: {
            goldChangerId: val.relId
          }
        });
      } else {
        obj.$router.push({
          path: "/goldChanger"
        });
      }

      break;
      //  2012折扣
    case 2012:
      obj.$router.push();
      break;
      //  2013限时购
    case 2013:
      obj.$router.push({
        path: "/flashSale"
      });
      break;
      //兑换记录
    case 2014:
      obj.$router.push({
        path: "/order/list",
        query: {
          isGoldChanger: true
        }
      });
      break;
    case 2015: //现金券
      let href = '/coupon/anon/queryCouponDetail';
      let params = {
        cpnId: val.relId
      }
      obj.$axios({
        method: 'post',
        url: href,
        responseType: 'json',
        data: params
      }).then(o => {
        let pickCouponList = [];
        let coupon = o.data.res_data.coupon
        coupon.getBeginTime = new Date(coupon.getBeginTime).format('MM.dd');
        coupon.getEndTime = new Date(coupon.getEndTime).format('MM.dd');
        pickCouponList.push(coupon)
        obj.sendToThreeIndex(pickCouponList)
      }).catch(e => {
        console.log(e)
      })

      break;
  }
};

function downloadImg(src) {
  axios({
      method: "post",
      url: "/basics/anon/wxSign",
      responsetype: "json",
      data: {
        url: window.location.href.split('#')[0]
      }
    })
    .then(data => {
      let datas = data.data.res_data.sign_info;
      // 调用微信接口
      // 自定义参数  1.分享标题  2.重定向后的链接  3.描述  4.分享的图标链接地址
      wx.config({
        // debug: true,
        appId: datas.appId,
        timestamp: datas.timestamp,
        nonceStr: datas.nonceStr,
        signature: datas.signature,
        jsApiList: [
           'chooseImage','downloadImage'
        ]
      });
      wx.ready(function () {


        wx.downloadImage({
          serverId: src, // 需要下载的图片的服务器端ID，由uploadImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            console.log('res', res)
          },
          fail(err) {
            console.log('err', err)
          }
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
}


function formatCpnType(cpnType) { //格式化优惠券类型
  switch (cpnType) {
    case 0:
      return '分类券';
      break;
    case 1:
      return '商品券'
      break;
    case 2:
      return '店铺';
      break;
    case 3:
      return '全场'
      break;
  }
}


export default {
  loadMore,
  photoCompress,
  goback,
  checkPhone,
  downloadImg,
  toRelDetail,
  formatCpnType,
}
