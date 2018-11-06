<template>
	<div class="poster" id="poster">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item,index) in imgObj" :key="index" class="swiper-slide">
          <img :src="item.posterQrcodeImg" alt="">
        </div>
      </div>
    </div>
    <div class="preservation" @click="downs">保存图片</div>
    <!-- <a id="download" class="preservation" download="imgname">保存图片</a> -->
    <div class='popup' v-if="know">
      <div class='arrow hu_row'><img src="../common/image/collarVoucher/arrow.png" /></div>
      <div class='popupText'>赚取更多收益，就是要积极花样推广，点击右上角，马上去分享推广吧～</div>
      <div class='know' @click='know2'>知道了</div>
    </div>
	</div>
</template>
<script>
import wx from "weixin-js-sdk";
import Swiper from "swiper";
import { Toast, Indicator, MessageBox } from "mint-ui";
import "swiper/dist/css/swiper.min.css";

export default {
  data() {
    return {
      know: true,
      imgObj: [],
      base64: "",
      downImgStr: "",
      imgIndex: 0
    };
  },
  mounted: function() {
    let url = "member/getPosterList";
    if (!sessionStorage.getItem("token")) {
      sessionStorage.pgths = window.location.href.split("#")[1];
      this.$router.push("/login");
      return;
    }
    let params = {
      token: sessionStorage.token
    };
    this.$axios({
      method: "post",
      url: url,
      responseType: "json",
      data: params
    }).then(o => {
      this.imgObj = o.data.res_data.posterList;
      this.mySwiper = new Swiper(".swiper-container", {
        observer: true,
        observeParents: true,
        width: 295
      });
      this.mySwiper.on("transitionEnd", o => {
        this.downloadIamge(
          this.imgObj[this.mySwiper.activeIndex].posterQrcodeImg,
          "pic"
        );
        this.fenxang();
      });
      this.downloadIamge(this.imgObj[0].posterQrcodeImg, "pic");
      this.fenxang();
    });
  },
  methods: {
    fenxang() {
      var us = window.location.href.split("#")[0];
      this.$axios({
        method: "post",
        url: "/basics/anon/wxSign",
        responsetype: "json",
        data: {
          url: us
        }
      })
        .then(data => {
          let datas = data.data.res_data.sign_info;
          this.wxInit(datas);
          console.log("分享成功", datas);
        })
        .catch(err => {
          console.log("分享失败", err);
        });
    },
    wxInit(res) {
      let that = this;
      wx.config({
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareQZone",
          "hideMenuItems"
        ]
      });
      wx.ready(function() {
        let obj = {
          title: that.imgObj[that.mySwiper.activeIndex].shareTitle,
          desc: that.imgObj[that.mySwiper.activeIndex].shareDescribe,
          link: window.location.href,
          imgUrl: that.imgObj[that.mySwiper.activeIndex].posterQrcodeImg,
          success: function(res) {
            console.log("成功", res);
          },
          cancel: function(err) {
            console.log("失败", err);
          }
        };
        wx.onMenuShareAppMessage(obj);
        wx.onMenuShareTimeline(obj);
        wx.onMenuShareQQ(obj);
        wx.onMenuShareQZone(obj);
        console.log("数据", obj);
      });
    },
    downloadIamge(imgsrc, name) {
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      if (image.src == imgsrc) {
        //如果图片已经加载过了
        this.downImg(image, name);
        return;
      }
      image.src = imgsrc;
      var that = this;
      image.onload = function() {
        that.downImg(image, name);
      };
    },
    downImg(image, name) {
      var canvas = document.createElement("canvas");
      let width = 350;
      let height = (width * image.height) / image.width;
      canvas.width = width;
      canvas.height = height;
      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, width, height);
      var quality = 0.4; // 默认图片质量为0.7，如果清晰度有要求适当调高;
      this.base64 = canvas.toDataURL("image/png", quality); //得到图片的base64编 码数据
      $("#download").attr("href", this.base64);
      $("#download").attr("name", name || "photo");
    },
    downs() {
      Toast('长按图片,保存到本地!')
      // this.$api.downloadImg(this.imgObj[this.mySwiper.activeIndex].posterQrcodeImg)
      // this.downloadIamge(
      //   this.imgObj[this.mySwiper.activeIndex].posterQrcodeImg,
      //   "pic"
      // );
    },
    know2() {
      this.know = false;
    }
  }
};
</script>

<style lang="scss" scoped>
// .poster {
//   overflow: hidden;
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// }
.swiper-container {
  overflow-x: auto;
  overflow-y: hidden;
  width: 10rem;
  height: 12.453333rem;
  margin: 0.8rem 0 2rem 0 !important;
}
.swiper-slide {
  width: 7.013333rem !important;
  height: 12.453333rem !important;
  margin-right: 0.8rem;
  text-align: center;
}
.swiper-slide:nth-child(1) {
  margin-left: 1.493333rem;
}
.swiper-container img {
  width: 100%;
  height: 100%;
}
div,
input {
  box-sizing: border-box;
}
.hu_row,
.hu_column {
  display: flex;
  display: -webkit-flex;
}
.hu_row {
  flex-direction: row;
}
.hu_column {
  flex-direction: column;
}
.preservation {
  width: 9.146667rem;
  height: 1.253333rem;
  display: block;
  margin: 0 auto;
  background: #f23814;
  border-radius: 0.626667rem;
  font-size: 0.48rem;
  color: #fff;
  text-align: center;
  line-height: 1.253333rem;
}
.popup {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.arrow {
  margin: 0.466667rem 0.453333rem 0 0;
  justify-content: flex-end;
}

.arrow image {
  width: 1.6rem;
  height: 2.506667rem;
}

.popupText {
  width: 5.306667rem;
  margin: 0.533333rem auto 0;
  font-size: 0.373333rem;
  line-height: 0.533333rem;
  color: #fff;
}

.know {
  width: 2.533333rem;
  height: 0.853333rem;
  margin: 1.706667rem auto 0;
  border: 0.026667rem solid #fff;
  border-radius: 0.426667rem;
  text-align: center;
  line-height: 0.853333rem;
  color: #fff;
  font-size: 0.453333rem;
}
</style>
