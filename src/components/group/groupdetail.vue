<template>
  <div id="groupdetail" class=" mywrap" :class="{'show':show_mywrap}">
    <mt-header title="商品详情" class='centers'>
      <mt-button icon="back" @click="backgo" slot="left" style="padding-left: .2rem"></mt-button>
    </mt-header>
    <mt-swipe :auto="5000" class="banner" style='height:8.5rem;'>
      <mt-swipe-item>
        <img :src="details.image |filterss(1)" :onerror="logo" style="width: 100%;height: 100%;" />
      </mt-swipe-item>
    </mt-swipe>
    <div v-if="isDuobao" class="count_time">
      <img src="../../common/image/duobao_header.jpg" />

      <!-- <div class="bug_state" >即将开抢</div> -->
      <div v-if="countTime>0" class="time_wrap flex">
        <div style="margin-right:.14rem;">{{formatTime(countTime,0)}}</div>
        <div>{{formatTime(countTime,1)}}</div>:
        <div>{{formatTime(countTime,2)}}</div>:
        <div>{{formatTime(countTime,3)}}</div>
      </div>
      <div class="bug_state" v-if="countTime<=0">已结束</div>
    </div>
    <section class="short-info">
      <div class="clear">
        <section class="fl">
          <span>
            <em>￥</em>{{Number(details.spellPrice).toFixed(2)}}</span>
          <u>￥{{details.goodsPrice}}</u>
          <span>{{details.num}}人拼团</span>
        </section>
        <p class="shopname">
          <em><img src="../../common/image/group/labelgroup.png" :onerror="logo" /></em>
          <span>{{details.goodsTitle}} </span>
        </p>
        <div class="wran">
          <p>
            <span>包邮（偏远地区除外）</span>
            <span>已{{details.alreadyNum}}人参与</span>
          </p>
          <p>{{details.goodsDescribe}}</p>
        </div>
      </div>
    </section>
    <div class="grouplist" v-if="Ongoing.length>0">
      <p class="look">
        <span>{{Ongoing.length}}人在开团，可以直接参与拼团</span>
        <span @click="lookmore">查看更多></span>
      </p>
      <ul class="list">
        <li v-for="(item,index) in Ongoings" v-if='item.show'>
          <p class="grouplogo">
            <img :src="item.originatorFace |filterss(4)" :onerror="logo" />
            <span>{{item.originatorName}}</span>
          </p>
          <div class="right">
            <p>
              <span>还差
                <em>{{item.completeNum-item.participateNum}}人</em>拼成</span><br/>
              <span>剩余{{item.endDate | settime}}</span>
            </p>
            <p @click="joingroup(item)">去拼团</p>
          </div>
        </li>
        <!--<li>-->
        <!--<p class="grouplogo">-->
        <!--<img :src="logo" :onerror="logo" />-->
        <!--<span>哈哈哈哈哈哈哈哈哈哈哈</span>-->
        <!--</p>-->
        <!--<div class="right">-->
        <!--<p>-->
        <!--<span>还差<em>10000人</em>拼成</span><br />-->
        <!--<span>剩余12：20：00</span>-->
        <!--</p>-->
        <!--<p @click="joingroup(item)">去拼团</p>-->
        <!--</div>-->
        <!--</li>-->
      </ul>
    </div>
    <div class="rule">
      <p class="look">
        <span>拼团步骤</span>
        <span @click="explain">说明></span>
      </p>
      <ul class="rulelist">
        <li>
          <p class="bg">1</p>
          <p>选择商品</p>
        </li>
        <li>
          <p>2</p>
          <p>支付开团活参团</p>
        </li>
        <li>
          <p>3</p>
          <p>等待新人参团支付</p>
        </li>
        <li>
          <p>4</p>
          <p>达到人数拼团成功</p>
        </li>
      </ul>
    </div>

    <div class="storeBar">
      <img :src="details.shopStoreLogo |filterss(4)" :onerror="logo" v-if="imgs">
      <img src="../../common/image/ziying.png" :onerror="logo" v-if="!imgs" />
      <label>
        <h2 v-if="imgs">{{details.shopStoreName}}</h2>
        <h2 v-if="!imgs">巨柚自营旗舰店</h2>
        <p v-if="imgs">已交保证金
          <span style="color:red;">￥{{details.bond}}</span>元，请放心购买</p>
      </label>
      <router-link :to="{ path:'/goods/store'}" class="btn normal-btn red-btn btn-inStore" v-if="imgs">进入店铺
      </router-link>
    </div>
    <section>
      <goodsDetailTab v-if="details.goodsIntro" tab-value="1" :intro="details.goodsIntro"></goodsDetailTab>
    </section>
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
      <!-- <div class="shopcar" @click="goCar">
        <u></u>
        <div>购物车</div>
      </div> -->
      <div v-if="!isDuobao" @click="collect" class="collect" :class="{active:isCollect}">
        <u></u>
        <div>收藏</div>
      </div>
      <div class="add_car" @click="aloneby">
        <span>￥{{details.goodsPrice}}</span>
        <span>单独购买</span>
      </div>
      <div class="buy_now" @click="oncegroup">
        <span style="padding:0 .4rem;">￥{{details.spellPrice}}</span>
        <span style="padding:0 .4rem;">立即拼团</span>
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
                <span>剩余{{item.endDate | settime}}结束</span>
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
          <em>{{groups.completeNum-groups.participateNum}}</em>个名额，{{groups.endDate | settime}}后结束</p>
        <p>
          <span v-for='(item,index) in groups.participateDetails' style="width: 1.3rem;height: 1.3rem;">
            <i v-if="index==0">拼主</i><img :src="item.face |filterss(4)" :onerror="logo" /></span>
        </p>
        <p @click="joingroups">参与拼团</p>
      </div>

    </mt-popup>
    <!--分类-->
    <mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' closeOnClickModal>
      <p class="back" @click="close"><img src="../../common/image/qrcodeimg/close.png" slot="icon" /></p>
      <div id="wrap">
        <!--关闭按钮-->
        <!--弹框内容-->
        <div class="content">
          <div class="conten">
            <p class="productImg"><img :src="details.image |filterss(3)" :onerror="logo" /></p>
            <p class="title">{{details.goodsTitle}}</p>
            <p class="money">￥{{Number(details.spellPrice).toFixed(2)}}</p>
          </div>
          <div v-if="goodsSpecList!=null">
            <div class="category" v-for="(item,index) in goodsSpecList">
              <p style="font-size:.4rem;">{{item.specName}}</p>
              <ul class="cate">
                <li v-for="(child,key) in item.detail" :class="{'cols':child.show}" @click="stand(child,index,key)">
                  {{child.specValue}}
                </li>
              </ul>
            </div>
          </div>
          <div class="amount">
            <p>购买数量</p>
            <div class="number">
              <div class="num-btn remove" @click="remove"></div>
              <input type="text" v-model="buyCount" class="input" />
              <div class="num-btn add" @click="adds"></div>
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
    <mt-popup popup-transition="popup-fade" position="center" class="haoma" v-model='binding' closeOnClickModal>
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
        <p @click="bidingmobile">立即登录</p>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import goodsDetailTab from "../../components/goodsDetailTab";
import { MessageBox } from "mint-ui";
import wx from "weixin-js-sdk";
import share from "../../common/js/wxshare";
import wxlogin from "../../common/js/wxlogin";
export default {
  data() {
    return {
      seize: true,
      logo: 'this.src="' + require("../../common/image/defaultimg.png") + '"',
      imgs: true,
      more: false,
      mobile: "",
      codes: "",
      gogroup: false,
      buyCount: 1,
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
      storeData: "",
      countTime: "",
      isDuobao: false,
      states: true,
      show_mywrap: false
    };
  },
  created() {
    window.scrollTo(0, 0);
    var agent = navigator.userAgent.toLowerCase();
    if (agent.match(/MicroMessenger/i) == "micromessenger") {
      if (sessionStorage.getItem("token") == null) {
        if (this.$route.query.isDuobao) {
          wxlogin(
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
              this.$urlstate.appid +
              "&redirect_uri=https%3a%2f%2f" +
              this.$urlstate.url +
              "%2f%23%2fgroup%2fgroupdetail%3factivityId%3d" +
              this.$route.query.activityId +
              "%26isDuobao%3d1&response_type=code&scope=snsapi_userinfo#wechat_redirect",
            this
          );
        } else {
          wxlogin(
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
              this.$urlstate.appid +
              "&redirect_uri=https%3a%2f%2f" +
              this.$urlstate.url +
              "%2f%23%2fgroup%2fgroupdetail%3factivityId%3d" +
              this.$route.query.activityId +
              "&response_type=code&scope=snsapi_userinfo#wechat_redirect",
            this
          );
        }
      }
    }
  },
  components: {
    goodsDetailTab: goodsDetailTab
  },
  filters: {
    settime: function(timestamp) {
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
        return format;
      }
    }
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    //增加减少数量
    remove() {
      this.buyCount--;
      if (this.buyCount <= 0) {
        this.buyCount = 1;
      }
    },
    //判断添加的商品有没有超出库存
    adds() {
      this.buyCount++;
    },
    getDetail() {
      this.isDuobao = this.$route.query.isDuobao;
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
          if (data.data.res_code != 0) {
            MessageBox("提示", data.data.res_info);
            this.$router.push({ path: "/login" });
            return;
          }
          this.show_mywrap = true;
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
          if (data.data.res_datacomTel) {
            this.phoneNum = data.data.res_data.comTel;
          } else if (data.data.res_data.comMobile) {
            this.phoneNum = data.data.res_data.comMobile;
          } else {
            this.phoneNum = "400-6199-669";
          }
          console.log("haoma", this.phoneNum);
          this.telPhoneNum = "tel:" + this.phoneNum;
          sessionStorage.detail = this.details.goodsId;
          this.$route.query.goodsId;
          let reg = (reg = /jyimg:\//g);
          if (this.details.goodsIntro) {
            var str = this.details.goodsIntro.replace(
              reg,
              "https://jymall.oss-cn-beijing.aliyuncs.com/"
            );
            this.details.goodsIntro = str;
          }
          if (data.data.res_data.shopStoreLogo) {
            this.storeData = {
              shopStoreLogo: data.data.res_data.shopStoreLogo,
              shopStoreName: data.data.res_data.shopStoreName
            };
            this.bond = data.data.res_data.bond;
            this.imgs = true;
          } else {
            this.imgs = false;
          }
          // if (data.data.shopStore) {
          //   this.storeData = data.data.shopStore;
          //   this.imgs = true;
          // } else {
          //   this.imgs = false;
          // }
          //微信公共分享
          if (this.isDuobao) {
            this.getCountTime(); //计算倒计时
          }
          let us = window.location.href.split("#")[0];
          console.log("href", us);
          if (this.$route.query.isDuobao) {
            share(
              us,
              this.details.shareTitle,
              this.details.shareDescribe,
              "http://" +
                this.$urlstate.url +
                "/?#/group/groupdetail?" +
                "activityId=" +
                this.details.activityId +
                "&isDuobao=1",
              this.filters.filterss(this.details.shareImage)
            );
          } else {
            console.log("name", this.details.name);
            share(
              us,
              this.details.shareTitle,
              this.details.shareDescribe,
              "http://" +
                this.$urlstate.url +
                "/?#/group/groupdetail?" +
                "activityId=" +
                this.details.activityId,
              this.filters.filterss(this.details.shareImage)
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCountTime() {
      //计算结束时间
      let countTime = this.details.endDate - Date.parse(new Date());
      console.log(this.details.endDate, Date.parse(new Date()));
      if (countTime > 0) {
        this.$set(this, "countTime", countTime);
      } else {
        this.$set(this, "countTime", 0);
      }
      this.show_mywrap = true;
      this.setTime = setInterval(o => {
        countTime = this.details.endDate - Date.parse(new Date());
        if (countTime > 0) {
          this.$set(this, "countTime", countTime);
        } else {
          this.$set(this, "countTime", 0);
          window.clearInterval(this.setTime);
        }
      }, 1000);
    },
    formatTime(t, type) {
      //格式化时间戳
      let day = Math.floor(t / 86400000);
      let hour = Math.floor((t / 3600000) % 24);
      let min = Math.floor((t / 60000) % 60);
      let sec = Math.floor((t / 1000) % 60);
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      let format = "";
      if (type == 0) {
        return day + "天";
      }
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
    collect() {
      //收藏
      if (!sessionStorage.getItem("token")) {
        // sessionStorage.setItem("needBack", true);
        sessionStorage.pgths =
          "/group/groupdetail?activityId=" + this.details.activityId;
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
          MessageBox("提示", data.data.res_info);
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
      sessionStorage.removeItem("spellId");
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
      console.log(els, i, j);
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
        this.popupVisible = true;
        this.specification();
      } else {
        alert("已经参团");
      }
    },
    // console.log(this.matchProductId);
    goShop() {
      //去店铺，
      this.$router.push({
        path: "/goods/store"
      });
    },
    goshop() {
      //去下单
      if (this.matchProductId == 0) {
        this.matchProductId = this.product[0].productId;
      }
      if (!this.details.store) {
        MessageBox("提示", "没有库存了");
        return;
      }
      let params = {
        activityId: this.$route.query.activityId,
        productId: this.matchProductId,
        buyCount: this.buyCount
      };
      if (this.$route.query.isDuobao) {
        params.isDuobao = true;
      }
      this.$router.push({
        path: "/groupBlance",
        query: params
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#groupdetail {
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
        img {
          width: 1.2rem;
          height: 0.4rem;
          margin-right: 0.2rem;
        }
        span {
          font-size: 0.45rem;
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
  .rule {
    padding: 0.3rem;
    .look {
      font-size: 0.35rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.2rem;
    }
    .rulelist {
      display: flex;
      justify-content: space-around;
      li {
        width: 24.5%;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
        text-align: center;
        p:first-child {
          width: 0.7rem;
          height: 0.7rem;
          margin-left: 0.7rem;
          line-height: 0.7rem;
          border-radius: 100%;
          background: #ccc;
          color: white;
          margin-bottom: 0.2rem;
        }
        p:last-child {
          font-size: 0.3rem;
        }
        .bg {
          background: orangered !important;
        }
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
  #wrap {
    max-height: 11rem;
    min-height: 6.87rem;
    min-width: 10rem;
    background: white;
    overflow-y: auto;

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
  .haoma {
    width: 85%;
    .bindingmobile {
      width: 100%;
      /*.btn{*/
      /*width: 80%;*/
      /*margin-left: 10%;*/
      /*}*/
    }
  }
  .amount {
    font-size: 0.4rem;
    display: flex;
    justify-content: space-between;
    line-height: 0.83rem;
    .number {
      display: inline-block;
      vertical-align: middle;
      .num-btn {
        width: 0.83rem;
        height: 0.83rem;
        border: #e5e5e5 1px solid;
        border-radius: 0.1rem;
        display: inline-block;
        background: url(../../common/image/join.png) no-repeat;
        background-size: 130%;
        vertical-align: middle;
        &.remove {
          background-position: 0.15rem -0.5rem;
        }
        &.add {
          background-position: 0.2rem 0.1rem;
        }
      }
      .input {
        width: 2.24rem;
        text-align: center;
        height: 0.84rem;
        line-height: 0.84rem;
        border: #e5e5e5 1px solid;
        border-radius: 0.1rem;
        color: #999999;
        display: inline-block;
        vertical-align: middle;
        background: none;
      }
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
      padding: 0.17rem 0.05rem;
      z-index: 1;
      color: #333333;
      font-size: 0.5rem;
      align-items: center;
      div {
        background: #333333;
        color: white;
        padding: 0.1rem;
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
      padding: 0.4rem 1.25rem;
      z-index: 1;
      background: #f3d783;
      font-size: 0.4rem;
    }
    .haoma {
      width: 85%;
      .bindingmobile {
        width: 100%;
        /*.btn{*/
        /*width: 80%;*/
        /*margin-left: 10%;*/
        /*}*/
      }
    }
  }
}
</style>
