<template>
	<div id="topup">
		<mt-header flexd title="充值" class="header">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="main">
			<p>金额</p>
			<p class="inmoney"><span>￥</span><input type="text" value="" placeholder="10元起，且为10元整数倍" v-model="moneys" @keyup="focu" @blur="savemoney"/><span v-if="clearmon" @click="clear"><img src="../common/image/topupimg/clear.png" alt="" width="15" height="15"/></span></p>
			<p><span>温馨提示：</span>请根据您的消费需求理性选择充值金额</p>
		</div>
		<div class="footer">
			<p class="topon"><input type="button" value="充值" :disabled="!radi" :class="{'col':radi}" @click="subs" /></p>
			<p class="protocol">
				<span class="radio" @click="radios"><img src="../common/image/shopImg/right.png" v-if='radi'/></span>
				<router-link to="/topupPotocol">
					<span>我已经阅读并同意《充值协议》</span>
				</router-link>
			</p>
		</div>
		<!--弹出框-->
		<mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' class='popup' closeOnClickModal>
			<div class="pay">
				<p><span class="title">选择付款方式 </span><span class="clear" @click="cancle">取消</span></p>
				<p v-for="(item,index) in cont" class="list" @click="goup(index)">
					<span>{{item}}</span>
				</p>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import { Header, Popup } from 'mint-ui'
	export default {
		data() {
			return {
				clearmon: false,
				moneys: '',
				reg: '',
				radi: false,
				popupVisible: false,
				cont: ['微信支付']
			}
		},
		mounted: function() {
			 let s = document.createElement("script");
			 s.type = 'text/javascript';
			 s.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
			 document.body.appendChild(s);

			this.radi = localStorage.getItem("radi")
			if(sessionStorage.getItem("savemoney")){
				this.moneys=sessionStorage.getItem("savemoney")
			}else{
				this.moneys=''
			}
		},
		methods: {
			//存钱输量
			savemoney(){
				sessionStorage.savemoney=this.moneys
			},
			//清除所填钱数
			clear() {
				this.clearmon = false;
				this.moneys = ''
			},
			focu() {
				if(this.moneys) {
					this.clearmon = true
				}
//				let index=this.moneys.indexOf('.')+1;
//				if(this.moneys.indexOf('.')){
//					if(this.moneys.slice(index,this.moneys.length).length>2){
//						alert('只能输入两位小数')
//					}
//					this.moneys=this.moneys.slice(0,index+2)
//				}



			},
			//取消付款选择
			cancle() {
				this.popupVisible = false
			},

			radios() {
				if(this.radi) {
					this.radi = false
				} else {
					this.radi = true
				}
			},
			subs() {
				this.popupVisible = true;
				 console.log(JSON.parse(this.moneys))
			},
			backgo() {
				this.$router.go(-1)
				localStorage.removeItem("radi");
				sessionStorage.removeItem('savemoney')
			},
			//充值数据
			goup(index) {
				let token = sessionStorage.getItem("token")
				var appId, paySign, timeStamp, nonceStr, packages, signType, code_url;
				this.$axios({
					method: 'post',
					url:'/pay/pay',
					responseType: 'json',
					data: {
						orderAmount: JSON.parse(this.moneys),
						payType:1,
						reqType:0,
						token: token,
					}
				}).then(data => {
//					if(index==1){

						if(data.data.res_code==0) {
							var datas = data.data.res_data;
							appId = datas.appid;
							nonceStr = datas.noncestr;
							paySign = datas.sign;
							packages = datas.package;
							timeStamp = datas.timestamp;
							signType = 'MD5';
							callpay();

							function onBridgeReady() {
								WeixinJSBridge.invoke(
									'getBrandWCPayRequest', {
										"appId": appId, //公众号名称，由商户传入
						 				"paySign": paySign, //微信签名
										"timeStamp": timeStamp, //时间戳，自1970年以来的秒数
										"nonceStr": nonceStr, //随机串
										"package": packages, //预支付交易会话标识
										"signType": signType //微信签名方式
									},

									function(res) {

										if(res.err_msg == "get_brand_wcpay_request:ok") {
											sessionStorage.num=1
											sessionStorage.MONEY=this.moneys
												// that.$router.push({
												// 	path:'/topSuccess',
												// 	query:{orderId:that.orderId}
												// })
											if(this.$urlstate.numb==1){
												location.href = 'http://test.cheertea.com/?code=02152cFC0FlMIc2AHvFC09dhFC052cF2&state=#/topSuccess'
											}else if(this.$urlstate.numb==2){
												location.href = 'http://wx.cheertea.com/?code=02152cFC0FlMIc2AHvFC09dhFC052cF2&state=#/topSuccess'
											}


											alert('支付成功');
										} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
											alert('支付取消');

										} else if(res.err_msg == "get_brand_wcpay_request:fail") {
											alert('支付失败');

											if(this.$urlstate.numb==1){
												location.href = 'http://test.cheertea.com/?code=02152cFC0FlMIc2AHvFC09dhFC052cF2&state=#/topSuccess'
											}else if(this.$urlstate.numb==2){
												location.href = 'http://wx.cheertea.com/?code=02152cFC0FlMIc2AHvFC09dhFC052cF2&state=#/topSuccess'
											}


										} //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
									}
								);
							}

							function callpay() {
								if(typeof WeixinJSBridge == "undefined") {
									if(document.addEventListener) {
										document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
									} else if(document.attachEvent) {
										document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
										document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
									}
								} else {
									onBridgeReady();
								}
							}
						}
						else {
							alert(data.data.res_info);
						}
//					}

				}).catch(err => {
					console.log(err)
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~common/scss/mixin.scss';
	#topup {
		.header {
			background: white;
			padding: 10px;
			color: black;
			font-size: .6rem;
			border-bottom: 1px solid #ccc;
		}
		.main {
			background: white;
			font-size: .5rem;
			padding: 10px;
			p:nth-child(1) {
				padding-top: 20px;
				padding-bottom: 15px;
			}
			p:nth-child(3) {
				font-size: .3rem;
				padding: 10px;
				padding-left: 0px;
			}
			p:nth-child(3) span {
				color: red;
			}
			.inmoney {
				font-size: .4rem;
				input {
					width: 85%;
					padding: 10px;
					outline: none;
					padding-left: 0;
				}
			}
		}
		.footer {
			margin-left: 10px;
			margin-right: 10px;
			margin-top: 90%;
			input {
				width: 100%;
				background: #ccc;
				padding: 10px;
				text-align: center;
				color: white;
				font-size: .5rem;
				border-radius: 5px;
				outline: none;
			}
			.col {
				background: #ff403c;
			}
			.radio {
				display: inline-block;
				width: 15px;
				height: 15px;
				border: 1px solid #ccc;
				border-radius: 50%;
				vertical-align: middle;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.protocol {
				padding-top: 5px;
				a {
					color: #008dde;
				}
			}
		}
		.popup {
			width: 100%;
			background: white;
			text-align: center;
			font-size: .4rem;
			padding: 10px;
			p:nth-child(1) {
				display: flex;
				border-bottom: 1px solid #eee;
				padding: 10px;
				.title {
					flex: 2;
					display: inline-block;
					text-align: right;
					margin-right: 20px;
				}
				.clear {
					flex: 1;
					display: inline-block;
					color: #25b0ff;
					text-align: right;
				}
			}
			.list {
				padding: 10px;
				border-bottom: 1px solid #eee;
				text-align: left;
			}
		}
	}
</style>
