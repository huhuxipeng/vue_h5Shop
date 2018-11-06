<template>
    <div>
      <mt-popup  v-model="show">
      <div class='popup_wrap'>
        <div class='coupon_header'>
          恭喜您
        </div>
        <div class='coupon_header'>
          您有一张现金券待领取
        </div>
        <div class='coupon_main'>
          <div>
            <span class="big">{{detail.discountPrice}}</span>
            <span class="little">元</span>
          </div>
          <div>满{{detail.minAmount}}元可用</div>
          <div>领取时间：{{detail.getBeginTime}}-{{detail.getEndTime}}</div>
        </div>
        <div class='pick_now' @click="takeCoupon">立即领取</div>
        <div class='pick_text'>领取后，现金券将放入您的账户。</div>
        <div class='share_text'>
          分享至
        </div>
        <div class='share_button_wrap flex'>
          <div @click="invite">
            <img src='../common/image/shop/wechat.png' />
            <div class='text'>微信好友</div>
          </div>
          <div @click="invite">
            <img src='../common/image/shop/wechatcircle.png' />
            <div  class='text'>朋友圈</div>
          </div>
        </div>
        <img src="../common/image/shop/image_coupon_detail.png" class='popup_wrap_bg' />
        <div class='coupon_close flex flex_center' @click='closeCouponDetail'>
          ×
        </div>
        <div class='left_button select_button' @click='lastOne' >
        </div>
        <div class='right_button select_button' @click='nextOne'>
        </div>
      </div>
      </mt-popup>
    <mt-popup popup-transition="popup-fade" position="top" v-model='mast' class='popups'>
      <div class="masts" @click="mastss">

      </div>
    </mt-popup>
    </div>
</template>

<script>
/*优惠券详情弹窗组件*/
import { MessageBox } from "mint-ui";
import share from "../common/js/wxshare";
export default {
  data() {
    return {
      show: this.value,
      mast: false,
      detail: {}
    };
  },
  props: ["value", "index", "couponList"],
  watch: {
    value(newVal) {
      this.show = newVal;
      setTimeout(o => {
        this.detail = this.couponList[this.index];
        // this.initShare();
      }, 1);
    },
    show(newVal) {
      this.$emit("input", newVal);
    }
  },
  mounted() {
    this.$emit("change", this.show);
  },
  methods: {
    lastOne() {
      if (this.data.index > 0) {
        //第一个的前一个，跳到最后一个
        this.data.index = this.data.index - 1;
      } else {
        this.data.index = this.data.couponList.length - 1;
      }
      this.setData({
        detail: this.data.couponList[this.data.index]
      });
    },
    nextOne() {
      if (this.data.index == this.data.couponList.length - 1) {
        //最后一个，那就跳到第一个
        this.data.index = 0;
      } else {
        this.data.index = this.data.index + 1;
      }
      this.setData({
        detail: this.data.couponList[this.data.index]
      });
    },
    initShare() {
      let us = window.location.href.split("#")[0];
      share(
        us,
        this.detail.shareTitle,
        this.detail.shareRemark,
        'https://'+this.$urlstate.url+'/?#/collarVoucher?cpnId='+this.detail.cpnId + '&mold=0' + '&o_coupon_cpnId=' + this.detail.cpnId,
        this.filters.filterss(this.detail.shareImg)
      );
    },
    mastss() {
      this.mast = false;
    },
    invite() {
      this.mast = true;
      this.initShare();
    },
    takeCoupon() {
      if (!sessionStorage.getItem("token")) {
        sessionStorage.pgths = window.location.href.split("#")[1];
        this.$router.push("/login");
        return;
      }
      //领取优惠券
      let cpnId = this.detail.cpnId;
      let url = "coupon/memberGetCoupon";
      let params = {
        cpnId: cpnId,
        token: sessionStorage.token
      };
      this.$axios({
        method: "post",
        url: url,
        responseType: "json",
        data: params
      }).then(o => {
        if (o.data.res_code == 0) {
          this.closeCouponDetail();
        }
        MessageBox("提示", o.data.res_info);
      });
    },
    closeCouponDetail() {
      this.show = false;
    }
  }
};
</script>
<style scoped>
.popup_wrap {
  position: relative;
  width: 9.573333rem;
  height: 14.026667rem;
  padding-top: 0.24rem;
  border-radius: 0.053333rem;
}

.popup_wrap_bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.coupon_header {
  font-size: 0.64rem;
  font-family: DFWaWaSC-W5;
  font-weight: normal;
  color: white;
  line-height: 0.773333rem;
  text-align: center;
  -webkit-text-stroke: 0.013333rem white;
}

.coupon_close {
  width: 0.72rem;
  height: 0.72rem;
  font-size: 0.893333rem;
  color: white;
  border-radius: 0.72rem;
  border: 0.026667rem solid white;
  position: absolute;
  top: 0.266667rem;
  right: 0.266667rem;
  text-align: center;
}

.coupon_main {
  margin-top: 2.1rem;
  color: #f14d44;
  text-align: center;
  font-size: 0.373333rem;
}
.flex_column {
  padding: 0;
}
.flex {
  padding: 0;
}

.coupon_main > div:first-child {
  height: 1.493333rem;
}

.coupon_main .big {
  font-size: 1.28rem;
}

.coupon_main .little {
  font-size: 0.426667rem;
  position: relative;
}

.popup_wrap .pick_now {
  width: 5.333333rem;
  height: 1.013333rem;
  background: linear-gradient(
    180deg,
    rgba(254, 226, 85, 1) 0%,
    rgba(245, 166, 35, 1) 100%
  );
  border-radius: 0.506667rem;
  font-size: 0.48rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 1.013333rem;
  margin: 1.88rem auto 0.293333rem;
  text-align: center;
}

.popup_wrap .pick_text {
  font-size: 0.32rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(247, 184, 51, 1);
  text-align: center;
  width: 100%;
  line-height: 0.453333rem;
}

.popup_wrap .share_text {
  margin-top: 1.6rem;
  font-size: 0.48rem;
  text-align: center;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.666667rem;
}
.share_button_wrap {
  justify-content: center;
}
.share_button_wrap > div:first-child {
  margin-right: 2rem;
}

.share_button_wrap img {
  width: 1.36rem;
  height: 1.36rem;
  border-radius: 0.68rem;
}

.share_button_wrap .text {
  font-size: 0.32rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.426667rem;
  text-align: center;
}
.mint-popup {
  background: none;
}
.mint-popup .masts {
  width: 10rem;
  height: 10rem;
  background: url(../common/image/mast.png) no-repeat;
  background-position-y: 0.2rem;
  background-position-x: 2.5rem;
}
.select_button {
  position: absolute;
  top: 6.226667rem;
  width: 0.853333rem;
  height: 0.853333rem;
  z-index: 1;
}
.left_button {
  left: 0.293333rem;
}
.right_button {
  right: 0.293333rem;
}
</style>

