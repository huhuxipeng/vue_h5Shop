<template>
	<div class="collarVoucher" id="collarVoucher">
    <img class="banner" src="../common/image/collarVoucher/banner.png" alt="">

    <div class="phoneBox" v-if="receiveState==false">
      <input class="inp" v-model="mobile" type="number" maxlength="11" placeholder="请输入手机号码" />
      <span class="getCode" @click="getCodeFun">{{CodeText}}</span>
    </div>
    <input v-if="receiveState==false" v-model="code" class="inp" type="text" placeholder="请输入验证码" />
    <div class="shareBtn use" v-if="receiveState==false" @click="receiveFun">立即领取</div>

    <div class="shareBtn" @click="shareGuide" v-if="receiveState">分享给好友</div>
    <div class="shareBtn use" v-if="receiveState" @click="useFun">去使用</div>

    <p class="tips">请您点击立即领取，获取现金券，领完为止。</p>
    <div class="voucher hu_column">
      <img class="h h1" src="../common/image/collarVoucher/h.png">
      <img class="h h2" src="../common/image/collarVoucher/h.png">
      <div class="cardVoucher hu_column">
        <img class="icon left" src="../common/image/collarVoucher/left.png">
        <img class="icon right" src="../common/image/collarVoucher/right.png">
        <div class="shop hu_row">
          <div>
            <div class="cpntypes hu_row">
              <p>{{couponList.cpnName}}</p>
            </div>
            <div class="tscl hu_row">
              <p :class="'p_color'+couponList.cpnType">{{couponList.cpnTypes}}</p>
              <p>满{{couponList.minAmount}}可用</p>
            </div>
          </div>
          <div class="hu_row"><p>￥</p><p>{{couponList.discountPrice}}</p></div>
        </div>
        <div class="date">{{couponList.getBeginTime}}-{{couponList.getEndTime}}</div>
      </div>
    </div>
    <div v-if="shareState" class="shareBox" @click="closeShare">
      <img src="../common/image/collarVoucher/share.png" alt="分享">
      <span>点击右上角分享给好友</span>
    </div>
	</div>
</template>
<script>
import wx from "weixin-js-sdk";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      CodeText: "获取验证码",
      countState: true,
      shareState: false,
      receiveState: false,
      mobile: "",
      code: "",
      sn: "", //tifzopdh测试券码
      mold: "0",
      cpnId: "",
      o_coupon_cpnId: "",
      couponList: ""
    };
  },
  mounted: function() {
    console.log("获取参数", this.$route.query); //获取参数
    if (this.$route.query.mold) {
      this.mold = this.$route.query.mold;
    }
    if (this.$route.query.o_coupon_cpnId) {
      this.o_coupon_cpnId = this.$route.query.o_coupon_cpnId;
      this.$axios({
        method: "post",
        url: "coupon/anon/queryCouponDetail",
        responseType: "json",
        data: {
          cpnId: this.o_coupon_cpnId
        }
      }).then(res => {
        let o = res.data.res_data.coupon;
        o.getBeginTime = new Date(o.getBeginTime).format("yyyy.MM.dd");
        o.getEndTime = new Date(o.getEndTime).format("yyyy.MM.dd");
        o.shareImg = this.filters.filterss(o.shareImg);
        switch (o.cpnType) {
          case 0:
            o.cpnTypes = "分类券";
            break;
          case 1:
            o.cpnTypes = "商品券";
            break;
          case 2:
            o.cpnTypes = "店铺券";
            break;
          case 3:
            o.cpnTypes = "通用券";
            break;
        }
        this.couponList = o;
        this.fenxang();
      });
    }
    if (this.$route.query.sn) {
      this.sn = this.$route.query.sn;
    }
    if (this.$route.query.cpnId) {
      this.cpnId = this.$route.query.cpnId;
    }
  },
  methods: {
    useFun() {
      //跳转到对应的使用券页面
      if (this.couponList.relType != null) {
        // console.log('状态', typeof(this.couponList))
        this.$api.toRelDetail(this.couponList, this);
      }
    },
    shareGuide() {
      this.shareState = true;
    },
    closeShare() {
      this.shareState = false;
    },
    getCodeFun() {
      let countState = this.countState;
      let mobile = this.mobile;
      let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (countState) {
        this.countState = false;
        if (mobile == "" || !myreg.test(mobile)) {
          Toast({
            message: "请输入正确的手机号",
            iconClass: "mintui"
          });
          this.countState = true;
        } else {
          this.$axios({
            method: "post",
            url: "/basics/anon/sendMobileCode",
            responseType: "json",
            data: {
              mobile: mobile,
              type: 7
            }
          }).then(res => {
            let that = this;
            Toast({
              message: res.data.res_info,
              iconClass: "mintui"
            });
            if (res.data.res_code == 0) {
              let count = (that.CodeText = 60);
              count--;
              that.CodeText = count + "s";

              that.t = setInterval(function() {
                if (that.countState) {
                  clearInterval(that.t);
                  return false;
                }
                count--;
                that.CodeText = count + "s";
                if (count < 0) {
                  clearInterval(that.t);
                  (that.CodeText = "获取验证码"), (that.countState = true);
                }
              }, 1000);
            }
          });
        }
      }
    },
    receiveFun() {
      let code = this.code;
      let mobile = this.mobile;

      if (mobile == "") {
        Toast({
          message: "请输入手机号码",
          iconClass: "mintui"
        });
      } else if (code == "") {
        Toast({
          message: "请输入验证码",
          iconClass: "mintui"
        });
      } else {
        this.$axios({
          method: "post",
          url: "basics/anon/checkCodeLogin",
          responseType: "json",
          data: {
            code: code,
            mobile: mobile,
            type: 7
          }
        }).then(res => {
          console.log("数据", res);
          let that = this;
          if (res.data.res_code == 0) {
            sessionStorage.setItem(
              "details",
              JSON.stringify(res.data.res_data.member)
            );
            sessionStorage.setItem("token", res.data.res_data.token);
            sessionStorage.setItem(
              "memberId",
              res.data.res_data.member.memberId
            );
            let token = res.data.res_data.token;
            console.log('拉开距离',that.sn,that.mold,token)
            if (that.mold == "0") {
              //普通领取
              this.$axios({
                method: "post",
                url: "coupon/memberGetCoupon",
                responseType: "json",
                data: {
                  // cpnId: 122,
                  cpnId: that.cpnId,
                  token: token
                }
              }).then(res => {
                if (res.data.res_code == 0) {
                  console.log("普通领取结果", res);
                  //领取成功
                  Toast({
                    message: res.data.res_info,
                    iconClass: "mintui"
                  });
                  that.receiveState = true;
                } else {
                  Toast({
                    message: res.data.res_info,
                    iconClass: "mintui"
                  });
                }
              });
            }else if(that.mold == "1"){
              //线下领取
              this.$axios({
                method: "post",
                url: "coupon/underGetCoupon",
                responseType: "json",
                data: {
                  sn: that.sn,
                  token: token
                }
              }).then(res => {
                if (res.data.res_code == 0) {
                  console.log("线下领取结果", res);
                  //领取成功
                  Toast({
                    message: res.data.res_info,
                    iconClass: "mintui"
                  });
                  that.receiveState = true;
                } else {
                  Toast({
                    message: res.data.res_info,
                    iconClass: "mintui"
                  });
                }
              });
            }else if (that.mold == "2") {
              //赠送
              this.$axios({
                method: "post",
                url: "coupon/giveCoupon",
                responseType: "json",
                data: {
                  // cpnId: 20901,
                  // sn: "zd4poyun",
                  cpnId: that.cpnId,
                  sn: that.sn,
                  token: token
                }
              }).then(res => {
                if (res.data.res_code == 0) {
                  //领取成功
                  Toast({
                    message: res.data.res_info,
                    iconClass: "mintui"
                  });
                  that.receiveState = true;
                } else {
                  Toast({
                    message: res.data.res_info,
                    iconClass: "mintui"
                  });
                }
              });
            }
          } else {
            Toast({
              message: res.data.res_info,
              iconClass: "mintui"
            });
          }
        });
      }
    },
    fenxang() {
      var us = window.location.href.split("#")[0];
      let that = this;
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
        // debug: true,
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
          title: that.couponList.shareTitle,
          desc: that.couponList.shareRemark,
          link:
            "http://" +
            that.$urlstate.url +
            "/?#/collarVoucher?cpnId=" +
            that.couponList.cpnId +
            "&mold=0" +
            "&o_coupon_cpnId=" +
            that.couponList.cpnId,
          imgUrl: that.couponList.shareImg, // 分享图标
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
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
.collarVoucher {
  position: absolute;
  width: 100%;
  min-height: 100%;
  padding-bottom: 0.4rem;
  background: #f35046;
  .banner {
    width: 100%;
    margin-bottom: 0.533333rem;
    background: #ff0;
  }
  .phoneBox {
    position: relative;
    width: 9.146667rem;
    margin: 0 auto;
    .getCode {
      position: absolute;
      top: 50%;
      right: 0.266667rem;
      padding-left: 0.266667rem;
      transform: translate(0, -50%);
      font-size: 0.373333rem;
      color: #f23814;
      border-left: 0.013333rem solid #ccc;
    }
  }
  .inp {
    display: block;
    width: 9.146667rem;
    height: 1.226667rem;
    margin: 0 auto 0.533333rem;
    padding-left: 0.533333rem;
    background: #fff;
    border-radius: 0.64rem;
    font-size: 0.373333rem;
    border: none;
    outline: none;
  }
  .shareBtn {
    width: 9.146667rem;
    height: 1.226667rem;
    margin: 0.906667rem auto 0.533333rem;
    background: url(../common/image/collarVoucher/btn.png) 0 0 no-repeat;
    background-size: 100% 100%;
    color: #fff;
    text-align: center;
    line-height: 1.226667rem;
    font-size: 0.48rem;
  }
  .use {
    margin: 0 auto 0.346667rem;
  }
  .tips {
    margin-bottom: 1.2rem;
    text-align: center;
    font-size: 0.373333rem;
    color: #f7b833;
  }
  .voucher {
    position: relative;
    width: 9.146667rem;
    margin: 0 auto;
    padding: 0.533333rem 0.72rem;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0.053333rem #6b1111;
    .h {
      position: absolute;
      top: -0.24rem;
      width: 0.16rem;
      height: 0.56rem;
    }
    .h1 {
      left: 0.88rem;
    }
    .h2 {
      right: 0.88rem;
    }
    .cardVoucher {
      position: relative;
      width: 7.12rem;
      height: 2.533333rem;
      margin: 0 auto 0.266667rem;
      padding: 0.24rem 0.133333rem;
      background: #fff;
      box-shadow: 0 0.026667rem 0.04rem #666;
      .icon {
        position: absolute;
        top: 0;
        width: 0.293333rem;
        height: 100%;
      }
      .left {
        left: -0.293333rem;
      }
      .right {
        right: -0.293333rem;
      }
      .shop {
        margin-bottom: 0.266667rem;
        justify-content: space-between;
        align-items: center;
      }
      .shop div:nth-child(1) {
        .cpntypes {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-top: 0.08rem;
          margin-bottom: 0.213333rem;
          align-items: center;
          p:nth-child(2) {
            margin-left: 0.133333rem;
            margin-bottom: 0.106667rem;
            padding: 0.08rem 0.106667rem;
            font-size: 0.48rem;
            color: #fff;
            border-radius: 0.2rem;
          }
        }
        p:nth-child(1) {
          font-size: 0.373333rem;
          line-height: 0.426667rem;
          color: #f23814;
        }
        p:nth-child(2) {
          margin-top: 0.133333rem;
          font-size: 0.32rem;
          color: #9b9b9b;
        }
      }
      .shop div:nth-child(2) {
        color: #f23814;
        p:nth-child(1) {
          margin-top: 0.4rem;
          font-size: 0.426667rem;
        }
        p:nth-child(2) {
          font-size: 0.96rem;
        }
      }
      .date {
        padding-top: 0.16rem;
        border-top: 0.026667rem dashed #dedede;
        font-size: 0.266667rem;
        color: #4a4a4a;
      }
    }
    .cardVoucher:last-child {
      margin: 0 auto 0;
    }
  }
  .shareBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    span {
      position: absolute;
      top: 7rem;
      left: 0;
      width: 100%;
      color: #fff;
      font-size: 0.48rem;
      text-align: center;
    }
    img {
      display: block;
      width: 9.6rem;
      height: 7.946667rem;
      margin: 0.4rem auto 0;
    }
  }
}
.tscl p:nth-child(1) {
  margin: 0 0.266667rem 0.106667rem 0 !important;
  padding: 0.08rem 0.106667rem;
  font-size: 0.266667rem;
  color: #fff !important;
  border-radius: 0.2rem;
}
.tscl p:nth-child(2) {
  font-size: 0.32rem !important;
}

.p_color0 {
  background: #9b49c3;
}
.p_color1 {
  background: #4d7ae8;
}
.p_color2 {
  background: #4bc489;
}
.p_color3 {
  background: #ea8033;
}
</style>
