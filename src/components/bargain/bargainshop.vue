<template>
	<div id="barginshop">
		<mt-header flexd title="巨柚砍价" class="header">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
			<!--<mt-button icon="more" slot="right"></mt-button>-->
		</mt-header>
		<div class="top">
			<mt-swipe :auto="2500" class="banner">
				<mt-swipe-item v-for="(item,index) in images">
					<img :src="item.img" @click="specials(index)" />
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<p class="ad">
			<marquee behavior="scroll" direction="left" width="100%" scrollamount="5" v-if="bargainmenr.length>0">
				<ul>
					<li v-for="item in bargainmenr"><img :src="item.weixinFace |filterss(3)" />{{item.nickname}}</li>
				</ul>
			</marquee>
		</p>
		<div class="main">
			<ul>
				<li class="list" v-for="(item,index) in shopList">
					<p class="img"><img :src="item.image |filterss(3)" /></p>
					<div class="content">
						<p class="title">{{item.title}}</p>
						<p>
							<span>{{item.recipientNum}}人已{{item.targetPrice}}元拿到</span><br />
							<span>原价{{item.goodsPrice}}元</span>
							<span class="btn" @click="btn(item)">砍价{{item.targetPrice}}元得</span>
						</p>
					</div>
				</li>
			</ul>
		</div>
		<footer>
			<p><i class="icon shop"></i>砍价商品</p>
			<p @click="my"><i class="icon mybar"></i>我的砍价</p>
		</footer>
    <mt-popup popup-transition="popup-fade" position="center" v-model='code' class='popups' closeOnClickModal>
      <div class="code">
        <!--巨柚-->
        <p v-if="this.$urlstate.numb==2"><img src="../../common/image/attentionCode.jpg" ></p>
        <!--天禾露-->
        <p v-else><img src="../../common/image/attentionCode.jpg" ></p>
        <p><span>快帮好友砍价吧！</span><br><span>长按二维码关注公众号</span><br><span>关注后点击右上角按钮刷新页面</span></p>
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
  import wx from 'weixin-js-sdk';
	export default {
		data() {
			return {
				images: [{
					'img': require('../../common/image/bargain/bargainbg.png')
				}],
				shopList: [],
				token: '',
				bargainmenr: [],
        code:false,
        clicks:true,
        mobile:"",
        codes:'',
        binding:false,
        states:true
			}
		},
		mounted() {
		  sessionStorage.removeItem('state');
			var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			let token = sessionStorage.getItem("token")

			if(token == null) {
        if(sessionStorage.numberss=='3'){
          sessionStorage.clear();
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2fbargain%2fbargainshop%3fstate%3d0&response_type=code&scope=snsapi_userinfo#wechat_redirect';
        }
				if(r == null) {
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2fbargain%2fbargainshop%3fstate%3d0&response_type=code&scope=snsapi_userinfo#wechat_redirect';
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
            }
            if(data.data.res_data.returnCode==0){
              this.binding=true;
            }
          }).catch(err=>{
            console.log(err)
          })
				}
			}
			this.$axios({
				method: 'post',
				url: '/bargain/anon/bargainGoodsList',
				responseType: 'json',
				data: {
					pageNo: 0,
					pageSize: 0
				}
			}).then(data => {
				this.shopList = data.data.res_data.dataList
				for(let i = 0; i < this.shopList.length; i++) {
					var a = parseInt(Math.random() * (667 - 1) + 500)
					this.shopList[i].recipientNum += a;
				}
        this.fenxang()
			}).catch(err => {
				console.log(err)
			})
			this.$axios({
				method: 'post',
				url: '/bargain/anon/bargainCarouselMessage',
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



			backgo() {
			  sessionStorage.removeItem('numberss')
				this.$router.push('/Percenter')
			},
			btn(val) {
				this.token = sessionStorage.getItem('token')
        let member=JSON.parse(sessionStorage.details)
        if(member.subscribe!='1'){
          sessionStorage.clear();
          localStorage.clear();
          sessionStorage.numberss=3;
          this.code=true;
        }else {
          this.$axios({
            method: 'post',
            url: '/bargain/createBargainOrder',
            responsetype: 'json',
            data: {
              token: this.token,
              bargainId: val.bargainId
            }

          }).then(data => {
            if(data.data.res_code == 0) {
              this.$router.push({
                path: '/bargain/bargainCont',
                query: {
                  orderid: data.data.res_data.bargainGoods.orderId,
                  token: this.token
                }
              })
            } else {
              alert(data.data.res_info)
            }
          }).catch(err => {
            console.log(err)
          })
        }

			},
			my() {
				this.$router.push({
					path: '/bargain/bargainlist',
					query: {
						state: 1,
						token: this.token
					}
				})
			}
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
		}
		.top {
			height: 3.5rem;
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
			padding: .2rem;
			background: white;
			margin-bottom: 1.5rem;
			.list {
				height: 3rem;
				display: flex;
				justify-content: space-between;
				margin-bottom: .2rem;
				.img {
					flex: 1;
					float: left;
					height: 3rem;
					margin-right: .2rem;
					img {
						width: 100%;
						height: 100%;
						margin-right: .2rem;
					}
				}
				.content {
					flex: 2;
					font-size: .4rem;
					box-sizing: border-box;
					border-bottom: 1px solid #ccc;
					p:first-child {
						/*margin-bottom:1rem;*/
					}
					p:last-child {
						line-height: 1;
						color: #CCCCCC;
						font-size: .3rem;
						span:nth-child(3) {
							color: red;
							display: inline-block;
							margin-top: .3rem;
							font-size: .4rem;
						}
						.btn {
							margin-top: .1rem;
							display: inline-block;
							padding: .2rem;
							padding-left: .2rem;
							padding-right: .2rem;
							color: white;
							background: orangered;
							float: right;
							font-size: .3rem;
							border-radius: .2rem;
						}
					}
					.title {
						height: 1.5rem;
						max-width: 6.5rem;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						word-break: break-all;
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
      width: 87%;
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
	}
</style>
