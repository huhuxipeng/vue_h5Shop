<template>
  <div class="goods-detail-page mywrap" :class="{'show':show_mywrap}">
    <commonTop header-type="5" header-class="bg-none" has-back="true" :sharefun=share :gocarfun=goCar></commonTop>
    <!-- 静态banner展示 -->
    <!--<app-banner :listImg="listImgA"></app-banner>-->
    <mt-swipe :auto="5000" class="banner" style='height:8.5rem;'>
      <mt-swipe-item v-for="(item,index) in listImgA" :key="index">
        <img :src="item.image | filterss(1)" :onerror="logo" style="width: 100%;height: 100%;" />
      </mt-swipe-item>
    </mt-swipe>
    <div v-if="moreDetail.goodsInfo&&moreDetail.goodsInfo.flashsaleGoodsId" class="count_time">
      <img src="../common/image/count_down.jpg" />
      <div class="time_title" v-if="moreDetail&&moreDetail.flashsaleActivity.flag=='2'">距离开始时间：</div>
      <div class="time_title" v-if="moreDetail&&moreDetail.flashsaleActivity.flag=='1'">距离结束时间：</div>

      <div class="bug_state" v-if="Date.parse(new Date()) < moreDetail.goodsInfo.beginTime">即将开抢</div>
      <div v-else-if="countTime>0" class="time_wrap flex">
        <div>{{formatTime(countTime,1)}}</div>:
        <div>{{formatTime(countTime,2)}}</div>:
        <div>{{formatTime(countTime,3)}}</div>
      </div>
      <div class="bug_state" v-if="countTime<=0||moreDetail.goodsInfo.activityStock<=0">已抢完</div>
    </div>
    <div class="wrap">
      <div class="row">
        <div class="left">
          <span v-if="!detail.exchangeCoin&&detail.exchangeCoin!=0" class="new_price">
            <em>￥</em>{{Number(detail.flashsalePrice?detail.flashsalePrice:detail.price).toFixed(2)}}</span>
          <span v-else class="new_price">{{detail.exchangeCoin}}金币</span>
          <u class="old_price">￥{{Number(detail.mktprice).toFixed(2)}}</u>
        </div>
        <div class="right">
          <span class="gray">已售{{buyCount}}件</span>
        </div>
      </div>
      <div class="row detail_name" style="line-height: .42rem;">{{detail.name}}</div>
      <!-- 商品标签 折扣 新品 爆款 -->
      <div class="flex" v-if="detail.tagName">
        <div class="tag_name" v-for="val in detail.tagName">{{val}}</div>
      </div>
    </div>
    <div class="wrap" v-if="!moreDetail&&!goldChangerId">
      <div class="row">
        <div class="left">
          <b class="bold">积分福利</b>
        </div>
        <div class="right flex" @click="mystore" v-if="!shows">
          <span class="orange">我要推广</span>
          <div class="more"></div>
        </div>
        <div class="right flex" @click="goto" v-if="shows">
          <span class="orange">成为店长</span>
          <div class="more"></div>
        </div>
      </div>
      <div class="row" v-if="details[0]">
        <div class="left" style="width:auto;">
          <div class="point_ratio">自购赠送</div>
        </div>
        <div class="right text" style="flex-grow:1;">
          红积分：{{detail.profit*details[0].redPointRatio| strings}};
          <!--黄积分：{{detail.profit*details[0].yellowPointRatio| strings}};-->云积分：{{detail.price*details[0].cloudPointRatio| strings}}
        </div>
      </div>
      <div class="row" v-if="details[0]">
        <div class="left" style="width:auto;">
          <div class="point_ratio">推广赠送</div>
        </div>
        <div class="right text" style="flex-grow:1;">
          红积分：{{detail.profit*details[0].ExtensionRedPointRatio| strings}};
          <!--黄积分：{{detail.profit*details[0].ExtensionYellowPointRatio| strings}};-->云积分：{{detail.price*details[0].ExtensionCloudPointRatio| strings}}
        </div>
      </div>

    </div>

    <div class="row" @click="selectType">
      <div class="left">
        请选择颜色分类
      </div>
      <div class="right flex">
        <div class="more"></div>
      </div>
    </div>
    <div class="row" @click="pickCoupon">
      <div class="left" style="width:1.4rem;">
        领券

      </div>
    <div class='couponList flex_grow_1'>
      <div v-for="(item,index) in couponList"  :key="index" v-if="index<3" class='child'>
        满{{item.minAmount}}减{{item.discountPrice}}券
      </div>
      </div>
      <div class="right flex">
        <div class="more"></div>
      </div>
    </div>
    <ul class="tag clear" v-if="detail.ensureTagName!=null">
      <li v-for="(item,index) in detail.ensureTagName" :key="index">
        <span class="icons"></span>{{item}}</li>
    </ul>
    <!-- <ul class="sell clear" v-if="detail.tagName!=null">
			<li v-for="val in detail.tagName">{{val}}</li>
		</ul> -->
    <div class="storeBar">
      <img :src="storeData.shopStoreLogo |filterss(3)" :onerror="logo" v-if="imgs">
      <img src="../common/image/ziying.png" v-if="!imgs" />
      <label>
        <h2 v-if="imgs">{{storeData.shopStoreName}}</h2>
        <h2 v-if="!imgs">巨柚自营旗舰店</h2>
        <p v-if="imgs">已交保证金
          <span style="color:red;">￥{{bond}}</span>元，请放心购买</p>

      </label>
      <router-link :to="{ path: '/goods/store?goodsId='+this.$route.query.goodsId,}" class="btn normal-btn red-btn btn-inStore" v-if="imgs">进入店铺</router-link>
    </div>
    <section>
      <goodsDetailTab tab-value="1" :intro="detail.intro"></goodsDetailTab>
    </section>
    <!--推广成功弹窗-->
    <mt-popup popup-transition="popup-fade" v-model="popu">
      <div class="success">
        <p>已添加到个人中心</p>
        <p>可到"个人中心-我的商品"中查看</p>
      </div>
    </mt-popup>

    <div class="footer row">
      <div @click="goShop" class="shop">
        <u></u>
        <div>店铺</div>
      </div>
      <a :href=telPhoneNum>
        <div class="custom">
          <u></u>
          <div>客服</div>
        </div>
      </a>
      <div v-if="!moreDetail.goodsInfo&&!goldChangerId" @click="collect" class="collect" :class="{active:isCollect}">
        <u></u>
        <div>收藏</div>
      </div>
      <div class="add_car" v-on:click="showCar" v-if="detail.store>0 && !moreDetail.goodsInfo&&!goldChangerId">加入购物车</div>
      <div class="buy_now" :class="{'shot':!flashsaleId&&!goldChangerId}" v-on:click="showBuy" v-if="detail.store>0 && !flashsaleId&&!goldChangerId">立即购买</div>
      <div class="buy_now" :class="{'disabled':moreDetail.goodsInfo.activityStock<=0 }" v-if="moreDetail.goodsInfo">
        <span v-if="moreDetail.goodsInfo.activityStock==0"> 已抢完</span>
        <span @click="startRemind" v-else-if="moreDetail.flashsaleActivity.flag=='2'">开抢提醒</span>
        <span @click="showFlashSale" v-else-if="moreDetail.flashsaleActivity.flag=='1'">立即抢购</span>
        <span @click="showFlashSale" v-else-if="moreDetail.flashsaleActivity.flag=='0'">已结束</span>
      </div>
      <div class="buy_now" :class="{'disabled':detail.activityNum ==0 }" v-if="goldChangerId">

        <span @click="showGoldChanger" v-if="detail.activityNum>0">立即兑换</span>
        <span v-else>已兑完</span>
      </div>
    </div>
    <div class="goods-footer-top"></div>
    <div v-if="carShow">
      <goodsFooterBuy :is-show="layerShow" :car-show="carShow" @hide-buy="hideLayer" :shopdetai='details'></goodsFooterBuy>
    </div>
    <div v-if="buyShow">
      <goodsFooterBuy :is-show="layerShow" :buy-show="buyShow" @hide-buy="hideLayer" :shopdetai='details'></goodsFooterBuy>
    </div>
    <div v-if="flashsaleShow">
      <goodsFooterBuy :is-show="layerShow" :flashsaleShow="flashsaleShow" @hide-buy="hideLayer" :hideButton="hideButton" :shopdetai='details' :moreDetail='moreDetail'></goodsFooterBuy>
    </div>
    <div v-if="goldChangerShow&&details">
      <goodsFooterBuy :is-show="layerShow" :goldChangerShow="goldChangerShow" @hide-buy="hideLayer" :noGoldGoods="detail.activityNum==0 " :shopdetai='details'></goodsFooterBuy>
    </div>
    <mt-popup popup-transition="popup-fade" position="center" style="width:9rem;" v-model='binding' closeOnClickModal>
      <div class="bindingmobile">
        <p>欢迎登录</p>
        <p>
          <u class="icons name-icon"></u>
          <input type="text" placeholder="手机号" v-model="mobile" class="input">
        </p>
        <p>
          <u class="icons pw-icon"></u>
          <input type="number" placeholder="请输验证码" v-model="codes" class="input">
          <i class="btn codebtn" @click="gaincodes">获取验证码</i>
        </p>
        <p @click="bidingmobile">确认登录</p>
      </div>
    </mt-popup>
    <mt-popup  position="bottom" v-model="showCouponPopup" closeOnClickModal>
      <div class='popup_wrap flex_column'>
    <div class='header'>
      领优惠券
      <img src='../common/image/mycoupon/close.png' @click='hideCouponPopup' class='close'/>
    </div>
      <div class='flex_grow_1 list_wrap'>
        <div v-for="(item,index) in couponList" :key="index" :class="['row',item.color]" >
          <div class='left flex_column flex_center'>
            <img v-if="item.color=='color_1'" src='../common/image/mycoupon/bg2.png'/>
            <img v-if="item.color=='color_2'" src='../common/image/mycoupon/bg3.png'/>
            <img v-if="item.color=='color_3'" src='../common/image/mycoupon/bg0.png'/>
            <img v-if="item.color=='color_4'" src='../common/image/mycoupon/bg1.png'/>
            <div class='coupon'>
              <span class="little">￥</span>
              <span class="big">{{item.discountPrice}}</span>
            </div>
            <div class='text'>满{{item.minAmount}}元可用</div>
          </div>
          <div class='right flex flex_grow_1' style="height: 2.266667rem;">
            <div class='detail flex_column between flex_grow_1' style="align-items:normal;padding:0">
              <div class='flex '>
                <div class='cpn_type'>{{item.typName}}</div>
                <div class='cpn_name'>{{item.cpnName}}</div>
              </div>
              <div class='cpn_time'>{{item.getBeginTime}}-{{item.getEndTime}}</div>
              <img v-if="item.memberId" src="../common/image/mycoupon/image_coupon_received.png"/>
              <div @click='takeCoupon(item)' v-if="!item.memberId" class='pick_now'>立即领取</div>
              <!-- <div class='use_now'>立即使用</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    </mt-popup>
  </div>
</template>
<script>
import commonTop from "../components/commonTop";
import goodsFooterBuy from "../components/goodsFooterBuy";
import goodsDetailTab from "../components/goodsDetailTab";
import wx from "weixin-js-sdk";
import { Swipe, SwipeItem, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      msg: "商品详情页面",
      detailId: "",
      detail: [],
      buyCount: 0,
      details: [],
      showCouponPopup: false, //领优惠券弹窗
      couponList: [ ],
      hideButton: false,
      phoneNum: "",
      telPhoneNum: "tel:" + "",
      // 静态banner展示
      isCollect: false, //是否收藏
      listImgA: [],
      num: false,
      carNum: "",
      storeLogo: require("../common/image/upload/store-s.jpg"),
      goodsPic: require("../common/image/upload/goods-detail-1.jpg"),
      logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
      identityId: 0,
      shows: false,
      bond: 0,
      storeData: "",
      imgs: true,
      layerShow: false,
      carShow: false,
      buyShow: false,
      popu: false,
      binding: false,
      mobile: "",
      codes: "",
      states: true,
      moreDetail: "",
      url: "",
      show_mywrap: false,
      flashsaleShow: false,
      goldChangerShow: false,
      flashsaleId: "",
      goldChangerId: "", //
      countTime: 0, //存储倒计时时间戳
      selected: "1"
    };
  },
  created() {
    window.scrollTo(0, 0);
  },
  destroyed() {
    window.clearInterval(this.setTime);
  },
  mounted: function() {
    this.identityId = JSON.parse(sessionStorage.getItem("identityId"));
    this.flashsaleGoodsId = this.$route.query.flashsaleGoodsId; //限时抢购商品ID，同时作为限时抢购标识，判断来源
    this.goldChangerId = this.$route.query.goldChangerId; //金币兑换商品ID，同时作为金币兑换标识，判断来源
    this.token = sessionStorage.getItem("token");
      this.getCouponList()
    var agent = navigator.userAgent.toLowerCase();
    sessionStorage.setItem(
      "goodsDetailQuery",
      JSON.stringify(this.$route.query)
    );
    if (agent.match(/MicroMessenger/i) == "micromessenger") {
      console.log("是微信浏览器");
      if (sessionStorage.token == null) {
        this.wxlogin();
      }
    } else {
      // return false
      // if(sessionStorage.token==null){
      //   this.$router.push('/login')
      // }
    }
    if (this.flashsaleGoodsId) {
      //如果是抢购
      (sessionStorage.flashsaleId = this.flashsaleId = this.$route.query.flashsaleId),
        (this.url = "flashsale/anon/getFlashsaleGoodsDetail"),
        this.newGetDetail();
    } else if (this.goldChangerId) {
      (sessionStorage.goldChangerId = this.goldChangerId = this.$route.query.goldChangerId),
        (this.url = "goods/anon/coinExchangeGoodsDetails"),
        this.newGetDetail();
    } else {
      this.getDetail();
    }
  },

  methods: {
    pickCoupon() {
      this.showCouponPopup = true;
    },
    hideCouponPopup() {
      this.showCouponPopup = false;
    },
    buyNow() {
      //立即抢购
    },
    tabMenu(index) {
      console.log(index);
      this.menuList.forEach(element => {
        element.active = false;
      });
      this.menuList[index].active = true;
    },
    startRemind() {
      //开抢提醒

      MessageBox.prompt("请输入通知提醒的手机号", "", {
        inputType: "number"
      }).then(({ value, action }) => {
        if (value) {
          var reg = /^1[2|3|4|5|6|8|7|9][0-9]\d{8}$/;
          console.log(reg.test(value));
          if (!reg.test(value)) {
            MessageBox("提示", "号码不正确");
            return;
          }
          let url = "flashsale/anon/flashsaleNotify";
          let params = {
            flashsaleGoodsId: this.flashsaleGoodsId,
            flashsaleId: this.flashsaleId,
            mobile: value
          };
          this.$axios({
            method: "post",
            url: url,
            responsetype: "json",
            data: params
          }).then(o => {
            console.log(o);
            if (o.data.res_data.state == 0) {
              MessageBox("提示", "设置抢购提醒成功！");
            }
          });
        } else {
          MessageBox("提示", "密码不能为空");
        }
      });
    },
    selectType() {
      if (this.flashsaleId) {
        if (
          this.moreDetail.flashsaleActivity.flag == "1" &&
          this.moreDetail.goodsInfo.activityStock
        ) {
          this.hideButton = false;
        } else {
          this.hideButton = true;
        }
        this.showFlashSale();
      } else if (this.goldChangerId) {
        this.showGoldChanger();
      } else {
        this.showBuy();
      }
    },
    formatTime(t, type) {
      let day = Math.floor(t / 86400000);
      let hour = Math.floor(t / 3600000);
      let min = Math.floor((t / 60000) % 60);
      let sec = Math.floor((t / 1000) % 60);
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      let format = "";
      if (type == 1) {
        return hour;
      }
      if (type == 2) {
        return min;
      }
      if (type == 3) {
        return sec;
      }
    },
    getCountTime() {
      let Time = "";
      if (this.moreDetail.flashsaleActivity.flag == "2") {
        Time = this.moreDetail.flashsaleActivity.beginTime;
      }
      if (this.moreDetail.flashsaleActivity.flag == "1") {
        Time = this.moreDetail.flashsaleActivity.endTime;
      }
      let countTime = Time - Date.parse(new Date(this.nowTime));
      if (countTime > 0) {
        this.$set(this, "countTime", countTime);
      } else {
        this.$set(this, "countTime", 0);
      }
      this.show_mywrap = true;
      this.setTime = setInterval(o => {
        countTime = countTime - 1000;
        if (countTime > 0) {
          this.$set(this, "countTime", countTime);
        } else {
          this.$set(this, "countTime", 0);
          moreDetail.flashsaleActivity.flag = 0;
          window.clearInterval(this.setTime);
        }
      }, 1000);
    },
    newGetDetail() {
      var params = {
        flashsaleGoodsId: this.flashsaleGoodsId,
        flashsaleId: this.flashsaleId,
        id: this.goldChangerId,
        token: this.token
      };
      this.$axios({
        method: "post",
        url: this.url,
        responsetype: "json",
        data: params
      })
        .then(data => {
          if (this.goldChangerId) {
            console.log(JSON.parse(JSON.stringify(data)));
            let good = data.data.res_data;
            good.mktprice = good.mktPrice; //后端字段名不一样好烦
            good.image = good.squareImage; //同上
            good.name = good.exchangeName; //+1
            good.productList.forEach(element => {
              element.store = 100000; //这边拿不到库存，所以不需要判断库存，随便买吧
            });

            this.show_mywrap = true;
            this.listImgA = good.goodsGallery;
            this.buyCount = good.buyCount;
            this.detail = good;
            this.goldChangerShow = true;
            this.$route.query.goodsId = data.data.res_data.goodsId;
            if (good.comTel) {
              this.phoneNum = good.comTel;
            } else if (good.comMobile) {
              this.phoneNum = good.comMobile;
            } else {
              this.phoneNum = "400-6199-669";
            }
            this.telPhoneNum = "tel:" + this.phoneNum;
            let reg = (reg = /jyimg:\//g);
            if (this.detail.intro) {
              let str = this.detail.intro.replace(
                reg,
                "https://jymall.oss-cn-beijing.aliyuncs.com/"
              );
              this.detail.intro = str;
            }

            this.storeData = {
              //店铺相关信息
              shopStoreLogo: data.data.res_data.shopStoreLogo,
              shopStoreName: data.data.res_data.shopStoreName
            };
            if (data.data.res_data.shopStoreLogo) {
              //店铺相关信息
              this.imgs = true;
            }
            this.bond = data.data.res_data.bond; //店铺保证金
            this.share(); //初始化分享

            this.details.push({
              //让字段变成我想要的样子
              good: good,
              goodsSpecList: good.goodsSpecList,
              productList: good.productList
            });
            console.log(JSON.parse(JSON.stringify(this.details)));
            return;
          }
          let moreDetail = data.data.res_data;
          this.moreDetail = moreDetail;
          this.bond = moreDetail.goodsDetail.bond;
          moreDetail.goodsDetail.good.flashsalePrice =
            moreDetail.goodsInfo.flashsalePrice;

          this.detail = moreDetail.goodsDetail.good;
          let reg = (reg = /jyimg:\//g);
          let str = this.detail.intro.replace(
            reg,
            "https://jymall.oss-cn-beijing.aliyuncs.com/"
          );
          this.detail.intro = str;
          sessionStorage.detailPrice = this.detail.price;
          this.isCollect = this.detail.flag;
          this.buyCount = moreDetail.goodsInfo.soldBase;
          this.details.push(moreDetail.goodsDetail);
          this.flashsaleShow = true;
          this.listImgA = moreDetail.goodsDetail.GoodsGallery;
          this.show_mywrap = true;
          this.nowTime = moreDetail.flashsaleActivity.nowTime;
          if (this.detail.comTel) {
            this.phoneNum = this.detail.comTel;
          } else if (this.detail.comMobile) {
            this.phoneNum = this.detail.comMobile;
          } else {
            this.phoneNum = "400-6199-669";
          }
          console.log(this.phoneNum);
          this.telPhoneNum = "tel:" + this.phoneNum;

          this.share();
          if (
            moreDetail.goodsDetail.shopStore &&
            moreDetail.goodsDetail.shopStore.shopStoreId != 1
          ) {
            this.storeData = this.moreDetail.goodsDetail.shopStore;
            this.imgs = true;
          } else {
            this.imgs = false;
          }
          this.getCountTime(); //计算倒计时
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDetail() {
      this.detailId = this.$route.query.goodsId;
      if (this.detailId) {
        this.detailId = this.$route.query.goodsId;
      } else {
        this.detailId = JSON.parse(sessionStorage.getItem("detail"));
      }

      //  	this.detailId=JSON.parse(sessionStorage.getItem('detail'))

      //			this.demonstrate();

      switch (this.identityId) {
        case 0:
          break;
        case 1:
          this.shows = false;
          break;
        case 2:
          this.shows = true;
          break;
      }

      this.$axios({
        method: "post",
        url: "/goods/anon/goodsDetails",
        responseType: "json",
        data: {
          goodsId: this.detailId,
          token: sessionStorage.getItem("token")
        }
      })
        .then(data => {
          // console.log('details',JSON.parse(JSON.stringify(data)));
          this.details.push(data.data);
          this.listImgA = data.data.GoodsGallery;
          if (data.status == 200) {
            sessionStorage.catId = data.data.good.catId;
            this.bond = data.data.bond;
            this.detail = data.data.good;
            sessionStorage.detailPrice = this.detail.price;
            this.isCollect = data.data.flag;
            this.buyCount = data.data.buyCount;
            if (data.data.comTel) {
              this.phoneNum = data.data.comTel;
            } else if (data.data.comMobile) {
              this.phoneNum = data.data.comMobile;
            } else {
              this.phoneNum = "400-6199-669";
            }
            console.log(this.phoneNum);
            this.telPhoneNum = "tel:" + this.phoneNum;
            let reg = (reg = /jyimg:\//g);
            var str = this.detail.intro.replace(
              reg,
              "https://jymall.oss-cn-beijing.aliyuncs.com/"
            );
            this.detail.intro = str;
            this.show_mywrap = true;

            this.share();
            if (data.data.shopStore && data.data.shopStore.shopStoreId != 1) {
              this.storeData = data.data.shopStore;
              this.imgs = true;
            } else {
              this.imgs = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分享
    share() {
      let us = window.location.href.split("#")[0];
      console.log("href", us);
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    wxInit(res) {
      let that = this;
      var url = that.filters.filterss(that.detail.image);

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
      var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      wx.ready(function() {
        console.log("href", window.location.href.split("#")[1]);
        let str = window.location.href.split("#")[1];
        let obj = {
          title: that.detail.name, // 分享标题
          // desc: that.participateDetails.shareDescribe,
          desc:
            "品类齐全、品质保障，正品低价、快速配送，拼团砍价、优惠多多......",

          // link: 'http://test.cheertea.com/?#/group/grouptimes?spellId=' +that.$route.query.spellId+'&activityId='+that.$route.query.activityId,
          link: "http://" + that.$urlstate.url + "/?#" + str,
          imgUrl: url, // 分享图标

          success: function(res) {
            console.log(res);
            // alert("微信接口調用成功")
          },
          cancel: function(err) {
            console.log(err);
          }
        };
        console.log("goodsObj", obj);
        wx.onMenuShareAppMessage(obj);
        wx.onMenuShareTimeline(obj);
        wx.onMenuShareQQ(obj);
        wx.onMenuShareQZone(obj);
      });
    },

    //wxlogin
    wxlogin() {
      var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      let token = sessionStorage.getItem("token");
      let href = "";
      if (this.goldChangerId) {
        //兑换商品
        href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          this.$urlstate.appid +
          "&redirect_uri=https%3a%2f%2f" +
          this.$urlstate.url +
          "%2f%23%2fgoods%2fdetail%3fgoldChangerId%3d" +
          this.$route.query.goldChangerId +
          "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
      } else if (this.flashsaleGoodsId) {
        //限时抢购
        href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          this.$urlstate.appid +
          "&redirect_uri=https%3a%2f%2f" +
          this.$urlstate.url +
          "%2f%23%2fgoods%2fdetail%3fflashsaleGoodsId%3d" +
          this.$route.query.flashsaleGoodsId +
          "%26flashsaleId%3d" +
          this.$route.query.flashsaleId +
          "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
      } else {
        //普通商品
        href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          this.$urlstate.appid +
          "&redirect_uri=https%3a%2f%2f" +
          this.$urlstate.url +
          "%2f%23%2fgoods%2fdetail%3fgoodsId%3d" +
          this.$route.query.goodsId +
          "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
      }
      if (token == null) {
        console.log("login");
        if (r == null) {
          location.href = href;
        } else {
          this.$axios({
            method: "post",
            url: "/basics/anon/appWxAuth",
            responseType: "json",
            data: {
              code: r[2],
              reqType: 0
            }
          })
            .then(data => {
              console.log(data);
              sessionStorage.details = JSON.stringify(data.data.res_data);
              if (data.data.res_data.member) {
                sessionStorage.details = JSON.stringify(
                  data.data.res_data.member
                );
                sessionStorage.token = data.data.res_data.token;
              }
              if (data.data.res_data.returnCode == 0) {
                this.binding = true;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },

    nos() {
      alert("暂未开放，敬请期待");
    },

    hideLayer: function(val) {
      this.layerShow = val;
      this.carShow = val;
      this.buyShow = val;
      this.flashsaleShow = val;
      this.goldChangerShow = val;
    },
    goShop() {
      //进入店铺
      this.$router.push({
        path: "/goods/store",
        query: {
          goodsId: this.$route.query.goodsId
        }
      });
    },
    collect() {
      //收藏
      if (!sessionStorage.getItem("token")) {
        // sessionStorage.setItem("needBack", true);
        sessionStorage.pgths = "/goods/detail?goodsId=" + this.detailId;
        this.$router.push("/login");
        return;
      }
      var isPintuan = this.$route.query.isPintuan;
      this.$axios({
        method: "post",
        url: "/goods/collectGoods",
        responseType: "json",
        data: {
          token: sessionStorage.getItem("token"),
          flag: this.isCollect,
          goodsType: 0,
          currencyId: this.detail.goodsId
        }
      })
        .then(data => {
          console.log(JSON.parse(JSON.stringify(data)));
          if (data.data.res_code == 0) {
            this.isCollect =
              data.data.res_data.isCollect == "yes" ? true : false;
          }
          MessageBox("提示", data.data.res_info);
        })
        .catch(err => {
          console.log(err);
        });
    },
    showCar: function() {
      this.layerShow = true;
      this.carShow = true;
      this.buyShow = false;
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    },
    showBuy: function() {
      this.layerShow = true;
      this.carShow = false;
      this.buyShow = true;
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    },
    showGoldChanger: function() {
      this.layerShow = true;
      this.goldChangerShow = true;
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    },
    showFlashSale: function() {
      this.layerShow = true;
      this.carShow = false;
      this.buyShow = false;
      this.flashsaleShow = true;
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    },
    //去往购物车列表页
    goCar() {
      this.$router.push("/shoppingCart/list");
    },
    goto() {
      sessionStorage.buyState = 1;
      let token = sessionStorage.getItem("token");
      let memberIds = JSON.parse(sessionStorage.getItem("memberId"));
      this.$axios({
        method: "post",
        url: "/member/seletConsumptionSituation",
        responseType: "json",
        data: {
          token: token
        }
      })
        .then(data => {
          sessionStorage.memberId = memberIds.memberId;
          switch (3) {
            //有手机号，消费满200
            case 1:
              this.$router.push("/lastOne");
              break;
            //有手机号，消费不满200
            case 0:
              this.$router.push("/mancenter");
              break;
            //没有手机号，消费不满200
            case 2:
              this.$router.push("/shop_manager");
              break;
            //没有手机号，消费满200
            case 3:
              sessionStorage.res_code = 3;
              this.$router.push("/shop_manager");
              break;

            //有手机,充值不满200
            case 4:
              this.$router.push("/mancenter");
              break;
            //有手机,充值满200
            case 5:
              this.$router.push("/lastOne");
              break;
            //没有手机号，充值不满200
            case 6:
              this.$router.push("/shop_manager");
              break;
            //没有手机号，充值满200
            case 7:
              sessionStorage.res_code = 7;
              this.$router.push("/shop_manager");
              break;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    mystore() {
      let that = this;
      this.$axios({
        method: "post",
        url: "/member/memberPromote",
        responseType: "json",
        data: {
          goodsId: this.detailId,
          token: this.token
        }
      })
        .then(data => {
          if (data.status == 200) {
            if (data.data.res_code == 1) {
              alert(data.data.res_info);
            } else {
              this.popu = true;
              window.setTimeout(function() {
                that.popu = false;
              }, 1500);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    bidingmobile() {
      if (this.states) {
        this.states = false;
        var member = JSON.parse(sessionStorage.details);
        console.log(member);
        if (!this.mobile) {
          MessageBox("提示", "手机号码不能为空");
          this.states = true;
          return;
        }
        if (!this.$api.checkPhone(this.mobile)) {
          this.states = true;
          return;
        }
        if (!this.codes) {
          MessageBox("提示", "请输入验证码");
          this.states = true;
          return;
        }
        let obj = {
          authType: 1,
          face: member.face,
          memberStatus: member.memberStatus,
          mobile: this.mobile,
          mobileCode: this.codes,
          nickname: member.nickname,
          openId: member.openId,
          sex: member.sex,
          subscribe: member.subscribe,
          type: 8,
          unionId: member.unionId
        };
        this.$axios({
          method: "post",
          url: "/basics/anon/loginAuthorizedCode",
          responseType: "json",
          data: obj
        })
          .then(data => {
            console.log(data);
            if (data.data.res_code == 0) {
              this.binding = false;
              sessionStorage.details = JSON.stringify(
                data.data.res_data.member
              );
              sessionStorage.token = data.data.res_data.token;
            } else {
              this.states = true;
              MessageBox("提示", data.data.res_info);
            }

            if (data.data.res_data.member.subscribe != 1) {
              sessionStorage.clear();
              localStorage.clear();
              sessionStorage.numberss = 3;
              this.code = true;
            }
          })
          .catch(err => {
            console.log(err);
            MessageBox("提示", err.data.res_info);
          });
      }
    },
    gaincodes() {
      console.log(111);
      let token = sessionStorage.getItem("token");
      if (this.clicks == false) {
        return false;
      }
      if (!this.$api.checkPhone(this.mobile)) {
        return;
      }

      this.clicks = false;
      let times = 60;
      var tim = document.getElementsByClassName("codebtn")[0];
      tim.innerHTML = times + "S";
      let _this = this;
      var time = setInterval(function() {
        times--;
        tim.innerHTML = times + "S";
        if (times == 0) {
          _this.clicks = true;
          tim.innerHTML = "获取验证码";
          clearInterval(time);
        }
      }, 1000);
      this.$axios({
        method: "post",
        url: "/basics/anon/sendMobileCode",
        responseType: "json",
        data: {
          mobile: this.mobile,
          type: 8
        }
      })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    takeCoupon(item){//领取优惠券
    let cpnId = item.cpnId;
    let url = 'coupon/memberGetCoupon'
    let params = {
      cpnId: cpnId,
      token:this.token,
    }
    this.$axios({
				method:"post",
				url:url,
				responseType:'json',
				data:params
			}).then(o=>{
        MessageBox('提示',o.data.res_info)
      if(o.data.res_code==0){
        this.getCouponList();
      }
    })

  },
  getCouponList() { //获取优惠券列表
    let url = 'coupon/anon/couponList';
    let params = {
      pageNo: 0,
      pageSize: 0,
      relId: this.$route.query.goodsId,
      relType: 1,
    }
    if(this.token){
      params.token = this.token
    }
     this.$axios({
				method:"post",
				url:url,
				responseType:'json',
				data:params
			}).then(o => {
      let couponList = o.data.res_data.dataList;
      couponList.forEach(o => {
        switch (o.cpnType) {
          case 0:
            o.typName = '分类券';
            o.color = 'color_1';
            break;
          case 1:
            o.typName = '商品券';
            o.color = 'color_2';
            break;
          case 2:
            o.typName = '店铺券';
            o.color = 'color_3';
            break;
          case 3:
            o.typName = '通用券';
            o.color = 'color_4';
            break;
        }
        o.getBeginTime = new Date(o.getBeginTime).format('yyyy-MM-dd');
        o.getEndTime = new Date(o.getEndTime).format('yyyy-MM-dd');
      })
      this.couponList = couponList;
    }).catch(e => {
      console.log('err', e)
    })
  },
  },
  components: {
    //    'app-banner': banner,
    commonTop: commonTop,
    goodsFooterBuy: goodsFooterBuy,
    goodsDetailTab: goodsDetailTab
  }
};
</script>
<style lang="scss" scoped="scoped">
.shopmanager {
  padding: 0.066667rem;
  font-size: 0.3rem;
  color: white;
  background: orangered;
  border-radius: 0.266667rem;
}

.success {
  width: 6rem;
  text-align: center;
  padding: 0.5rem;
  p {
    font-size: 0.4rem;
    line-height: 0.6rem;
  }
}

.export {
  display: inline-block;
  text-align: center;
  color: orangered;
  width: 6.32rem;
  height: 1.3rem;
  float: right;
  line-height: 1.3rem;
  font-size: 0.4rem;
  background: #e0e0e0;
}
.bindingmobile {
  width: 80%;
  margin: auto;
  background: white;

  p:first-child {
    text-align: center;
    font-size: 0.4rem;
    font-weight: bolder;
  }
  p {
    padding: 0.2rem;
    margin-bottom: 0.2rem;
  }
  p:last-child {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    background: orangered;
    color: white;
    padding: 0.2rem;
  }
  .codebtn {
    color: orangered;
  }
  .icons {
    width: 0.59rem;
    height: 0.7rem;
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.33rem;
    &.name-icon {
      background-position: -2.56rem -1.7rem;
    }
    &.pw-icon {
      background-position: -3.55rem -3.95rem;
    }
  }
  .input {
    display: inline-block;
    font-size: 0.32rem;
    color: #999;
    width: 3.3rem;
  }
}
.count_time {
  position: relative;
  img {
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .time_wrap {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0.17rem 0.45rem;
    z-index: 1;
    color: #333333;
    font-size: 0.5rem;
    align-items: center;
    div {
      background: #333333;
      color: white;
      padding: 0.15rem;
      font-size: 0.33rem;
      font-weight: normal;
      margin: 0 0.1rem;
      border-radius: 0.1rem;
    }
  }
  .bug_state {
    position: absolute;
    right: 0;
    top: 0;
    height: 1.3rem;
    line-height: 1.3rem;
    width: 3.5rem;
    text-align: center;
    z-index: 5;
    background: #f3d783;
    font-size: 0.4rem;
  }
}
.time_title {
  position: absolute;
  top: 0.1rem;
  z-index: 4;
  right: 0.6rem;
}
.row.footer .buy_now.shot {
  width: 2rem;
  padding: 0;
}
.row .left{
  font-size: .373333rem;
}
/* 优惠券相关 */

.couponList {
  display: flex;
}

.couponList .child {
  position: relative;
  width: 2.133333rem;
  margin-right:0;
  height: 0.533333rem;
  line-height: 0.543333rem;
  text-align: center;
  color: white;
  margin-right:.24rem;
  font-size: 0.32rem;
  background-image: url('../common/image/mycoupon/image_shop_list_coupon.png');
  background-size:100% 100%;
  background-repeat: no-repeat;
}

.couponList img {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
}

.popup_wrap {
  width: 10rem;
  height: 8.613333rem;
  background: white;
}

.popup_wrap div {
  box-sizing: border-box;
}

.popup_wrap .header {
  font-size: 0.48rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  width: 100%;
  height: 1.36rem;
  line-height: 1.36rem;
  text-align: center;
  position: relative;
  border-bottom: 0.026667rem solid rgba(245, 245, 245, 1);
}

.popup_wrap .header .close {
  width: 0.4rem;
  height: 0.4rem;
  border: 0.013333rem dashed #4a4a4a;
  color: #4a4a4a;
  position: absolute;
  right: 0.426667rem;
  top: 0.48rem;
}

.popup_wrap .left {
  width: 2.826667rem;
  height: 2.266667rem;
  flex-shrink: 0;
  position: relative;
}

.popup_wrap .left img {
  position: absolute;
  top:  0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}

.popup_wrap .coupon {
  z-index: 1;
  position: relative;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.popup_wrap .row {
  padding: 0.186667rem 0.266667rem;
}

.popup_wrap .text {
  z-index: 1;
  position: relative;
  font-size: 0.32rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  width: 100%;
  color: rgba(255, 255, 255, 1);
  line-height: 0.32rem;
  margin-bottom: 0.2rem;
}

.popup_wrap .right {
  box-shadow: 0rem 0.053333rem 0.106667rem 0rem rgba(0, 0, 0, 0.09);
}

.coupon .little {
  font-size: 0.426667rem;
}

.coupon .big {
  font-size: 0.96rem;
  line-height: 0.96rem;
  left: -0.08rem;
  position: relative;
}

.popup_wrap .detail {
  height: 100%;
  padding: 0.266667rem;
  position: relative;
  overflow: hidden;
}

.popup_wrap .list_wrap {
  overflow: auto;
  width: 100%;
}

.popup_wrap .between {
  margin-top: 0;
}

.popup_wrap .cpn_type {
  width: 1.32rem;
  height: 0.426667rem;
  line-height: 0.426667rem;
  text-align: center;
  color: white;
  flex-shrink: 0;
  border-radius: 0.213333rem;
  font-size: 0.266667rem;
}

.popup_wrap .color_1 .cpn_type {
  background: rgba(155, 73, 195, 1);
}

.popup_wrap .color_1 .use_now {
  color: white;
  background: linear-gradient(90deg, #d999f5, rgba(155, 73, 195, 1) 100%);
}

.popup_wrap .color_1 .pick_now {
  color: rgba(155, 73, 195, 1);
  border: 0.026667rem solid rgba(155, 73, 195, 1);
}

.popup_wrap .color_1 .cpn_type {
  background: rgba(155, 73, 195, 1);
}

.popup_wrap .color_2 .cpn_type {
  background: #4d7ae8;
}

.popup_wrap .color_2 .use_now {
  color: white;
  background: #4d7ae8
}
.popup_wrap .color_2 .pick_now {
  color: #4d7ae8;
  border: 0.026667rem solid #4d7ae8;
}

.popup_wrap .color_3 .pick_now {
  color: #4bc489;
  border: 0.026667rem solid #4bc489;
}

.popup_wrap .color_3 .cpn_type {
  background: #4bc489;
}

.popup_wrap .color_3 .use_now {
  color: white;
  background: #4bc489
}

.popup_wrap .color_4 .use_now {
  color: white;
  background: #ea8033;
}
.popup_wrap .color_4 .pick_now {
  color: #ea8033;
  border: 0.026667rem solid #ea8033;
}
.popup_wrap .color_4 .cpn_type {
  background: #ea8033;
}
.popup_wrap .cpn_name {
  margin-left: 0.2rem;
  font-size: 0.373333rem;
  height: 0.426667rem;
  line-height: 0.426667rem;
  font-weight: 600;
  color: black;
}

.popup_wrap .use_now,
.popup_wrap .pick_now {
  width: 1.586667rem;
  height: 0.533333rem;
  border-radius: 0.266667rem;
  font-size: 0.266667rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  line-height: 0.48rem;
  text-align: center;
  position: absolute;
  bottom: 0.12rem;
  right: 0.266667rem;
}

.detail img {
  position: absolute;
  width: 1.76rem;
  height: 1.76rem;
  top: -0.52rem;
  right: -0.226667rem;
}

.popup_wrap .cpn_time {
  font-size: 0.266667rem;
  color: rgba(74, 74, 74, 1);
}
.between{
  justify-content: space-between;
}
/* 优惠券相关结束 */
</style>
