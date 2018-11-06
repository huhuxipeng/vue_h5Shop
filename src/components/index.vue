<template>
	<div id="index">
		<div class="search">
			<div class="gps">
				<span class="locations">厦门</span>
				<span><img src="../common/image/drop.png" /></span>
			</div>
			<div class="sear">
				<input type="text" value="" id="searcont" placeholder="春茶" @focus="searchshop" />
			</div>
		</div>
		<mt-swipe :auto="3000" class="banner">
			<mt-swipe-item v-for="(item,index) in images">
				<img :src="item.img" :onerror="logo" @click="details(index)" />
			</mt-swipe-item>
		</mt-swipe>
		<!--分类-->
		<div class="item">
			<ul>
				<li @click="nos">
					<img src="../common/image/Sign.png" />
					<span>签到</span>
				</li>
				<li @click="nos"><img src="../common/image/new.png" /><span>新品上市</span></li>
				<li @click="nos"><img src="../common/image/regiments.png" /><span>团购</span></li>
				<li @click="percenter"><img src="../common/image/manager.png" /><span>{{percenterlist[indexs].name}}</span></li>
				<li @click="nos"><img src="../common/image/overseas.png" /><span>海外专场</span></li>
				<li @click="nos"><img src="../common/image/gold.png" /><span>金币专区</span></li>
				<li @click="nos"><img src="../common/image/business.png" /><span>商圈</span></li>
				<li @click="nos"><img src="../common/image/local.png" /><span>本地生活</span></li>
			</ul>
		</div>
		<div class="special">
			<div class="ad">
				<img src="../common/image/poster.jpg" />
			</div>
			<ul class="lists">
				<li @click="lis(index)" v-for="(item,index) in itemList">
					<div class="list_img">
						<img :src="item.image" :onerror='logo' />
					</div>
					<div class="cont">
						<p>{{item.name}}</p>
						<p><span>￥{{(item.price).toFixed(2)}}</span><span>￥{{(item.mktprice).toFixed(2)}}</span></p>
					</div>
				</li>
			</ul>
		</div>
		<div class="content">
			<p class="hot">热门商品</p>
			<ul class="desc">
				<li v-for='(item,index) in hotList' v-on:click='detail(index)'>
					<div class="desc_img">
						<img :src="item.image" :onerror='logo' />
					</div>
					<div class="name">
						<p>{{item.name}}</p>
						<p>
							<span>￥{{(item.price).toFixed(2)}}</span><br />
							<span>￥{{(item.mktprice).toFixed(2)}}</span>
						</p>
						<p>
							<span>可获</span>
						</p>
						<p>
							<span>红积分:0</span>

						</p>
					</div>
				</li>
			</ul>
			<div class="footer">
				<ul class="shoutkey">
					<li class="tell" @click="nos">联系我们</li>
					<li class="shoping" @click="nos">巨柚商城</li>
					<li class="join" @click="nos">商家入驻</li>
					<!--@click="join"-->
				</ul>
			</div>
		</div>
		<!--导航-->
		<commonFooter current-menu="1"></commonFooter>
	</div>

</template>

<script>
	import commonFooter from '../components/commonFooter'
	import { Swipe, SwipeItem } from 'mint-ui'
	//import Axios from 'axios'
	export default {
		data() {
			return {
				item: [],
				itemList: [],
				hotList: [],
				percenterlist: [{
					'name': '我是店长'
				}, {
					'name': '申请店长'
				}],
				images: [{
					'img': require('../common/image/bnner.jpg')
				},
				{
					'img': require('../common/image/bnner.jpg')
				}],
				logo: 'this.src="' + require('../common/image/defaultimg.png') + '"',
				numbers: 1,
				size: 0,
				indexs: 0,
				num: 0

			}
		},
		components: {
			'commonFooter': commonFooter,
		},
		methods: {

			nos() {
				alert("暂未开放，敬请期待")
			},

			//搜索
			searchshop() {
        this.$router.push('/searchShop?state=0')
      },
			percenter() {
				let token=sessionStorage.getItem("token")
				if(token) {
					if(this.indexs == 0) {
						this.$router.push('/Percenter')
					} else {
						let memberIds = JSON.parse(sessionStorage.getItem("details"));

						this.$axios({
							method: "post",
							url: '/member/seletConsumptionSituation',
							responseType: 'json',
							data: {
								token:token
							}
						}).then(data => {
							sessionStorage.memberId = memberIds.memberId
							switch(data.data.res_code) {
								//有手机号，消费满200
								case 1:
									this.$router.push('/lastOne');
									break;
									//有手机号，消费不满200
								case 0:
									this.$router.push('/mancenter')
									break;
									//没有手机号，消费不满200
								case 2:
									this.$router.push('/shop_manager')
									break;
									//没有手机号，消费满200
								case 3:
									sessionStorage.res_code = 3
									this.$router.push('/shop_manager')
									break;

									//有手机,充值不满200
								case 4:
									this.$router.push('/mancenter')
									break;
									//有手机,充值满200
								case 5:
									this.$router.push('/lastOne')
									break;
									//没有手机号，充值不满200
								case 6:
									this.$router.push('/shop_manager')
									break;
									//没有手机号，充值满200
								case 7:
									sessionStorage.res_code = 7
									this.$router.push('/shop_manager')
									break;
							}
						}).catch(err => {
							console.log(err)
						});
					}
				} else {
					this.$router.push('/login')
				}
			},

			lis(index) {
				sessionStorage.detail = JSON.stringify(this.itemList[index].goodsId)

				let goodsId = this.itemList[index].goodsId
				this.$router.push({
					path: '/goods/detail',
					query: {
						goodsId: goodsId
					}
				})
				//		this.$router.push('/goods/detail')
			},
			detail(index) {
				sessionStorage.detail = JSON.stringify(this.hotList[index].goods_id)
				//			this.$router.push('/goods/detail')
				let goodsId = this.hotList[index].goods_id
				this.$router.push({
					path: '/goods/detail',
					query: {
						goodsId: goodsId
					}
				})
			},
			join() {
				this.$router.push('/enter')
			},
			//banner点击事件
			details(index) {
				this.$router.push("/bannerTest")
			},

			scolltop: function() {
				this.$axios({
					method: 'post',
					url: '/goods/hotGoods',
					responseType: 'json',
					data: {
						pageNo: this.numbers,
						pageSize: 10,
					}
				}).then(data => {
					for(var i = 0; i < data.data.res_data.dataList.length; i++) {
						this.hotList.push(data.data.res_data.dataList[i])
					}
				}).catch(err => {
					console.log(err)
				})
				console.log(this.hotList.length)
				if(this.hotList.length > 30) {
					window.removeEventListener("scroll", this.scrollRun)
				} else {
					this.numbers++
						if(this.numbers == 4) {
							window.removeEventListener("scroll", this.scrollRun)
						}
				}
			},
			scrollRun: function() {

				if(window.scrollY > document.getElementsByClassName("content")[0].offsetHeight - 50) {
					this.scolltop()
				}
			}

		},
		mounted() {
			sessionStorage.removeItem('CATERORY')
			let token = sessionStorage.getItem("token")

			var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(token == null) {
				if(r == null) {
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2fwx.cheertea.com%2f%23%2f&response_type=code&scope=snsapi_userinfo#wechat_redirect';
				} else {
					this.$axios({
						method: 'post',
						url: '/basics/wxLogin',
						responseType: 'json',
						data: {
							code: r[2],
							reqType: 0
						},
					}).then(data => {
						localStorage.identityId = data.data.res_data.member.identityId
						localStorage.token = data.data.res_data.token
						localStorage.details = JSON.stringify(data.data.res_data.member)
						sessionStorage.token = localStorage.getItem('token');
						//						sessionStorage.identityId = localStorage.getItem('identityId');
						sessionStorage.details = localStorage.getItem('details');
						this.$router.push('/')
						//						window.history.go(-2);
					}).catch(err => {
						console.log(err)
					})
				}
			}

			this.indexs = sessionStorage.getItem('identityId')

			if(this.indexs == '' || this.indexs == null) {
				this.indexs = 1;
			} else {
				this.indexs -= 1;
			}
			sessionStorage.removeItem("productId")

			window.addEventListener('scroll', this.scrollRun)

			this.$axios({
				method: 'post',
				url: '/goods/homeGoodsList',
				responseType: 'json',
				data: {
					pageSize: 3,
					pageNo: 1
				}
			}).then(data => {
				this.size = data.data.res_data.total
				let itemList = data.data.res_data.dataList
				if(itemList.length >= 3) {
					this.itemList = itemList.slice(0, 3)
				}
			}).catch(err => {
				console.log(err)
			})

			//稍后执行
			window.onload = function() {
				getLocation();
			}
			var x = document.getElementsByClassName("locations")[0];

			function getLocation() {
				if(navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(showPosition, showError, {
						enableHighAcuracy: true,
						timeout: 5000,
						maximumAge: 300000
					});

				} else {
					x.innerHTML = "定位失败";
				}
			}

			function showPosition(p) {
				let latlon = p.coords.latitude + ',' + p.coords.longitude;
				let urls = 'http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0';

				this.$axios({
					post: 'post',
					url: urls,

				}).then(data => {
					console.log(data)

					if(data.status == 0) {
						x.innerHTML = data.result.addressComponent.city
					}
				}).catch(err => {
					console.log(err)
				})
			}

			function showError(error) {
				switch(error.code) {
					case error.PERMISSION_DENIED:
						x.innerHTML = "User denied the request for Geolocation."
						break;
					case error.POSITION_UNAVAILABLE:
						x.innerHTML = '定位失败' || "Location information is unavailable."
						break;
					case error.TIMEOUT:
						x.innerHTML = "The request to get user location timed out."
						break;
					case error.UNKNOWN_ERROR:
						x.innerHTML = "An unknown error occurred."
						break;
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import '~common/scss/mixin.scss';
	#index {
		overflow: hidden;
		background: #f5f5f5;
		.search {
			max-height: 1rem;
			padding: 5px;
			padding-top: .5rem;
			padding-bottom: .3rem;
			display: flex;
			flex: 1;
			background: url('../common/image/topbg.png');
			vertical-align: middle;
			.gps {
				color: white;
				padding-right: 5px;
				text-align: center;
				max-height: .3rem;
				flex: 1;
				.locations {
					display: inline-block;
					min-width: .4rem;
					margin-top: .15rem;
				}
				img {
					width: 15%;
					vertical-align: middle;
				}
			}
			.sear {
				border: none;
				border-radius: 20px;
				flex: 4;
				margin-right: 5px;
				margin-top: -.2rem;
				input {
					box-sizing: border-box;
					padding-left: 1rem;
					padding-bottom: 10px;
					padding-top: .2rem;
					font-size: .4rem;
					border-radius: 20px;
					width: 100%;
					height: 100%;
					outline: none;
					background: url(../common/image/search.png) no-repeat, white;
					background-position: .3rem;
					background-size: .5rem;
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
		.special {
			margin-top: 5px;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
			.ad {
				margin-bottom: 5px;
				height: 2.5rem;
			}
			.lists {
				/*margin-left:8px;*/
				display: flex;
				justify-content: space-around;
			}
			.lists li {
				width: 29%;
				/*height:4rem;*/
				float: left;
				background: white;
				padding: 5.5px;
				.list_img {
					width: 100%;
					height: 60%;
				}
				.cont {
					p {
						margin-bottom: .2rem;
						line-height: .5rem;
						margin-top: .2rem;
						overflow: hidden;
						clear: both;
					}
					p:nth-child(1) {
						max-height: 1rem;
						text-overflow: ellipsis;
					}
					p:last-child{
						width: auto;
					}
					p:nth-child(2) span:nth-child(1) {
						font-size: .3rem;
						color: red;
						margin-right: .2rem;
					}
					p:nth-child(2) span:nth-child(2) {
						font-size: .25rem;
						text-decoration: line-through;
					}
				}
			}
			.lists li:nth-child(2) {
				margin-left: auto;
				margin-right: auto;
			}
		}
		.content {
			overflow: hidden;
			margin-bottom: 1rem;
			/*background: white;*/
			img {
				width: 100%;
				height: 100%;
			}
			.hot {
				text-align: center;
				font-size: .5rem;
				line-height: 1.5rem;
				background: #F5F5F5;
				font-weight: 500;
			}
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
					height: 24px;
				}
				p:nth-child(2) {
					width: 30%;
					min-height: 24px;
					margin-top: 10px;
					line-height: 20px;
					color: red;
					float: left;
					margin-left: -.1rem;
					span:nth-child(1) {
						font-size: .4rem;
					}
					span:nth-child(3) {
						color: black;
						text-decoration: line-through;
					}
				}
				p:nth-child(3) {
					margin-top: 12px;
					text-align: right;
					margin-right: 35%;
					span {
						border-radius: 5px;
						padding-left: .05rem;
						padding-right: .05rem;
						padding-top: .05rem;
						display: inline-block;
						background: #f22d07;
						color: white;
					}
				}
				p:nth-child(4) {
					float: right;
					text-align: left;
					margin-top: -17px;
					line-height: 20px;
				}
			}
			.footer {
				clear: both;
				width: 100%;
				height: 1.5rem;
				font-size: .4rem;
				line-height: 1.5rem;
				text-align: center;
				.shoutkey {
					display: flex;
					justify-content: space-around;
					li {
						flex: 1;
						padding-left: 1rem;
						vertical-align: middle;
						background: url(../common/image/shortkey.png) no-repeat;
					}
					.tell {
						background-position: .6rem -1.2rem;
						background-size: 18%;
					}
					.shoping {
						background-position: .6rem .35rem;
						background-size: 18%;
					}
					.join {
						background-position: .6rem -2.8rem;
						background-size: 18%;
					}
				}
			}
		}
		.item {
			margin-bottom: 18px;
			ul {
				padding: 10px;
				padding-bottom: 0;
				display: flex;
				flex-wrap: wrap;
				li {
					width: 25%;
					padding: 10px;
					padding-bottom: 0;
					box-sizing: border-box;
					text-align: center;
					line-height: .6rem;
					img {
						display: block;
						margin: auto;
						width: 1.4rem;
						height: 1.4rem;
						margin-bottom: 0.1rem;
						vertical-align: top;
					}
				}
			}
		}
	}
</style>
