<template>
  <div id="barginshop">
    <mt-header flexd title="1分抽大奖" class="header">
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
      <mt-button slot="right" class="rule" @click="rules()">规则</mt-button>
    </mt-header>
    <!--流程图-->
    <div class="top">
      <mt-swipe :auto="2500" class="banner">
        <mt-swipe-item v-for="(item,index) in images">
          <img :src="item.img" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--轮播人物抢购广告-->
    <p class="ad">
      <marquee behavior="scroll" direction="left" width="100%" scrollamount="5" v-if="bargainmenr.length>0">
        <ul>
          <li v-for="item in bargainmenr"><img :src="item.face |filterss(3)" />{{item.message}}</li>
        </ul>
      </marquee>
    </p>
    <!--核心列表展示-->
    <div class="main">
      <ul>
        <li v-for="(item,index) in groupList" @click="gogroup(item)">
          <p><img :src="item.image |filterss(2)" :onerror="logo" /></p>
          <p><span>{{item.goodsTitle}}</span></p>
          <p>
            <span class="prices">￥{{Number(item.spellPrice).toFixed(2)}}</span>
            <span class="priced">{{item.alreadyNum}}人拼团</span>
            <br />
            <span>去拼团</span>
          </p>
        </li>
      </ul>
    </div>
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
    <!--活动规则-->
    <mt-popup popup-transition="popup-fade" position="center" v-model='rule' class='popups' closeOnClickModal>
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
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  export default {
    data() {
      return {
        logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
        images: [{
          'img': require('../../common/image/seize/seizeProcess.png')
        }],
        shopList: [],
        groupList: [],
        token: '',
        bargainmenr: [],
        code:false,
        clicks:true,
        mobile:"",
        codes:'',
        binding:false,
        states:true,
        rule:false,
        ruless:[],
      }
    },
    mounted() {
      var mm = ["1.\t在规定的时间内，邀请好友成团，成团后有中奖资格，若开奖时间未达成拼团人数，款项将自动原路返还",
        "2.\t如存在刷单，恶意虚假用户等违规行为，平台有权判定成团无效"];
      this.ruless = mm;
      sessionStorage.removeItem('state');
      var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      let token = sessionStorage.getItem("token")

      // 获取夺宝商品列表
      if(sessionStorage.token!=null) {
        sessionStorage.removeItem('detail')
        this.$axios({
          method: 'post',
          url: '/spell/anon/getSpellSnatchPage',
          responseType: 'json',
          data: {
            pageNo: 0,
            pageSize: 0,
            sortType: 0,
            sortWay: 0,
          }
        }).then(data => {
          this.groupList = data.data.res_data.spellActivityList
        }).catch(err => {
          console.log(err)
        })
      }
      //进行微信授权登录和分享接口设置
      if(token == null) {
        if(sessionStorage.numberss=='3'){
          sessionStorage.clear();
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2fseize%2fseizeIndex%3fstate%3d0&response_type=code&scope=snsapi_userinfo#wechat_redirect';
        }
        if(r == null) {
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2fseize%2fseizeIndex%3fstate%3d0&response_type=code&scope=snsapi_userinfo#wechat_redirect';
        } else {

          this.$axios({
            method:'post',
            url:'/basics/anon/appWxAuth',
            responseType:'json',
            data:{
              code: r[2],
              reqType: 0
            }
          }).then(data=>{
            console.log(data)
            sessionStorage.details = JSON.stringify(data.data.res_data);
            if(data.data.res_data.member){
              sessionStorage.details=JSON.stringify(data.data.res_data.member)
              sessionStorage.token=data.data.res_data.token
              window.location.reload()
            }
            if(data.data.res_data.returnCode==0){
              this.binding=true;
            }
          }).catch(err=>{
            console.log(err)
          })


        }
      }

      // 轮播列表接口
      this.$axios({
        method: 'post',
        url: '/spell/anon/spellCarouselMessage',
        responType: 'json',
        data: {
          pageNo: 0,
          pageSize: 0,
        }

      }).then(data => {
        console.log(data)
        this.bargainmenr = data.data.res_data.dataList
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      fenxang(){
        let us = window.location.href.split('#')[0];
        let that = this
        // alert(us)
        this.$axios({
          method: 'post',
          url: '/basics/anon/wxSign',
          responsetype: 'json',
          data: {
            url: us
          }
        }).then(data => {
          let datas = data.data.res_data.sign_info
          this.wxInit(datas)
        }).catch(err => {
          console.log(err)
        })
      },
      bidingmobile(){
        if(this.states) {
          this.states=false
          var member = JSON.parse(sessionStorage.details)
          let obj = {
            'authType': 1,
            'face': member.face,
            'memberStatus': member.memberStatus,
            'mobile': this.mobile,
            'mobileCode': this.codes,
            'nickname': member.nickname,
            'openId': member.openId,
            'sex': member.sex,
            'subscribe': member.subscribe,
            'type': 8,
            'unionId': member.unionId
          }
          this.$axios({
            method: 'post',
            url: "/basics/anon/loginAuthorizedCode",
            responseType: 'json',
            data: obj
          }).then(data => {
            console.log(data)
            if (data.data.res_code == 0) {
              this.binding = false
              sessionStorage.details = JSON.stringify(data.data.res_data.member)
              sessionStorage.token = data.data.res_data.token
            } else {
              alert(data.data.res_info)
              this.states=true
            }

            if (data.data.res_data.member.subscribe != 1) {
              sessionStorage.clear();
              localStorage.clear();
              sessionStorage.numberss = 3
              this.code = true
            }
          }).catch(err => {
            console.log(err);
          })
        }
      },
      gaincodes(){
        console.log(111)
        let token = sessionStorage.getItem("token");
        if(this.clicks==false){
          return false
        }

        var reg = /^1[1-9]\d{9}$/;
        console.log(reg.test(this.mobile))
        if(!(reg.test(this.mobile))) {
          alert("号码不正确")
        } else {
          this.clicks=false
          let times = 60;
          var tim = document.getElementsByClassName("codebtn")[0];
          tim.innerHTML = times + "S";
          let _this=this;
          var time = setInterval(function () {
            times--;
            tim.innerHTML = times + "S";
            if (times == 0) {
              _this.clicks=true
              tim.innerHTML = "获取验证码";
              clearInterval(time);
            }
          }, 1000);
          this.$axios({
            method:'post',
            url:"/basics/anon/sendMobileCode",
            responseType: 'json',
            data:{
              mobile:this.mobile,
              type:8
            }
          }).then(data=>{
            console.log(data)
          }).catch(err=>{
            console.log(err);
          })
        }
      },
      rules(){
        this.rule = true
      },
      clears() {
        // this.popupVisible = false
        this.rule = false
        // this.moress=false
      },
      wxInit(res) {
        console.log(2222)
        let that = this;
        wx.config({
//					 debug:true,
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'hideMenuItems'],
        });



        wx.ready(function() {
          let obj = {
            title: '巨柚砍价0元得，赶快试试你的刀法！', // 分享标题
            desc: '低至0元' ,
            // link: 'http://test.cheertea.com/?#/bargain/bargainshop?state=0',
            link:'http://'+that.$urlstate.url+'/?#/bargain/bargainshop?state=0',
            imgUrl:'https://jymall.oss-cn-beijing.aliyuncs.com/other/shareIcon.jpg', // 分享图标
            success: function(res) {
              console.log(res)
            },
            cancel: function(err) {
              console.log(err)
            }
          }
          wx.onMenuShareAppMessage(obj)
          wx.onMenuShareTimeline(obj)
          wx.onMenuShareQQ(obj)
          wx.onMenuShareQZone(obj)
        })

      },

      //跳转到夺宝商品的详情页面并传递 params参数
      gogroup(val) {
        this.$router.push({path:'/group/groupdetail',query:{activityId:val.activityId,isDuobao:true}})
      },

      backgo() {
        // sessionStorage.removeItem('numberss')
        this.$router.push('/')
      },
    }
  }
</script>
<style lang="scss" scoped>
  #barginshop {
    .header {
      background: white;
      padding: 10px;
      color: black;
      font-size: .5rem;
      border-bottom: 1px solid #ccc;
      .rule{
        font-size: .35rem;
        color: rgb(153,153,153);
      }
    }
    .top {
      height: 3.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .ad {
      margin-top: .2rem;
      font-size: .4rem;
      margin-bottom: .2rem;
      border-bottom: 1px solid #ccc;
      ul {
        list-style: none;
        display: flex;
        justify-content: space-between;
        li {
          flex: 2;
          min-width: 7rem;
          margin-right: 1rem;
          max-height: 1.5rem;
          overflow: hidden;
          font-size: .3rem;
          text-overflow: ellipsis;
          word-break: break-all;
          img {
            width: .8rem;
            height: .8rem;
            border-radius: 100%;
            margin-right: .2rem;
            vertical-align: middle;
          }
        }
      }
    }
    .main {
      ul {
        background-color: rgb(240,240,240);
        li {
          margin-bottom: .3rem;
          line-height: 1;
          p:first-child {
            width: 100%;
            background-color: white;
            height: 4.53rem;
            text-align: center;
            overflow: hidden;
            img {
              width:100%;
            }
          }
          p:nth-child(2) {
            padding: .2rem;
            background-color: white;
            font-size: .35rem;
            line-height: 1.5;
            color: rgb(89,89,89);
            max-height: 1.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
            /*span{*/
              /*font-weight: bold;*/
            /*}*/
          }
          p:last-child {
            background-color: white;
            padding: .2rem;
            font-size: .3rem;
            display: flex;
            justify-content: space-between;
            vertical-align: middle;
            font-weight: 400;
            span:first-child {
              color: #F22D07;
              font-size: .45rem;
            }
            span:nth-child(2) {
              color: #CCCCCC;
              margin-left: 3.6rem;
            }
            span:last-child {
              display: inline-block;
              width: 2.266667rem;
              padding-top: .2rem;
              color: white;
              background: #F22D07;
              text-align: center;
              border-radius: .2rem;
            }
            .priced,
            .prices {
              margin-top: .3rem;
            }
            .priced{
              font-size: .3rem;
            }
          }
        }
      }
    }
    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      padding: .3rem;
      font-size: .4rem;
      border-top: 1px solid #ccc;
      background: white;
      p {
        flex: 1;
        text-align: center;
        .icon {
          vertical-align: middle;
          display: inline-block;
          width: .8rem;
          height: .8rem;
          margin-right: .2rem;
          background: url(../../common/image/bargain/banner.png) no-repeat;
          background-size: 1050%;
          background-position: -0.1rem -0.1rem;
        }
        .shop {
          background-position-y: -1rem;
        }
        .mybar {
          background-position-x: -1rem
        }
      }
      p:first-child {
        border-right: 1px solid #CCCCCC;
      }
    }
    .mint-popup{
      width: 90%;
    }
    .code{
      width: 90%;

      margin: auto;
      text-align: center;
      p:nth-child(1){
        line-height:3rem;
        font-size: .5rem;

      }
      p:nth-child(2){

        background:white;
        line-height: 2;
        text-align: center;
        font-size: .5rem;
        /*position: fixed;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        /*border-bottom-left-radius: .2rem;*/
        /*border-bottom-right-radius: .2rem;*/
      }
      img{
        margin-top: 5%;
        width: 80%;
        height: 80%;
        vertical-align: bottom;
      }
    }
    .bindingmobile{
      width: 80%;
      margin: auto;
      background: white;

      p:first-child{
        text-align: center;
        font-size: .4rem;
        font-weight: bolder;
      }
      p{
        padding: .2rem;
        margin-bottom: .2rem;
      }
      p:last-child{
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background: orangered;
        color: white;
        padding: .2rem;
      }
      .codebtn{
        color: orangered;
      }
      .icons{
        width: 0.59rem;
        height: 0.7rem;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.33rem;
        &.name-icon{
          background-position: -2.56rem -1.7rem;
        }
        &.pw-icon{
          background-position:-3.55rem -3.95rem;
        }
      }
      .input{
        display: inline-block;
        font-size:0.32rem;
        color: #999;
        width: 4.3rem;
      }
    }
    .popups {
      background: white;
      padding: .2rem;
      width: 80%;
      font-size: .3rem;
      border-radius: .2rem;
      text-align: center;

      .popcontent {
        position: relative;

        .back {
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          position: absolute;
          right: -.4rem;
          top: -.4rem;
          img {
            width: 100%;
          }
        }
        .details {
          p {
            font-size: .4rem;
            border-bottom: 1px solid #CCCCCC;
            padding: .3rem;
          }
          ul {
            li {
              line-height: 2;
              font-size: .35rem;
              text-align: left;
            }
          }
        }
      }
    }
  }
</style>
