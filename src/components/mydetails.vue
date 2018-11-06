<template>
	<div class="mydetails" id="mydetails">
    <div class="detailsBox">
      <p class="detailsTit">{{o_coupon.cpnName}}</p>
      <div class="box hu_column">
        <div class="describe hu_column">
          <div class="hu_row">
            <p class="price">{{o_coupon.discountPrice}}</p>
            <p>元</p>

            <p v-if="tabIndex==0" class="span" :class="'span'+o_coupon.cpnType">{{o_coupon.cpnTypes}}</p>
            <p v-else class="span span4">{{o_coupon.cpnTypes}}</p>

            <!-- <p class="span">店铺券</p> -->
          </div>
          <p class="ms1">满{{o_coupon.minAmount}}元可用</p>
          <div v-if="tabIndex==0" class="immediateUse" @click='useFun'>立即使用</div>
          <div v-else-if="tabIndex==1" class="immediateUse immediateUses">已使用</div>
          <div v-else class="immediateUse immediateUses">已过期</div>

          <p class="ms2">{{o_coupon.placeRemark}}</p>
        </div>
        <div class="time hu_column">
          <div class="hu_row">
            <p>有效期</p>
            <p>{{o_coupon.useBeginTime}}-{{o_coupon.useEndTime}}</p>
          </div>
          <div class="hu_row">
            <p>券编码</p>
            <p>{{o_coupon.cpnSn}}</p>
          </div>
        </div>
        <div class="rule hu_row" @click="ruleFun">
          <p>使用规则</p>
          <img src="../common/image/backgo.png">
        </div>
        <div class="btns hu_row">
          <div v-if="tabIndex==0" class="hu_column" @click="fenxangBtn('2')"><img src="../common/image/mycoupon/icon1.png">转赠好友</div>
          <div v-else class="hu_column" @click="btnFun"><img src="../common/image/mycoupon/icon1.png">转赠好友</div>

          <div v-if="tabIndex==0&&o_coupon.grantType==0" class="hu_column" @click="fenxangBtn('0')"><img src="../common/image/mycoupon/icon2.png">邀请领券</div>
          <div v-else class="hu_column" @click="btnFun"><img src="../common/image/mycoupon/icon2.png">邀请领券</div>
        </div>

      </div>
    </div>
    <div v-if="activity" class="activity hu_column">
      <div class="icon5Box hu_row"><img @click="icon5Fun" class="icon5" src="../common/image/mycoupon/icon5.png"></div>
      <div class="activityTit">使用规则</div>
      <div class="activityContent hu_column">
        <p>{{o_coupon.useRule}}</p>
        <!-- <p>·获得你的公开信息（昵称、头像、性别等)</p>
        <p>·使用身份信息（姓名、手机号、证件）办理业</p>
        <p>·查询你的芝麻分等信用信息，如尚未开通芝麻信用服务，则予以开</p> -->
      </div>
    </div>
    <div v-if="activity" class="activityBg"></div>
    <div class='popup' v-if="know">
      <div class='arrow hu_row'><img src="../common/image/collarVoucher/arrow.png" /></div>
      <div class='popupText'>{{text}}</div>
      <div class='know' @click='know2'>知道了</div>
    </div>
	</div>
</template>
<script>
import wx from 'weixin-js-sdk';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      know: false,
      activity: false,
      tabIndex: "",
      o_coupon: {},
      sn: '',
      mold:'0',
      cpnId:'',
      text: '点击右上角分享，分享好友后，您的好友也可以领取到现金券，领完为止~'
    };
  },
  mounted: function() {
    console.log(this.$route.query)//获取参数
    this.cpnId = this.cpnIds = this.$route.query.cpnId;
    this.tabIndex = this.$route.query.tabIndex;
    this.token = sessionStorage.getItem("token");
    this.$axios({
      method: "post",
      url: "coupon/couponDetail",
      responseType: "json",
      data: {
        cpnId: this.cpnId,
        token: this.token
      }
    }).then(res => {
      let coupon = res.data.res_data.coupon
      coupon.useBeginTime = new Date(
        res.data.res_data.coupon.useBeginTime
      ).format("yyyy.MM.dd");
      coupon.useEndTime = new Date(res.data.res_data.coupon.useEndTime).format("yyyy.MM.dd");
      coupon.shareImg = this.filters.filterss(coupon.shareImg);
      coupon.relType = coupon.relType1;
      switch (coupon.cpnType) {
        case 0:
          coupon.cpnTypes = "分类券";
          break;
        case 1:
          coupon.cpnTypes = "商品券";
          break;
        case 2:
          coupon.cpnTypes = "店铺券";
          break;
        case 3:
          coupon.cpnTypes = "通用券";
          break;
      }
      this.o_coupon = coupon;
      this.fenxang();
    });
  },
  methods: {
    know2() {
      this.know = false;
    },
    ruleFun() {
      this.activity = true;
    },
    icon5Fun() {
      this.activity = false;
    },
    useFun() {
      //跳转到对应的使用券页面
      if(this.o_coupon.relType!=null){
        this.$api.toRelDetail(this.o_coupon,this)
      }
    },
    btnFun(){
      if(this.tabIndex==1){
        Toast({
          message: '已使用',
          iconClass: 'mintui',
          duration: 1000
        });
      }else if(this.tabIndex==2){
        Toast({
          message: '已过期',
          iconClass: 'mintui',
          duration: 1000
        });
      }else{
        Toast({
          message: '平台（商户）惠赠不支持分享领取',
          iconClass: 'mintui',
          duration: 800
        });
      }
    },
    fenxangBtn(ids){
      this.know=true;
      if(ids=='0'){
        this.text='点击右上角分享，分享好友后，您的好友也可以领取到现金券，领完为止~';
        this.mold = '0'
      }else if(ids=='2'){
        this.text='点击右上角分享，分享好友领取后，您的该现金券将赠送给好友~';
        this.mold = '2'
      }
      this.fenxang();
    },
    fenxang() {
      if(this.mold=='0'){
        this.cpnId = this.o_coupon.cpnId;
      }else if(this.mold=='2'){
        this.sn = this.o_coupon.sn;
        this.cpnId = this.cpnIds;
      }
      var us = window.location.href.split("#")[0];
      this.$axios({
        method: "post",
        url: "/basics/anon/wxSign",
        responsetype: "json",
        data: {
          url: us
        }
      }).then(data => {
          let datas = data.data.res_data.sign_info;
          this.wxInit(datas,this.sn,this.cpnId,this.mold);
          console.log("分享成功", datas);
        })
        .catch(err => {
          console.log("分享失败", err);
        });
    },
    wxInit(res,sn,cpnId,mold) {
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
        var links;
        if(that.mold=='0'){
          links = 'http://'+that.$urlstate.url+'/?#/collarVoucher?cpnId='+cpnId + '&mold=' +mold + '&o_coupon_cpnId=' + that.o_coupon.cpnId
        }else if(that.mold=='2'){
          links = 'http://'+that.$urlstate.url+'/?#/collarVoucher?sn='+ sn + '&cpnId=' +cpnId + '&mold=' +mold + '&o_coupon_cpnId=' + that.o_coupon.cpnId
        }

        console.log(links)
        var obj = {
          title: that.o_coupon.shareTitle,
          desc: that.o_coupon.shareRemark,
          link: links,
          imgUrl: that.o_coupon.shareImg,
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
p {
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
.mydetails {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f23814;
  .detailsBox {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 9.146667rem;
    height: 14.16rem;
    transform: translate(-50%, -50%);
    .detailsTit {
      position: absolute;
      top: 0;
      left: 0;
      width: 9.146667rem;
      height: 1.84rem;
      padding: 0.48rem 0 0 0.533333rem;
      background: url(../common/image/mycoupon/icon4.png) 0 0 no-repeat;
      background-size: 100% 100%;
      font-size: 0.48rem;
      color: #333;
    }
    .box {
      height: 12.32rem;
      margin-top: 1.818rem;
      padding: 0.96rem 0.533333rem 0.666667rem;
      background: #fff;
      border-radius: 0 0 0.213333rem 0.213333rem;
      .describe {
        padding-bottom: 0.586667rem;
        align-items: center;
        border-bottom: dashed 0.026667rem #ccc;
        .hu_row {
          height: auto;
          .price {
            margin-top: 0;
            margin-right: 0.066667rem;
            font-size: 1.28rem;
          }
          p {
            font-size: 0.426667rem;
          }
          p {
            margin-top: 0.75rem;
          }
          .span {
            margin-left: 0.106667rem;
            padding: 0.1rem 0.133333rem;
            color: #fff;
            border-radius: 0.213333rem;
            font-size: 0.266667rem;
          }
          .span0 {
            background: #9b49c3;
          }

          .span1 {
            background: #4d7ae8;
          }

          .span2 {
            background: #4bc489;
          }

          .span3 {
            background: #ea8033;
          }

          .span4 {
            background: #ccc;
          }
        }
        .ms1 {
          margin: 0.106667rem 0 0.373333rem;
          font-size: 0.373333rem;
          color: #333;
        }
        .immediateUse {
          width: 100%;
          height: 1.066667rem;
          margin-bottom: 0.373333rem;
          background: #f23814;
          font-size: 0.426667rem;
          color: #fff;
          border-radius: 0.533333rem;
          text-align: center;
          line-height: 1.066667rem;
        }
        .immediateUses {
          background: #ccc;
        }
        .ms2 {
          font-size: 0.32rem;
          color: #333;
          line-height: 0.48rem;
        }
      }
      .time {
        padding-bottom: 0.533333rem;
        font-size: 0.373333rem;
        color: #333;
        border-bottom: dashed 0.026667rem #ccc;
        .hu_row {
          margin-top: 0.4rem;
          p:nth-child(1) {
            margin-right: 1.333333rem;
          }
        }
      }
      .rule {
        padding: 0.533333rem 0;
        border-bottom: dashed 0.026667rem #ccc;
        justify-content: space-between;
        align-items: center;
        img {
          width: 0.306667rem;
          height: 0.506667rem;
        }
      }
      .btns {
        padding-top: 0.666667rem;
        .hu_column {
          width: 50%;
          align-items: center;
          img {
            width: 0.64rem;
            margin-bottom: 0.16rem;
          }
        }
      }
    }
  }
  .activity {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 5;
    width: 8.506667rem;
    padding: 0.426667rem 0.426667rem 1rem;
    background: #fff;
    transform: translate(-50%, -50%);
    .icon5Box {
      justify-content: flex-end;
      .icon5 {
        width: 0.426667rem;
        height: 0.426667rem;
      }
    }
    .activityTit {
      margin: 0.453333rem 0 0.666667rem;
      font-size: 0.48rem;
      color: #333;
      text-align: center;
    }
    .activityContent {
      overflow-y: auto;
      max-height: 13.333333rem;
      font-size: 0.373333rem;
      color: #999;
      p {
        margin-bottom: 0.106667rem;
        line-height: 0.533333rem;
      }
    }
  }
  .activityBg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
  }
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
