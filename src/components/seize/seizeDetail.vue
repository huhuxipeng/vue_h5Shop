<template>
  <div id="groupdetail">
    <mt-header title="商品详情" class='centers'>
      <mt-button icon="back" @click="backgo" slot="left" style="padding-left: .2rem"></mt-button>
    </mt-header>
    <mt-swipe :auto="5000" class="banner" style='height:10rem;'>
      <mt-swipe-item>
        <img :src="details.image |filterss(1)" :onerror="logo" style="width: 100%;height: 100%;" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="Time" v-if="seize">
      <img src="../../common/image/seize/TimeSeize.png" alt="">
      <div class="right_message">
        <p>距离结束还剩：</p>
        <p class="time_daoji">
          <span><!--{{"1530944981999" | settime1}}-->18:22:30</span>
        </p>
      </div>
    </div>
    <section class="short-info">
      <div class="clear">
        <!--<section class="fl">-->
          <!--<span>-->
            <!--<em>￥</em>{{Number(details.spellPrice).toFixed(2)}}</span>-->
          <!--<u>￥{{details.goodsPrice}}</u>-->
          <!--<span>{{details.num}}人拼团</span>-->
        <!--</section>-->
        <p class="now_price">
          <span>¥6999.00</span>
          <section>新品</section>
          <section class="price_active">折扣</section>
          <section>爆品</section>
        </p>
        <p class="before_price">¥7999.00</p>
        <p class="shopname">
          <!--<em><img src="../../common/image/group/labelgroup.png" :onerror="logo" /></em>-->
          <span>{{details.goodsTitle}} </span>
        </p>
        <div class="wran">
          <p>
            <span>包邮（偏远地区除外）</span>
            <span>已售{{details.alreadyNum}}件</span>
          </p>
          <!--<p>{{details.goodsDescribe}}</p>-->
        </div>
      </div>
    </section>
    <div class="select">
      <mt-cell title="请选择颜色分类" is-link class="link_cell"></mt-cell>
      <mt-cell title="领券" is-link class="link_cell">
        <p>满90立减10</p>
        <p>满99立减10</p>
      </mt-cell>
      <div class="select_bottom">
        <div class="bottom_item fiest">
          <img src="../../common/image/seize/commoditydetails_ico_guarantee.png" alt="">
          <span>正品保障</span>
        </div>
        <div class="bottom_item">
          <img src="../../common/image/seize/commoditydetails_ico_compensate.png" alt="">
          <span>假一赔十</span>
        </div>
        <div class="bottom_item">
          <img src="../../common/image/seize/commoditydetails_ico_exchange.png" alt="">
          <span>无忧退换货</span>
        </div>
        <div class="bottom_item">
          <img src="../../common/image/seize/commoditydetails_ico_lightningshipments.png" alt="">
          <span>闪电发货</span>
        </div>
      </div>
    </div>

    <div class="storeBar">
      <img :src="details.shopStoreLogo |filterss(4)" :onerror="logo" v-if="imgs">
      <img src="../../common/image/ziying.png" :onerror="logo" v-if="!imgs" />
      <label>
        <h2 v-if="imgs">{{details.shopStoreName}}</h2>
        <h2 v-if="!imgs">巨柚自营旗舰店</h2>
        <p v-if="!imgs">已交保证金
          <span style="color:red;">￥{{details.bond}}</span>元，请放心购买</p>
      </label>

      <router-link :to="{ path:'/goods/store'}" class="btn normal-btn red-btn btn-inStore" v-if="!imgs">进入店铺
      </router-link>
    </div>
    <section>
      <goodsDetailTab tab-value="1" :intro="details.goodsIntro"></goodsDetailTab>
      <!-- <div class="descript">
        <article class="desc-article pimg" v-html="details.goodsIntro"> -->
          <!--<img src="../../common/image/icons.png" :onerror="logo" />-->
        <!-- </article>
      </div> -->
    </section>
    <div class="footer row">
      <!-- <div @click="goShop" class="shop">
				<u></u>
				<div>店铺</div>
			</div> -->
      <a :href=telPhoneNum>
        <div class="custom">
          <u></u>
          <div>客服</div>
        </div>
      </a>
      <div class="shopcar" @click="goCar">
        <u></u>
        <div>购物车</div>
      </div>
      <div @click="collect" class="collect" :class="{active:isCollect}">
        <u></u>
        <div>收藏</div>
      </div>
      <div class="tuanPromt">
        <span>开抢提醒</span>
      </div>
    </div>
    <!-- <footer class="goods-footer-buy clear">
			<span class="service" @click="chat">
				<u class="icons"></u>
				<p>客服</p>
			</span>
			<span class="car" @click="goCar">
				<u class="icons"></u>
				<p>购物车</p>
			</span>
			<i class="addCar" style="line-height: 1.4;font-size: .4rem;" @click="aloneby">
				<em>￥{{details.goodsPrice}}</em><br/>单独购买</i>
			<i class="buyNow" style="line-height: 1.4;font-size: .4rem;" @click="oncegroup">
				<em>￥{{details.spellPrice}}</em><br/>立即拼团</i>
		</footer> -->

    <!--弹框-->
    <mt-popup popup-transition="popup-fade" v-model="more">
      <div class="mores">
        <p class="top">正在拼团
          <span @click="clearmore"><img src="../../common/image/appraise/back.png" /></span>
        </p>
        <ul class='bargainmorelist'>
          <li v-for="(item,index) in Ongoing" v-if='item.show'>
            <div class="left">
              <img :src="item.originatorFace |filterss(4)" :onerror="logo" />
              <p>
                <span>{{item.originatorName}}</span>
                <span>还差{{item.completeNum-item.participateNum}}人</span><br/>
                <span>剩余{{item.endDate | settime1}}结束</span>
              </p>
            </div>
            <div class="right">
              <p @click="joingroup(item)">去拼团</p>
            </div>
          </li>
          <!--<li>-->
          <!--<div class="left">-->
          <!--<img :src="logo" :onerror="logo" />-->
          <!--<p>-->
          <!--<span>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>-->
          <!--<span>还差100000人</span><br />-->
          <!--<span>剩余22：22：22结束</span>-->
          <!--</p>-->
          <!--</div>-->
          <!--<div class="right">-->
          <!--<p @click="joingroup(item)">去拼团</p>-->
          <!--</div>-->
          <!--</li>-->
        </ul>
      </div>
    </mt-popup>
    <mt-popup popup-transition="popup-fade" v-model="gogroup">
      <div class="gogroups">
        <p class="top">参与拼团
          <span @click="clearmore"><img src="../../common/image/appraise/back.png" /></span>
        </p>
        <p>仅剩
          <em>{{groups.completeNum-groups.participateNum}}</em>个名额，{{groups.endDate | settime1}}后结束</p>
        <p>
          <span v-for='(item,index) in groups.participateDetails' style="width: 1.3rem;height: 1.3rem;">
            <i v-if="index==0">拼主</i><img :src="item.face |filterss(4)" :onerror="logo" /></span>
        </p>
        <p @click="joingroups">参与拼团</p>
      </div>

    </mt-popup>
    <!--分类-->
    <mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' closeOnClickModal>
      <div id="wrap">
        <!--关闭按钮-->
        <p class="back" @click="close"><img src="../../common/image/qrcodeimg/close.png" slot="icon" /></p>
        <!--弹框内容-->
        <div class="content">
          <div class="conten">
            <p class="productImg"><img :src="details.image |filterss(3)" :onerror="logo" /></p>
            <p class="title">{{details.goodsName}}</p>
            <p class="money">￥{{Number(details.spellPrice).toFixed(2)}}</p>
          </div>
          <div v-if="goodsSpecList!=null">
            <div class="category" v-for="(item,index) in goodsSpecList">
              <p style="font-size:.4rem;">{{item.specName}}</p>
              <ul class="cate">
                <li  v-for="(child,key) in item.detail" :class="{'cols':child.show}" @click="stand(child,index,key)">
                  {{child.specValue}}
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div class="footers">
          <p class="buynows" style="width:100%" @click="goshop">确定</p>
        </div>
      </div>
    </mt-popup>
    <!--规则-->
    <mt-popup popup-transition="popup-fade" position="center" v-model='poprule' class='popups' closeOnClickModal>
      <div class="popcontent">
        <p class="back" @click="clears"><img src="../../common/image/appraise/back.png" /></p>
        <div class="details">
          <p>活动规则</p>
          <ul>
            <li v-for="item in ruless">{{item}}</li>
          </ul>
        </div>
      </div>
    </mt-popup>
    <mt-popup popup-transition="popup-fade" position="center" v-model='binding' closeOnClickModal>
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
  </div>
</template>

<script>
  import goodsDetailTab from "../../components/goodsDetailTab";
  import { MessageBox } from "mint-ui";
  import wx from "weixin-js-sdk";
  // import wxlogin from '../../common/wxlogin'
  export default {
    data() {
      return {
        seize:true,
        logo: 'this.src="' + require("../../common/image/defaultimg.png") + '"',
        imgs: true,
        more: false,
        mobile: "",
        codes: '',
        gogroup: false,
        Ongoing: [],
        details: {},
        Ongoings: [],
        popupVisible: false,
        shopdetai: [],
        product: [],
        matchProductId: "",
        isCollect: false, //是否收藏
        goodsSpecList: "",
        phoneNum: "",
        telPhoneNum: "tel:" + "",
        selSpecObj: [],
        selSpecArr: [],
        sortSelSpecArr: [],
        binding: false,
        groups: [],
        poprule: false,
        ruless: [],
        storeData: ""
      };
    },
    created() {
      window.scrollTo(0, 0);
      var agent = navigator.userAgent.toLowerCase();
      if (agent.match(/MicroMessenger/i) == "micromessenger") {
        // if (sessionStorage.numberss == '3') {
        //   this.login();
        // } else {
        if (sessionStorage.getItem("token") == null) {
          this.login();
          // }

        }
      }
    },
    components: {
      goodsDetailTab: goodsDetailTab
    },
    filters: {
      settime1: function(timestamp) {
        let self = this;
        let nowTime = new Date();
        let endTime = new Date(timestamp);
        let t = timestamp - nowTime.getTime();

        if (t > 0) {
          let day = Math.round(t / 86400000);
          let hour = Math.floor(t / 3600000);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";
          if (day > 0) {
            format = `${hour}:${min}:${sec}`;
          }
          if (day <= 0 && hour > 0) {
            format = `${hour}:${min}:${sec}`;
          }
          if (day <= 0 && hour <= 0) {
            format = `${"00"}:${min}:${sec}`;
          }
          alert(format)
          return format;
        }
      }
    },
    mounted() {
      // var agent = navigator.userAgent.toLowerCase();
      // alert(agent.match(/MicroMessenger/i))
      // alert(sessionStorage.token)
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

      // sessionStorage.removeItem("spellId");
      // this.identityId = JSON.parse(sessionStorage.getItem("identityId"));
      // this.detailId = this.$route.query.activityId;
      // if (this.detailId) {
      //   this.detailId = this.$route.query.activityId;
      // } else {
      //   this.detailId = JSON.parse(sessionStorage.getItem("detail"));
      // }
      // this.token = sessionStorage.getItem("token");
      // var agent = navigator.userAgent.toLowerCase();
      // if (agent.match(/MicroMessenger/i) == "micromessenger") {
      //   console.log("是微信浏览器");
      //   if (sessionStorage.token == null) {
      //     alert("调用wxlogin方法")
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
        url: "/spell/anon/getActivityDetails",
        responseType: "json",
        data: {
          activityId: this.$route.query.activityId,
          token: sessionStorage.token
        }
      })
        .then(data => {
          let gettime = new Date().getTime();
          if (data.data.res_data.Ongoing != null) {
            this.Ongoing = data.data.res_data.Ongoing;
            for (let i = 0; i < this.Ongoing.length; i++) {
              if (this.Ongoing[i].endDate != null) {
                if (this.Ongoing[i].endDate - gettime > 0) {
                  this.Ongoing[i]["show"] = true;
                  let that = this;
                  this.Ongoing[i].endDate = this.Ongoing[i].endDate;

                  let times = setInterval(function() {
                    that.Ongoings[i].endDate -= 1;
                    if (that.Ongoings[i].endDate < 0) {
                      that.Ongoing[i]["show"] = false;
                      clearInterval(times);
                    }
                  }, 1000);
                }
              }
            }
            if (this.Ongoing.length < 5) {
              this.Ongoings = this.Ongoing;
            } else if (this.Ongoing.length > 4) {
              this.Ongoings = this.Ongoing.slice(0, 5);
            } else {
            }
          }
          this.details = data.data.res_data;
          this.ruless = this.details.rules;
          let a = this.ruless.split("\r\n");
          this.ruless = a.splice(0, a.length);
          // console.log(JSON.parse(JSON.stringify(data)));
          this.isCollect = data.data.res_data.flag;
          if (data.data.comTel) {
            this.phoneNum = data.data.comTel;
          } else if (data.data.comMobile) {
            this.phoneNum = data.data.comMobile;
          } else {
            this.phoneNum = 400-6199-669;
          }
          this.telPhoneNum = "tel:" + this.phoneNum;
          sessionStorage.detail = this.details.goodsId;



          let reg = (reg = /jyimg:\//g);
          if (this.details.goodsIntro) {
            var str = this.details.goodsIntro.replace(
              reg,
              "https://jymall.oss-cn-beijing.aliyuncs.com/"
            );
            this.details.goodsIntro = str;
          }

          if (data.data.shopStore) {
            this.storeData = data.data.shopStore;
            this.imgs = true;
          } else {
            this.imgs = false;
          }
          this.share();
        })
        .catch(err => {
          console.log(err);
        });
    },
    methods: {
      // 分享
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
            console.log(data)
            let datas = data.data.res_data.sign_info;
            // console.log(datas)
            this.wxInit(datas);
          })
          .catch(err => {
            console.log(err);
          });
      },
      wxInit(res) {
        let that = this;
        var url = that.filters.filterss(that.details.image);
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
            title: that.details.name, // 分享标题
            // desc: that.participateDetails.shareDescribe,
            desc: "品类齐全、品质保障，正品低价、快速配送，拼团砍价、优惠多多......",

            // link: 'http://test.cheertea.com/?#/group/grouptimes?spellId=' +that.$route.query.spellId+'&activityId='+that.$route.query.activityId,
            link:"http://" +
            that.$urlstate.url +
            "/?#/group/groupdetail?"+
            "activityId=" +
            that.details.activityId,
            imgUrl: url, // 分享图标
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

      // wxlogin
      login() {
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        // alert(r[2])
        let token = sessionStorage.getItem("token")

        if (token == null) {
          // alert(this.$urlstate.appid)
          // alert(this.$urlstate.url)
          // if (sessionStorage.numberss == '3') {
          //   sessionStorage.removeItem('numberss');
          //   location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.$urlstate.appid + '&redirect_uri=https%3a%2f%2f' + this.$urlstate.url + '%2f%23%2f&response_type=code&scope=snsapi_userinfo#wechat_redirect'
          // }
          if (r == null) {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
              + this.$urlstate.appid + '&redirect_uri=https%3a%2f%2f'
              + this.$urlstate.url+
              "%2f%23%2fgroup%2fgroupdetail%3factivityId%3d" +
              this.$route.query.activityId +
              "&response_type=code&scope=snsapi_userinfo#wechat_redirect"
          } else {
            this.$axios({
              method: 'post',
              url: '/basics/anon/appWxAuth',
              responseType: 'json',
              data: {
                code: r[2],
                reqType: 0
              }
            }).then(data => {
              // alert(JSON.stringify(data))
              console.log(data)
              sessionStorage.details = JSON.stringify(data.data.res_data);
              if (data.data.res_data.member) {
                sessionStorage.details = JSON.stringify(data.data.res_data.member)
                sessionStorage.token = data.data.res_data.token
              }
              // if (data.data.res_data.returnCode == 0) {
              //   this.binding = true;
              // }
            }).catch(err => {
              console.log(err)
            })

          }
        }
      },
      collect() {
        //收藏
        if (!sessionStorage.getItem("token")) {
          // sessionStorage.setItem("needBack", true);
          sessionStorage.pgths = "/group/groupdetail?activityId="+this.details.activityId;
          // sessionStorage.pgths = "/goods/detail?goodsId=" + this.details.goodsId;
          this.$router.push("/login");
          return;
        }
        this.$axios({
          method: "post",
          url: "/goods/collectGoods",
          responseType: "json",
          data: {
            token: sessionStorage.getItem("token"),
            // goodsId: this.details.goodsId,
            currencyId: this.details.activityId,
            flag: this.isCollect,
            goodsType: 2
          }
        })
          .then(data => {
            console.log(JSON.parse(JSON.stringify(data)));
            if (data.data.res_code == 0) {
              this.isCollect =
                data.data.res_data.isCollect == "yes" ? true : false;
            }
            MessageBox('提示',data.data.res_info)
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
                // alert(data.data.res_info);
                this.states = true;
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
            });
        }
      },


      close() {
        this.popupVisible = false;
        this.selSpecObj.splice(0, this.selSpecObj.length);
        this.selSpecArr.splice(0, this.selSpecArr.length);
      },
      backgo() {
        this.$router.go(-1);
      },
      lookmore() {
        this.more = true;
        let that = this;
        let gettime = new Date().getTime();
        for (let i = 0; i < this.Ongoing.length; i++) {
          if (this.Ongoing[i].endDate != null) {
            if (this.Ongoing[i].endDate - gettime > 0) {
              let time = setInterval(function() {
                that.Ongoing[i].endDate -= 1;
                if (that.Ongoing[i].endDate == 0) {
                  clearInterval(time);
                }
              }, 1000);
            }
          }
        }
      },
      explain() {
        this.poprule = true;
      },
      clears() {
        this.poprule = false;
      },
      clearmore() {
        this.more = false;
        this.gogroup = false;
      },
      joingroup(val) {
        this.gogroup = true;
        this.groups = val;
        sessionStorage.spellId = val.spellId;
      },
      //客服
      chat() {
        //				this.$router.push('/consult');
        this.$router.push({
          path: "/consult",
          query: {
            outId: this.details.comId
          }
        });
      },
      goCar() {
        this.$router.push("/shoppingCart/list");
      },
      //单独购买
      aloneby() {
        this.$router.push({
          path: "/goods/detail",
          query: {
            goodsId: this.details.goodsId,
            isPintuan: true
          }
        });
      },
      oncegroup() {
        this.popupVisible = true;
        this.specification();
      },
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
      },
      specification() {
        this.$axios({
          method: "post",
          url: "/goods/anon/queryProductList",
          responseType: "json",
          data: {
            goodsId: this.details.goodsId
          }
        })
          .then(data => {
            this.shopdetai = data.data.res_data.goodsSpecList;
            this.product = data.data.res_data.productList;
            if (this.shopdetai[0].detail) {
              this.goodsSpecList = this.shopdetai;
              for (let i = 0; i < this.goodsSpecList.length; i++) {
                for (let j = 0; j < this.goodsSpecList[i].detail.length; j++) {
                  this.goodsSpecList[i]["show"] = false;
                }
                this.goodsSpecList[i].detail[0]["show"] = true;

                this.selSpecArr.push(this.goodsSpecList[i].detail[0].specValueId);
                this.selSpecObj.push({
                  specName: this.goodsSpecList[i].specName,
                  specValue: this.goodsSpecList[i].detail[0].specValue,
                  specValueId: this.goodsSpecList[i].detail[0].specValueId
                });
              }
              this.$set(this.goodsSpecList, "show", false);
              this.matchElsProductId();
            }
          })
          .catch(err => {
            console.log(err);
          });
      },

      matchElsProductId() {
        for (var i = 0; i < this.selSpecArr.length; i++) {
          this.sortSelSpecArr[i] = this.selSpecArr[i];
        }

        var len = this.sortSelSpecArr.length, // 数组的长度
          value, // 当前比较的值
          i, // 未排序部分的当前位置
          j; // 已排序部分的当前位置
        for (i = 0; i < len; i++) {
          // 储存当前位置的值
          value = this.sortSelSpecArr[i];
          /*
           * 当已排序部分的当前元素大于value，
           * 就将当前元素向后移一位，再将前一位与value比较
           */
          for (j = i - 1; j > -1 && this.sortSelSpecArr[j] > value; j--) {
            this.sortSelSpecArr[j + 1] = this.sortSelSpecArr[j];
          }
          this.sortSelSpecArr[j + 1] = value;

          this.sortSelSpecArr[j + 1] = value;
        }

        let reg = this.sortSelSpecArr.toString();
        for (let i in this.product) {
          if (this.product[i].specValueIds == reg) {
            this.matchProductId = this.product[i].productId;
            //						this.store = this.product[i].store
          }
        }
        // console.log(this.matchProductId)
      },
      // 选规格事件
      stand(els, i, j) {
        console.log(els,i,j);
        for (let b = 0; b < this.goodsSpecList[i].detail.length; b++) {
          this.goodsSpecList[i].detail[b].show = false;
        }

        els.show = true;
        let changeData = this.goodsSpecList[i].detail[j].show;
        this.$delete(this.goodsSpecList, "show");
        this.$set(this.goodsSpecList, "show", changeData);
        this.selSpecArr.splice(i, 1, els.specValueId);
        this.matchElsProductId();
        this.selSpecObj[i].specValue = els.specValue;
        this.selSpecObj[i].specValueId = els.specValueId;
      },
      joingroups() {
        if (this.details.isParticipate) {
          this.oncegroup();
        } else {
          alert("已经参团");
        }
      },
      // console.log(this.matchProductId);


      goshop() {
        if (this.matchProductId == 0) {
          this.matchProductId = this.product[0].productId;
        }
        this.$router.push({
          path: "/groupBlance",
          query: {
            activityId: this.$route.query.activityId,
            productId: this.matchProductId
          }
        });
      }
    }

  };
</script>

<style lang="scss" scoped>
  #groupdetail {
    .Time{
      height: 1.33333rem;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      .right_message{
        position: absolute;
        width:  3rem;
        height: 1rem;
        padding-top: .25rem;
        top: 0;
        right: 0;
        .time_daoji {
          flex: 2.5;
          max-width: 25rem;
          vertical-align: middle;
          padding-top: .1rem;
          padding-bottom: .25rem;
          padding-right: .2rem;

          font-size: .42rem;
          /*background: url(../../common/image/bargain/countdown.png) no-repeat;*/
          background-size: 59% 80%;
          background-position-x: 60%;
          span:first-child {
            color: white;
            width: 2rem;
            display: inline-block;
            text-align: center;
            font-weight: 200;
            box-shadow: .1rem .1rem 10px black;
            background: black;
            border-radius: .1rem;
            /*padding: .1rem;*/
          }
        }
      }
    }
    .banner {
      margin-top: 1rem;
    }
    .descript {
      margin-bottom: 1.5rem;
    }
    .mint-popup {
      border-radius: 0.2rem;
      .top {
        padding: 0.2rem;
        font-size: 0.4rem;
        text-align: center;
        border-bottom: 1px solid #ccc;
        position: relative;
        span {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          position: absolute;
          right: 0.2rem;
          top: 0.2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .mores {
        width: 8rem;
        height: 9rem;
        .bargainmorelist {
          padding: 0.2rem;
          li {
            height: 1.5rem;
            .left {
              vertical-align: middle;
              img {
                margin-top: 0.2rem;
                margin-right: 0.2rem;
                vertical-align: middle;
                width: 1rem;
                height: 1rem;
                float: left;
                border-radius: 100%;
              }
              p {
                padding-top: 0.3rem;
                span {
                  color: #ccc;
                }
                span:first-child {
                  display: inline-block;
                  color: black;
                  width: 3.4rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 1;
                  word-break: break-all;
                }
              }
            }
            .right {
              float: right;
              margin-top: -0.6rem;
              p {
                padding: 0.2rem;
                padding-left: 0.3rem;
                padding-right: 0.3rem;
                color: white;
                background: orangered;
                text-align: center;
                border-radius: 0.3rem;
              }
            }
          }
        }
      }
      .gogroups {
        width: 9rem;
        height: 8rem;
        text-align: center;
        p:nth-child(2) {
          padding-top: 0.3rem;
          padding-bottom: 0.3rem;
          font-size: 0.4rem;
          color: #cccccc;
          em {
            color: orange;
          }
        }
        p:nth-child(3) {
          span {
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 100%;
            position: relative;
            img {
              width: 100%;
              border-radius: 100%;
              margin-right: 0.3rem;
            }
            i {
              display: inline-block;
              background: orangered;
              color: white;
              border-radius: 0.3rem;
              font-size: 0.2rem;
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        }
        p:last-child {
          margin-right: 0.3rem;
          margin-left: 0.3rem;
          border-radius: 0.2rem;
          padding: 0.3rem;
          background: orangered;
          color: white;
          text-align: center;
          position: fixed;
          bottom: 0.2rem;
          left: 0;
          right: 0;
        }
      }
    }
    .centers {
      background: #fff;
      color: black;
      height: auto;
      font-size: 0.5rem;
      padding: 0.2px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
    }
    .short-info {
      margin-top: 0.2rem;
      padding: 0.3rem;
      margin-bottom: 0.2rem;
      .clear {
        vertical-align: middle;
        .now_price{
          color: #F22D07;
         .price_active{
           background-color: rgb(254,234,230);
           color: #F22D07;
         }
          span{
            font-size: .5rem;
            padding-right: .2rem;
            padding-top: .1rem;
            display: inline-block;
          }
          section{
            font-size: .2rem;
            color: #1b1b1b;
            display: inline-block;
            background-color: rgb(234,234,234);
            border-radius: .3rem;
            text-align: center;
            width: .75rem;
            height: .4rem;
            padding-top: .1rem;
            margin-left: .1rem;
          }
        }
        .before_price{
           font-size: .3rem;
           color:darkgray;
           padding:.1rem .05rem;
           text-decoration:line-through;
        }
        .fl {
          margin-bottom: 0.2rem;
          width: 100%;
          span {
            vertical-align: middle;
            font-size: 0.5rem;
            color: orangered;
          }
          u {
            margin-left: 0.5rem;
            text-decoration: line-through;
            color: #cccccc;
          }
          span:last-child {
            /*margin-left: 5rem;*/
            float: right;
            font-size: 0.4rem;
          }
        }
        .shopname {
          width: 100%;
          line-height: 1.2;
          margin-bottom: 0.2rem;
          margin-top: .2rem;
          img {
            width: 1.2rem;
            height: 0.4rem;
            margin-right: 0.2rem;
          }
          span {
            font-size: 0.4rem;
            color: black;
            margin-left: 0;
          }
        }
        .wran {
          color: #ccc;
          p:first-child {
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
            display: flex;
            justify-content: space-between;
            span {
              display: inline-block;
            }
          }
        }
      }
    }
    .grouplist {
      padding: 0.3rem;
      margin-bottom: 0.2rem;
      .look {
        font-size: 0.35rem;
        display: flex;
        justify-content: space-between;
      }
      .list {
        li {
          display: flex;
          justify-content: space-between;
          height: 2rem;
          .grouplogo {
            margin-top: 0.25rem;
            vertical-align: middle;
            img {
              margin-top: 0.2rem;
              vertical-align: middle;
              margin-right: 0.2rem;
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 100%;
              float: left;
            }
            span {
              margin-top: 0.2rem;
              font-size: 0.4rem;
              display: inline-block;
              width: 2.4rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              word-break: break-all;
            }
          }
          .right {
            display: flex;
            justify-content: space-between;
            vertical-align: middle;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            line-height: 1.6;
            font-size: 0.35rem;
            p:first-child {
              color: #ccc;
              margin-right: 0.2rem;
              span:last-child {
                color: orangered;
              }
              span:first-child {
                em {
                  color: orangered;
                }
              }
            }
            p:last-child {
              padding: 0.2rem;
              padding-left: 0.3rem;
              padding-right: 0.3rem;
              background: orangered;
              color: white;
              border-radius: 0.3rem;
            }
          }
        }
      }
    }
    .select {
      background-color: rgb(234,234,234);
      padding: .25rem 0;
      .link_cell{
        height: 1rem;
        border-bottom: solid 1px rgb(234,234,234);
        p{
          margin-right: .2rem;
          font-size: .26667rem;
          color: #F22D07;
          padding: .1rem;
          background: url("../../common/image/seize/commoditydetails_bg_coupon.png") no-repeat 0 0;
          background-size: 100% 100%;
        }
      }
      .select_bottom{
        background-color: white;
        border-bottom: solid 1px rgb(234,234,234);
        height: 1.05rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .bottom_item{
          width: 2.05rem;
          padding-right: .2rem;
          position: relative;
          img{
              width: .4rem;
              height: .4rem;
            }
          span{
            position: absolute;
            top: 0;
            display: inline-block;
            line-height: .4rem;
            vertical-align: center;
            color: rgb(153,153,153);
          }
        }
        .fiest{
          margin-left: .35rem;
        }
      }
      .mint-cell{
        .mint-cell-mask{
          color: #b95517;
        }
      }
    }
    .storeBar {
      padding: 0.32rem;
      position: relative;
      z-index: 10;
      img {
        display: inline-block;
        vertical-align: middle;
        width: 1.04rem;
        height: 1.04rem;
        /*border-radius:0.1rem;*/
        margin-right: 0.27rem;
      }
      label {
        display: inline-block;
        vertical-align: middle;
        h2 {
          font-size: 0.37rem;
          font-weight: bold;
          margin-bottom: 0.18rem;
        }
        p {
          /*font-weight: 0.32rem;*/
        }
      }
      .btn-inStore {
        position: absolute;
        right: 0.32rem;
        top: 50%;
        margin-top: -0.35rem;
      }
    }
    #wrap {
      min-height: 6.83rem;
      min-width: 10rem;
      background: white;
      overflow: visible;
      .back {
        width: 0.83rem;
        position: absolute;
        top: -0.5rem;
        right: 0.33rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        padding: 10px;
        height: 80%;
        overflow: hidden;
        margin-bottom: 1rem;
        .conten {
          padding-bottom: 0.5rem;
          height: 2.5rem;
          .productImg {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 5px;
            float: left;
            margin-right: 0.5rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .title {
            padding-top: 0.5rem;
            line-height: 0.4rem;
            font-weight: 800;
            overflow: hidden;
            max-height: 1rem;
            max-width: 5rem;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
          }
          .money {
            font-size: 0.4rem;
            color: red;
            line-height: 0.6rem;
          }
        }
        .category {
          clear: both;
          padding-bottom: 0.5rem;
          .cate {
            padding-top: 0.5rem;
            li {
              background: #eee;
              font-size: 0.4rem;
              border-radius: 0.5rem;
              margin-right: 0.4rem;
              margin-bottom: 0.16rem;
              padding: 0.2rem;
              padding-left: 0.5rem;
              padding-right: 0.5rem;
              float: left;
            }
            .cols {
              background: red;
              color: white;
            }
          }
          .cate:after {
            content: "";
            display: block;
            clear: both;
          }
        }
      }
      .footers {
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.4rem;
        text-align: center;
        line-height: 0.4rem;
        .addcars {
          padding: 0.5rem;
          background: #eeeeee;
          flex: 1;
        }
        .buynows {
          flex: 1;
          padding: 0.5rem;
          padding-left: 0;
          background: #f23c18;
          color: white;
          position: fixed;
          bottom: 0;
        }
        .export {
          display: inline-block;
          text-align: center;
          color: orangered;
          width: 100%;
          height: 1.3rem;
          float: right;
          line-height: 1.3rem;
          font-size: 0.4rem;
          background: #e0e0e0;
        }
      }
    }
    .popups {
      background: white;
      padding: 0.2rem;
      width: 80%;
      font-size: 0.3rem;
      border-radius: 0.2rem;
      text-align: center;
      .popcontent {
        position: relative;
        .back {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          position: absolute;
          right: 0;
          top: 0;
          img {
            width: 80%;
          }
        }
        .details {
          p {
            font-size: 0.4rem;
            border-bottom: 1px solid #cccccc;
            padding: 0.3rem;
          }
          ul {
            padding: 0.2rem;
            li {
              line-height: 2;
              font-size: 0.35rem;
              text-align: left;
            }
          }
        }
      }
    }
  }
</style>
