<template>
	<div id="bargainCont">
		<mt-header flexd title="砍价免费拿" class="header">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
			<!--<mt-button icon="more" slot="right" @click='share'></mt-button>-->
		</mt-header>
		<div class="main">
			<div class="bar">
				<span style="background: none;"></span>
				<span @click="rules">活动规则</span>
			</div>
			<div class="topcontent">
				<p class="logo"><img :src="member.weixinFace" /></p>
				<p class="name">{{member.nickname}} <br /><br />我发现一件好货，来一起砍价{{bargainGoods.targetPrice}}元拿吧</p>
				<div class="shops">
					<p class="imgs"><img :src="bargainGoods.goodsImage |filterss(3)" :onerror='logo' /></p>
					<div class="shopcont">
						<p>{{bargainGoods.goodsName}}</p>
						<p class="foot">
							<span>￥{{Number(bargainGoods.targetPrice).toFixed(2)}}</span>
							<span>599人已{{Number(bargainGoods.targetPrice).toFixed(2)}}元拿</span>
						</p>
					</div>
				</div>
			</div>
			<div class="friend">
				<p>已砍<span>{{Number(bargainGoods.bargainPrices).toFixed(2)}}</span>元，还差<span>{{Number(bargainGoods.goodsPrice-bargainGoods.targetPrice-bargainGoods.bargainPrices<0?0:bargainGoods.goodsPrice-bargainGoods.targetPrice-bargainGoods.bargainPrices).toFixed(2)}}</span>元</p>
				<p class="btn" @click="invite">去喊好友砍一刀</p>
				<p><span>{{times}}</span></p>
			</div>
			<div class="gang" v-if='memberBargainLists.length>0'>
				<p class="title">砍价帮</p>
				<ul>
					<li v-for='item in memberBargainLists'>
						<img :src="item.face||item.weixinFace" :onerror='logo' class="img"/>
						<p>
							<span>{{item.nickname}}</span><br />
							<span>来一起砍价{{bargainGoods.targetPrice}}元拿</span>
							<span><i></i>砍掉{{Number(item.bargainPrice).toFixed(2)}}元</span>
						</p>
					</li>
				</ul>
				<p class="mores" v-if='more' @click="much">更多</p>
			</div>
		</div>
		<div class="footer">
			<ul class="desc">
				<li v-for="(item,index) in goodsList" @click="godetails(item)">
					<div class="desc_img">
						<img :src="item.image |filterss(2)" :onerror='logo' />
					</div>
					<div class="name">
						<p>{{item.name}}</p>
						<p>
							<span>￥{{Number(item.price).toFixed(2)}}</span>
							<span>￥{{Number(item.mktprice).toFixed(2)}}</span>
						</p>
					</div>
				</li>

			</ul>
		</div>
		<mt-popup popup-transition="popup-fade" position="center" v-model='rule' class='popups' closeOnClickModal>
			<div class="popcontent">
				<p class="back" @click="clears"><img src="../../common/image/appraise/back.png" /></p>
				<div class="details">
					<p>活动规则</p>
					<ul>
						<li v-for="item in ruless">{{item}}</li><br />
					</ul>
				</div>
			</div>
		</mt-popup>
    <mt-popup popup-transition="popup-fade" position="top" v-model='mast' >
      <div class="masts" @click="mastss">

      </div>
    </mt-popup>
		<mt-popup popup-transition="popup-fade" position="center" v-model='moress' class='popups' closeOnClickModal>
			<div class="morelist">
				<p class="back" @click="clears"><img src="../../common/image/appraise/back.png" /></p>
				<p class="title">砍价帮</p>
				<ul>
					<li v-for='item in memberBargainList'>
						<img :src="item.face" :onerror='logo' />
						<p>
							<span>{{item.nickname}}</span><br />
							<span>来一起砍价{{bargainGoods.targetPrice}}元拿</span>
							<span><i></i>砍掉{{Number(item.bargainPrice).toFixed(2)}}元</span>
						</p>
					</li>

        </ul>

			</div>

		</mt-popup>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk';
  import { Indicator } from 'mint-ui';


  export default {
		data() {
			return {
				logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				times: '',
				popupVisible: false,
				rule: false,
				token: '',
        mast: false,
				goodsList: [],
				member: {},
				memberBargainList: [],
				bargainGoods: {},
				more: false,
				moress: false,
				memberBargainLists:[],
				ruless:[],
			}
		},
		created() {
			window.scrollTo(0, 0)
			var agent = navigator.userAgent.toLowerCase();
			if(agent.match(/MicroMessenger/i) == "micromessenger") {
				return true;
			} else {
				return false;
			}

		},
		mounted() {
      //详情
			this.$axios({
				method: 'post',
				url: '/bargain/queryBargainDetail',
				responseType: 'json',
				data: {
					orderId: this.$route.query.orderid,
					token: this.$route.query.token
				}
			}).then(data => {
				console.log(data)
				this.bargainGoods = data.data.res_data.bargainGoods
				let a=this.bargainGoods.rule.split('\r\n');
				this.ruless=a.splice(0,a.length)
				this.settime(this.bargainGoods.takeDate)
				this.goodsList = data.data.res_data.goodsList;
				this.member = data.data.res_data.member;
				this.memberBargainList = data.data.res_data.memberBargainList

        if(this.memberBargainList.length >=4) {
          this.memberBargainLists = this.memberBargainList.slice(0, 5);
          this.more = true
        }else{
          this.memberBargainLists =this.memberBargainList
        }

				this.fenxang();
			}).catch(err => {
				console.log(err)
			})


		},
		methods: {
      mastss() {
        this.mast = false;
      },
      invite() {
        this.mast = true;
      },
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
          console.log('分享成功',err);
        }).catch(err => {
          console.log('分享失败',err);
        })
      },
			wxInit(res) {

				let that = this;
				wx.config({
//					 debug:true,
					appId: res.appId, // 必填，公众号的唯一标识
					timestamp: res.timestamp, // 必填，生成签名的时间戳
					nonceStr: res.nonceStr, // 必填，生成签名的随机串
					signature: res.signature, // 必填，签名，见附录1
					jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'hideMenuItems'],
				});
				var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);

				let tokens=encodeURIComponent(that.$route.query.token)
        let imgsurl=that.filter(this.bargainGoods.goodsImage)
				wx.ready(function() {
					let obj = {
						title: that.bargainGoods.shareTitle, // 分享标题
						desc: that.bargainGoods.shareDescribe ,
						// link: 'http://test.cheertea.com/?#/bargain/bargainContfree?orderid=' + that.$route.query.orderid + '&token=' + that.$route.query.token,
						link:'http://'+that.$urlstate.url+'/?#/bargain/bargainContfree?orderid=' + that.$route.query.orderid + '&token=' +tokens,
						imgUrl:imgsurl, // 分享图标
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
			much(){
				this.moress=true
			},
			rules() {
				this.rule = true
			},
			backgo() {
				this.$router.go(-1)
			},
			settime(timestamp) {
				let self = this
				let timer = setInterval(function() {
					let nowTime = new Date();
					let endTime = new Date(timestamp);
					let t = endTime.getTime() - nowTime.getTime();
					if(t<0){
						self.times='已结束~'
						return
					}
					if(t > 0) {
						let day = Math.floor(t / 86400000);
						let hour = Math.floor((t / 3600000) % 24);
						let min = Math.floor((t / 60000) % 60);
						let sec = Math.floor((t / 1000) % 60);
						hour = hour < 10 ? "0" + hour : hour;
						min = min < 10 ? "0" + min : min;
						sec = sec < 10 ? "0" + sec : sec;
						let format = '';
						if(day > 0) {
							format = `还剩${day}天${hour}小时${min}分${sec}秒结束，快来砍价吧~`;
						}
						if(day <= 0 && hour > 0) {
							format = `还剩${hour}小时${min}分${sec}秒结束，快来砍价吧~`;
						}
						if(day <= 0 && hour <= 0) {
							format = `还剩${min}分${sec}秒结束，快来砍价吧~`;
						}
						self.times = format;
					} else {
						clearInterval(timer);
						self.times = self.endText;
						self._callback();
					}
				}, 1000);
			},
			_callback() {
				if(this.callback && this.callback instanceof Function) {
					this.callback(...this);
				}
			},
			clears() {
				this.popupVisible = false
				this.rule = false
				this.moress=false
			},
			godetails(val) {
				if(sessionStorage.getItem("token")==null){
					sessionStorage.token=this.$route.query.token
				}
				this.$router.push({
					path: "/goods/detail",
					query: {
						goodsId: val.goodsId
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#bargainCont {

		height: 18rem;
		background-size: 100% 100%;
    .mint-popup {
      background: black;
      .masts {
        width: 10rem;
        height: 10rem;
        background: url(../../common/image/mast.png) no-repeat;
        background-position-y: 0.2rem;
        background-position-x: 2.5rem;
      }
    }
		.header {
			background: white;
			padding: 10px;
			color: black;
			font-size: .5rem;
			border-bottom: 1px solid #ccc;
		}
		.main {
			padding: .2rem;
			background: url(../../common/image/bargain/sharebg.png) no-repeat red;
			background-size: 100% 200%;
			.bar {
				display: flex;
				justify-content: space-between;
				margin-bottom: .2rem;
				span {
					display: inline-block;
					padding: .2rem;
					border-radius: .5rem;
					background: rgba(255, 255, 255, 1);
				}
			}
			.topcontent {
				width: 90%;
				background: #FAFAFA;
				height:6rem;
				border-radius: .3rem;
				padding: .2rem;
				margin: auto;
				position: relative;
				.logo {
					width: 2rem;
					height: 2rem;
					border-radius: 50%;
					position: absolute;
					left: 39%;
					top: -.8rem;
					img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.name {
					width: 100%;
					text-align: center;
					margin-top: 1.2rem;
					font-size: .4rem;
					margin-bottom: .2rem;
				}
				.shops {

					background: #eee;
					width: 90%;
					height: 2.5rem;
					border-radius: .2rem;
					padding: .2rem;
					margin: auto;
					display: flex;
					justify-content: space-between;
					vertical-align: middle;
					margin-top: .4rem !important;
					.imgs{
						width: 3rem;
						height:2.5rem;
						img {
							vertical-align: middle;
							width: 100%;
							height: 100%;
						}
					}
					p {
						flex: 1;

					}
					.shopcont {
						margin-left: .2rem;
						flex: 2;
						p:first-child {
							height: 1.9rem;
						}
						.foot {
							display: flex;
							justify-content: space-between;
							span {
								display: inline-block;
								flex: 1;

							}
							span:last-child {
								text-align: right;
								flex: 1.5;

							}
							span:first-child {
								color: red;
								font-size: .5rem;
							}
						}
					}
				}
			}
			.friend {
				width: 100%;
				text-align: center;
				line-height: 2;
				margin-bottom: .4rem;
				p {
					font-size: .4rem;
					color: white;
				}
				p:first-child {
					span {
						color: yellow;
						font-size: .7rem;
					}
				}
				p:nth-child(2) {
					padding: .3rem;
					background: gold;
					color: red;
					border-radius: .2rem;
					padding-left: .5rem;
					padding-right: .5rem;
					margin-right: .3rem;
					margin-left: .3rem;
					font-weight: bolder;
				}
				p:last-child {
					font-size: .3rem;
				}
			}
			.gang {
				width: 95%;
				background: rgba(255, 255, 255,1);
				margin: auto;
				border-radius: .2rem;
				.title {
					width: 92%;
					padding: .3rem;
					text-align: center;
					color: #333;
					line-height: 2;
					font-size: .4rem;
				}
				ul {
					li {
						height: 1.5rem;
						color: #333;
						vertical-align: middle;
						padding: .2rem;
						border-top: 1px solid antiquewhite;
						.img {
							float: left;
							width: 1.5rem;
							height: 100%;
							border-radius: 100%;
							vertical-align: middle;
							margin-right: .2rem;
						}
						p {
							vertical-align: middle;
							margin-top: .3rem;
							span:last-child {
								display: inline-block;
								float: right;
								color: #999;
							}
						}
					}
				}
				.mores{
					text-align: center;
					background: rgba(255,255,255,.2);
					border-bottom-left-radius: .23rem;
					border-bottom-right-radius: .23rem;
					padding: .3rem;
				}
			}
		}
		.footer {
			background: red;
			padding: .3rem;
			.desc li:nth-child(2n+1) {
				margin-right: 2%;
			}
			.desc li {
				box-sizing: border-box;
				width: 49%;
				border: 1px solid #e6e6e6;
				margin-right: -1px;
				margin-bottom: .2rem;
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
					height: .8rem;
				}
				p:nth-child(2) {
					width: 100%;
					min-height: 24px;
					margin-top: 10px;
					line-height: 20px;
					/*float: left;*/
					margin-left: -.1rem;
					font-size: .4rem;
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
			background: none;
			padding-bottom: 0;
		}
		.popup {
			width: 100%;
			text-align: center;
			font-size: .4rem;
			.poptop {
				text-align: center;
				line-height: 2;
				p {
					width: 100%;
					font-size: .4rem;
					color: white;
				}
				p:first-child {
					font-size: .5rem;
					font-weight: bolder;
					span {
						color: red;
					}
				}
			}
			.content {
				background: white;
				ul {
					padding: .2rem;
					margin-bottom: .3rem;
					display: flex;
					justify-content: space-around;
					li {
						flex: 1;
						text-align: center;
						img {
							width: 60%;
						}
					}
				}
				.clear {
					border-top: 1px solid #ccc;
					padding: .3rem;
				}
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
		.morelist{
			overflow: scroll;
			height: 8rem;
			.title{
					font-size: .5rem;
					padding-top: .2rem;
					padding-bottom: .2rem;
				}
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
				ul{
					li{
						padding-top:.2rem;
						padding-bottom: .2rem;
						margin-bottom: .3rem;
						img{
							float: left;
							margin-right: .2rem;
							width: 1rem;
							height: 1rem;
							border-radius: 100%;
							vertical-align: middle;
							margin-top:-.1rem;
						}
						p{
							vertical-align: middle;
							text-align: left;
							span:last-child{
								float: right;
								color: red;
								margin-top: -.2rem;
							}
							span:first-child{
								font-size: .4rem;
							}
							span:nth-child(3){
								color: #ccc;
							}
						}
					}
				}
		}
	}
</style>
