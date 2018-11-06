<template>
  <div id="myQrcode">
    <mt-header :title="msg" class='center'>
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>
          <!-- <img :src="codePic |filterss(2)"  class="code" :onerror="logoNoraml" style="position:absolute;z-index:7;width:4rem;height:4rem; left: 3rem;
    top: 59%;" /> -->
    <div >
      <!-- <div class="content">
        <div class="log">
          <div>
            <p v-if="(memberInfo.face === null)" style="color: white">头像加载失败</p>
            <h1><img v-if="(memberInfo.face !== null)" :src="memberInfo.face |filterss(3)" style="border-radius:10rem;"
                                                  alt="" /></h1>
          </div>

        </div>
        <div class="title">
          <p><span>{{memberInfo.nickname}}</span><span v-if="memberInfo.identityId==1">店长</span><span v-else>普通会员</span></p>
          <p>ID：{{memberInfo.memberId}}</p>
        </div>
        <div class="center">
        </div>
      </div> -->
      <img :src="imgSrc" style="width:100%" />
    </div>
    <!--<mt-popup popup-transition="popup-fade" position="center" class="popups" v-model='binding' closeOnClickModal>-->
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
  import wx from 'weixin-js-sdk';
  import qr from 'qr.js'
  export default{
    data(){
      return{
        logoNoraml: 'this.src="' + require('../../common/image/qrcodeimg/qrcodes.jpg') + '"',
        detail:[],
        memberInfo:'',
        memberCode:'',
        dataUrl:'',
        size:280,
        bgColor: '#fff',
        fgColor: '#000',
        value: '',
        codePic:'',
        juyoulogo:'',
//		         logo: '',
        logo: require('../../common/image/defaultimg.png'),
        msg:'',
        clicks:true,
        mobile:"",
        codes:'',
        // binding:false,
        memberId:'',
        imgSrc:'',
        states:true
      }
    },

    methods:{
      logins(){
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        let token = sessionStorage.getItem("token")

        if(token == null) {
          if(r == null) {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2fmyQrcode%3f'+'sharetoken%3d'+this.$route.query.sharetoken+'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
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
              sessionStorage.details = JSON.stringify(data.data.res_data);
              // if(data.data.res_data.member && data.data.res_data.returnCode==0 ){
                sessionStorage.details=JSON.stringify(data.data.res_data.member)
                sessionStorage.token=data.data.res_data.token
                window.location.reload()
              // }
              // if(data.data.res_data.returnCode==0){
              //   this.binding=true;
              // }
              // window.location.reload()
            }).catch(err=>{
              console.log(err)
            })
          }
        }
      },
      gaincodes(){
        // console.log(111)
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
      // bidingmobile(){
      //   if(this.states) {
      //     this.states = false
      //     var member = JSON.parse(sessionStorage.details)
      //     console.log(member)
      //     let obj = {
      //       'authType': 1,
      //       'face': member.face,
      //       'memberStatus': member.memberStatus,
      //       'mobile': this.mobile,
      //       'mobileCode': this.codes,
      //       'nickname': member.nickname,
      //       'openId': member.openId,
      //       'sex': member.sex,
      //       'subscribe': member.subscribe,
      //       'type': 8,
      //       'unionId': member.unionId
      //     }
      //     this.$axios({
      //       method: 'post',
      //       url: "/basics/anon/loginAuthorizedCode",
      //       responseType: 'json',
      //       data: obj
      //     }).then(data => {
      //       console.log(data)
      //       if (data.data.res_code == 0) {
      //         this.binding = false
      //         sessionStorage.details = JSON.stringify(data.data.res_data.member)
      //         sessionStorage.token = data.data.res_data.token
      //         // alert('恭喜你绑定手机号成功啦');
      //         // location.reload();
      //         if(this.$route.query.memberId){
      //           this.memberId=this.$route.query.memberId
      //         }
      //         var url;
      //
      //         let token = sessionStorage.getItem("token");
      //         // alert('反正获取到了token')
      //         if (this.$route.query.sharetoken){
      //           // alert("使用别人分享出的token请求")
      //           url = "member/getMemberTwoCodeImg"+"?token="+this.$route.query.sharetoken
      //         }
      //         else{
      //           // alert("使用自己出去的token请求")
      //           url = "member/getMemberTwoCodeImg"+"?token="+token
      //         }
      //
      //         let us = window.location.href.split('#')[0];
      //         this.$axios({
      //           method: 'post',
      //           url: '/basics/anon/wxSign',
      //           responsetype: 'json',
      //           data: {
      //             url: us
      //           }
      //         }).then(data => {
      //           let datas = data.data.res_data.sign_info
      //           this.wxInit(datas)
      //         }).catch(err => {
      //           console.log(err)
      //         })
      //
      //
      //
      //         this.$axios({
      //           method:'get',
      //           url:url,
      //           responseType: 'json'
      //         }).then(data=>{
      //           this.imgSrc = data.data.res_data.imgPath;
      //           this.juyoulogo=data.data.res_data.shareIconPath;
      //           this.memberInfo=data.data.res_data.member
      //
      //           if(this.memberInfo.identityId==1){
      //             this.msg='我是店长'
      //           }else{
      //             this.msg='普通会员'
      //           }
      //         }).catch(e=>{
      //           console.log(e);
      //         })
      //       } else {
      //         alert(data.data.res_info)
      //         this.states=true
      //       }
      //
      //       if (data.data.res_data.member.subscribe != 1) {
      //         sessionStorage.clear();
      //         localStorage.clear();
      //         sessionStorage.numberss = 3
      //         this.code = true
      //       }
      //     }).catch(err => {
      //       console.log(err);
      //     })
      //   }
      // },
      backgo(){
        this.$router.push('/')
      },
      // update () {
      //   if(this.$urlstate==1){
      //     this.value = "https://open.weixin.qq.com/connect/oauth2/authorize?" +"appid="+this.$urlstate.appid+"&redirect_uri=https%3a%2f%2f"+this.$urlstate.appid+"%2f%23%2flogin&response_type=code&scope=snsapi_userinfo&state="+this.memberInfo.memberId+"#wechat_redirect";
      //   }else if(this.$urlstate==2){
      //     this.value = "https://open.weixin.qq.com/connect/oauth2/authorize?"+"appid="+this.$urlstate.appid+"&redirect_uri=https%3a%2f%2f"+this.$urlstate.appid+"%2f%23%2flogin&response_type=code&scope=snsapi_userinfo&state="+this.memberInfo.memberId+"#wechat_redirect";
      //   }
      //
      //   // if(this.memberInfo.weixinFace==null){
      //   // 	console.log('11111');
      //   // 	this.logo = '../../common/image/defaultimg.png';
      //   // }
      //   // else{
      //   // 	console.log('22222');
      //   // 	this.logo = this.memberInfo.weixinFace;
      //   // }
      //   // console.log('1234');
      //   // console.log(this.logo)
      //   // console.log(this.value)
      //   // this.value = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf3c95148add7878f&redirect_uri=https%3a%2f%2fht.cheertea.com%2f%23%2flogin&response_type=code&scope=snsapi_userinfo#wechat_redirect';
      //   // console.log(this.value);
      //   // console.log(this.value.length);
      //   const qrcode = qr(this.value)
      //   const canvas = this.$refs.canvas
      //   const ctx = canvas.getContext('2d')
      //   const size = this.size / qrcode.moduleCount
      //   const scale = window.devicePixelRatio / this.getPixelRatio(ctx)
      //   canvas.height = canvas.width = this.size * scale
      //   ctx.scale(scale, scale)
      //   qrcode.modules.forEach((row, rdx) => {
      //     row.forEach((cell, cdx) => {
      //       ctx.fillStyle = cell ? this.fgColor : this.bgColor
      //       var w = (Math.ceil((cdx + 1) * size) - Math.floor(cdx * size))
      //       ctx.fillRect(Math.round(cdx * size), Math.round(rdx * size), w, w)
      //     })
      //   })
      //   if (this.logo) {
      //     var image = document.createElement('img')
      //     image.src = this.logo
      //     image.setAttribute("crossOrigin",'Anonymous')
      //     image.onload = () => {
      //       var dwidth = this.size * 0.2
      //       var dx = (this.size - dwidth) / 2
      //       var dheight = image.height / image.width * dwidth
      //       var dy = (this.size - dheight) / 2
      //       image.width = dwidth
      //       image.height = dheight
      //       ctx.drawImage(image, dx, dy, dwidth, dheight)
      //       this.dataUrl = canvas.toDataURL()
      //       console.log(this.dataUrl)
      //     }
      //   }
      // },
      getPixelRatio (ctx) {
        return ctx.webkitBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
      },
      wxInit(res) {
        let that = this;
        // alert('我触发了微信分享，分享出去的链接是'+'http://'+that.$urlstate.url+'/?#/myQrcode?memberId='+that.$route.query.memberId+'&sharetoken='+sessionStorage.getItem('token'))
        wx.config({
          //					debug:true,
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'hideMenuItems'],
        });
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
          wx.ready(function() {
          var links=window.location.href;
          if (that.$route.query.sharetoken) {
            var obj = {
              title: '我发现一个好商城，欢迎选购 ', // 分享标题
              desc: '品类齐全、品质保障，正品低价、快速配送，拼团砍价、优惠多多......',
//						link: 'http://test.cheertea.com/?#/myQrcode?memberId=' + that.$route.query.memberId,
              link:'http://'+that.$urlstate.url+'/?#/myQrcode?memberId='+that.$route.query.memberId+'&sharetoken='+that.$route.query.sharetoken,
              imgUrl: that.juyoulogo, // 分享图标

              success: function(res) {
                console.log(res)
              },
              cancel: function(err) {
                console.log(err)
              }
            }
          }
          else{
            var obj = {
              title: '我发现一个好商城，欢迎选购 ', // 分享标题
              desc: '品类齐全、品质保障，正品低价、快速配送，拼团砍价、优惠多多......',
//						link: 'http://test.cheertea.com/?#/myQrcode?memberId=' + that.$route.query.memberId,
              link:'http://'+that.$urlstate.url+'/?#/myQrcode?memberId='+that.$route.query.memberId+'&sharetoken='+sessionStorage.getItem('token'),
              imgUrl: that.juyoulogo, // 分享图标

              success: function(res) {
                console.log(res)
              },
              cancel: function(err) {
                console.log(err)
              }
            }
          }

          wx.onMenuShareAppMessage(obj)
          wx.onMenuShareTimeline(obj)
          wx.onMenuShareQQ(obj)
          wx.onMenuShareQZone(obj)
        })

      },
    },
    mounted(){
      if(sessionStorage.getItem('token') == null){
        this.logins();
      } else{
        // if(this.$route.query.memberId){
        //   this.memberId=this.$route.query.memberId
        // }
        // alert('dassdsadsad')
        var url;

        let token = sessionStorage.getItem("token");
        // alert(token)
        if (this.$route.query.sharetoken != null && this.$route.query.sharetoken != 'undefined'){
          // alert("使用别人分享出的token请求")
           url = "member/getMemberTwoCodeImg"+"?token="+this.$route.query.sharetoken
        }
        else{
          // alert("使用自己出去的token请求")
          url = "member/getMemberTwoCodeImg"+"?token="+token
        }

        let us = window.location.href.split('#')[0];
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



        this.$axios({
          method:'get',
          url:url,
          responseType: 'json'
        }).then(data=>{
          this.imgSrc = data.data.res_data.imgPath;
          this.juyoulogo=data.data.res_data.shareIconPath;
          this.memberInfo=data.data.res_data.member

          if(this.memberInfo.identityId==1){
            this.msg='我是店长'
          }else{
            this.msg='普通会员'
          }
        }).catch(e=>{
          console.log(e);
        })
        // this.$axios({
        //   method:'post',
        //     url:'/member/anon/myTwoDimensionCode',
        //   responseType: 'json',
        //   data:{
        //     memberId:this.memberId
        //   }
        // }).then(data=>{
        //   this.codePic = data.data.res_data.codePath;
        //  this.juyoulogo=data.data.res_data.shareIconPath;
        // this.memberInfo=data.data.res_data.member
        //
        // if(this.memberInfo.identityId==1){
        //   this.msg='我是店长'
        // }else{
        //   this.msg='普通会员'
        // }
        //
        //   let us = window.location.href.split('#')[0];
        //   this.$axios({
        //     method: 'post',
        //     url: '/basics/anon/wxSign',
        //     responsetype: 'json',
        //     data: {
        //       url: us
        //     }
        //   }).then(data => {
        //     let datas = data.data.res_data.sign_info
        //     this.wxInit(datas)
        //   }).catch(err => {
        //     console.log(err)
        //   })
        //
        //
        // }).catch(err=>{
        //   console.log(err)
        // })
//			 this.update()
      }
    },

  }
</script>

<style lang="scss" scoped>
  #myQrcode{
    .popups{
      width: 98%;
      border-radius: .3rem;
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
    .center{
      background:#fff;
      color:black;
      height:auto;
      font-size:.5rem;
    }
    .main{
      position: absolute;
      top:0.5rem;
      bottom:0;
      width: 100%;
      /*height: 100%;*/
      background:url(../../common/image/qrcodeimg/mycold.png) no-repeat;
      background-size: 100% 100%;
      z-index: -1;
      .content{
        margin: 0 auto;
        margin-top:2.5rem;
        position: relative;
        .log{
          width:2rem;
          height: 2rem;
          border-radius: 50%;
          position: absolute;
          left:4rem;
          h1{
            width:2rem;
            height: 2rem;
            z-index: 10000;
            img{
              width: 100%;
              height: 100%;
            }
          }

        }
        .title{
          width:100%;
          position: absolute;
          top:2.5rem;
          text-align: center;
          font-size: .4rem;
          line-height:.6rem;
          overflow: hidden;
          margin-bottom: 3rem;
          span{
            padding: 5px;
          }
          span:nth-child(2){
            border: 1px solid #ff403c;
            color: #ff403c;
            padding: 0;
            padding-left:5px;
            padding-right:5px;
            border-radius: 20px;
          }
        }
      }
      .center{
        position: absolute;
        background: none;
        width:100%;
        top:2rem;
        display: flex;
        justify-content: center;
        .code{
          width: 40%;
          height:40%;
          margin-top:4.5rem;
        }
      }
      .btn{
        position: absolute;
        bottom:1.5rem;
        left: 2.6rem;
        input{
          padding: 10px;
          padding-left:30px;
          padding-right:30px;
          background:#ff403c;
          color: white;
          font-size: .5rem;
          border-radius: 10px;
        }
      }
      .upload-tips{
        text-align: center;
        font-size:.37rem;
        color:#999999;
        position: absolute;
        left: 0;
        top:10.8rem;
        width: 100%;
      }

    }
    .main:after{
      display: block;
      content: '';
      clear: both;
    }
  }
</style>
