<template>
  <div id="grouptime">
    <mt-header title="拼团详情" class='centers'>
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>
    <!--商品-->
    <div class="shoptop" v-if='participateDetails.status'>
      <p><img :src="participateDetails.image |filterss(2)" /></p>
      <p style="padding:0 .3rem;">
        <span>{{participateDetails.name}}</span>
        <span>
          <em>￥{{participateDetails.spellPrice}}</em>拼团省8888元</span>
        <span>{{participateDetails.participateNum}}人拼团</span>
      </p>
    </div>
    <!--time-->
    <div class="top" v-if="participateDetails.status==0||participateDetails.status==1">
      <p @click="invite">邀请好友拼团</p>
    </div>
    <section>
      <!--<p v-if='participateDetails.status==3' class="fail_group"><span><img src="../../common/image/group/wran.png"/></span><span>拼团失败，款项将原路返回</span></p>-->
      <!--<p class="losebtn" v-if='participateDetails.status==3'>0元好物免费领</p>-->
      <p class="sucStatus" v-if="participateDetails.status === 2">拼团成功</p>
      <p class="falStatus" v-if="participateDetails.status === 3">拼团失败</p>
      <p class="time" v-if="participateDetails.status !== 2  && participateDetails.status !== 3">
        <span>{{times.hour || '00'}}</span>
        <span class="dian">:</span>
        <span>{{times.min || '00'}}</span>
        <span class="dian">:</span>
        <span>{{times.sec || '00'}}</span>
      </p>
      <ul class="grouplist">
        <li v-for="(item,index) in participateDetails.participateDetails" style="width: 1rem;height: 1rem;">
          <p>
            <span v-if='index==0'>拼主</span><img :src="item.face |filterss(4)" :onerror="logo" /></p>
        </li>
      </ul>
      <p v-if="participateDetails.status !== 2 && participateDetails.status !== 3 ">还差{{participateDetails.completeNum-participateDetails.participateNum>0?participateDetails.completeNum-participateDetails.participateNum:0}}人，人满才算拼团成功</p>
      <p v-if="participateDetails.status == 2 ">已满{{participateDetails.completeNum}}人，恭喜您拼团成功~</p>
      <p v-if="participateDetails.status == 3 ">拼团失败，款项将原路返回</p>
      <!--<p class="shopname" v-if='participateDetails.status<3'>-->
      <!--<span>商品名称</span>-->
      <!--<span>{{participateDetails.goodsTitle}}</span> &lt;!&ndash;Apple iPhoneX（A1865）64GB 黑色&ndash;&gt;-->
      <!--</p>-->

      <p class="notice">
        <span>拼团须知</span>
        <span>拼团说明</span>
        <!--<span &lt;!&ndash;v-if="this.participateDetails.spellType == 0"&ndash;&gt; &lt;!&ndash;@click="explain"&ndash;&gt;>&lt;!&ndash;人满发货 人不满退款 &ndash;&gt;拼团说明</span>-->
        <!--<span v-if="this.participateDetails.spellType == 1" @click="explain">等待开奖 拼团说明</span>-->
      </p>
    </section>

    <div class="footer">
      <ul class="desc">
        <li v-for="(item,index) in goodsList" @click="goodsdetail(item)">
          <div class="desc_img">
            <img :src="item.image |filterss(2)" :onerror='logo' />
          </div>
          <div class="name">
            <p>{{item.goodsName}}</p>
            <p>
              <span>￥{{Number(item.goodsPrice).toFixed(2)}}</span>
              <span>￥{{item.goodsMktprice}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!--<mt-popup popup-transition="popup-fade" position="center" v-model='moress' class='popups'>
			<div class="morelist">
				<p class="title"><img :src="participateDetails.participateDetails[0].face" :onerror="logo"/></p>
				<p>参与拼团，每天那好货~</p>
				<p>
					<span>你也可以参与拼团低价拿哦，<br />快去挑选心仪的商品吧~</span>
				</p>
				<p>去APP拼团那好货</p>
			</div>
		</mt-popup>-->
    <mt-popup popup-transition="popup-fade" position="top" v-model='mast' class='popups'>
      <div class="masts" @click="mastss">

      </div>
    </mt-popup>
    <!--<mt-popup popup-transition="popup-fade" position="center" v-model='poprule' class='popups' closeOnClickModal>-->
      <!--<div class="popcontent">-->
        <!--<p class="back" @click="clears"><img src="../../common/image/appraise/back.png" /></p>-->
        <!--<div class="details">-->
          <!--<p>活动规则</p>-->
          <!--<ul>-->
            <!--<li v-for="item in ruless">{{item}}</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->
    <!--</mt-popup>-->
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
import wx from "weixin-js-sdk";
import wxlogin from "../../common/js/wxlogin";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      participateDetails: [],
      goodsList: [],
      logo: 'this.src="' + require("../../common/image/defaultimg.png") + '"',
      moress: false,
      mast: false,
      ruless: [],
      times: {
        houe: "",
        min: "",
        sec: ""
      },
      // poprule: false,
      binding: false,
      mobile: "",
      codes: "",
      states: true
    };
  },
  mounted() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.match(/MicroMessenger/i) == "micromessenger") {
      console.log(sessionStorage.getItem("token"));
      if (sessionStorage.getItem("token") == null) {
        wxlogin(
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            this.$urlstate.appid +
            "&redirect_uri=https%3a%2f%2f" +
            this.$urlstate.url +
            "%2f%23%2fgroup%2fgrouptime%3factivityId%3d" +
            this.$route.query.activityId +
            "%26spellId%3d" +
            this.$route.query.spellId +
            "&response_type=code&scope=snsapi_userinfo#wechat_redirect",
          this
        );
      }
    }

    this.$axios({
      method: "post",
      url: "/spell/anon/getSpellDetail",
      responseType: "json",
      data: {
        spellId: this.$route.query.spellId,
        token: sessionStorage.getItem("token")
      }
    })
      .then(data => {
        // console.log(data)
        this.participateDetails = data.data.res_data.spell;
        this.goodsList = data.data.res_data.recomendedList;
        // this.ruless = data.data.res_data.spell.rules;
        // if (this.ruless) {
        //   // let a = this.ruless.split("\r\n");
        //   // this.ruless = a.splice(0, a.length);
        //   return;
        // }
        this.settime(this.participateDetails.endDate);
        this.fenxiang();
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    // explain() {
    //   this.poprule = true;
    // },
    // clears() {
    //   this.poprule = false;
    // },
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
    bidingmobile() {
      console.log(this.states);
      if (this.states) {
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
    fenxiang() {
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
          console.log(data);
          let datas = data.data.res_data.sign_info;
          this.wxInit(datas);
        })
        .catch(err => {
          console.log(err);
        });
    },
    mastss() {
      this.mast = false;
    },
    settime(timestamp) {
      console.log(timestamp);
      let that = this;
      let timer = setInterval(function() {
        let nowTime = new Date();
        let endTime = new Date(timestamp);
        let t = endTime.getTime() - nowTime.getTime();
        if (t > 0) {
          let day = Math.floor(t / 86400000);
          let hour = Math.floor(t / 3600000);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";

          if (day > 0) {
            // 		  if(day-1>0){
            //   hour=Number(hour)+(day-1)*24;
            //   that.times.hour=hour
            //   that.times.min=min
            //   that.times.sec=sec
            // }else{
            that.times.hour = hour;
            that.times.min = min;
            that.times.sec = sec;
            // }
            // format = `${hour}: ${min}: ${sec}`;
          }
          if (day <= 0 && hour > 0) {
            that.times.hour = hour;
            that.times.min = min;
            that.times.sec = sec;
            // format = `${hour}: ${min}: ${sec}`;
          }
          if (day <= 0 && hour <= 0) {
            that.times.hour = "";
            that.times.min = min;
            that.times.sec = sec;
            // format = `${'00'}: ${min}: ${sec}`;
          }
        } else {
          clearInterval(timer);
        }
      }, 1000);
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
      var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      let imgsurl = that.filter(that.participateDetails.shareImage);
      wx.ready(function() {
        let obj = {
          title: that.participateDetails.shareTitle, // 分享标题
          desc: that.participateDetails.shareDescribe, //分享介绍
          // link: 'http://test.cheertea.com/?#/group/grouptimes?spellId=' + that.$route.query.spellId + '&activityId=' + that.$route.query.activityId,
          link:
            "http://" +
            that.$urlstate.url +
            "/?#/group/grouptimes?spellId=" +
            that.$route.query.spellId +
            "&activityId=" +
            that.$route.query.activityId,
          imgUrl: imgsurl, // 分享图标

          success: function(res) {
            console.log(res);
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
    backgo() {
      this.$router.go(-1);
    },
    invite() {
      this.mast = true;
    },
    goodsdetail(val) {
      console.log(val);
      this.$router.push({
        path: "/goods/detail",
        query: { goodsId: val.goodsId }
      });
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
#grouptime {
  background: #eee;
  .centers {
    padding: 0.3rem;
    background: #fff;
    color: black;
    height: auto;
    font-size: 0.5rem;
  }
  .top {
    padding: 0.2rem;
    background: white;
    text-align: center;
    margin-bottom: 0.2rem;
    p:nth-child(2) {
      font-size: 0.4rem;
      margin-bottom: 0.5rem;
    }
    p:last-child {
      font-size: 0.4rem;
      color: white;
      background: orangered;
      border-radius: 0.2rem;
      padding: 0.3rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
    }
  }
  .shoptop {
    padding: 0.2rem;
    display: flex;
    background: white;
    justify-content: space-around;
    margin-bottom: 0.2rem;
    p:nth-child(1) {
      flex: 1;
      img {
        width: 100%;
      }
    }
    p:nth-child(2) {
      flex: 2;
      span:nth-child(1) {
        font-size: 0.4rem;
        display: block;
        height: 2.2rem;
      }
      span:nth-child(2) {
        color: #999;
        display: block;
        em {
          color: red;
          font-size: 0.5rem;
          margin-right: 0.2rem;
        }
      }
      span:last-child {
        color: #999;
      }
    }
  }
  section {
    padding: 0.2rem;
    background: white;
    text-align: center;

    .sucStatus {
      padding: 0.2rem;
      text-align: center;
      font-size: 0.4rem;
      border-bottom: solid 0.05rem rgb(240, 240, 240);
    }
    .falStatus {
      padding: 0.2rem;
      text-align: center;
      font-size: 0.4rem;
      border-bottom: solid 0.05rem rgb(240, 240, 240);
    }

    .time {
      margin-bottom: 0.3rem;
      font-size: 0.3rem;
      display: inline-block;
      line-height: 0.6rem;
      span {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 0.1rem;
        background: rgb(51, 51, 51);
        color: white;
      }
      .dian {
        display: inline-block;
        height: 0.6rem;
        width: 0.1rem;
        line-height: 0.6rem;
        background: white;
        border: none;
        color: black;
      }
    }
    .grouplist {
      display: flex;
      justify-content: center;
      padding-bottom: 0.2rem;
      padding-top: 0.2rem;
      li {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
        p {
          position: relative;
          border-radius: 100%;
          height: 100%;
          span {
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 0.2rem;
            background: orangered;
            color: white;
          }
        }
      }
    }
    .shopname {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 0;
      span {
        display: inline-block;
      }
      span:last-child {
        width: 4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #ccc;
        white-space: nowrap;
      }
    }
    .notice {
      padding-bottom: 0.2rem;
      margin-bottom: 0.2rem;
      padding-top: 0.3rem;
      display: flex;
      justify-content: space-between;
      span {
        display: inline-block;
      }
      span:last-child {
        width: auto;
        max-width: 6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #ccc;
        white-space: nowrap;
      }
    }
    .losebtn {
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      margin-bottom: 0.2rem;
      background: orangered;
      color: white;
      text-align: center;
      padding: 0.3rem;
      border-radius: 0.2rem;
      font-size: 0.4rem;
    }
    .fail_group {
      font-size: 0.35rem;
      margin-bottom: 0.1rem;
      vertical-align: middle;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.3rem;
        margin-bottom: 0.1rem;
        vertical-align: middle;
      }
    }
  }
  .footer {
    padding: 0.2rem;
    .desc li:nth-child(2n + 1) {
      margin-right: 2%;
    }
    .desc li {
      box-sizing: border-box;
      width: 49%;
      border: 1px solid #e6e6e6;
      margin-right: -1px;
      margin-bottom: 0.2rem;
      float: left;
      background: white;
      .desc_img {
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
          min-height: 5rem;
          max-height: 5rem;
        }
      }
    }
    .name {
      padding: 5px;
      overflow: hidden;
      p:nth-child(1) {
        height: 0.8rem;
      }
      p:nth-child(2) {
        width: 100%;
        min-height: 24px;
        margin-top: 10px;
        line-height: 20px;
        /*float: left;*/
        margin-left: -0.1rem;
        font-size: 0.4rem;
        display: flex;
        justify-content: space-between;
        span:first-child {
          color: red;
          display: inline-block;
        }
        span:last-child {
          color: #ccc;
          text-decoration: line-through;
          display: inline-block;
        }
      }
    }
  }
  .footer:after {
    content: "";
    display: block;
    clear: both;
  }
  .mint-popup {
    border-radius: 0.2rem;
    width: 90%;
    /*height: 5rem;*/
    .morelist {
      position: relative;
      text-align: center;
      margin-bottom: 0.3rem;
      p:nth-child(2) {
        margin-top: 1.5rem;
        color: #ccc;
      }
      .title {
        position: absolute;
        top: -2.5rem;
        left: 38%;
        width: 2rem;
        height: 2rem;
        img {
          width: 100%;
          border-radius: 100%;
          border-radius: 100%;
        }
      }
      p:nth-child(3) {
        font-size: 0.4rem;
        margin-top: 0.3rem;
        line-height: 2.5;
      }
      p:nth-child(4) {
        margin-left: 0.4rem;
        margin-right: 0.4rem;
        background: orangered;
        color: white;
        text-align: center;
        padding: 0.3rem;
        border-radius: 0.2rem;
      }
    }
  }
  .mint-popup {
    background: none;
    .masts {
      width: 10rem;
      height: 10rem;
      background: url(../../common/image/mast.png) no-repeat;
      background-position-y: 0.2rem;
      background-position-x: 2.5rem;
    }
  }
  .popups {
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
        background-color: white;
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
