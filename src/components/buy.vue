<template>
	<div id="buy">
		<mt-header title="店长中心" class='center'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="nav">
			<ul>
				<li>绑定手机</li>
				<li>完成条件</li>
				<li>开店成功</li>
			</ul>
		</div>

		<div class="main">
			<div class="top">
				<span>特别声明：</span>
				<span>开店礼包无法进行退换货处理！</span>
			</div>
			<div class="content">
				<p class="paybag" v-if="giftState==false" @click="gochange">点击选购买的商品</p>
				<!-- <ul class="detail" v-if="giftState==true">
					<li >
						<div class="goodsimg">
							<img :src="simpleGift.image" :onerror="logo"/>
						</div>
						<div class="details">
							<p>{{simpleGift.name}}</p>
						</div>
						<div class="footer">
							<span class="money">￥{{simpleGift.price}}</span>
							<span class="algin" @click="againchange"></span>
						</div>
					</li>
				</ul> -->
				<ul class="goods-show" v-if="giftState==true">
					<li>
						<div class="goods-info">
							<img :src="simpleGift.image | filterss(3)" class="store-logo" :onerror="logo">
							<span>
		              			<h2>{{simpleGift.name}}</h2>
		              			<p>{{simpleGift.specs}}</p>
		              			<!-- <p><em v-for="child in selSpecObj">{{child.specName}}：{{child.specValue}}</em></p> -->
		              			<i>￥{{(simpleGift.price).toFixed(2)}}<u>X{{simpleGift.buyCount}}</u><em @click="againchange">重新选择 ></em></i>
	            			</span>
						</div>
					</li>
				</ul>
				<div class="addres">
					<p class="add">收货地址</p>
					<div class="add-conbarsel" @click="changeadd">
						<em>收件人：{{addressName}}</em>
						<u>{{addressMobile}}</u>
						<i>{{address}}</i>
					</div>
					<!-- <p class="detaadd">						 -->
						<!-- <textarea rows="3" @click="changeadd" readonly>​</textarea> -->
						<!-- <input type="text" v-model="address" @click="changeadd" readonly /> -->
					<!-- </p> -->
				</div>
				<!--提交按钮-->
				<div class="submit" >
					<input type="button" value="提交订单" @click="sub"/>
				</div>
				<!--弹出框-->
				<section class="bottom-layer" v-if="layerShow">
					<div class="layer-content">
						<ul>
							<li class="title">选择付款方式<i v-on:click="hideLayer">取消</i></li>
							<li @click="deposit">预存款
								<!--<u class="icons"></u>-->
								<u class="checks">￥{{money}}<input type="checkbox" class="check" v-model="checks"/></u>
							</li>
							<li @click="wepay();return false">微信支付
								<u class="checks"><input type="checkbox" class="check" v-model="checks"/></u>
							</li>

							<li v-if="false">分期支付
								<u class="checks"><input type="checkbox" class="check"/></u>
								<div class="lists" v-if="list">
									<ul>
										<li>
											<p>￥178.60/期</p>
											<p>3期（含手续费）</p>
										</li>
										<li>
											<p>￥91.00/期</p>
											<p>6期（含手续费）</p>
										</li>
										<li>
											<p>￥63.40/期</p>
											<p>3期（含手续费）</p>
										</li>
										<li>
											<p>￥49.60/期</p>
											<p>3期（含手续费）</p>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<div class="layer-bg"></div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	import {Header,Popup,MessageBox} from 'mint-ui'
	import pay from '../api/giftUppay.js'
	export default{
		data(){
			return{
				layerShow: false,
				popupVisible:false,
				cont:['余额','微信支付'],
				token:'',
				addressName:'',
				addressMobile:'',
				address:'',
				money: 0,
				sum: 0,
				giftState:false,
				shoparr:[],
				shopar:[],
				checks: false,
				add:[],
				orderId: 0,
				giftList:[],
				simpleGift:[],
				logo:'this.src="'+require('../common/image/defaultimg.png')+'"',
			}
		},
		mounted(){
			
			let s = document.createElement("script");
			s.type = 'text/javascript';
			s.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
			document.body.appendChild(s);

			this.token=sessionStorage.getItem("token")
			this.shopar=JSON.parse(sessionStorage.getItem("res_data"))
			this.giftList=JSON.parse(sessionStorage.getItem("GIFTLIST"))
			this.money = JSON.parse(sessionStorage.getItem('details')).advance
			// console.log('88888888');
			// console.log(this.giftList);
			if(this.giftList==null || this.giftList==undefined || this.giftList==''){
				this.giftState = false;
			}
			else{
				this.giftState = true;
				this.simpleGift = this.giftList.comList[0].goodsList[0];
				this.sum = this.giftList.comList[0].goodsList[0].totalPrice;
				// console.log(this.simpleGift);
			}
			// console.log('32423423423');
			// console.log(this.address);
			// console.log(this.add);
			if(this.shopar){
				// this.shows=true
				this.shoparr=this.shopar.comList[0].goodsList[0]
			}
			//地址
			this.$axios({
				method:"post",
				url:'/member/queryMemAddressList',
				responseType:'json',
				data:{
					token:this.token
				}
			}).then(data=>{
				if(data.status==200){
					// console.log('address');
					// console.log(data.data);
					this.add=JSON.parse(sessionStorage.getItem("placeadd"))
					if(this.add){
						// console.log('11');
						// console.log(this.add);
						this.addressName = this.add.name;
						this.addressMobile = this.add.mobile;
						this.address=this.add.provinceName+this.add.cityName+this.add.districtName+this.add.addressDetail
					}else{
						// console.log('22');
						this.add=data.data.res_data.memberAddressList;
						// console.log(this.add);
						for(var i=0;i<this.add.length;i++){
							if(this.add[i].defAddr==1){
								this.addressName = this.add[i].name;
								this.addressMobile = this.add[i].mobile;
								this.address=this.add[i].provinceName+this.add[i].cityName+this.add[i].districtName+this.add[i].addressDetail
								this.add=this.add[i]
							}
						}
					}
				}
			}).catch(err=>{
				console.log(err)
			})
			// console.log(this.add);
			// console.log(this.add.addrId);
		},
		methods:{
			hideLayer: function() {
				this.layerShow = false;
			},
			showLayer: function() {
				this.layerShow = true;
				console.log(this.giftList.goodsJsonList)
				var creatGiftData = {
					goodsList: this.giftList.goodsJsonList,
					memberAddressId: this.add.addrId,
					token: this.token
				};
				// console.log('creat order');
				// console.log(creatGiftData);
				this.$axios({
					method: 'post',
					url: "/order/createGiftOrder",
					responseType: 'json',
					data: creatGiftData
				}).then(data => {
					// console.log('create back222');
					// console.log(data);
					if(data.status == 200) {
						this.orderId = data.data.res_data.order.orderId
					}
				}).catch(err => {
					console.log(err)
				})
			},
			sub(){
				let shopar=JSON.parse(sessionStorage.getItem("res_data"))
				// this.popupVisible=true;
				if(this.giftList==null || this.giftList==undefined || this.giftList==''){
					alert('请点击选购买的商品');
					return;
				}
				if(this.add.addrId==null || this.add.addrId==undefined || this.add.addrId==''){
					alert('请选择收货地址');
					return;
				}
				this.showLayer();
			},
			deposit() {
				this.checks = false;
				this.checks = !this.checks
				if(this.checks) {
					if(this.money > this.sum) {
						document.getElementsByClassName("check")[0].style.background = "red"
						document.getElementsByClassName("check")[1].style.background = "none"
						// console.log('预支付。。。');
						// console.log(this.token);
						// console.log(this.orderId);
						MessageBox.prompt('请输入支付密码','',{inputType:'password'}).then(({ value, action }) => {
							if(value){
						pay(this.token, this.orderId, 0, 0,value)
							}else{
								MessageBox('提示','密码不能为空')
							}

});
						this.layerShow = false;
					} else {
						alert("余额不足")
						this.layerShow = false;
					}

				} else {
					document.getElementsByClassName("check")[0].style.background = "none"
				}
			},
			wepay() {
				this.checks = false;
				this.checks = !this.checks;
				if(this.checks) {
					document.getElementsByClassName("check")[1].style.background = "red"
					document.getElementsByClassName("check")[0].style.background = "none"
					if(this.add.addrId==null){
						alert("地址不能为空")
						this.layerShow = false;
					}
					else{
						var appId, paySign, timeStamp, nonceStr, packages, signType, code_url;
						var wePayData = {
							token: this.token,
							orderId: this.orderId,
							payType: 1,
							reqType: 0
						};
						// console.log('we dat');
						// console.log(wePayData);
						this.$axios({
							method: 'post',
							url: '/pay/giftOrderPay',
							responseType: 'json',
							data: wePayData
						}).then(data => {

							if(data.data.res_code==0) {
								var datas = data.data.res_data;
								appId = datas.appid;
								nonceStr = datas.noncestr;
								paySign = datas.sign;
								packages = datas.package;
								timeStamp = datas.timestamp;
								signType = 'MD5';
								callpay();
								var that = this;
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
												sessionStorage.shop=2;
												that.$router.push({
														path:'/lastOne',
														query:{orderId:that.orderId}
													})

												//alert('支付成功');
											}
											else if(res.err_msg == "get_brand_wcpay_request:cancel") {
												alert('支付取消');
											}
											else if(res.err_msg == "get_brand_wcpay_request:fail") {
												alert('支付失败');
												that.$router.go(-1);
											}
											//使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
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
								alert("统一下单失败");
							}
						}).catch(err => {
							console.log(err)
						})
					}
				}
			},
			clear(){
				this.popupVisible=false;
			},
			gochange(){
				sessionStorage.buyState=1;
				this.$router.push('/shopManagegift')
			},
			//重新选择
			againchange(){
				this.shoparr=[];
				sessionStorage.removeItem("detail")
				sessionStorage.buyState=1;
				this.$router.push('/shopManagegift')
			},
			backgo(){
				this.$router.go(-1)
			},
			//选择地址
			changeadd(){
				this.$router.push('/shoppingCart/addSel')
			},
		},

	}
</script>

<style lang="scss" scoped="scoped">
.checks {
	float: right;
	color: #999;
	.check {
		margin-left: .3rem;
		vertical-align: middle;
		width: .5rem;
		height: .5rem;
		border: 1px solid #ccc;
		border-radius: 50%;
		outline: none;
	}
}
.goods-show .goods-info span {
    width: 6.8rem;
}
.goods-show li span h2 {
	font-size: 0.38rem;
	height: 1rem;
	margin-bottom: 0.14rem;
}
.goods-show .goods-info span i {
	margin-top: 0.2rem;
}
.goods-show .goods-info span i em {
	float: right;
	font-size: 0.38rem;
	color: #f22d07;
    vertical-align: top;
    text-decoration: none;
    padding: 0 0.2rem;
}
.goods-show .goods-info span i u {
	float: none;
	padding-left: 0.3rem;
	padding-top: 0.01rem;
    vertical-align: top;
}
#buy{
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	    -webkit-appearance: none !important;
	    margin: 0;
	}
	background:#F5F5F5 ;
	.center{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.nav{
		overflow: hidden;
		margin-bottom:0px;
		background: url(../common/image/shopImg/icon_进度条2@2x.png) no-repeat;
		background-size:100% 100% ;
		ul{
			font-size: 0;
			display: flex;
			li{
				color: white;
				flex: 1;
				text-align: center;
				font-size: .4rem;
				margin-left: -2px;
				padding:20px;
			}
			li:last-child{
				color: #CCCCCC;
			}
		}
	}
	.main{
		.top{
			padding: 10px;
			background: #ffffff;
			span:nth-child(1){
				font-size:0.4rem;
				color:rgb(51, 51, 51);
			}
			span:nth-child(2){
				font-size: .3rem;
				color:#b3b3b3;
			}
		}
		.content{
			.paybag{
				line-height: 2.3rem;
				text-align: center;
				font-size: .5rem;
				color: orangered;
			}
			.detail{
				padding: 10px;
				box-sizing: border-box;
				background: white;
				li{
					overflow: hidden;
					font-size: .4rem;
					line-height:2;
					.details{
						color: rgb(51, 51, 51);
					}
					.footer{
						display: flex;
						margin-top: 10px;
						color:red;
						span{
							display: inline-block;
							flex: 1;
						}
						a{
							color: red;
						}
						.algin{
							text-align: right;
							background: url(../common/image/shopImg/back.png) no-repeat;
							background-position:100% 50%;
							background-size: 8% 40%;
							padding-right: 10px;
							margin-top:1rem;

						}
					}
				}
				.goodsimg{
					width:2rem;
					height:2rem;
					float: left;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
			/*地址*/
			.addres{
				// margin-top: 10px;
				background: white;
				.add{
					padding: 10px;
					font-size: .4rem;
				}
				input{
					width: 90%;
					padding:10px;
					border-radius:5px;
					border: 1px solid #CCC;
					outline: none;
					font-size: .4rem;
				}
				span:nth-child(1){
						flex: 1;
						line-height: auto;
						text-align: center;
						line-height:1rem;
					}
					span:nth-child(2){
						margin-left:5px;
						flex: 4;
					}
				.man{
					padding: 10px;
					padding-bottom:0;
					display: flex;
				}
				.phone{
					padding: 10px;
					padding-bottom:0;
					display: flex;
				}
				/*收货地址*/
				.adds{
					display: flex;
					justify-content:space-between;
					padding: 10px;
					padding-bottom:0;
					span:nth-child(2){
						flex: 1;
						.address{
							select:nth-child(1){
								font-size: .3rem !important;
								display: inline;
								padding: 0 !important;
							}
						}
					}
				}
				/*详细地址*/
				.add-conbarsel{
					width: 88%;
					padding:10px;
					margin: 0 10px 10px 10px;
					border-radius: 5px;
					border: none;
					background: #EEEEEE;
					font-size: .4rem;
					display: inline-block;
					text-align: left;
					line-height:1.5;
					em{
						display: inline-block;
						float: left;
					}
					u{
						display: inline-block;
						float:right;
					}
					i{
						display: block;
						clear: both;
					}
				}
				.detaadd{
					padding: 10px;
					// padding-bottom:0;
					input{
						border: none;
						background: #EEEEEE;
					}
					textarea{
						width: 90%;
						padding:10px;
						border-radius: 5px;
						border: none;
						background: #EEEEEE;
						font-size: .4rem;
					}
				}
			}
			/*提交按钮*/
			.submit{
				padding: 10px;
				input{
					border-radius: 10px;
					color: white;
					font-size:.5rem;
					background:url(../common/image/shopImg/bgbtn.png) no-repeat;
					width: 100%;
					height: 100%;
					padding: 10px;
				}
			}
			.popup{
				width: 100%;
				background: white;
				text-align: center;
				font-size: .4rem;
				padding: 10px;
				p:nth-child(1){
					display: flex;
					border-bottom:1px solid #eee;
					padding:10px;
					.title{
						flex:2;
						display: inline-block;
						text-align: right;
						margin-right: 20px;
					}
					.clear{
						flex: 1;
						display:inline-block;
						color:#25b0ff;
						text-align: right;
					}
				}
				.list{
					padding: 10px;
					border-bottom: 1px solid #eee;
					text-align: left;
				}
			}
		}

	}
}
</style>

