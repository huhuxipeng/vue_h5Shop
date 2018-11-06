<template>
	<div id="rightDetails">
		<mt-header flexd title="维权详情" class="shop">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="main">
			<div class="shopname">
				<span class="icons store-icon"></span>
				<i>{{shopname.comName}}</i>
			</div>
			<ul class="goods-show">
				<li>
					<!--v-for="(value,keys) in goodsList"-->
					<div class="goods-info">
						<img :src="content.goodsImage |filterss(3)" class="store-logo" :onerror="logo">
						<span>
	              			<h2>{{content.goodsName}}</h2>
	              			<p>{{content.productSpec}}</p>
	              			<!-- <p><em v-for="child in selSpecObj">{{child.specName}}：{{child.specValue}}</em></p> -->
	              			<!--<i>退款金额:￥{{(value.price).toFixed(2)}}<u>X{{value.buyCount}}</u></i>-->
            			</span>
					</div>
				</li>
			</ul>
			<div class="contents">
				<p class="title">维权进度</p>
				<ul class="content">
					<li class="list" v-for="(item,index) in progress">
						<p class="time">
							<span>{{item.createTime | cycle}}</span>
							<!--<span style="font-size: .4rem;">25555555</span>-->
						</p>
						<p class="state">{{item.rightStatus.processText}}</p>
					</li>
				</ul>
			</div>

			<div class="scheduleContent">
				<p>维权信息</p>
				<p><span>维权单号:</span><span>{{right.serial}}</span></p>
				<p><span>维权类型:</span><span>{{right.type}}</span></p>
				<p><span>退款金额:</span><span>￥{{right.price}}</span></p>
				<p><span>退款说明:</span><span>{{right.reason}}</span></p>
			</div>
		</div>
		<div class="footer">
			<p>
				<span @click="clear" v-if='right.rightStatus==1'>取消维权</span>
				<span @click="clear" v-if='right.rightStatus==2'>取消维权</span>
				<span @click="write" v-if='right.rightStatus==2'>填写退货物流</span>
				<span @click="logi" v-if='right.rightStatus==3'>退货物流</span>
				<span @click="again" v-if='right.rightStatus==6'>重新维权</span>
			</p>
		</div>
	</div>
</template>

<script>
	import {MessageBox} from 'mint-ui'
	export default {
		data() {
			return {
				logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				progress: [],
				content: [],
				right: {},
				token: '',
				shopname:{},
			}
		},

		mounted() {
			let id = this.$route.query.id;
			this.token = sessionStorage.getItem("token");
			this.$axios({
				method: 'post',
				url: '/order/right/detail',
				responseType: 'json',
				data: {
					id: id,
					token: this.token
				}
			}).then(data => {
				this.right = data.data.res_data.right;
				this.shopname=data.data.res_data.order
				switch(this.right.rightStatus) {
					case 1:
					case 8:
						this.right.rightStatus = 1
						break;
					case 2:
						this.right.rightStatus = 2
						break;
					case 3:
					case 4:
					case 5:
						this.right.rightStatus = 3
						break;
					case 6:
					case 7:
					case 11:
					case 12:
						this.right.rightStatus = 6
						break;
					case 9:
					case 10:
						this.right.rightStatus = 9
						break;
				}
				this.progress = data.data.res_data.right.processList;
				this.content = data.data.res_data.items[0];
				this.content.shipAmount=data.data.res_data.order.shipAmount;
				this.content.orderAmount = data.data.res_data.order.orderAmount;
			}).catch(err => {
				console.log(err)
			})

			//1 取消维权 2 填写退货物流、取消维权 3 退货物流 4退货物流 5 退货物流 6 重新申请 7 重新申请 8 取消维权 9 无按钮 10 无按钮 11 重新申请 12 重新申请

		},
		methods: {
			backgo(){
				this.$router.push('/Percenter')
			},
			//取消维权
			clear() {
				this.$axios({
					method: 'post',
					url: '/order/right/cancel',
					responseType: 'json',
					data: {
						id: this.right.id,
						token: this.token
					}
				}).then(data => {
					if(data.data.res_code == 0) {
						MessageBox('提示','取消成功');
						this.$router.push('/order/list')
					}
				}).catch(err => {
					console.log(err)
				})
			},
			write() {
				this.$router.push({
					path: '/writeLogistics',
					query: {
						id: this.right.id
					}
				})
			},
			//查看物流
			logi() {
				sessionStorage.orderId = this.right.id;
				sessionStorage.goodsImage = this.content.goodsImage
				sessionStorage.RIGHTs = "RIGHT";
				this.$router.push('/logistics')
			},
			again(){
				sessionStorage.RIGHT=JSON.stringify(this.content)
				this.$router.push({
					path:'/rightDetail',
					query:{
						orderType:this.right.itemsType,
					}
				})
			}
		},
		filters: {
			//时间转换
			cycle: function(timestamp) {
				var data = new Date(timestamp);

				var Y = data.getFullYear() + '-';
				var M = (data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1) + '-';
				var D = (data.getDate() < 10 ? '0' + data.getDate() : data.getDate()) + ' ';
				var h = (data.getHours() < 10 ? '0' + data.getHours() : data.getHours()) + ':';
				var m = (data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()) + ':';
				var s = (data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds());

				return Y + M + D + h + m + s;
			}
		},

	}
</script>

<style lang="scss" scoped="scoped">
	#rightDetails {
		.shop{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
		.main {
			font-size: .3rem;
			.shopname {
				padding: .3rem;
				padding-bottom: .1rem;
				vertical-align: middle;
				border-bottom: 1px solid #ccc;
				.store-icon {
					display: inline-block;
					width: .4rem;
					height: .45rem;
					background-position: -2.87rem -1.1rem;
				}
			}
			.goods-show {
				border-bottom: #CCCCCC 1px solid;
			}
			.scheduleContent {
				p {
					padding: .3rem;
					font-size: .3rem;
					border: 1px solid #ccc;
					span:nth-child(2) {
						float: right;
						display: inline-block;
					}
				}
				p:first-child {
					font-weight: bold
				}
			}
			/*进度*/
			.contents {
				clear: both;
				background: white;
				/*height: 1rem;*/
				.title {
					padding: .3rem;
					border-bottom: 1px solid #ccc;
					border-top: #CCCCCC 1px solid;
					font-size: .4rem;
				}
				.content {
					padding: .3rem;
					li {
						max-height: 2rem;
						padding-bottom: 1rem;
						font-size: .2rem;
						display: flex;
						justify-content: space-between;
						background: url(../../common/image/xian.png) no-repeat;
						background-position-x: 2.8rem;
						background-size: .5% 100%;
						.time {
							flex: 2;
							text-align: center;
							position: relative;
						}
						.state {
							margin-left: 1.5rem;
							flex: 5;
							font-size: .4rem;
							line-height: .5rem;
							position: relative;
							color: #ccc;
						}
						.state:before {
							content: "";
							display: block;
							width: .4rem;
							height: .4rem;
							border-radius: 50%;
							background: url(../../common/image/topupimg/noright.png) no-repeat;
							background-size: 100%;
							position: absolute;
							left: -1.15rem;
						}
					}
					li:last-child {
						background: none;
						padding-bottom: 0;
					}
					li:first-child {
						.state:last-child:before {
							background: url(../../common/image/shopImg/right.png) no-repeat;
							background-size: 100%;
						}
						.state:last-child {
							color: black;
						}
					}
				}
			}
		}
		.footer {
			height: 1rem;
			margin-top: .5rem;
			margin-bottom: 1rem;
			span {
				display: inline-block;
				padding: .2rem;
				border: 1px solid orangered;
				text-align: center;
				width: 3rem;
				height: 0.5rem;
				border-radius: .2rem;
				line-height: 0.5rem;
				float: right;
				margin-right: .2rem;
			}
		}
	}
  .clears {
    width: 8.125rem;
    height: 2rem;
    border-radius: 20px;
    font-size: 0.4rem;
    text-align: center;
    line-height: 1rem;
  }

  .footers {
    display: flex;
    justify-content: space-between;
    text-align: center;
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    p {
      flex: 1;
      padding: 5px;
      padding-left: 20px;
      padding-right: 20px;
      line-height: 1rem;
      font-size: 0.4rem;
    }
    p:last-child {
      background: #eee;
      border-bottom-right-radius: 0.2rem;
    }
    p:first-child {
      background: #f22d07;
      color: white;
      border-bottom-left-radius: 0.2rem;
    }
  }
</style>
