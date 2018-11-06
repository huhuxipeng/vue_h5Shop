<template>
  <div class="goods-detail-page">
    <!--<commonTop header-type="5" :xianshicar="true" header-class="bg-none" has-back="true" ></commonTop>、-->
    <!-- 静态banner展示 -->
    <!--<app-banner :listImg="listImgA"></app-banner>-->
    <mt-swipe :auto="5000" class="banner" style='height:10rem;'>
      <mt-swipe-item v-for="(item,index) in listImgA">
        <img :src="item.image | filterss(1)" :onerror="logo" style="width: 100%;height: 100%;" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="wrap">
      <div class="row">
        <div class="left">
          <span class="new_price">
            <em>￥</em>{{Number(detail.price).toFixed(2)}}</span>
          <!--<u class="old_price">￥{{Number(detail.mktprice).toFixed(2)}}</u>-->
        </div>
        <div class="right">
          <span class="gray">已售{{buyCount}}件</span>
        </div>
      </div>
      <div class="row detail_name">{{detail.name}}</div>
      <!-- 商品标签 折扣 新品 爆款 -->
      <div class="flex" v-if="detail.tagName">
        <div class="tag_name" v-for="val in detail.tagName">{{val}}</div>
      </div>
    </div>
    <!--<div class="wrap">-->
    <!--<div class="row">-->
    <!--<div class="left">-->
    <!--<b class="bold">积分福利</b>-->
    <!--</div>-->
    <!--<div class="right flex" @click="mystore" v-if="!shows">-->
    <!--<span class="orange">我要推广</span>-->
    <!--<div class="more"></div>-->
    <!--</div>-->
    <!--<div class="right flex" @click="goto" v-if="shows">-->
    <!--<span class="orange">成为店长</span>-->
    <!--<div class="more"></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="row" v-if="details[0]" >-->
    <!--<div class="left" style="width:auto;">-->
    <!--<div class="point_ratio">自购赠送</div>-->
    <!--</div>-->
    <!--<div class="right text" style="flex-grow:1;">-->
    <!--红积分：{{detail.profit*details[0].redPointRatio| strings}}; &lt;!&ndash;黄积分：{{detail.profit*details[0].yellowPointRatio| strings}};&ndash;&gt; 云积分：{{detail.price*details[0].cloudPointRatio| strings}}-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="row" v-if="details[0]">-->
    <!--<div class="left" style="width:auto;">-->
    <!--<div class="point_ratio">推广赠送</div>-->
    <!--</div>-->
    <!--<div class="right text" style="flex-grow:1;">-->
    <!--红积分：{{detail.profit*details[0].ExtensionRedPointRatio| strings}}; &lt;!&ndash;黄积分：{{detail.profit*details[0].ExtensionYellowPointRatio| strings}};&ndash;&gt; 云积分：{{detail.price*details[0].ExtensionCloudPointRatio| strings}}-->
    <!--</div>-->
    <!--</div>-->

    <!--</div>-->
    <!-- <section class="short-info">
			<p class="overseas" v-if='detail.goodsType==1'>海外购</p>

			<div class="clear">
				<section class="fl">
					<span>
						<em>￥</em>{{Number(detail.price).toFixed(2)}}</span>
					<u>￥{{Number(detail.mktprice).toFixed(2)}}</u>
					<u class="sendTips">包邮（偏远地区除外）</u>
				</section>
				<div class="fr points">
					<p>红积分：{{detail.comId==0?detail.profit*details[0].redPointRatio:'0.00' |strings}}<br />黄积分：0.00</p>
					<a @click="mystore">
						<i class="icons spread-icon" v-if="!shows"></i>
						<em v-if="!shows">我要推广</em>
					</a>
					<a>
						<span class="shopmanager" :class="{}" @click="goto" v-if="shows">成为店长</span>

					</a>
				</div>
			</div>
		</section> -->
    <!-- <section class="sel-spec-bar" v-on:click="showBuy">请选择颜色分类
			<u class="icons"></u>
		</section> -->
    <!--<div class="row" @click="showBuy">-->
    <!--<div class="left">-->
    <!--请选择颜色分类-->
    <!--</div>-->
    <!--<div class="right flex">-->
    <!--<div class="more"></div>-->
    <!--</div>-->
    <!--</div>-->
    <ul class="tag clear" v-if="detail.ensureTagName!=null">
      <li v-for="item in detail.ensureTagName">
        <span class="icons"></span>{{item}}</li>
    </ul>
    <!-- <ul class="sell clear" v-if="detail.tagName!=null">
			<li v-for="val in detail.tagName">{{val}}</li>
		</ul> -->
    <!--<div class="storeBar">-->
    <!--<img :src="storeData.shopStoreLogo |filterss(3)" :onerror="logo" v-if="imgs">-->
    <!--<img src="../common/image/ziying.png" v-if="!imgs" />-->
    <!--<label>-->
    <!--<h2 v-if="imgs">{{storeData.shopStoreName}}</h2>-->
    <!--<h2 v-if="!imgs">巨柚自营旗舰店</h2>-->
    <!--<p v-if="imgs">已交保证金-->
    <!--<span style="color:red;">￥{{bond}}</span>元，请放心购买</p>-->

    <!--</label>-->
    <!--<router-link :to="{ path: '/goods/store?goodsId='+this.$route.query.goodsId,}" class="btn normal-btn red-btn btn-inStore" v-if="imgs">进入店铺</router-link>-->
    <!--</div>-->
    <section>
      <goodsDetailTab tab-value="1" :intro ="detail.intro"></goodsDetailTab>
      <!-- <div class="descript"> -->
        <!-- <section class="desc-pic">
          <img :src="goodsPic" :onerror="logo">
        </section> -->
        <!-- <article class="desc-article" v-html="detail.intro"> -->
          <!-- <h2>价格说明</h2>
          <p><font style="color:#000">划线价格：</font>指商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</p>
          <p>&nbsp;</p>
          <p><font style="color:#000">划线价格：</font>指商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</p> -->
        <!-- </article> -->
      <!-- </div> -->
    </section>
    <!--推广成功弹窗-->
    <mt-popup popup-transition="popup-fade" v-model="popu">
      <div class="success">
        <p>已添加到个人中心</p>
        <p>可到"个人中心-我的商品"中查看</p>
      </div>
    </mt-popup>
    <mt-popup v-model="popupPhone" position="center">
      <div class="mint-msgbox" style="width:8rem;height:3.5rem;">

        <div class="mint-msgbox-header">
          <div class="mint-msgbox-title">提示</div>
        </div>
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-message">
            是否拨打电话：{{phoneNum}}？
          </div>

        </div>

        <div class="mint-msgbox-btns" style="justify-content: space-around;">
          <a @click="popupPhone=false" style="width:50%;text-align:center;">取消</a>
          <a :href=telPhoneNum style="color:#26a2ff;width:50%;text-align:center;">确定</a>
        </div>
      </div>
    </mt-popup>
    <div class="footer row">
      <!--<div @click="goShop" class="shop">-->
        <!--<u></u>-->
        <!--<div>店铺</div>-->
      <!--</div>-->
      <a :href=telPhoneNum>
        <div class="custom">
          <u></u>
          <div>客服</div>
        </div>
      </a>
      <!--<div @click="collect" class="collect" :class="{active:isCollect}">-->
      <!--<u></u>-->
      <!--<div>收藏</div>-->
      <!--</div>-->
      <!--<div class="add_car" v-on:click="showCar" v-if="detail.store>0">加入购物车</div>-->
      <div class="buy_now" v-on:click="showBuy" v-if="detail.store>0">立即购买</div>
    </div>
    <div class="goods-footer-top"></div>
    <!-- <footer class="goods-footer-buy clear">
			<span class="service" @click="chat">
				<u class="icons"></u>
				<p>客服</p>
			</span>
			<span class="collect" @click="collect">
				<u class="collect"></u>
				<p @click="collect">收藏</p>
			</span>
			<i class="addCar" v-on:click="showCar" v-if="detail.store>0">加入购物车</i>
			<i class="buyNow" v-on:click="showBuy" v-if="detail.store>0">立即购买</i>
			<span class="export" v-if="detail.store==0">已告罄</span>
		</footer> -->
    <!--<div v-if="carShow">-->
    <!--<goodsFooterBuy :is-show="layerShow" :car-show="carShow" @hide-buy="hideLayer" :shopdetai='details'></goodsFooterBuy>-->
    <!--</div>-->
    <div v-if="buyShow">
      <goodsShopFooterBuy :is-show="layerShow" :buy-show="buyShow" @hide-buy="hideLayer" :shopdetai='details'></goodsShopFooterBuy>
    </div>
    <!--<mt-popup popup-transition="popup-fade" position="center" v-model='binding' closeOnClickModal>-->
      <!--<div class="bindingmobile">-->
        <!--<p>欢迎登录</p>-->
        <!--<p>-->
          <!--<u class="icons name-icon"></u>-->
          <!--<input type="text" placeholder="手机号" v-model="mobile" class="input">-->
        <!--</p>-->
        <!--<p>-->
          <!--<u class="icons pw-icon"></u>-->
          <!--<input type="number" placeholder="请输验证码" v-model="codes" class="input">-->
          <!--<i class="btn codebtn" @click="gaincodes">获取验证码</i>-->
        <!--</p>-->
        <!--<p @click="bidingmobile">确认登录</p>-->
      <!--</div>-->
    <!--</mt-popup>-->

  </div>
</template>
<script>
  import commonTop from "../components/commonTop";
  import goodsShopFooterBuy from "../components/goodsShopFooterBuy";
  import goodsDetailTab from "../components/goodsDetailTab";
  import wx from "weixin-js-sdk";
  import { Swipe, SwipeItem, MessageBox } from "mint-ui";
  export default {
    data() {
      return {
        msg: "商品详情页面",
        detailId: "",
        detail: [],
        buyCount:0,
        details: [],
        popupPhone: false,
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
        states: true
      };
    },
    created() {
      window.scrollTo(0, 0);
    },
    mounted: function() {


      this.identityId = JSON.parse(sessionStorage.getItem("identityId"));
      this.detailId = this.$route.query.goodsId;
      if (this.detailId) {
        this.detailId = this.$route.query.goodsId;
      } else {
        this.detailId = JSON.parse(sessionStorage.getItem("detail"));
      }
      //  	this.detailId=JSON.parse(sessionStorage.getItem('detail'))
      this.token = sessionStorage.getItem("token");

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

      // var agent = navigator.userAgent.toLowerCase();
      // if (agent.match(/MicroMessenger/i) == "micromessenger") {
      //   console.log("是微信浏览器");
      //   if (sessionStorage.token == null) {
      //     this.wxlogin();
      //   }
      // } else {
      //   // return false
      //   // if(sessionStorage.token==null){
      //   //   this.$router.push('/login')
      //   // }
      //   // alert('请在微信中打开。。。')
      // }

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
              this.phoneNum = 400-6199-669;
            }
            this.telPhoneNum = "tel:" + this.phoneNum;
            let reg = (reg = /jyimg:\//g);
            var str = this.detail.intro.replace(
              reg,
              "https://jymall.oss-cn-beijing.aliyuncs.com/"
            );
            this.detail.intro = str;
            this.share()
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

    methods: {

      //分享
      share() {
        let us = window.location.href.split("#")[0];
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
        var url = that.filters.filterss(that.detail.image)
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
          let obj = {
            title: that.detail.name, // 分享标题
            // desc: that.participateDetails.shareDescribe,
            desc: "品类齐全、品质保障，正品低价、快速配送，拼团砍价、优惠多多......",

            // link: 'http://test.cheertea.com/?#/group/grouptimes?spellId=' +that.$route.query.spellId+'&activityId='+that.$route.query.activityId,
            link:"http://" +
            that.$urlstate.url +
            "/?#/goods/detail?"+
            "goodsId=" +
            that.detail.goodsId,
            imgUrl:url, // 分享图标

            success: function(res) {
              console.log(res);
              // alert("微信接口調用成功")
            },
            cancel: function(err) {
              console.log(err);
            }
          };

          wx.onMenuShareAppMessage(obj);
          wx.onMenuShareTimeline(obj);
          wx.onMenuShareQQ(obj);
          wx.onMenuShareQZone(obj);
        });
      },

      //wxlogin
      // wxlogin() {
      //   var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      //   var r = window.location.search.substr(1).match(reg);
      //   let token = sessionStorage.getItem("token");
      //
      //   if (token == null) {
      //     if (r == null) {
      //       location.href =
      //         "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      //         this.$urlstate.appid +
      //         "&redirect_uri=https%3a%2f%2f" +
      //         this.$urlstate.url +
      //         "%2f%23%2fgoods%2fdetail%3fgoodsId%3d" +
      //         this.$route.query.goodsId +
      //         "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
      //     } else {
      //       this.$axios({
      //         method: "post",
      //         url: "/basics/anon/appWxAuth",
      //         responseType: "json",
      //         data: {
      //           code: r[2],
      //           reqType: 0
      //         }
      //       })
      //         .then(data => {
      //           console.log(data);
      //           sessionStorage.details = JSON.stringify(data.data.res_data);
      //           if (data.data.res_data.member) {
      //             sessionStorage.details = JSON.stringify(
      //               data.data.res_data.member
      //             );
      //             sessionStorage.token = data.data.res_data.token;
      //           }
      //           if (data.data.res_data.returnCode == 0) {
      //             this.binding = true;
      //           }
      //         })
      //         .catch(err => {
      //           console.log(err);
      //         });
      //     }
      //   }
      // },

      nos() {
        alert("暂未开放，敬请期待");
      },

      hideLayer: function(val) {
        this.layerShow = val;
        this.carShow = val;
        this.buyShow = val;
      },
      goShop() {
        //进入店铺~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.$router.push({
          path: "/goods/store",
          query: {
            goodsId: this.$route.query.goodsId
          }
        });
      },
      // collect() {
      //   //收藏
      //   // if (!sessionStorage.getItem("token")) {
      //   //   // sessionStorage.setItem("needBack", true);
      //   //   sessionStorage.pgths='/goods/detail?goodsId='+this.detailId
      //   //   this.$router.push("/login");
      //   //   return;
      //   // }
      //   var isPintuan=this.$route.query.isPintuan;
      //   this.$axios({
      //     method: "post",
      //     url: "/goods/collectGoods",
      //     responseType: "json",
      //     data: {
      //       token: sessionStorage.getItem("token"),
      //       flag: this.isCollect,
      //       goodsType: 0,
      //       currencyId:this.detail.goodsId
      //     }
      //   })
      //     .then(data => {
      //       console.log(JSON.parse(JSON.stringify(data)));
      //       if (data.data.res_code == 0) {
      //         this.isCollect =
      //           data.data.res_data.isCollect == "yes" ? true : false;
      //       }
      //       MessageBox('提示',data.data.res_info);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // },
      showCar: function() {
        this.layerShow = true;
        this.carShow = true;
        this.buyShow = false;
        document.body.style.height = "100%"
        document.body.style.overflow = "hidden"
      },
      showBuy: function() {
        this.layerShow = true;
        this.carShow = false;
        this.buyShow = true;
        document.body.style.height = "100%"
        document.body.style.overflow = "hidden"
      },

      //去往购物车列表页
      // goCar() {
      //   this.$router.push("/shoppingCart/list");
      // },
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
      chat() {
        this.popupPhone = true;
        // this.$router.push({
        //   path: "/consult",
        //   query: { outId: this.detail.comId }
        // });
      },
      // bidingmobile() {
      //   if (this.states) {
      //     this.states = false;
      //     var member = JSON.parse(sessionStorage.details);
      //     console.log(member);
      //     let obj = {
      //       authType: 1,
      //       face: member.face,
      //       memberStatus: member.memberStatus,
      //       mobile: this.mobile,
      //       mobileCode: this.codes,
      //       nickname: member.nickname,
      //       openId: member.openId,
      //       sex: member.sex,
      //       subscribe: member.subscribe,
      //       type: 8,
      //       unionId: member.unionId
      //     };
      //     this.$axios({
      //       method: "post",
      //       url: "/basics/anon/loginAuthorizedCode",
      //       responseType: "json",
      //       data: obj
      //     })
      //       .then(data => {
      //         console.log(data);
      //         if (data.data.res_code == 0) {
      //           this.binding = false;
      //           sessionStorage.details = JSON.stringify(
      //             data.data.res_data.member
      //           );
      //           sessionStorage.token = data.data.res_data.token;
      //         } else {
      //           alert(data.data.res_info);
      //           this.states = true;
      //         }
      //
      //         if (data.data.res_data.member.subscribe != 1) {
      //           sessionStorage.clear();
      //           localStorage.clear();
      //           sessionStorage.numberss = 3;
      //           this.code = true;
      //         }
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });
      //   }
      // },
      gaincodes() {
        console.log(111);
        let token = sessionStorage.getItem("token");
        if (this.clicks == false) {
          return false;
        }

        var reg = /^1[3|5|8|7|9][0-9]\d{8}$/;
        console.log(reg.test(this.mobile));
        if (!reg.test(this.mobile)) {
          alert("号码不正确");
        } else {
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
        }
      }
    },
    components: {
      //    'app-banner': banner,
      commonTop: commonTop,
      goodsShopFooterBuy: goodsShopFooterBuy,
      goodsDetailTab: goodsDetailTab
    }
  };
</script>
<style lang="scss" scoped="scoped">
  .shopmanager {
    padding: 5px;
    font-size: 0.3rem;
    color: white;
    background: orangered;
    border-radius: 20px;
  }
   .buy_now{
     width: 8.3rem;
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
      width: 4.3rem;
    }
  }
</style>
