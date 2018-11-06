<template>
  <div id="threeIndex" style="position:absolute;left:0;top:0;bottom:0;overflow:scroll;right:0;">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">

    <div class="sear">
      <input type="text" value="" id="searcont" placeholder="搜索您喜欢的商品" @focus="searchshop"/>
    </div>
    <div class="nav">
      <ul class="navtop">
        <li v-for="(item,index) in navs" :class="{bot:index==navindex}" @click="navclick(item,index)" v-if="index<5">
          {{item.navName}}
        </li>
      </ul>
      <p class="pull-down" @click="allnav"><img :src="imgsrc" alt="" id="indedown"></p>
      <ul class="showsnav" v-if="shownav">
        <li v-for="(item,index) in navs" @click="allnavclick(item,index)">
          <span :class="{hidenav:index==allindex}">{{item.navName}}</span>
        </li>
      </ul>
      <div class="mast" v-if="shownav"></div>
      <!--<div class="sign">-->
        <!--<p @click="godign"><span>签到</span></p>-->
      <!--</div>-->
    </div>

    <!--弹框提示-->
    <!--<div class="message">-->
        <!--<p><img src="../common/image/home.png"><span>{{bbb.name}}</span></p>-->
        <!--</div>-->

    <div v-if="mounteds" >
      <inidexNoude v-on:noudeBackFun="noudeBackFun" v-for="(item,index) in mounteds" :moudenum="item" :moudedata="item.pageFloorModuleList"></inidexNoude>
    </div>
    <div v-if="indexcontent" >

      <listmounted :listdata="indexcontent"></listmounted>
    </div>
      </mt-loadmore>

    <commonFooter current-menu="1"></commonFooter>

    <mt-popup popup-transition="popup-fade" position="center" v-model='code' class='popups' closeOnClickModal>
      <div class="code">
        <!--巨柚-->
        <p v-if="this.$urlstate.numb==2"><img src="../common/image/attentionCode.jpg"></p>
        <!--天禾露-->
        <p v-else><img src="../common/image/attentionCode.jpg"></p>
        <p><span>长按二维码关注公众号</span><br><span>关注后点击右上角按钮刷新页面</span></p>
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
    <mt-popup  class="couponPopup" popup-transition="popup-fade" position="center" v-model='couponPopup'>
      <div class="couponPopup_wrap">


        <img class="header_img" src="../common/image/home/home_coupon_decoration.png">
        <div class="title">
          恭喜你获得{{couponList.length}}张现金券
        </div>
        <div  class="flex flex_center flex_column coupon_wrap">
          <div class="coupon flex" v-for="(item,index) in couponList" @click="goRelDetail(index)" style="margin-bottom:.3rem;"  :key="index">
            <div class="left flex_column flex align_center shrink_0">
              <div class="top">
                <span class="little red">￥</span>
                <span class="big red">{{item.discountPrice}}</span>
              </div>
              <div class="gray">
                满{{item.minAmount}}可用
              </div>
            </div>
            <div class="right flex flex_column align_center">
              <div class="top flex">
                <div class="quan shrink_0">{{item.typeName}}</div>
                <div class="quan_title">{{item.cpnName}}</div>
              </div>
              <div class="bottom flex">
                {{item.useEndTime}}
              </div>
            </div>
          </div>
        </div>
        <img class="to_use"  @click="toUse" src="../common/image/home/home_button_use.png" />
        <img class='closeCoupon' @click='closeCouponPopup' src="../common/image/home/icon_home_close.png" />
      </div>
    </mt-popup>
    <couponDetail index="0" :couponList="pickCouponList"  v-model="couponDetailPopup"></couponDetail>
  </div>
</template>

<script>
import commonFooter from "../components/commonFooter";
import couponDetail from "../components/couponDetail";
import inidexNoude from "../components/moude/indexNoude";
import listmounted from "../components/moude/listmounted";
import { MessageBox } from "mint-ui";
export default {
  name: "threeIndex",
  data() {
    return {
      code: false,
      binding: false,
      mobile: "",
      couponList: [],//用户的cpn券列表
      codes: "",
      couponPopup: false,
      states: true,
      member: {},
      clicks: true,
      nav: [],
      navs: [],
      mounteds: [],
      couponDetailPopup:false,
      pickCouponList:[],//首页可领取的券列表，目前只有一张
      indexcontent: [],
      navindex: 0,
      shownav: false,
      allindex: 0,
      imgsrc: require("../common/image/threeindex/indexsdown.png"),
      images: [
        {
          img: require("../common/image/specialIndex/bargainbanner.jpg")
        }
      ],
      aa: [],
      bbb: {},
      url: "/basics/anon/getPageGoodsListByPageId", //获取下拉加载列表的接口地址
      pageNo: 1,
      allLoaded: false //是否全部加载完毕
    };
  },
  components: {
    commonFooter: commonFooter,
    inidexNoude: inidexNoude,
    couponDetail: couponDetail,
    listmounted: listmounted
  },
  created() {
    sessionStorage.removeItem("CATERORY");
    sessionStorage.removeItem("CATERORYnum");
    // alert("-1");
    var agent = navigator.userAgent.toLowerCase();
    if (agent.match(/MicroMessenger/i) == "micromessenger") {
      // alert("0");
      if (sessionStorage.numberss == "3") {
        // alert("1");
        this.login();
      } else {
        if (sessionStorage.getItem("token") == null) {
          // alert("2");
          this.login();
        }
      }
    }
  },
  mounted() {
    // alert("3");
    this.$axios({
      method: "post",
      url: "/basics/anon/getHomepageNavList",
      responseType: "json",
      data: {
        upGradeNo: this.$urlstate.upGradeNo
      }
    })
      .then(data => {
        if (data.data.res_code == 0) {
          this.navs = data.data.res_data.navList;

          this.mounteds = data.data.res_data.pageFloorList;
          this.navclick(this.navs[0]);
        }
      })
      .catch(err => {
        console.log(err);
      });

    // if (this.aa.length > 1) {
    //   var that = this;
    //   let j = -1;
    //   let tim = setInterval(function () {
    //     j++;
    //     if (that.aa.length - 1 < j) {
    //       clearInterval(tim)
    //       return false;
    //     }
    //     that.bbb = that.aa[j]
    //   }, 5000)
    // } else {
    //   this.bbb = this.aa[0]
    // }
    if (sessionStorage.token) {
      if (localStorage.today == new Date().format("dd")) {
        //如果今天已经弹出过弹出了，就不用再弹了
        return;
      } else {
        localStorage.today = new Date().format("dd");
        this.getCouponList(); //获取优惠券列表
      }
    }
  },
  methods: {
    noudeBackFun(list){
      this.pickCouponList = list;
      console.log('hhhh')
      this.couponDetailPopup = true;
    },
    showCouponDetail(){
      console.log('21421')
      this.couponDetailPopup = true;
    },
    toUse() {
      this.$router.push("/myCoupon");
    },
    getCouponList() {
      let url = "/coupon/memberCouponList";
      let params = {
        isUse: 0, //未使用
        pageNo: 1,
        pageSize: 3,
        token: sessionStorage.token
      };
      this.$axios({
        method: "post",
        url: url,
        responseType: "json",
        data: params
      })
        .then(o => {
          console.log(o);
          let couponList = o.data.res_data.dataList;
          couponList.forEach(o => {
            o.typeName = this.$api.formatCpnType(o.cpnType);
            console.log(o.typeName);
            o.useEndTime = new Date(o.useEndTime).format("yyyy-MM-dd hh:mm:ss");
          });
          this.couponList = couponList;
          if (this.couponList.length) {
            this.couponPopup = true;
          }
        })
        .catch(e => {
          console.log(url, e);
        });
    },
    pickNow() {
      this.cpnDetailPopup = true;
    },
    closeCouponPopup() {
      this.couponPopup = false;
    },
    formatCouponType() {
      return "124";
    },
    loadBottom() {
      //加载更多
      var params = {
        goodName: this.product,
        pageSize: 10,
        pageId: this.pageId
      };
      this.$api.loadMore(this, params, this.url, this.indexcontent, o => {
        if (o.data.res_code == 0) {
          o.data.res_data.pageFloorList.forEach(element => {
            this.indexcontent.push(element);
          });
        }
      });
    },
    bidingmobile() {
      if (this.clicks) {
        this.clicks = false;
        var member = JSON.parse(sessionStorage.details);
        var regs = new RegExp("(^|&)" + "state" + "=([^&]*)(&|$)");
        var rs = window.location.search.substr(1).match(regs);

        let parentId = rs[2];

        var obj = {
          authType: 1,
          face: member.face,
          parentId: parentId,
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
              MessageBox("提示", "绑定成功");
              this.binding = false;
              sessionStorage.details = JSON.stringify(
                data.data.res_data.member
              );
              sessionStorage.token = data.data.res_data.token;
            } else {
              alert(data.data.res_info);
              this.clicks = true;
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
    login() {
      var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);

      let token = sessionStorage.getItem("token");
      // alert("10");

      if (token == null) {
        // alert("4");
        // alert(this.$urlstate.appid)
        // alert(this.$urlstate.url)
        if (sessionStorage.numberss == "3") {
          // alert("9");
          sessionStorage.removeItem("numberss");
          location.href =
            "http://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            this.$urlstate.appid +
            "&redirect_uri=https%3a%2f%2f" +
            this.$urlstate.url +
            "%2f%23%2f&response_type=code&scope=snsapi_userinfo#wechat_redirect";
        }
        if (r == null) {
          // alert("7");
          location.href =
            "http://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            this.$urlstate.appid +
            "&redirect_uri=https%3a%2f%2f" +
            this.$urlstate.url +
            "%2f%23%2f&response_type=code&scope=snsapi_userinfo#wechat_redirect";
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
              if (data.data.res_data.returnCode == 0 || data.data.res_data.returnCode == "0") {
                this.binding = true;
                sessionStorage.details = JSON.stringify(data.data.res_data);
              }
              else {
                if (data.data.res_data.member) {
                  sessionStorage.details = JSON.stringify(data.data.res_data.member);
                  sessionStorage.openId = data.data.res_data.member.openId;
                  sessionStorage.token = data.data.res_data.token;
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    gaincodes() {
      console.log(111);
      let token = sessionStorage.getItem("token");
      if (this.states == false) {
        return false;
      }

      var reg = /^1[1-9]\d{9}$/;
      console.log(reg.test(this.mobile));
      if (!reg.test(this.mobile)) {
        alert("号码不正确");
        this.states = true;
      } else {
        this.states = false;
        let times = 60;
        var tim = document.getElementsByClassName("codebtn")[0];
        tim.innerHTML = times + "S";
        let _this = this;
        var time = setInterval(function() {
          times--;
          tim.innerHTML = times + "S";
          if (times == 0) {
            _this.states = true;
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
    goRelDetail(index) {
      let options = {
        relId: this.couponList[index].relId,
        relType: this.couponList[index].relType1
      };
      this.$api.toRelDetail(options, this);
    },
    godign() {
      this.$router.push("/myGold");
    },
    indesdata(val) {
      this.$axios({
        method: "post",
        url: "/basics/anon/getPageGoodsListByPageId",
        responseType: "json",
        data: {
          pageNo: 0,
          pageSize: 10,
          pageId: val.pageId
        }
      })
        .then(data => {
          if (data.data.res_code == 0) {
            // console.log(data.data.res_data)

            this.indexcontent = data.data.res_data.pageFloorList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchshop() {
      this.$router.push("/searchShop?state=0");
    },
    navclick(val, index) {
      if (index == undefined) {
        this.navindex = 0;
      } else {
        this.navindex = index;
      }
      this.indexcontent = [];
      this.mounteds = [];

      this.$axios({
        method: "post",
        url: "/basics/anon/getPageDataByPageId",
        responseType: "json",
        data: {
          pageId: val.pageId
        }
      })
        .then(data => {
          if (data.data.res_code == 0) {
            // document.body.style.background=data.data.res_data.pageColor
            document.getElementById("threeIndex").style.background =
              data.data.res_data.pageColor;
            this.mounteds = data.data.res_data.pageFloorList;
            this.pageId = data.data.res_data.pageId;
            this.indesdata(val);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    allnavclick(val, index) {
      this.allindex = index;
      this.navindex = index;
      this.imgsrc = require("../common/image/threeindex/indexsdown.png");
      this.shownav = false;
      this.navclick(val, index);
    },
    allnav() {
      // this.imgsrc=require('../common/image/threeindex/indexup.png')
      // this.shownav = true;
      if (this.shownav) {
        this.imgsrc = require("../common/image/threeindex/indexsdown.png");
        this.shownav = false;
      } else {
        this.imgsrc = require("../common/image/threeindex/indexup.png");
        this.shownav = true;
      }
    },
    settimes() {
      if ($("#SpecialIndex").focus) {
        $(".message").show("speed");
        let tim = setTimeout(function() {
          $(".message").hide("speed");
        }, 3000);
      }
    }
  },
  watch: {
    bbb(val) {
      this.settimes();
    }
  }
};
</script>

<style scoped lang="scss">
#threeIndex {
  .sear {
    padding-top: 0.2rem;
    /*border-radius: .266667rem;*/
    flex: 4;
    background-color: white;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
    border-bottom: solid 0.013333rem rgb(245, 245, 245);
    input {
      box-sizing: border-box;
      padding-left: 1rem;
      padding-bottom: 0.1rem;
      padding-top: 0.18rem;
      font-size: 0.3rem;
      color: rgb(154, 154, 154);
      border: 0.013333rem solid rgb(245, 245, 245);
      border-radius: 0.5rem;
      width: 100%;
      height: 100%;
      outline: none;
      background: url(../common/image/search.png) no-repeat, rgb(245, 245, 245);
      background-position: 0.3rem;
      background-size: 0.4rem;
    }
    padding-bottom: 0.2rem;
  }
  .nav {
    overflow: hidden;
    .navtop {
      box-sizing: border-box;
      /*width: 90%;*/
      background: #fffefe;
      height: 0.75rem;
      /*display: -webkit-box;*/
      /*overflow-x: scroll;*/
      /*-webkit-overflow-scrolling:touch;*/
      li {
        width: 1.3rem;
        font-size: 0.32rem;
        float: left;
        padding: 0.25rem 0.25rem;
        text-align: center;
      }
      li:after {
        content: "";
        display: block;
        clear: both;
      }
      .bot {
        color: orangered;
        border-bottom: 0.026667rem solid orangered;
      }
    }
    .pull-down {
      width: 0.54rem;
      height: 0.47rem;
      float: right;
      background: white;
      margin-top: -0.59rem;
      margin-right: 0.2rem;
      img {
        width: 70%;
        height: 50%;
        text-align: center;
        margin-left: 20%;
        margin-top: 20%;
      }
    }
    .sign {
      position: absolute;
      top: 3rem;
      right: 0;
      width: 1.2rem;
      border-bottom-left-radius: 0.3rem;
      border-top-left-radius: 0.3rem;
      background: white;
      color: white;
      z-index: 3;
      span {
        display: inline-block;
        padding: 0.1rem;
        text-align: center;
        background: orangered;
        border-radius: 50%;
      }
    }
  }
  .showsnav {
    width: 100%;
    /*height: 100%;*/
    background: white;
    position: relative;
    /*padding: .2rem;*/
    display: flex;
    /*justify-content: center;*/
    /*align-content: flex-start;*/
    flex-wrap: wrap;
    z-index: 12;
    li {
      text-align: center;
      float: left;
      width: 1.5rem;
      padding: 0.2rem 0.25rem;
      span {
        font-size: 0.3rem;
        display: inline-block;
        padding: 0.1rem 0.2rem;
        border-radius: 0.5rem;
        background-color: rgb(245, 245, 245);
      }
    }
    .hidenav {
      background: orangered;
      color: white;
      border-radius: 0.5rem;
    }
  }
  .mast {
    position: fixed;
    top: 2.5rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  .showsnav:after {
    display: block;
    content: "";
    clear: both;
  }
  .message {
    display: none;
    position: fixed;
    top: 2.7rem;
    left: 0.2rem;
    z-index: 9;
    border-radius: 0.1rem;
    padding: 0.1rem;
    background: rgba(0, 0, 0, 0.5);
    p {
      color: white;
      vertical-align: middle;
      span {
        line-height: auto;
        vertical-align: middle;
      }
      img {
        margin-right: 0.2rem;
        vertical-align: middle;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.1rem;
      }
    }
  }
  .banner {
    height: 3.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .mint-popup {
    width: 90%;
  }
  .code {
    width: 90%;
    margin: auto;
    text-align: center;
    background: white;
    p:nth-child(1) {
      line-height: 3rem;
      font-size: 0.5rem;
    }
    p:nth-child(2) {
      background: white;
      line-height: 2;
      text-align: center;
      font-size: 0.5rem;
    }
    img {
      margin-top: 5%;
      width: 80%;
      height: 80%;
      vertical-align: bottom;
    }
  }
  .bindingmobile {
    width: 90%;
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
      font-size: 0.32rem;
      //color: $leCol9;
      width: 4.3rem;
    }
  }
}
.mint-popup {
  position: absolute !important;
}
.mint-popup {
  position: absolute !important;
}
.couponPopup {
  width: auto !important;
  background: none;
}
.couponPopup_wrap {
  width: 7.92rem;
  height: 10.06667rem;
  background: rgba(255, 52, 36, 1);
  border-radius: 0.213333rem;
  padding: 0.44rem 0 0 0;
  position: relative;
  div {
    box-sizing: border-box;
  }
  .header_img {
    width: 6.92rem;
    position: absolute;
    left: 0.5rem;
    top: -2.839rem;
  }
  .title {
    height: 0.666667rem;
    font-size: 0.48rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(254, 192, 91, 1);
    text-align: center;
    line-height: 0.666667rem;
    text-shadow: 0rem 0.026667rem 0.026667rem rgba(200, 27, 13, 1);
  }
  .coupon_wrap {
    margin-top: 0.4rem;
  }
  .coupon {
    width: 6.853333rem;
    height: 1.973333rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.08rem;
    padding: 0;
    .red {
      color: #f23814;
    }
    .little {
      font-size: 0.426667rem;
    }
    .big {
      font-size: 0.96rem;
      left: -0.15rem;
      position: relative;
    }
    .left {
      width: 2.16rem;
      padding-left: 0;
      position: relative;
      border-right: 0.013333rem #ccc dashed;
      .top {
        margin-top: 0.1rem;
      }
    }
    .right {
      flex-grow: 1;
      padding: 0.08rem 0 0 0.08rem;
      .top {
        margin-top: 0.1rem;
        width: 100%;
        .quan {
          height: 0.373333rem;
          font-size: 0.266667rem;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(242, 56, 20, 1);
          line-height: 0.373333rem;
          width: 1.22rem;
          height: 0.373333rem;
          background: rgba(242, 56, 20, 0.4);
          border-radius: 0.053333rem;
        }
        .quan_title {
          flex-grow: 1;
          font-size: 0.32rem;
          padding-left: 0.1rem;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          line-height: 0.45rem;
          min-height: 0.9rem;
          text-align: left;
        }
      }
      .bottom {
        width: 100%;
        height: 0.373333rem;
        font-size: 0.266667rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(132, 131, 133, 1);
        line-height: 0.373333rem;
      }
    }
    .gray {
      height: 0.266667rem;
      font-size: 0.32rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 0.266667rem;
    }
  }
}
.to_use {
  width: 4.53rem;
  height: 1.01rem;
  border-radius: 0.5rem;
  position: absolute;
  left: 1.653333rem;
  bottom: 0.613333rem;
}
// 优惠券相关样式

.row_wrap div {
  box-sizing: border-box;
}

.type_1 > div {
  height: 100%;
}

.type_1 {
  width: 9.546667rem;
  height: 1.44rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.053333rem 0.106667rem 0rem rgba(0, 0, 0, 0.1);
  border-radius: 0.053333rem 0.08rem 0.08rem 0.053333rem;
  position: relative;
}

.row .type_2 {
  width: 4.693333rem;
}

.row .type_2:first-child {
  margin-right: 0.213333rem;
}

.type_1 .left {
  width: 1.093333rem;
  padding: 0.106667rem 0.373333rem;
  font-size: 0.373333rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  line-height: 0.373333rem;
}

.type_1 .right {
  flex-grow: 1;
  padding: 0.133333rem;
  justify-content: center;
}

.type_1.color_1 .left {
  border-right: 0.026667rem dashed rgba(234, 128, 51, 1);
}

.color_1 {
  border: 0.026667rem solid rgba(234, 128, 51, 1);
  color: rgba(234, 128, 51, 1);
}

.color_1 .pick_now {
  background-color: rgba(234, 128, 51, 1);
}

.color_1.coupon_child .top {
  border-bottom: 0.026667rem dashed rgba(234, 128, 51, 1);
}

.type_1.color_2 .left {
  border-right: 0.026667rem dashed #4d7ae8;
}

.color_2 {
  border: 0.026667rem solid #4d7ae8;
  color: #4d7ae8;
}

.color_2 .pick_now {
  background-color: #4d7ae8;
}

.color_2.coupon_child .top {
  border-bottom: 0.026667rem dashed #4d7ae8;
}

.type_1.color_3 .left {
  border-right: 0.026667rem dashed #4bc489;
}

.color_3 {
  border: 0.026667rem solid #4bc489;
  color: #4bc489;
}

.color_3 .pick_now {
  background-color: #4bc489;
}

.color_3.coupon_child .top {
  border-bottom: 0.026667rem dashed #4bc489;
}

.type_1 .coupon .little {
  font-size: 0.48rem;
  display: flex;
  flex-direction: column-reverse;
}

.type_1 .top {
  position: relative;
  z-index: 0;
  font-size: 0.373333rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 0.426667rem;
  height: auto;
}

.type_1 .bottom {
  font-size: 0.266667rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(234, 128, 51, 1);
  line-height: 0.426667rem;
}

.type_1 .coupon .big {
  font-size: 1.28rem;
  padding: 0;
  position: relative;
  left: -0.1rem;
  letter-spacing: -0.106667rem;
  flex-direction: column;
  line-height: 1rem;
}

.type_2.type_1 .coupon .little {
  font-size: 0.373333rem;
}

.type_2.type_1 .coupon {
  flex-direction: column;
}

.type_2.type_1 .coupon .big {
  font-size: 0.96rem;
  letter-spacing: -0.08rem;
  line-height: 0.6rem;
}

.type_1 .flex_column {
  margin-left: 0.12rem;
  padding-top: 0.093333rem;
}

.type_1 .pick_now {
  width: 1.013333rem;
  height: 1.013333rem;
  border-radius: 50%;
  font-size: 0.266667rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.326667rem;
  padding: 0.18rem;
  margin: 0.213333rem 0.266667rem 0 0;
}

.long_row {
  width: auto;
  display: flex;
  padding: 0.213333rem;
  display: -webkit-flex;
  overflow: auto;
}

.coupon_child {
  width: 3.28rem;
  height: 1.786667rem;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.026667rem 0.053333rem 0rem rgba(0, 0, 0, 0.09);
  border-radius: 0.053333rem 0.053333rem 0.106667rem 0.106667rem;
  margin-right: 0.186667rem;
}

.coupon_child .top {
  position: relative;
  z-index: 0;
  padding-bottom: 0.053333rem;
}

.coupon_child .top .little {
  font-size: 0.373333rem;
  display: flex;
  flex-direction: column-reverse;
}

.coupon_child .top .big {
  font-size: 0.96rem;
  line-height: 0.96rem;
}

.coupon_child .coupon_name {
  font-size: 0.32rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 0.373333rem;
}

.coupon_child .full {
  font-size: 0.266667rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 0.32rem;
}

.coupon_child .bottom .pick_now {
  width: 2.106667rem;
  color: white;
  border-radius: 0.213333rem;
  height: 0.426667rem;
  line-height: 0.426667rem;
  font-size: 0.266667rem;
}
.coupon_child .little {
  padding-bottom: 0.13rem;
}
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
  line-height: 0.586667rem;
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

.closeCoupon {
  width: 1.093333rem;
  height: 1.093333rem;
  position: absolute;
  bottom: -1.6rem;
  left: 3.266667rem;
}

// 优惠券相关结束
</style>
